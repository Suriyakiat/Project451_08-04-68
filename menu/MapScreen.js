import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, Text, ActivityIndicator, TouchableOpacity, Button, FlatList, Modal } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY"; // 🔴 ใส่ API Key ของคุณ

const predefinedMarkers = [  // ✅ กำหนด Marker ล่วงหน้า
  { name: "วัดพระศรีมหาธาตุวรมหาวิหาร", latitude: 13.874455086926147, longitude: 100.59335256494384 },
  { name: "พิพิธภัณฑ์ศิลปะไทยร่วมสมัย", latitude: 13.852476038482623, longitude: 100.56311648399779 },
  { name: "พิพิธภัณฑ์วัฒนธรรมการเกษตร", latitude: 13.847463641857304, longitude: 100.5634423821432 },
];

const MapScreen = ({ onPlacesLoaded }) => {
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState(predefinedMarkers);
  const [selectedMarker, setSelectedMarker] = useState(null); // ✅ สำหรับเก็บข้อมูล Marker ที่เลือก
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "ต้องอนุญาตให้เข้าถึงตำแหน่ง");
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setLoading(false);
  };

  const handleCurrentLocationPress = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const handleMarkerSelect = (marker) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
    setSelectedMarker(marker);  // ✅ บันทึก Marker ที่ถูกเลือก
  };

  const handleNavigateToLocation = () => {
    if (selectedMarker) {
      navigation.navigate('LocationScreen', { marker: selectedMarker });
      setSelectedMarker(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={region}
          >
            {userLocation && (
              <Circle
                center={userLocation}
                radius={20}
                strokeColor="blue"
                fillColor="rgba(0, 0, 255, 0.3)"
              />
            )}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                onPress={() => handleMarkerSelect(marker)}
              />
            ))}
          </MapView>

          <TouchableOpacity style={styles.locationButton} onPress={handleCurrentLocationPress}>
            <Ionicons name="locate" size={30} color="white" />
          </TouchableOpacity>

          {selectedMarker && (
            <Modal transparent={true} visible={true} animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.customModalView}>
                  <Text style={styles.markerTitle}>คุณต้องการไปที่ {selectedMarker.name} หรือไม่?</Text>
                  <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToLocation}>
                    <Text style={styles.buttonText}>ไปยังสถานที่นี้</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedMarker(null)}>
                    <Text style={styles.buttonText}>ยกเลิก</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  locationButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 25,
    zIndex: 2,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  customModalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  markerTitle: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: "center",
  },
  navigateButton: {
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
