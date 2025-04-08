import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ProfileContext } from "./ProfileContext";
import { ThemeContext } from "./ThemeContext";
import { Icon, Avatar } from "@rneui/themed";

// แก้ไขจากเดิมเล็กน้อยให้รองรับธีมทั้งแอป
const CProfile = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const { theme } = useContext(ThemeContext);

  const isLight = theme === "light";
  const backgroundColor = isLight ? "#FFFFFF" : "#1E1E1E";
  const textColor = isLight ? "#000000" : "#FFFFFF";
  const borderColor = isLight ? "#ccc" : "#666";
  const buttonColor = isLight ? "#F3BAC0" : "#FF8DAA";
  const uploadTextColor = isLight ? "green" : "#90EE90";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View
        style={[
          styles.headerBar,
          { backgroundColor: isLight ? "#FCDEE6" : "#333333" },
        ]}
      >
      </View>

      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => navigation.navigate("SelectProfile")}
      >
        <Avatar
          size={82}
          rounded
          source={
            typeof profile.avatar === "string"
              ? { uri: profile.avatar }
              : profile.avatar
          }
          containerStyle={styles.avatar}
        />

        <Text style={[styles.uploadText, { color: uploadTextColor }]}>
          อัปโหลดรูปภาพ
        </Text>
      </TouchableOpacity>

      {[
        { key: "name", label: "Name", value: profile.name },
        { key: "email", label: "Email", value: profile.email },
        { key: "dob", label: "Date of Birth", value: profile.dob || "-" },
        { key: "address", label: "Address", value: profile.address || "-" },
        { key: "gender", label: "Gender", value: profile.gender || "-" },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.infoRow, { borderBottomColor: borderColor }]}
          onPress={() =>
            navigation.navigate("EditField", {
              field: item.key,
              label: item.label,
              value: item.value,
            })
          }
        >
          <Text style={[styles.label, { color: textColor }]}>{item.label}</Text>
          <Text style={[styles.value, { color: textColor }]}>{item.value}</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={18}
            color={textColor}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: buttonColor }]}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.saveButtonText}>บันทึก</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 77,
  },
  headerText: { fontSize: 24, fontWeight: "bold", marginLeft: 10 },
  profileImageContainer: { alignItems: "center", marginTop: 30 },
  uploadText: { color: "green", marginTop: 10 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  label: { fontSize: 16 },
  value: { flex: 1, textAlign: "right", marginHorizontal: 10 },
  saveButton: {
    backgroundColor: "#F3BAC0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 80,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});

export default CProfile;
