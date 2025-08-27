import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // State variables
  const [personalCode, setPersonalCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to clear all fields
  function clearFields() {
    setPersonalCode("");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  // Function to save user data with validations
  async function save() {
    // Validation: Personal code must be greater than 0
    if (!personalCode || isNaN(personalCode) || Number(personalCode) <= 0) {
      Alert.alert('Personal code must be a number greater than 0.');
      return;
    }

    // Validation: Name is required
    if (!fullName || fullName.trim().length === 0) {
      Alert.alert('Name is required.');
      return;
    }

    // Validation: Valid email (regex)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email.');
      return;
    }

    // Validation: Password and confirmation must match
    if (password !== confirmPassword) {
      Alert.alert('Password and confirmation must match.');
      return;
    }

    // Validation: Password must contain at least one number
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(password)) {
      Alert.alert('Password must contain at least one number.');
      return;
    }

    // Validation: Password must contain at least one uppercase letter
    const upperRegex = /[A-Z]/;
    if (!upperRegex.test(password)) {
      Alert.alert('Password must contain at least one uppercase letter.');
      return;
    }

    // Validation: Password must be at least 5 characters
    if (password.length < 5) {
      Alert.alert('Password must be at least 5 characters long.');
      return;
    }

    let userData = {
      personalCode: personalCode,
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const stringJson = JSON.stringify(userData);
    await AsyncStorage.setItem("@userData", stringJson);
    Alert.alert("Data saved successfully!");
  }

  // Function to load user data
  async function load() {
    const jsonContent = await AsyncStorage.getItem("@userData");
    console.log(jsonContent);
    if (jsonContent != null) {
      const userData = JSON.parse(jsonContent);
      setPersonalCode(userData.personalCode);
      setFullName(userData.fullName);
      setEmail(userData.email);
      setPassword(userData.password);
      setConfirmPassword(userData.confirmPassword);
    } else {
      Alert.alert("No data found");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
