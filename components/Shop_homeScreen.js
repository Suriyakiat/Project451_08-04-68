import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FlowerShop from "./Flowershop";  // ใช้ path ใหม่

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#555"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={22} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.titleText}>ร้านค้าใกล้ฉัน</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <FlowerShop navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#fddde6",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    jusStifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  content: {
    padding: 20,
  },
});
