import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Background from "./Background";
import { FontAwesome } from "@expo/vector-icons";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignup = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // 🔹 แสดงข้อมูลที่ป้อนใน Terminal รวมถึง Password จริง
    console.log("=========== SIGN UP DATA ===========");
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`Password: ${password}`); // ✅ แสดง Password จริง
    console.log("====================================");

    Alert.alert("Success", `Sign-up successful!`);

    navigation.navigate("Login"); // ✅ เพิ่มเฉพาะบรรทัดนี้
  };

  return (
    <Background
      source={require("../assets/background2.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>SIGN UP</Text>

        <View style={styles.inputGroup}>
          <FontAwesome name="envelope" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="user" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && (
                <FontAwesome name="check" size={14} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ ทำให้ layout ใช้พื้นที่เต็มจอ
    justifyContent: "center", // ✅ จัดให้อยู่ตรงกลางแนวตั้ง
    alignItems: "center", // ✅ จัดให้อยู่ตรงกลางแนวนอน
    padding: 15,
    marginBottom: 100,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30, // ✅ เพิ่มขนาดให้ใหญ่ขึ้น
    fontWeight: "normal", // ✅ ทำให้ตัวหนา
    color: "#000", // ✅ ใช้สีดำ
    textAlign: "center", // ✅ จัดให้อยู่ตรงกลาง
    marginBottom: 20, // ✅ เพิ่มระยะห่างจาก input
    marginTop: 10, // ✅ ขยับขึ้นไปข้างบนมากขึ้น
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 1, // เพิ่ม padding ภายในให้ช่องดูใหญ่ขึ้น
    paddingHorizontal: 10,
    marginBottom: 8, // ✅ เพิ่มระยะห่างระหว่างช่องกรอกข้อมูล
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 10, // ✅ ขยายขนาดข้อความใน input
    color: "#000",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
  rememberText: {
    fontSize: 14,
    color: "#000",
  },
  forgotPassword: {
    fontSize: 14,
    color: "red",
    textDecorationLine: "underline",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "95%",
    marginBottom: 15,
  },
  rememberText: {
    fontSize: 10, // ✅ เพิ่มขนาดตัวอักษร
    color: "#000", // ✅ สีดำ
    marginLeft: 1, // ✅ ให้เว้นระยะจาก Checkbox
  },

  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: "#696969",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  checkboxChecked: {
    // ✅ แยกออกมา
    backgroundColor: "pink",
    borderColor: "pink",
  },

  button: {
    backgroundColor: "#F8C8DC", // สีชมพู
    paddingVertical: 8, // ปรับความสูงของปุ่ม (จาก padding)
    paddingHorizontal: 10, // ปรับความกว้างของปุ่ม (เพิ่ม padding แนวนอน)
    borderRadius: 5, // ปรับให้ขอบมนขึ้น
    width: "30%", // ลดความกว้างของปุ่มลง (จาก 100%)
    alignItems: "center", // จัดข้อความตรงกลาง
    justifyContent: "center", // จัดเนื้อหาในปุ่มให้อยู่กึ่งกลาง
    elevation: 3, // เพิ่มเงา (Android)
    shadowColor: "#000", // เพิ่มเงา (iOS)
    shadowOpacity: 1,
  },
  buttonText: {
    fontSize: 20, // ขยายขนาดตัวอักษร
    fontWeight: "normal", // ตัวหนา
    color: "#333",
  },
});
