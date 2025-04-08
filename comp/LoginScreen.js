import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const passwordInputRef = useRef(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        const storedRememberMe = await AsyncStorage.getItem("rememberMe");
        if (storedRememberMe === "true") {
          setEmail(storedEmail || "");
          setRememberMe(true);
        }
      } catch (error) {
        console.log("Error loading data", error);
      }
    };
    loadStoredData();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      return "กรุณากรอกอีเมล";
    }
    if (!emailRegex.test(email)) {
      return "รูปแบบอีเมลไม่ถูกต้อง";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (!password) {
      return "กรุณากรอกรหัสผ่าน";
    }
    if (password.length < 8) {
      return "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    }
    return null;
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
  
    if (emailError || passwordError) {
      Alert.alert("ข้อผิดพลาด", emailError || passwordError);
      return;
    }
  
    if (rememberMe) {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("rememberMe", "true");
    } else {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.setItem("rememberMe", "false");
    }
  
    Alert.alert("Login Successful", `Email: ${email}`);
    console.log("Email:", email);
    console.log("Password:", password);
  
    // ✅ เรียก onLogin เพื่อแจ้ง App ว่าล็อกอินแล้ว
    onLogin();
  
    // ✅ ไปที่หน้า Profile
    navigation.navigate("CProfile");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/background2.png")} style={styles.background}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>LOG IN</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Entypo name={passwordVisible ? "eye" : "eye-with-line"} size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <FontAwesome name="check" size={14} color="white" />}
            </View>
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    top: 20,
    left: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "80%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 5,
  },
  checkboxChecked: {
    backgroundColor: "black",
  },
  rememberText: {
    fontSize: 14,
    marginRight: 90,
  },
  forgotPassword: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#F8C8DC",
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#F8C8DC",
  },
});