import React from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.vStack}>
        {/* Search Bar */}
        <View style={styles.box}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="gray" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for restaurants"
              style={styles.input}
            />
          </View>
        </View>

        {/* Restaurant Categories */}
        <Text style={styles.heading}>Categories</Text>
        <View style={styles.hStack}>
          <TouchableOpacity style={[styles.categoryBox, { backgroundColor: '#007bff' }]}>
            <Text style={styles.categoryText}>Fast Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryBox, { backgroundColor: '#6c757d' }]}>
            <Text style={styles.categoryText}>Chinese</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryBox, { backgroundColor: '#28a745' }]}>
            <Text style={styles.categoryText}>Italian</Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant Cards */}
        <Text style={[styles.heading, styles.mt4]}>Restaurants</Text>
        <View style={styles.vStack}>
          <View style={styles.card}>
            <Text>Restaurant 1</Text>
            <Text style={styles.cardText}>Type: Fast Food</Text>
          </View>
          <View style={styles.card}>
            <Text>Restaurant 2</Text>
            <Text style={styles.cardText}>Type: Chinese</Text>
          </View>
          <View style={styles.card}>
            <Text>Restaurant 3</Text>
            <Text style={styles.cardText}>Type: Italian</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  vStack: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  box: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mt4: {
    marginTop: 16,
  },
  categoryBox: {
    padding: 16,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  categoryText: {
    color: 'white',
  },
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
  },
  cardText: {
    color: 'gray',
  },
});

export default HomeScreen;