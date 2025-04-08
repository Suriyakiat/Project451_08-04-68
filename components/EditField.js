import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { ProfileContext } from "./ProfileContext";
import { Icon } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const EditField = ({ route, navigation }) => {
  const { field, label, value } = route.params;
  const { updateProfile } = useContext(ProfileContext);

  const initialDate = value ? new Date(value) : new Date();
  const [inputValue, setInputValue] = useState(value || "");
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isEmailValid = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (!inputValue || inputValue.trim() === "") {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (field === "email" && !isEmailValid(inputValue)) {
      Alert.alert("อีเมลไม่ถูกต้อง", "กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }

    updateProfile({ [field]: inputValue });
    navigation.goBack();
  };

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setInputValue(currentDate.toISOString().split("T")[0]);
  };

  const renderInput = () => {
    if (field === "dob") {
      return (
        <>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{inputValue || "เลือกวันเกิด"}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </>
      );
    } else if (field === "gender") {
      return (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={inputValue}
            onValueChange={(itemValue) => setInputValue(itemValue)}
          >
            <Picker.Item label="เลือกเพศ" value="" />
            <Picker.Item label="ชาย (He)" value="He" />
            <Picker.Item label="หญิง (She)" value="She" />
            <Picker.Item label="ไม่ระบุ (They)" value="They" />
          </Picker>
        </View>
      );
    } else {
      return (
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={`Enter ${label}`}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="feather" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{label}</Text>
      </View>

      <View style={styles.content}>{renderInput()}</View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>เสร็จสิ้น</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FCDEE6",
    height: 77,
  },
  headerText: { fontSize: 24, fontWeight: "bold", marginLeft: 10 },
  content: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: "#F3BAC0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 80,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});

export default EditField;
