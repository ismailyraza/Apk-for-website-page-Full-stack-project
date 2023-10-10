import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditUserScreen from './EditUserScreen';
import ImagePicker from 'react-native-image-picker'; // Import the image picker
const initialUserData = [
  { id: 1, name: 'User 1', email: 'user1@example.com', phone: '123-456-7890', image: null },
  { id: 2, name: 'User 2', email: 'user2@example.com', phone: '987-654-3210', image: null },
  // Add more user data here...
];
const [users, setUsers] = useState(initialUserData);
const [filteredUsers, setFilteredUsers] = useState(initialUserData);
const handleSelectImage = (userId) => {
  const options = {
    title: 'Select Image',
    mediaType: 'photo',
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take a Photo',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
  };

  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('Image selection canceled');
    } else if (response.error) {
      console.error('Image picker error:', response.error);
    } else {
      // Update the user's image in the state
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, image: response.uri };
        }
        return user;
      });
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  });
};
<FlatList
  data={filteredUsers}
  keyExtractor={(user) => user.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleUserPress(item)}
    >
      {/* Display the user's image */}
      {item.image && <Image source={{ uri: item.image }} style={styles.userImage} />}

      <Text style={styles.cardText}>Username: {item.name}</Text>
      <Text style={styles.cardText}>Email: {item.email}</Text>
      <Text style={styles.cardText}>Phone: {item.phone}</Text>

      {/* Button to select an image */}
      <Button
        title="Select Image"
        onPress={() => handleSelectImage(item.id)}
      />
    </TouchableOpacity>
  )}
/>
useEffect(() => {
  // Store the updated user data in AsyncStorage whenever it changes
  AsyncStorage.setItem('userData', JSON.stringify(users));
}, [users]);
