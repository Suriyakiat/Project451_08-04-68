import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Icon } from "@rneui/themed";
import { PLACES } from "../data/Moneyplaces";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Platform } from "react-native";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const FinanceDetail = ({ route, navigation }) => {
  const { placeId } = route.params;
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) {
    return (
      <View style={styles.container}>
        <Text>ไม่พบข้อมูลสถานที่</Text>
      </View>
    );
  }

  const [distance, setDistance] = useState("");

  useEffect(() => {
    const fetchDistance = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      if (place.latitude && place.longitude) {
        const dist = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          place.latitude,
          place.longitude
        );
        setDistance(dist.toFixed(1) + " กม.");
      }
    };

    fetchDistance();
  }, []);

  const scrollRef = useRef(null);
  const sectionRefs = {
    map: useRef(null),
    offerings: useRef(null),
    mantra: useRef(null),
  };

  const scrollToSection = (key) => {
    sectionRefs[key].current?.measureLayout(
      scrollRef.current,
      (x, y) => scrollRef.current.scrollTo({ y, animated: true }),
      () => {}
    );
  };

  const openMap = () => {
    const query = encodeURIComponent(place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>{place.name}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaInfoRow}>
          <View style={styles.statusDistanceRow}>
            <Text style={styles.status}>{place.status}</Text>
            {distance ? <Text style={styles.distance}>{distance}</Text> : null}
          </View>
        </View>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              type="feather"
              size={18}
              color={i <= place.rating ? "#FFA500" : "#ccc"}
            />
          ))}
        </View>
      </View>

      <View style={styles.tagsRow}>
        {[
          { key: "map", label: "เส้นทาง" },
          { key: "share", label: "แชร์" },
          { key: "offerings", label: "ของบูชา" },
          { key: "mantra", label: "คาถา" },
          { key: "shop", label: "ร้านค้า" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagButton}
            onPress={() => {
              if (item.key === "share") {
                navigation.navigate("SharePage"); // แก้ตรงนี้ไปหน้าต่อไป
              } else if (item.key === "shop") {
                navigation.navigate("Shop_Home"); // แก้ตรงนี้ไปหน้าต่อไป
              } else {
                scrollToSection(item.key);
              }
            }}
          >
            <Text style={styles.tagText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.metaRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.customGallery}
        >
          {/* รูปใหญ่ 1 */}
          <Image source={place.images[0]} style={styles.largeImage} />

          {/* รูปเล็ก 2 */}
          <View style={styles.smallImageGroup}>
            <Image source={place.images[1]} style={styles.smallImage} />
            <Image source={place.images[2]} style={styles.smallImage} />
          </View>

          {/* รูปใหญ่ 1 */}
          <Image source={place.images[3]} style={styles.largeImage} />

          {/* รูปเล็ก 2 */}
          <View style={styles.smallImageGroup}>
            <Image source={place.images[4]} style={styles.smallImage} />
            <Image source={place.images[5]} style={styles.smallImage} />
            </View>
        </ScrollView>
      </View>
        <Text style={styles.description}>{place.description}</Text>
        <View style={styles.metaRow}> </View>

      <Text style={styles.description}>
        <Icon name="map-pin" type="feather" size={16} /> <Text>{place.address}</Text>
      </Text>
      {place.latitude && place.longitude && (
        <View ref={sectionRefs.map} style={styles.mapContainer}>
          <TouchableOpacity
            onPress={openMap}
            activeOpacity={0.9}
            style={{ flex: 1 }}
          >
            <MapView
              provider={PROVIDER_DEFAULT}
              style={styles.mapStyle}
              region={{
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              pointerEvents="none"
            >
              <Marker
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
              />
            </MapView>
          </TouchableOpacity>
        </View>
      )}
      {["directions", "buses", "pier"].map((field, idx) => (
        <Text key={idx} style={styles.description}>
          <Icon
            name={
              {
                directions: "map",
                buses: "truck",
                pier: "navigation",
              }[field]
            }
            type="feather"
            size={16}
          />{" "}
          {place[field]}
        </Text>
      ))}
      <View style={styles.metaRow}></View>
      {["open"].map((field, idx) => (
        <Text key={idx} style={styles.description}>
          <Icon
            name={
              {
                open: "clock",
              }[field]
            }
            type="feather"
            size={16}
          />{" "}
          {place[field]}
        </Text>
      ))}
      <View style={styles.metaRow}></View>

      {[, "locationNote"].map((field, idx) => (
        <Text key={idx} style={styles.description}>
          <Icon
            name={
              {
                locationNote: "info",
              }[field]
            }
            type="feather"
            size={16}
          />{" "}
          {place[field]}
        </Text>
      ))}

      <View style={styles.metaRow}></View>
      <Text style={styles.sectionTitle}>ของบูชา</Text>
      {place.offerings.map((item, idx) => (
        <Text key={idx} style={styles.description}>
          • {item}
        </Text>
      ))}
      <View style={styles.metaRow}></View>

      <Text style={styles.sectionTitle}>การไหว้</Text>
      {place.howToPray.map((step, idx) => (
        <Text key={idx} style={styles.description}>
          {idx + 1}. {step}
        </Text>
      ))}
      <View style={styles.metaRow}></View>

      <View ref={sectionRefs.mantra} style={styles.centerSection}>
        <Text style={styles.mantraText}>คาถา</Text>
        <View style={styles.mantraBox}>
          {place.mantras.map((line, idx) => (
            <Text key={idx} style={styles.mantraText}>
              {line}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.metaRow}></View>
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate("Review", { placeId })}
      >
        <Text style={styles.reviewButtonText}>รีวิว</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    backgroundColor: "#FDD9E2",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#333" },
  reviewButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  reviewButtonText: { fontWeight: "bold", color: "#333" },
  metaRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    fontWeight: "bold"
  },
  metaInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusDistanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    color: "#00CC99",
    marginRight: 12,
  },
  distance: { fontSize: 13, color: "#333" },
  ratingRow: { flexDirection: "row", marginBottom: 6 },
  tagsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
    marginBottom: 16,
  },
  tagButton: {
    backgroundColor: "#F7EDF1",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagText: { fontSize: 13, fontWeight: "500", color: "#000" },
  imagesSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  mainImageLarge: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },
  grid4Images: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridImage: {
    width: "48%",
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
    marginBottom: -5,
    marginTop: 24,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#F7EDF1",
    color: "#000",
  },
  mapContainer: {
    marginHorizontal: 16,
    marginTop: 25,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapStyle: {
    flex: 1,
    borderRadius: 12,
  },
  imageScrollContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  scrollImage: {
    width: 200,
    height: 140,
    borderRadius: 16,
    marginRight: 12,
  },
  customGallery: {
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
  },

  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginRight: 12,
  },

  smallImageGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 12,
  },

  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  centerSection: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  mantraBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  mantraText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
    marginBottom: 8,
    marginTop: 20,
  },
});

export default FinanceDetail;


