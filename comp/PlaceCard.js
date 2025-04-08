import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const PlaceCard = ({ data }) => {
  const navigation = useNavigation();
  const { name, distance, status, rating, description, images } = data;

  const handleExplore = () => {
    navigation.navigate('PlaceDetail', { placeId: data.id });
  };

  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((img, idx) => (
          <Image key={idx} source={img} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.meta}>
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              type="feather"
              size={18}
              color={i <= rating ? '#FFA500' : '#ccc'}
            />
          ))}
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handleExplore}>
            <Icon name="map-pin" type="feather" size={16} />
            <Text style={styles.buttonText}>สำรวจ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="share" type="feather" size={16} />
            <Text style={styles.buttonText}>แชร์</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 160,
    height: 120,
    marginRight: 8,
    borderRadius: 8,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meta: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  status: {
    color: 'green',
    marginRight: 12,
  },
  distance: {
    color: '#555',
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  description: {
    color: '#333',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonText: {
    marginLeft: 5,
  },
});

export default PlaceCard;
