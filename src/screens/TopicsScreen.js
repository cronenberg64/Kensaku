import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 0,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '0 10px',
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  topicHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paperCount: {
    fontSize: 14,
    color: '#666',
  },
  subtopicsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  subtopicTag: {
    backgroundColor: '#E3F2FD',
    padding: '5px 10px',
    borderRadius: 15,
    fontSize: 14,
    color: '#007AFF',
  },
  suggestedContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  suggestedTag: {
    backgroundColor: '#F5F5F5',
    border: '1px solid #007AFF',
    padding: '8px 15px',
    borderRadius: 20,
    color: '#007AFF',
    fontSize: 14,
    cursor: 'pointer',
  },
};

const TopicsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = [
    {
      title: 'Artificial Intelligence',
      subtopics: ['Machine Learning', 'Deep Learning', 'Neural Networks'],
      papers: 1234,
    },
    {
      title: 'Sustainable Technology',
      subtopics: ['Green Energy', 'Environmental Science', 'Climate Change'],
      papers: 856,
    },
    {
      title: 'Quantum Computing',
      subtopics: ['Quantum Algorithms', 'Quantum Cryptography', 'Quantum Physics'],
      papers: 567,
    },
  ];

  const suggestedTopics = [
    'Data Science',
    'Blockchain Technology',
    'Biotechnology',
    'Robotics',
    'Cybersecurity',
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Research Topics</h1>
        <div style={styles.searchContainer}>
          <MdSearch size={24} color="#666" style={{ marginRight: 10 }} />
          <input
            style={styles.searchInput}
            placeholder="Search topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main style={styles.content}>
        <section style={styles.section}>
          <div style={styles.sectionTitle}>Trending Topics</div>
          {trendingTopics.map((topic, index) => (
            <div key={index} style={styles.topicCard}>
              <div style={styles.topicHeader}>
                <span style={styles.topicTitle}>{topic.title}</span>
                <span style={styles.paperCount}>{topic.papers} papers</span>
              </div>
              <div style={styles.subtopicsContainer}>
                {topic.subtopics.map((subtopic, subIndex) => (
                  <span key={subIndex} style={styles.subtopicTag}>{subtopic}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>Suggested Topics</div>
          <div style={styles.suggestedContainer}>
            {suggestedTopics.map((topic, index) => (
              <span key={index} style={styles.suggestedTag}>{topic}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopicsScreen; 