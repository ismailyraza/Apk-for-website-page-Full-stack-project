import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Check if there are no users
  const noUsers = users.length === 0;

  const actions = [
    {
      text: 'Add User',
      icon: require('./add-user-icon.png'), // Replace with your own icon
      name: 'add_user',
      position: 1,
    },
  ];

  const handleActionPress = (name) => {
    if (name === 'add_user') {
      setIsAddingUser(true);
    }
  };

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

      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        color="#007bff" // Customize the button color
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
