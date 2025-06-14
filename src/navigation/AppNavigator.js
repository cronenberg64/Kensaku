import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MdHome, MdSearch, MdPeople, MdPerson } from 'react-icons/md';
import HomeScreen from '../screens/HomeScreen';
import TopicsScreen from '../screens/TopicsScreen';
import CollaborationScreen from '../screens/CollaborationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const tabs = [
  { name: 'Home', path: '/', icon: <MdHome size={24} /> },
  { name: 'Topics', path: '/topics', icon: <MdSearch size={24} /> },
  { name: 'Collaboration', path: '/collaboration', icon: <MdPeople size={24} /> },
  { name: 'Profile', path: '/profile', icon: <MdPerson size={24} /> },
];

function TabBar() {
  const location = useLocation();
  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: 60,
      background: '#fff',
      borderTop: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path || (tab.path === '/' && location.pathname === '');
        return (
          <Link
            key={tab.name}
            to={tab.path}
            style={{
              textDecoration: 'none',
              color: isActive ? '#007AFF' : 'gray',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: isActive ? 600 : 400,
              fontSize: 12,
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppNavigator() {
  return (
    <Router>
      <div style={{ paddingBottom: 60 }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/topics" element={<TopicsScreen />} />
          <Route path="/collaboration" element={<CollaborationScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}

export default AppNavigator; 