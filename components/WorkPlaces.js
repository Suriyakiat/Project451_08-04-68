import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import PlaceCard from "./PlaceCard_work";
import { PLACES } from '../data/places_work';



const WorkPlaces = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>การงาน</Text>
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
