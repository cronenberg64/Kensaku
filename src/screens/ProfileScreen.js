import React from 'react';
import { MdScience, MdPeople, MdSettings, MdChevronRight } from 'react-icons/md';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    color: 'white',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    border: '3px solid white',
    marginRight: 20,
    objectFit: 'cover',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  role: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    margin: 0,
  },
  university: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    margin: 0,
  },
  department: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    margin: 0,
  },
  statsContainer: {
    display: 'flex',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 15,
  },
  statItem: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  researchAreas: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    backgroundColor: '#E3F2FD',
    padding: '6px 12px',
    borderRadius: 15,
    color: '#007AFF',
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuSection: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  menuHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    borderBottom: '1px solid #f0f0f0',
    gap: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
};

const ProfileScreen = () => {
  const user = {
    name: 'Yuki Tanaka',
    role: 'Graduate Student',
    university: 'University of Tokyo',
    department: 'Computer Science',
    researchAreas: ['Machine Learning', 'Natural Language Processing'],
    publications: 3,
    collaborations: 5,
  };

  const menuItems = [
    {
      title: 'My Research',
      icon: <MdScience size={24} color="#007AFF" />,
      items: ['Publications', 'Research Projects', 'Research Interests'],
    },
    {
      title: 'Collaborations',
      icon: <MdPeople size={24} color="#007AFF" />,
      items: ['Active Projects', 'Collaboration Requests', 'Team Members'],
    },
    {
      title: 'Settings',
      icon: <MdSettings size={24} color="#007AFF" />,
      items: ['Account Settings', 'Notifications', 'Privacy'],
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.profileHeader}>
          <img
            src="https://via.placeholder.com/100"
            alt="avatar"
            style={styles.avatar}
          />
          <div style={styles.profileInfo}>
            <div style={styles.name}>{user.name}</div>
            <div style={styles.role}>{user.role}</div>
            <div style={styles.university}>{user.university}</div>
            <div style={styles.department}>{user.department}</div>
          </div>
        </div>
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{user.publications}</div>
            <div style={styles.statLabel}>Publications</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{user.collaborations}</div>
            <div style={styles.statLabel}>Collaborations</div>
          </div>
        </div>
      </header>

      <section style={styles.researchAreas}>
        <div style={styles.sectionTitle}>Research Areas</div>
        <div style={styles.tagsContainer}>
          {user.researchAreas.map((area, index) => (
            <span key={index} style={styles.tag}>{area}</span>
          ))}
        </div>
      </section>

      <div style={styles.menuContainer}>
        {menuItems.map((section, index) => (
          <div key={index} style={styles.menuSection}>
            <div style={styles.menuHeader}>
              {section.icon}
              <span style={styles.menuTitle}>{section.title}</span>
            </div>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} style={styles.menuItem}>
                <span style={styles.menuItemText}>{item}</span>
                <MdChevronRight size={24} color="#666" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen; 