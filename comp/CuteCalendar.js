import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateMatrix = (year, month) => {
  let matrix = [];
  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let row = [];
  for (let i = 0; i < firstDay; i++) {
    row.push("");
  }

  for (let day = 1; day <= daysInMonth; day++) {
    row.push(day);
    if (row.length === 7) {
      matrix.push(row);
      row = [];
    }
  }

  if (row.length > 0) {
    while (row.length < 7) {
      row.push("");
    }
    matrix.push(row);
  }

  return matrix;
};

export default function MyCalendar({ onSelectDate, onClose }) {
  const [activeDate, setActiveDate] = useState(new Date());
  const [matrix, setMatrix] = useState([]);
  // เพิ่ม state วันที่เลือกไว้ใน MyCalendar
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setMatrix(generateMatrix(activeDate.getFullYear(), activeDate.getMonth()));
  }, [activeDate]);

  const changeMonth = (n) => {
    setActiveDate(
      new Date(activeDate.getFullYear(), activeDate.getMonth() + n, 1)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <AntDesign name="leftcircleo" size={25} color="#F8C8DC" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {months[activeDate.getMonth()]} {activeDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <AntDesign name="rightcircleo" size={25} color="#F8C8DC" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {matrix.map((row, i) => (
        <View style={styles.daysRow} key={i}>
          {row.map((day, j) => {
            const isSelected =
              selectedDate &&
              day === selectedDate.getDate() &&
              activeDate.getMonth() === selectedDate.getMonth() &&
              activeDate.getFullYear() === selectedDate.getFullYear();

            return (
              <TouchableOpacity
                key={j}
                style={[
                  styles.dayButton,
                  isSelected && {
                    backgroundColor: "#F8C8DC",
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {
                  if (day) {
                    const date = new Date(
                      activeDate.getFullYear(),
                      activeDate.getMonth(),
                      day
                    );
                    setSelectedDate(date);
                    onSelectDate(date);
                  }
                }}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected && { color: "#fff", fontWeight: "bold" },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      <TouchableOpacity style={styles.doneButton} onPress={onClose}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    fontWeight: "bold",
    color: "#aaa",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  dayButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  doneButton: {
    backgroundColor: "#F8C8DC",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  doneText: {
    color: "#333",
    fontWeight: "bold",
  },
});
