import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditUserScreen from './EditUserScreen';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Check if data has been fetched from the API
    checkDataFetched();
  }, []);

  useEffect(() => {
    // Filter users based on search criteria (Name, Mobile, or Email)
    const filtered = users.filter((user) => {
      const lowerSearchText = searchText.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerSearchText) ||
        user.email.toLowerCase().includes(lowerSearchText) ||
        user.phone.includes(searchText)
      );
    });
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const handleUserPress = (user) => {
    // Navigate to the EditUserScreen with user details
    navigation.navigate('EditUser', { user });
  };

  const handleAddUser = () => {
    // Implement your logic to add a user
    // After adding the user, update the state and set the data fetched flag in AsyncStorage
  };

  const checkDataFetched = async () => {
    try {
      // Check if data has been fetched from the API
      const dataFetched = await AsyncStorage.getItem('dataFetched');

      if (dataFetched === null || dataFetched === 'false') {
        // Data hasn't been fetched, fetch data from the API
        const newData = await fetchDataFromAPI();

        // Update the state with the fetched data
        setUsers(newData);
        setFilteredUsers(newData);

        // Set the data fetched flag in AsyncStorage to 'true'
        await AsyncStorage.setItem('dataFetched', 'true');
      } else {
        // Data has already been fetched, load it from AsyncStorage
        const savedData = await AsyncStorage.getItem('userData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setUsers(parsedData);
          setFilteredUsers(parsedData);
        }
      }
    } catch (error) {
      console.error('Error checking data fetched:', error);
    }
  };

  const fetchDataFromAPI = async () => {
    try {
      // Fetch data from your API endpoint
      const response = await fetch('https://example.com/api/users');
      if (response.ok) {
        const data = await response.json();

        // Store data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(data));

        return data;
      } else {
        console.error('Failed to fetch data from the API');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Mobile, or Email"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Add User button */}
      <Button title="Add User" onPress={handleAddUser} />

      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleUserPress(item)}
          >
            <Text style={styles.cardText}>Username: {item.name}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
            <Text style={styles.cardText}>Phone: {item.phone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
