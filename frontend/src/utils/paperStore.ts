import { create } from 'zustand';
import { PaperData, paperOperations, fileOperations } from './firestore';
import { User } from 'firebase/auth';

interface PaperStore {
  papers: PaperData[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadUserPapers: (userId: string) => Promise<void>;
  createPaper: (paperData: Omit<PaperData, 'id' | 'createdAt' | 'updatedAt' | 'userId'>, userId: string) => Promise<string>;
  updatePaper: (paperId: string, updates: Partial<PaperData>) => Promise<void>;
  deletePaper: (paperId: string) => Promise<void>;
  uploadPaperFile: (file: File, paperId: string, userId: string) => Promise<void>;
  searchPapers: (searchTerm: string) => Promise<PaperData[]>;
  
  // Filtered papers by status
  getDraftPapers: () => PaperData[];
  getSubmittedPapers: () => PaperData[];
  getPublishedPapers: () => PaperData[];
  
  // Real-time subscription
  subscribeToUserPapers: (userId: string) => () => void;
}

export const usePaperStore = create<PaperStore>((set, get) => ({
  papers: [],
  isLoading: false,
  error: null,

  loadUserPapers: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const papers = await paperOperations.getByUser(userId);
      set({ papers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to load papers', isLoading: false });
    }
  },

  createPaper: async (paperData, userId) => {
    set({ isLoading: true, error: null });
    try {
      const paper = await paperOperations.create({ ...paperData, userId });
      const currentPapers = get().papers;
      set({ papers: [paper, ...currentPapers], isLoading: false });
      return paper.id!;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create paper', isLoading: false });
      throw error;
    }
  },

  updatePaper: async (paperId: string, updates: Partial<PaperData>) => {
    set({ isLoading: true, error: null });
    try {
      await paperOperations.update(paperId, updates);
      const currentPapers = get().papers;
      const updatedPapers = currentPapers.map(paper => 
        paper.id === paperId ? { ...paper, ...updates, updatedAt: new Date() } : paper
      );
      set({ papers: updatedPapers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update paper', isLoading: false });
    }
  },

  deletePaper: async (paperId: string) => {
    set({ isLoading: true, error: null });
    try {
      await paperOperations.delete(paperId);
      const currentPapers = get().papers;
      const filteredPapers = currentPapers.filter(paper => paper.id !== paperId);
      set({ papers: filteredPapers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete paper', isLoading: false });
    }
  },

  uploadPaperFile: async (file: File, paperId: string, userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fileData = await fileOperations.uploadPaper(file, paperId, userId);
      await paperOperations.update(paperId, fileData);
      
      const currentPapers = get().papers;
      const updatedPapers = currentPapers.map(paper => 
        paper.id === paperId ? { ...paper, ...fileData, updatedAt: new Date() } : paper
      );
      set({ papers: updatedPapers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to upload file', isLoading: false });
    }
  },

  searchPapers: async (searchTerm: string) => {
    set({ isLoading: true, error: null });
    try {
      const results = await paperOperations.search(searchTerm);
      set({ isLoading: false });
      return results;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to search papers', isLoading: false });
      return [];
    }
  },

  getDraftPapers: () => {
    return get().papers.filter(paper => paper.status === 'draft');
  },

  getSubmittedPapers: () => {
    return get().papers.filter(paper => paper.status === 'submitted');
  },

  getPublishedPapers: () => {
    return get().papers.filter(paper => paper.status === 'published');
  },

  subscribeToUserPapers: (userId: string) => {
    return paperOperations.subscribeToUserPapers(userId, (papers) => {
      set({ papers });
    });
  }
}));
