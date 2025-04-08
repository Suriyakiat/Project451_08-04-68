import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PlaceCard from "./PlaceCard";
import { PLACES } from '../data/places';

const lovePlacesData = [
  {
    id: 1,
    name: "ศาลพระสทาศิวะ",
    distance: "15.7 กม.",
    status: "เปิด ตลอดเวลา",
    rating: 2,
    description:
      "พบคู่แท้ องค์เทพที่นำมาสร้างให้สมหวังที่หลายคนบิ๊กถึงอันดับต้นๆ คือพระตรีมูรติ และยิ่งใกล้วันวาเลนไทน์ วันแห่งความรัก 14 กุมภาพันธ์ ลานหน้าเซ็นทรัลเวิลด์จะดูหนาตาเป็นพิเศษและเต็มไปด้วยคนที่มาขอในเรื่องของความรัก",
    images: [
      require("../assets/love/1_1.jpg"),
      require("../assets/love/1_2.jpg"),
      require("../assets/love/1_3.jpg"),
      require("../assets/love/1_4.jpg"),
    ],
  },
  {
    id: 2,
    name: "ศาลท้าวมหาพรหม",
    status: "เปิด 06.00 ปิด 20:00",
    distance: "18.9 กม.",
    rating: 2,
    description:
      "สิ่งศักดิ์สิทธิ์ที่เป็นที่เคารพนับถือและเมื่อมีเสียงจากทั้งชาวไทยและต่างประเทศ โดยมีการจัดคณะทัวร์จากต่างประเทศเพื่อเข้าเสลักการะท้าวมหาพรหมโดยเฉพาะ",
    images: [
      require("../assets/love/2_1.jpg"),
      require("../assets/love/2_2.jpg"),
      require("../assets/love/2_3.jpg"),
      require("../assets/love/2_4.jpg"),
    ],
  },
  {
    id: 3,
    name: "พระแม่ลักษมี",
    status: "เปิด 10.00 ปิด 18:00",
    distance: "15.7 กม.",
    rating: 2,
    description:
      "“พระแม่ลักษมี” เทพตามความเชื่อของศาสนาฮินดู ที่เป็นพระชายาของพระนารายณ์ หรือพระวิษณุขาวนึ่งซึ่งว่าพระแม่ลักษมีเป็นเทพแห่งความร่ำรวยและความอุดมสมบูรณ์ ช่วยเสริมดวงความรักได้ เพราะพระแม่ลักษมีเป็นผู้หญิงรักเดียวใจเดียว",
    images: [
      require("../assets/love/3_1.jpg"),
      require("../assets/love/3_2.jpg"),
      require("../assets/love/3_3.jpg"),
      require("../assets/love/3_4.jpg"),
    ],
  },
  {
    id: 4,
    name: "พระแม่อุมาเทวี วัดแขก",
    status: "เปิด 06.00 ปิด 20:00",
    distance: "18.9 กม.",
    rating: 2,
    description:
      "วัดพระศรีมหาอุมาเทวี วัดแขกในไทยที่ตั้งอยู่ย่านสีลมเป็นโบสถ์พรหมณ์ที่คนไทยบันดาลใจขอสิ่งที่ขอให้สำเร็จและขอพรเสริมดวงให้กับตนเองโดยที่วัดแห่งนี้ขึ้นชื่อมากในเรื่องของการขอพรเรื่องความรัก",
    images: [
      require("../assets/love/4_1.jpg"),
      require("../assets/love/4_2.jpg"),
      require("../assets/love/4_3.jpg"),
      require("../assets/love/4_4.jpg"),
    ],
  },
];

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
