import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const RoomTour = () => {
  const route = useRoute();
  const { tripMembers } = route.params || {}; // ✅ ตรวจว่ามีข้อมูลมั้ย

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: '#FEE0E6',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tripName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  tripStatus: {
    fontSize: 12,
    color: '#333',
  },
});

export default RoomTour;
