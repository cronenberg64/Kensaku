import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Research Topics</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          {trendingTopics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.topicCard}>
              <View style={styles.topicHeader}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.paperCount}>{topic.papers} papers</Text>
              </View>
              <View style={styles.subtopicsContainer}>
                {topic.subtopics.map((subtopic, subIndex) => (
                  <View key={subIndex} style={styles.subtopicTag}>
                    <Text style={styles.subtopicText}>{subtopic}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Topics</Text>
          <View style={styles.suggestedContainer}>
            {suggestedTopics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.suggestedTag}>
                <Text style={styles.suggestedText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicHeader: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subtopicTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  subtopicText: {
    color: '#007AFF',
    fontSize: 14,
  },
  suggestedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestedTag: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  suggestedText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default TopicsScreen; 