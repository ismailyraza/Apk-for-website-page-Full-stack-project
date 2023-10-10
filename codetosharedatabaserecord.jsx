import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditUserScreen from './EditUserScreen';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Initialize the SQLite database
  const db = SQLite.openDatabase(
    {
      name: 'UserDatabase.db',
      location: 'default',
    },
    () => {},
    (error) => {
      console.error('Error opening database:', error);
    }
  );

  useEffect(() => {
    // Create a "Users" table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT)',
        [],
        () => {},
        (error) => {
          console.error('Error creating table:', error);
        }
      );
    });

    // Load users from the database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Users',
        [],
        (_, { rows }) => {
          const userArray = rows.raw();
          setUsers(userArray);
          setFilteredUsers(userArray);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    });
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
    // Implement your logic to add a user to the database
    // After adding the user, update the state and re-fetch users
    // For example, you can prompt the user to enter user details in a modal or separate screen
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
