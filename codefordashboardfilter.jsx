import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditUserScreen from './EditUserScreen';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([
    { id: '1', name: 'User 1', email: 'user1@example.com', phone: '123-456-7890', timestamp: 1634022000000 },
    { id: '2', name: 'User 2', email: 'user2@example.com', phone: '987-654-3210', timestamp: 1634122000000 },
    // Add more user data here...
  ]);

  const [sortBy, setSortBy] = useState('Last Inserted'); // Default sorting

  useEffect(() => {
    // Sort the user list based on the selected sorting criteria
    if (sortBy === 'A-Z') {
      setUsers([...users.sort((a, b) => a.name.localeCompare(b.name))]);
    } else if (sortBy === 'Z-A') {
      setUsers([...users.sort((a, b) => b.name.localeCompare(a.name))]);
    } else if (sortBy === 'Last Modified') {
      setUsers([...users.sort((a, b) => b.timestamp - a.timestamp)]);
    } else if (sortBy === 'Last Inserted') {
      setUsers([...users.sort((a, b) => a.timestamp - b.timestamp)]);
    }
  }, [sortBy]);

  const handleUserPress = (user) => {
    // Navigate to the EditUserScreen with user details
    navigation.navigate('EditUser', { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Sorting options */}
      <View style={styles.sortButtons}>
        <Button title="A-Z" onPress={() => setSortBy('A-Z')} />
        <Button title="Z-A" onPress={() => setSortBy('Z-A')} />
        <Button title="Last Modified" onPress={() => setSortBy('Last Modified')} />
        <Button title="Last Inserted" onPress={() => setSortBy('Last Inserted')} />
      </View>

      <FlatList
        data={users}
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
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
