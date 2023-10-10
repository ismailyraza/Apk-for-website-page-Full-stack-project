import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditUserScreen from './EditUserScreen';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([
    { id: '1', name: 'User 1', email: 'user1@example.com', phone: '123-456-7890' },
    { id: '2', name: 'User 2', email: 'user2@example.com', phone: '987-654-3210' },
    // Add more user data here...
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchText, setSearchText] = useState('');

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

      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user.id}
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
