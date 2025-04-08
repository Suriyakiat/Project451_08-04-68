import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "@rneui/themed";
import { ProfileContext } from "./ProfileContext";
import { Ionicons } from "@expo/vector-icons";

const defaultAvatars = [
  require("../assets/mod.png"),
  require("../assets/หมา.jpg"),
  require("../assets/mod.png"),
  require("../assets/mod.png"),
  require("../assets/mod.png"),
  require("../assets/mod.png"),
];

const SelectProfile = ({ navigation }) => {
  const { updateProfile } = useContext(ProfileContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage({ uri: imageUri });
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      const imageObj =
        typeof selectedImage === "object" && selectedImage.uri
          ? selectedImage
          : { uri: selectedImage };
      updateProfile({ avatar: imageObj });
      navigation.goBack();
    } else {
      Alert.alert("กรุณาเลือกรูปโปรไฟล์");
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ✅ แสดงรูปที่เลือก */}
      <Avatar
        rounded
        size={150}
        containerStyle={styles.avatar}
        source={
          selectedImage
            ? typeof selectedImage === "string"
              ? { uri: selectedImage }
              : selectedImage
            : require("../assets/icon.png")
        }
      />

      {/* ✅ Avatar Picker Grid */}
      <View style={styles.avatarGrid}>
        {defaultAvatars.map((img, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() =>
              setSelectedImage({ uri: Image.resolveAssetSource(img).uri })
            }
          >
            <Image source={img} style={styles.avatarOption} />
          </TouchableOpacity>
        ))}

        {/* ✅ ปุ่มเลือกรูปจากเครื่อง */}
        <TouchableOpacity style={styles.option} onPress={openImagePicker}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.avatarOption}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avatar: {
    marginVertical: 20,
    backgroundColor: "#eee",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  option: {
    backgroundColor: "#eee",
    borderRadius: 50,
    margin: 8,
    padding: 10,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  confirmButton: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#fdd8e4",
    borderRadius: 12,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SelectProfile;
