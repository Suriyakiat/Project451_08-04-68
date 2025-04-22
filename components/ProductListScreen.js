import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PRODUCTS } from "../data/Products";
import { useNavigation } from "@react-navigation/native"; // ใช้ useNavigation

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation(); // ใช้ navigation เพื่อทำการนำทาง

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleOrder = () => {
    // เมื่อกดสั่งซื้อจะนำทางไปยังหน้ารายละเอียดสินค้า
    navigation.navigate("ProductDetail", {
      productId: product.id, // ส่ง productId ไปยังหน้ารายละเอียด
      quantity: quantity, // ส่งจำนวนสินค้า
    });
  };

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>ราคา {product.price} บาท</Text>

        <View style={styles.row}>
          <Text style={styles.quantityLabel}>จำนวน</Text>
          <TouchableOpacity onPress={decrease} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increase} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
          <Text style={styles.orderText}>สั่งซื้อสินค้า</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProductListScreen = () => {
  const navigation = useNavigation(); // ใช้ useNavigation

  // ฟังก์ชันให้กดขีดสีเทาแล้วกลับไปหน้าก่อนหน้า
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.handleBarContainer}>
        {/* ทำให้ปุ่มขีดสีเทาย้อนกลับทำงาน */}
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.handleBarContainer}
        >
          <View style={styles.handleBar} />
        </TouchableOpacity>
      </View>
      {PRODUCTS.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      <View style={{ height: 40 }} /> {/* เพิ่มช่องว่างล่าง */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  handleBarContainer: {
    backgroundColor: "#fddde6",
    alignItems: "center", // ทำให้ขีดสีเทาอยู่ตรงกลาง
    paddingTop: 30, // เพิ่มระยะห่างจากด้านบน
    paddingBottom: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  handleBar: {
    width: 40, // ขยายขีดให้กว้างขึ้นเล็กน้อย
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffeef5",
    borderRadius: 20,
    padding: 15,
    margin: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },
  detail: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  price: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityLabel: {
    fontSize: 14,
    marginRight: 5,
  },
  qtyBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  qtyText: {
    fontSize: 16,
    color: "#000",
  },
  quantity: {
    fontSize: 14,
    minWidth: 20,
    textAlign: "center",
  },
  orderBtn: {
    backgroundColor: "#fddde6",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  orderText: {
    color: "#00",
    fontWeight: "bold",
  },
});

export default ProductListScreen;
