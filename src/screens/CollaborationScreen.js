import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Inter, sans-serif',
    position: 'relative',
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
    marginBottom: 15,
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    textAlign: 'center',
    borderRadius: 8,
    cursor: 'pointer',
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
    background: 'none',
    border: 'none',
    outline: 'none',
    transition: 'background 0.2s',
  },
  activeTab: {
    backgroundColor: 'white',
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#E3F2FD',
    padding: '5px 10px',
    borderRadius: 15,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 500,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  membersText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  requester: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    backgroundColor: '#E3F2FD',
    padding: '5px 10px',
    borderRadius: 15,
    fontSize: 12,
    color: '#007AFF',
  },
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    zIndex: 100,
  },
};

const CollaborationScreen = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      title: 'AI in Education Research',
      description: 'Investigating the impact of AI on student learning outcomes',
      members: 3,
      needed: ['Data Scientist', 'Education Expert'],
      status: 'Active',
    },
    {
      title: 'Sustainable Energy Solutions',
      description: 'Developing new methods for renewable energy storage',
      members: 2,
      needed: ['Energy Engineer', 'Materials Scientist'],
      status: 'Planning',
    },
  ];

  const requests = [
    {
      title: 'Machine Learning Project',
      requester: 'Prof. Tanaka',
      university: 'University of Tokyo',
      expertise: ['Machine Learning', 'Python'],
      status: 'Open',
    },
    {
      title: 'Environmental Science Study',
      requester: 'Dr. Suzuki',
      university: 'Kyoto University',
      expertise: ['Environmental Science', 'Data Analysis'],
      status: 'Open',
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Collaboration</h1>
        <div style={styles.tabContainer}>
          <button
            style={{ ...styles.tab, ...(activeTab === 'projects' ? styles.activeTab : {}) }}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'requests' ? styles.activeTab : {}) }}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
        </div>
      </header>

      <main style={styles.content}>
        {activeTab === 'projects' ? (
          <section style={styles.section}>
            {projects.map((project, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardTitle}>{project.title}</span>
                  <span style={styles.statusContainer}>{project.status}</span>
                </div>
                <div style={styles.description}>{project.description}</div>
                <div style={styles.membersText}>
                  {project.members} members • Looking for:
                </div>
                <div style={styles.tagsContainer}>
                  {project.needed.map((role, roleIndex) => (
                    <span key={roleIndex} style={styles.tag}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section style={styles.section}>
            {requests.map((request, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardTitle}>{request.title}</span>
                  <span style={styles.statusContainer}>{request.status}</span>
                </div>
                <div style={styles.requester}>
                  {request.requester} • {request.university}
                </div>
                <div style={styles.tagsContainer}>
                  {request.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} style={styles.tag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <button style={styles.fab} aria-label="Add">
        <MdAdd size={24} color="white" />
      </button>
    </div>
  );
};

export default CollaborationScreen; 