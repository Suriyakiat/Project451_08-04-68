import React from "react";
import { View, ImageBackground, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function LogoScreen({ navigation }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Login")}>
      <ImageBackground source={require("../assets/background.png")} style={styles.background}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});
