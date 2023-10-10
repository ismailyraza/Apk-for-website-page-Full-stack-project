import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, CheckBox } from 'react-native';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [howDidYouHear, setHowDidYouHear] = useState([]);
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Gujarat');

  const handleSignup = () => {
    // Perform user registration logic here
    // You can send the user data to your backend API
    // Validate user input before sending it to the server
    // Display appropriate feedback to the user
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="numeric"
      />

      <Text>Gender:</Text>
      <View style={styles.genderContainer}>
        <Text>Male</Text>
        <CheckBox value={gender === 'Male'} onValueChange={() => setGender('Male')} />
        <Text>Female</Text>
        <CheckBox value={gender === 'Female'} onValueChange={() => setGender('Female')} />
        <Text>Others</Text>
        <CheckBox value={gender === 'Others'} onValueChange={() => setGender('Others')} />
      </View>

      <Text>How did you hear about this?</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={howDidYouHear.includes('LinkedIn')}
          onValueChange={() => setHowDidYouHear([...howDidYouHear, 'LinkedIn'])}
        />
        <Text>LinkedIn</Text>
        {/* Repeat the above pattern for other checkboxes */}
      </View>

      <Text>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Text>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={(text) => setState(text)}
      />

      <Button title="Save" onPress={handleSignup} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignupScreen;
