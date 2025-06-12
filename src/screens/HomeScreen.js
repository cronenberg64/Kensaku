import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Kensaku</Text>
          <Text style={styles.subtitle}>Research Collaboration Platform</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['AI in Education', 'Sustainable Technology', 'Quantum Computing'].map((topic, index) => (
              <TouchableOpacity key={index} style={styles.topicCard}>
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Collaborations</Text>
          {['Machine Learning Research', 'Environmental Studies', 'Data Science'].map((collab, index) => (
            <TouchableOpacity key={index} style={styles.collabCard}>
              <Text style={styles.collabTitle}>{collab}</Text>
              <Text style={styles.collabSubtitle}>Looking for collaborators</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Publishing Resources</Text>
          <TouchableOpacity style={styles.resourceCard}>
            <Text style={styles.resourceTitle}>Journal Templates</Text>
            <Text style={styles.resourceSubtitle}>Access common templates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Text style={styles.resourceTitle}>Submission Guidelines</Text>
            <Text style={styles.resourceSubtitle}>Learn about requirements</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
});

export default HomeScreen; 