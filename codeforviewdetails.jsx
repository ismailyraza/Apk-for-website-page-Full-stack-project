// for view details
import React from 'react';
import { View, Text } from 'react-native';

const UserDetailsScreen = ({ route }) => {
  const { name, mobile, email } = route.params.user;

  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Mobile: {mobile}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default UserDetailsScreen;
----------------------------------------------------------------------

  // DashboardScreen

  import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetailsScreen from './UserDetailsScreen'; // Import the UserDetailsScreen component

const Stack = createStackNavigator();

const DashboardScreen = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'User 1', email: 'user1@example.com', phone: '123-456-7890' },
    { id: '2', name: 'User 2', email: 'user2@example.com', phone: '987-654-3210' },
    // Add more user data here...
  ]);

  const handleUserPress = (user) => {
    // Navigate to the UserDetailsScreen with user details
    navigation.navigate('UserDetails', { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

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
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
