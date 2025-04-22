// Components/Flowershop.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlowerShop = () => {
  const navigation = useNavigation();

  const storeData = {
    title: 'มาลัยสมจิต วัดแขก # Flower Love',
    address: '   Surasak/SaintLouis20 Charoen Krung/Silom Soi3, Bang Rak, Thailand, Bangkok',
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('StoreDetail', { store: storeData })}>
      <View style={styles.card}>
        <Image
          source={require('../assets/Shop/flower.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            มาลัยสมจิต วัดแขก <Text style={{ color: 'red' }}># Flower Love</Text>
          </Text>
          <Text style={styles.address}>{storeData.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffeef5',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  address: {
    fontSize: 12,
    color: '#666',
  },
});

export default FlowerShop;