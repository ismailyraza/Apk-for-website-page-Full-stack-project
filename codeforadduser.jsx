import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserMobile, setNewUserMobile] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUser = () => {
    // Validate the user input here before adding to the list
    if (newUserName && newUserMobile && newUserEmail) {
      setUsers([
        ...users,
        { name: newUserName, mobile: newUserMobile, email: newUserEmail },
      ]);
      setIsAddingUser(false);
      setNewUserName('');
      setNewUserMobile('');
      setNewUserEmail('');
    } else {
      // Handle validation error, e.g., display an error message
    }
  };

  const handleCancel = () => {
    setIsAddingUser(false);
    setNewUserName('');
    setNewUserMobile('');
    setNewUserEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Check if user is adding a new user */}
      {isAddingUser ? (
        <View>
          <Text>Add User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newUserName}
            onChangeText={(text) => setNewUserName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            value={newUserMobile}
            onChangeText={(text) => setNewUserMobile(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newUserEmail}
            onChangeText={(text) => setNewUserEmail(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleAddUser} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      ) : (
        <Button
          title="Add User"
          onPress={() => setIsAddingUser(true)}
        />
      )}

      {/* Display the list of users */}
      {users.map((user, index) => (
        <View key={index} style={styles.userCard}>
          <Text>Name: {user.name}</Text>
          <Text>Mobile: {user.mobile}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ))}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default DashboardScreen;
