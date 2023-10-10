import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const DashboardScreen = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'User 1', email: 'user1@example.com', phone: '123-456-7890' },
    { id: '2', name: 'User 2', email: 'user2@example.com', phone: '987-654-3210' },
    // Add more user data here...
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
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

export default DashboardScreen;
