import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { firebaseApp } from 'app';

// Initialize Firestore and Storage
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Collection references
export const papersCollection = collection(db, 'papers');
export const usersCollection = collection(db, 'users');

// Types for academic papers
export interface PaperData {
  id?: string;
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  status: 'draft' | 'submitted' | 'published';
  fileUrl?: string;
  fileName?: string;
  fileType?: 'pdf' | 'docx';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  submittedAt?: Date;
  publishedAt?: Date;
}

export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName?: string;
  affiliation?: string;
  researchInterests: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Paper CRUD operations
export const paperOperations = {
  // Create a new paper
  create: async (paperData: Omit<PaperData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const paper = {
      ...paperData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const docRef = await addDoc(papersCollection, paper);
    return { id: docRef.id, ...paper };
  },

  // Update a paper
  update: async (paperId: string, updates: Partial<PaperData>) => {
    const paperRef = doc(db, 'papers', paperId);
    await updateDoc(paperRef, {
      ...updates,
      updatedAt: new Date()
    });
  },

  // Delete a paper
  delete: async (paperId: string) => {
    const paperRef = doc(db, 'papers', paperId);
    await deleteDoc(paperRef);
  },

  // Get paper by ID
  getById: async (paperId: string) => {
    const paperRef = doc(db, 'papers', paperId);
    const paperSnap = await getDoc(paperRef);
    if (paperSnap.exists()) {
      return { id: paperSnap.id, ...paperSnap.data() } as PaperData;
    }
    return null;
  },

  // Get papers by user
  getByUser: async (userId: string) => {
    const q = query(
      papersCollection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PaperData[];
  },

  // Get papers by status
  getByStatus: async (userId: string, status: PaperData['status']) => {
    const q = query(
      papersCollection,
      where('userId', '==', userId),
      where('status', '==', status),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PaperData[];
  },

  // Search papers (public published papers)
  search: async (searchTerm: string, limit: number = 20) => {
    const q = query(
      papersCollection,
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const papers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PaperData[];
    
    // Client-side filtering for search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return papers.filter(paper => 
        paper.title.toLowerCase().includes(searchLower) ||
        paper.abstract.toLowerCase().includes(searchLower) ||
        paper.authors.some(author => author.toLowerCase().includes(searchLower)) ||
        paper.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      ).slice(0, limit);
    }
    
    return papers.slice(0, limit);
  },

  // Subscribe to user's papers with real-time updates
  subscribeToUserPapers: (userId: string, callback: (papers: PaperData[]) => void) => {
    const q = query(
      papersCollection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    return onSnapshot(q, (querySnapshot) => {
      const papers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PaperData[];
      callback(papers);
    });
  }
};

// File upload operations
export const fileOperations = {
  // Upload paper file (PDF or DOCX)
  uploadPaper: async (file: File, paperId: string, userId: string) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !['pdf', 'docx'].includes(fileExtension)) {
      throw new Error('Only PDF and DOCX files are allowed');
    }

    const fileName = `papers/${userId}/${paperId}.${fileExtension}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      fileUrl: downloadURL,
      fileName: file.name,
      fileType: fileExtension as 'pdf' | 'docx'
    };
  },

  // Delete paper file
  deletePaper: async (paperId: string, userId: string, fileType: 'pdf' | 'docx') => {
    const fileName = `papers/${userId}/${paperId}.${fileType}`;
    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
  }
};

// User profile operations
export const userOperations = {
  // Create or update user profile
  createOrUpdate: async (userProfile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const userRef = doc(usersCollection, userProfile.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // Update existing profile
      await updateDoc(userRef, {
        ...userProfile,
        updatedAt: new Date()
      });
    } else {
      // Create new profile
      await updateDoc(userRef, {
        ...userProfile,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  },

  // Get user profile
  getProfile: async (uid: string) => {
    const userRef = doc(usersCollection, uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as UserProfile;
    }
    return null;
  }
};
