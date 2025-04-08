import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CuteCalendar from "../comp/CuteCalendar";
import { recommendedPlaces, placesByCategory } from "../data/Place";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';

export default function CreateRoomScreen() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [participants, setParticipants] = useState(1);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); //ใช้ปฏิทินที่เราสร้างเอง

  const mainPlaces = placesByCategory[selectedCategory] || recommendedPlaces;

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [status, setStatus] = useState("");

  const navigation = useNavigation();
  const categories = ["ด้านการเงิน", "ด้านการงาน", "ด้านความรัก", "ด้านสุขภาพ"];
  
  const addPlace = (place) => {
    if (!selectedPlaces.find((item) => item.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const removePlace = (id) => {
    setSelectedPlaces(selectedPlaces.filter((place) => place.id !== id));
  };

  const renderPlaceCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => addPlace(item)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#F8C8DC" barStyle="dark-content" />

      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} />
        <Text style={styles.headerText}>สร้างห้อง</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.categoryDropdown}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text>{selectedCategory}</Text>
            <AntDesign
              name={dropdownVisible ? "up" : "down"}
              size={16}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdownOptions}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    setSelectedCategory(category);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          horizontal
          data={mainPlaces}
          renderItem={renderPlaceCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.roomname}>
          <TextInput
            placeholder="สถานะของคุณ"
            value={status}
            onChangeText={setStatus}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>จำนวนผู้เข้าร่วม</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => setParticipants(Math.max(1, participants - 1))}
            >
              <AntDesign name="minus" size={20} />
            </TouchableOpacity>
            <Text>{participants}</Text>
            <TouchableOpacity onPress={() => setParticipants(participants + 1)}>
              <AntDesign name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowCalendar(true)}
        >
          <Text>วันที่เลือก</Text>
          <Text>{date.toLocaleDateString()}</Text>
          <AntDesign name="calendar" size={20} />
        </TouchableOpacity>

        <Modal transparent visible={showCalendar} animationType="fade">
          <View style={styles.modalOverlay}>
            <CuteCalendar
              onSelectDate={(selectedDate) => {
                setDate(selectedDate);
              }}
              onClose={() => setShowCalendar(false)}
            />
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>เวลานัดพบ</Text>
          <Text>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Ionicons name="time-outline" size={20} />
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              setTime(selectedTime || time);
            }}
          />
        )}

        <FlatList
          data={selectedPlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.selectedCard}>
              <Image source={item.image} style={styles.selectedImage} />
              <Text style={styles.selectedTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => removePlace(item.id)}>
                <AntDesign name="closecircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      </View>
      <TouchableOpacity style={styles.buttonlive} 
      onPress={() => navigation.replace("Main")}>
        <Text style={styles.buttonText}>สร้างห้อง</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8C8DC",
    height: 90,
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
  },

  listContainer: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: "white",
    marginRight: 15,
    borderRadius: 15,
    width: 200,
    height: 200,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 15,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectedCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  selectedImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  selectedTitle: {
    flex: 1,
    marginLeft: 10,
  },
  dropdownContainer: {
    marginBottom: 0.5,
    zIndex: 20,
  },
  categoryDropdown: {
    flexDirection: "row",
    justifyContent: "space-between", // ✅ แยก Text กับ icon ไปซ้าย-ขวา
    alignItems: "center", // ✅ ให้ชิดแนวดิ่ง
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#C0BEBE",
    width: 170,
  },

  dropdownIcon: {
    marginLeft: 8,
  },

  dropdownOptions: {
    backgroundColor: "#C0BEBE",
    padding: 10,
    borderRadius: 10,
    width: 170,
    position: "absolute", // ✅ ทำให้ลอยอยู่
    top: 50, // ✅ ปรับความสูงให้เหมาะกับปุ่ม
    zIndex: 100, // ✅ ลอยเหนือ FlatList
  },
  dropdownText: {
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    backgroundColor: "#ffc0c8",
    padding: 10,
    borderRadius: 10,
    width: 120,
  },
  buttonlive: {
    alignItems: "center",
  },
  textInput: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: 15,
  },
  
});
