import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import PlaceCard from "./PlaceCard_health";
import { PLACES } from '../data/places_health';



const WorkPlaces = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>สุขภาพ</Text>
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

export default WorkPlaces;
