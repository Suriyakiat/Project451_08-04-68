import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ ใช้สำหรับนำทาง

const StoreDetailScreen = () => {
  const navigation = useNavigation(); // ✅ Hook สำหรับนำทาง

  return (
    <ScrollView style={styles.container}>
      {/* พื้นหลังชมพู + ขีดย้อนกลับ */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.headerTopBar} />
        </TouchableOpacity>
      </View>

      {/* กล่องข้อมูลร้าน */}
      <View style={styles.headerContent}>
        <Text style={styles.title}>
          มาลัยสมจิต วัดแขก{" "}
          <Text style={{ color: "#b85c94" }}># Flower Love</Text>
        </Text>
        <Text style={styles.subtext}>
          <Text style={{ color: "green" }}>เปิด</Text> 07:00{" "}
          <Text style={{ color: "red" }}>ปิด</Text> 20:00 · 15.7 กม.
        </Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <FontAwesome
              key={i}
              name="star"
              size={18}
              color={i <= 3 ? "#f4b400" : "#ccc"}
            />
          ))}
        </View>
      </View>

      {/* ภาพร้าน */}
      <View style={styles.imageRow}>
        <Image
          source={require("../assets/Shop/store1.jpeg")}
          style={styles.mainImage}
        />
        <View style={styles.sideImageContainer}>
          <Image
            source={require("../assets/Shop/store2.jpg")}
            style={styles.sideImage}
          />
          <Image
            source={require("../assets/Shop/store3.jpg")}
            style={styles.sideImage}
          />
        </View>
      </View>

      {/* ปุ่มต่าง ๆ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="navigation" size={16} color="#000" />
          <Text style={styles.buttonText}>เส้นทาง</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="share-2" size={16} color="#000" />
          <Text style={styles.buttonText}>แชร์</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("ProductList")}
        >
          <FontAwesome5 name="store" size={16} color="#000" />
          <Text style={styles.buttonText}>สินค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="star" size={16} color="#000" />
          <Text style={styles.buttonText}>รีวิว</Text>
        </TouchableOpacity>
      </View>

      {/* ข้อมูลร้าน */}
      <View style={styles.infoSection}>
        <Entypo name="location-pin" size={22} color="#333" />
        <Text style={styles.infoText}>
          วัดพระศรีมหาอุมาเทวี (วัดแขก) ร้านมาลัยสมจิต วัดแขก, Bang Rak,
          Thailand, Bangkok
        </Text>
      </View>
      <View style={styles.infoSection}>
        <FontAwesome5 name="globe" size={18} color="#333" />
        <Text style={[styles.infoText, { color: "#333" }]}>
          มาลัยสมจิต วัดแขก # Flower Love
        </Text>
      </View>
      <View style={styles.infoSection}>
        <Ionicons name="call" size={20} color="#333" />
        <Text style={styles.infoText}>097 068 1414</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },

  // พื้นหลังชมพูด้านบน
  headerWrapper: {
    backgroundColor: "#fddde6",
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
  },
  headerTopBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },

  // กล่องข้อมูล
  headerContent: {
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtext: {
    color: "#444",
    marginTop: 10,
  },
  starRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  // รูปภาพ
  imageRow: {
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  mainImage: {
    width: 200,
    height: 250,
    borderRadius: 15,
    marginRight: 20,
  },
  sideImageContainer: {
    justifyContent: "space-between",
    height: 25,
  },
  sideImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  // ปุ่ม
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: "#fddde6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 80,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
    color: "#000",
    textAlign: "center",
  },

  // ข้อมูลติดต่อ
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: "#333",
  },
});

export default StoreDetailScreen;
