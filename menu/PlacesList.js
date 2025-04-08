import React, { useState, useContext } from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProfileContext } from '../components/ProfileContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // ✅ อย่าลืมนำเข้า


const YourComponent = () => {
  const navigation = useNavigation(); // ✅ ใช้งาน navigation

  return (
    <TouchableOpacity onPress={() => navigation.navigate("RoomTour")}>
      <FlatList
        data={tripMembers}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tripCard}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.tripName}>{item.name}</Text>
            <Text style={styles.tripStatus}>{item.status}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </TouchableOpacity>
  );
};


// ✅ สถานที่หลัก (ที่เพิ่มเอง)
const mainPlaces = [
  {
    id: "1",
    title: "ศาลเจ้าพ่อเสือ",
    description: "บูชาเรื่องการงาน",
    distance: "17 กม.",
    images: [require("../assets/ศาลเจ้าพ่อเสือ.jpg")],
  },
  {
    id: "2",
    title: "พระแม่ลักษมี",
    description: "บูชาเรื่องความรัก",
    distance: "2.4 กม.",
    images: [require("../assets/พระแม่ลักษมี.jpg")],
  },
  {
    id: "3",
    title: "วัดแขก",
    description: "วัดฮินดูศักดิ์สิทธิ์",
    distance: "8 กม.",
    images: [require("../assets/วัดแขก.jpg")],
  },
];

// ✅ สร้าง Card สำหรับสถานที่หลัก
const PlaceCard = ({ place }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={place.images[0]} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.description}>{place.description}</Text>
        <Text style={styles.distance}>{place.distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ✅ ตัวหลักของแอป (รับ `places` จาก Google API)
const PlacesList = ({ places }) => {
  const navigation = useNavigation(); // ✅ ใช้งาน navigation

  const { profile } = useContext(ProfileContext);
  const route = useRoute();
  const status = route.params?.status || "-";

  const tripMembers = [
    {
      id: "1",
      name: profile.name || "ไม่ระบุชื่อ",
      status: status,
      avatar: profile.avatar,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={mainPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>🢑 Trip</Text>
      <TouchableOpacity onPress={() => navigation.navigate("RoomTour")}>
      <FlatList
        data={tripMembers}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tripCard}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.tripName}>{item.name}</Text>
            <Text style={styles.tripStatus}>{item.status}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </TouchableOpacity>

      <Text style={styles.sectionTitle}>🏠 สถานที่ใกล้ฉัน</Text>
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.nearbyCard}>
            <Text style={styles.nearbyTitle}>{item.name}</Text>
            <Text style={styles.nearbyAddress}>{item.vicinity}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: "white",
    marginRight: 15,
    borderRadius: 15,
    width: 200,
    height: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
  divider: {
    height: 2,
    width: 500,
    backgroundColor: "#ccc",
    marginTop: -150,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  nearbyCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nearbyAddress: {
    fontSize: 14,
    color: "gray",
  },
  tripCard: {
    backgroundColor: "#F8C8DC",
    borderTopLeftRadius: 60,       // โค้งบนซ้าย
    borderTopRightRadius: 60,      // โค้งบนขวา
    borderBottomLeftRadius: 10,    // โค้งล่างซ้าย
    borderBottomRightRadius: 10,   // โค้งล่างขวา
    padding: 15,
    margin: 5,
    alignItems: "center",
    width: 90,
    height: 130,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginBottom: 5,
  },
  tripName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tripStatus: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default PlacesList;