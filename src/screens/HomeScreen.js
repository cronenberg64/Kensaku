import React from 'react';

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
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    margin: 0,
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
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'inline-block',
  },
  topicText: {
    fontSize: 16,
    color: '#007AFF',
  },
  collabCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  collabTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collabSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resourceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resourceSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
};

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Kensaku</h1>
        <p style={styles.subtitle}>Research Collaboration Platform</p>
      </header>

      <section style={styles.section}>
        <div style={styles.sectionTitle}>Trending Topics</div>
        <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
          {['AI in Education', 'Sustainable Technology', 'Quantum Computing'].map((topic, index) => (
            <button key={index} style={styles.topicCard}>
              <span style={styles.topicText}>{topic}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionTitle}>Recent Collaborations</div>
        {['Machine Learning Research', 'Environmental Studies', 'Data Science'].map((collab, index) => (
          <div key={index} style={styles.collabCard}>
            <div style={styles.collabTitle}>{collab}</div>
            <div style={styles.collabSubtitle}>Looking for collaborators</div>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <div style={styles.sectionTitle}>Publishing Resources</div>
        <div style={styles.resourceCard}>
          <div style={styles.resourceTitle}>Journal Templates</div>
          <div style={styles.resourceSubtitle}>Access common templates</div>
        </div>
        <div style={styles.resourceCard}>
          <div style={styles.resourceTitle}>Submission Guidelines</div>
          <div style={styles.resourceSubtitle}>Learn about requirements</div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen; 