import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);

  // Check if there are no users
  const noUsers = users.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {noUsers ? (
        <View style={styles.noDataContainer}>
          <Image source={require('./placeholder-image.png')} style={styles.placeholderImage} />
          <Text style={styles.noDataText}>No Data Found</Text>
        </View>
      ) : (
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
      )}
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
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
  },
});

export default DashboardScreen;
