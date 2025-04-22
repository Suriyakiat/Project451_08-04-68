import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { PRODUCTS } from '../data/Products';  // นำเข้าข้อมูลสินค้า

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId, quantity: initialQuantity } = route.params || {};  // ตรวจสอบว่ามีพารามิเตอร์ที่ส่งมาหรือไม่

  const [quantity, setQuantity] = useState(initialQuantity || 1);  // เพิ่ม quantity และ setQuantity

  if (!productId) {
    return <Text style={styles.errorText}>ไม่พบข้อมูลสินค้า</Text>;
  }

  const product = PRODUCTS.find(item => item.id === productId); // ค้นหาสินค้าโดยใช้ productId
  const totalPrice = product.price * quantity;

  const increaseQuantity = () => setQuantity(quantity + 1);  // เพิ่มจำนวน
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);  // ลดจำนวน แต่ต้องไม่ให้ลดลงต่ำกว่า 1
  };

  const handleOrder = () => {
    navigation.navigate('PaymentScreen'); // ไปที่หน้า PaymentScreen.js
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ข้อความชื่อร้าน */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.storeName}>มาลัยสมจิต วัดแขก #Flower Love</Text>
      </View>

      {/* ข้อมูลสินค้า */}
      <View style={styles.productInfo}>
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>ราคา {product.price} บาท</Text>

          {/* จำนวนสินค้า */}
          <View style={styles.quantityControl}>
            <Text style={styles.quantityLabel}>จำนวน</Text>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.productTotal}>ราคาสุทธิ {totalPrice} บาท</Text>
        </View>
      </View>

      {/* ปุ่มสั่งซื้อ */}
      <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>ชำระเงิน</Text>
      </TouchableOpacity>

      {/* รายละเอียดสินค้า */}
      <View style={styles.productDetailsSection}>
        <Text style={styles.sectionTitle}>รายละเอียดสินค้า</Text>
        <Text style={styles.detailsText}>1. ดอกไม้สีชมพู (ดอกบัวหรือดอกไม้มงคล)</Text>
        <Text style={styles.detailsText}>2. พวงมาลัยดอกไม้ (พวงมาลัยเป็นสัญลักษณ์ของความเคารพและความเป็นสิริมงคล)</Text>
        <Text style={styles.detailsText}>3. ผลไม้มงคล (แอปเปิลสีแดง: สื่อถึงความโชคดี สุขภาพแข็งแรง และความสงบสุข)</Text>
        <Text style={styles.detailsText}>4. ขนมมงคล (ขนมที่มีสัญลักษณ์มงคล: มีการประทับตราหรือออกแบบให้เป็นลวดลายที่เกี่ยวข้องกับความโชคดีและความเป็นมงคล)</Text>
        <Text style={styles.detailsText}>5. เครื่องดื่ม</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fddde6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    marginRight: 10, // ปรับตำแหน่งของปุ่มให้ขยับลง
  },
  headerTextContainer: {
    //flex: 1,
    alignItems: 'center',
    marginTop: 5, // ลดระยะห่างระหว่างชื่อร้านกับกรอบด้านบน
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40, // ลดระยะห่างระหว่างชื่อร้านและรูปภาพ
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 30,
    marginHorizontal: 20,
    marginTop: -20, // ลดระยะห่างระหว่างส่วนของภาพกับรายละเอียด
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#d3615c',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  qtyBtn: {
    backgroundColor: '#fddde6',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  qtyText: {
    color: '#000',
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  productTotal: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#fddde6',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 200,
    width: 120,
  },
  orderButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  productDetailsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetailScreen;
