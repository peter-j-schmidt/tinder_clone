import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import TopBar from './components/TopBar';
import SwipeableImage from './components/SwipeableImage';

import Constants from 'expo-constants';
import axios from 'axios';

export default function App() {

  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchUsers() {
    try {
      const {data} = await axios.get('https://randomuser.me/api/?gender=female&results=50');
      setUsers(data.results);
    } catch (error) {
      console.log(error)
      Alert.alert('Error getting users', '', [{text: 'Retry', onPress: () => fetchUsers()}])
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [] )

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.swipes}>
        { users.length > 1 && (
          <SwipeableImage user={users[currentIndex]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
});
