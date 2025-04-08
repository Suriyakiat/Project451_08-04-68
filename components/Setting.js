import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "./ThemeContext";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "@rneui/themed";

const Settings = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("สว่าง");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#FFFFFF" : "#BDBDBD" },
      ]}
    >
      {/* Header */}
      <SafeAreaView style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            type="feather"
            size={30}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>การตั้งค่า</Text>
      </SafeAreaView>

      {/* Theme Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>ธีมแอพ</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={theme === "light" ? "สว่าง" : "มืด"}
            style={styles.picker}
            onValueChange={(itemValue) => {
              if (
                (itemValue === "สว่าง" && theme !== "light") ||
                (itemValue === "มืด" && theme !== "dark")
              ) {
                toggleTheme();
              }
            }}
          >
            <Picker.Item label="สว่าง" value="สว่าง" />
            <Picker.Item label="มืด" value="มืด" />
          </Picker>
        </View>
      </View>

      {/* Notification Toggle */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>การแจ้งเตือน</Text>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: isEnabled ? "#90EE90" : "#FF6B6B" },
          ]}
          onPress={() => setIsEnabled(!isEnabled)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isEnabled ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Version Information */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version : 0.000000000000001</Text>
        <Text style={styles.helpText}>ความช่วยเหลือ / ติดต่อเรา</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 77,
    backgroundColor: "#FCDEE6",
    paddingHorizontal: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.8)",
    marginTop: 10,
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
  },
  label: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.8)",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    height: 25,
    width: 120,
  },
  toggleButton: {
    width: 70,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  versionContainer: {
    marginTop: 600,
    alignItems: "center",
  },
  versionText: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 5,
  },
  helpText: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.8)",
  },
});

export default Settings;
