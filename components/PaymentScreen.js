import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // นำเข้า useNavigation

const PaymentScreen = () => {
  const navigation = useNavigation();  // ใช้ useNavigation()

  const handlePaymentComplete = () => {
    // ฟังก์ชันสำหรับเมื่อกดปุ่ม "ชำระแล้ว"
    alert('ชำระเงินแล้ว!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Home')} // เปลี่ยนเป็น navigate ไปที่ Flowershop
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>ชำระเงินโดย QR CODE</Text>
      </View>

      <View style={styles.qrContainer}>
        <Image
          source={require('../assets/Shop/QR code.png')} // ใช้ require เพื่อเรียกไฟล์ใน assets
          style={styles.qrImage}
        />
        <Text style={styles.accountDetails}>บัญชี: มาลัยสมจิต วัดแขก #Flower Love</Text>
        <Text style={styles.accountDetails}>เลขที่บัญชี: DONKB0000019376878000</Text>
      </View>

      {/* ปรับให้ปุ่ม "ชำระแล้ว" อยู่ตรงกลาง */}
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentComplete}>
          <Text style={styles.paymentButtonText}>ชำระแล้ว</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fddde6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  qrImage: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  accountDetails: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  paymentButtonContainer: {
    alignItems: 'center', // จัดปุ่มให้อยู่ตรงกลาง
    marginBottom: 20,  // ระยะห่างจากด้านล่าง
  },
  paymentButton: {
    backgroundColor: '#FFB6C1',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
