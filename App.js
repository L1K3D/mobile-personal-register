import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.tituloPrincipal}>
          Create a user registration, persisting data on the device
        </Text>
        <View style={{ width: '80%' }}>
          {/* Personal Code */}
          <Text style={styles.legendaNome}>Code</Text>
          <TextInput
            style={[styles.campoNome, { backgroundColor: '#f5edc2', marginBottom: 15 }]}
            placeholder="Enter code"
            keyboardType="numeric"
            value={personalCode}
            onChangeText={setPersonalCode}
          />
          {/* Full Name */}
          <Text style={styles.legendaNome}>Name</Text>
          <TextInput
            style={[styles.campoNome, { backgroundColor: '#f5edc2', marginBottom: 15 }]}
            placeholder="Enter name"
            value={fullName}
            onChangeText={setFullName}
          />
          {/* Email */}
          <Text style={styles.legendaNome}>Email</Text>
          <TextInput
            style={[styles.campoNome, { backgroundColor: '#f5edc2', marginBottom: 15 }]}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {/* Password and Confirm Password */}
          <View style={styles.areaCadastro}>
            <View style={styles.areaNome}>
              <Text style={styles.legendaNome}>Password</Text>
              <TextInput
                style={[styles.campoNome, { backgroundColor: '#f5edc2', textAlign: 'center' }]}
                placeholder="****"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.areaNome}>
              <Text style={styles.legendaNome}>Confirm password</Text>
              <TextInput
                style={[styles.campoNome, { backgroundColor: '#f5edc2', textAlign: 'center' }]}
                placeholder="****"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
          {/* Buttons */}
          <View style={styles.areaBotoes}>
            <TouchableOpacity style={styles.botaoSalvar} onPress={save}>
              <Text style={styles.legendaBotao}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCarregar} onPress={load}>
              <Text style={styles.legendaBotao}>Load</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity style={styles.botaoCarregar} onPress={clearFields}>
              <Text style={styles.legendaBotao}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Validation rules */}
        <View style={{ position: 'absolute', right: 20, top: 100, width: 250 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Validations:</Text>
          <Text style={{ fontSize: 15 }}>- Code must be &gt; 0{"\n"}
            - Name is required{"\n"}
            - Email must be valid (use regex){"\n"}
            - Password and confirmation must match{"\n"}
            - Password must have at least 1 uppercase letter, 1 number, and at least 5 characters.
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
