import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PlaceCard from "./PlaceCard";
import { PLACES } from '../data/places';


const LovePlaces = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ความรัก</Text>
      {PLACES.map((place) => (
        <PlaceCard key={place.id} data={place} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
});

export default LovePlaces;
