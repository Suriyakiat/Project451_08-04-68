/// --- สไตล์ UI ปรับตามภาพตัวอย่าง พร้อมเส้นคั่นและการจัดเรียง ---

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { PLACES } from '../data/places';

const PlaceDetail = ({ route, navigation }) => {
  const { placeId } = route.params;
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) {
    return <View style={styles.container}><Text>ไม่พบข้อมูลสถานที่</Text></View>;
  }

  const openMap = () => {
    const query = encodeURIComponent(place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>{place.name}</Text>
        <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('Review', { placeId })}>
          <Text style={styles.reviewButtonText}>รีวิว</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.status}>{place.status}</Text>
        <Text style={styles.distance}>{place.distance}</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              type="feather"
              size={18}
              color={i <= place.rating ? '#FFA500' : '#ccc'}
            />
          ))}
        </View>
      </View>

      <View style={styles.tagsRow}>
        {['เส้นทาง', 'แชร์', 'ของบูชา', 'คาถา', 'ร้านค้า'].map((tag, idx) => (
          <TouchableOpacity key={idx} style={styles.tagButton}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.imagesSection}>
        <Image source={place.images[0]} style={styles.mainImageLarge} />
        <View style={styles.grid4Images}>
          {place.images.slice(1, 5).map((img, index) => (
            <Image key={index} source={img} style={styles.gridImage} />
          ))}
        </View>
      </View>

      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.description}>{place.address}</Text>

      <TouchableOpacity onPress={openMap} style={{ marginHorizontal: 16, marginTop: 8 }}>
        <Image
          source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(place.name)}&zoom=16&size=600x300&markers=color:red%7C${encodeURIComponent(place.name)}&key=YOUR_API_KEY` }}
          style={{ height: 200, borderRadius: 8 }}
        />
      </TouchableOpacity>

      <Text style={styles.description}>สถานีรถไฟ: {place.directions}</Text>
      <Text style={styles.description}>รถประจำทาง: {place.buses}</Text>
      <Text style={styles.description}>ท่าเรือ: {place.pier}</Text>
      <Text style={styles.description}>{place.open}</Text>
      <Text style={styles.description}>{place.locationNote}</Text>

      <Text style={styles.subTitle}>ของบูชา</Text>
      {place.offerings.map((item, idx) => (
        <Text key={idx} style={styles.description}>- {item}</Text>
      ))}

      <Text style={styles.subTitle}>วิธีไหว้พระแม่ลักษมี</Text>
      {place.howToPray.map((step, idx) => (
        <Text key={idx} style={styles.description}>{step}</Text>
      ))}

      <Text style={styles.subTitle}>คาถา</Text>
      {place.mantras.map((line, idx) => (
        <Text key={idx} style={styles.description}>{line}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    backgroundColor: '#FDD9E2',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerText: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  reviewButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  reviewButtonText: { fontWeight: 'bold', color: '#333' },
  metaRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  status: { color: '#000', fontSize: 14, fontWeight: '500' },
  distance: { color: '#888', fontSize: 14 },
  ratingRow: { flexDirection: 'row', marginLeft: 12 },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  tagButton: {
    backgroundColor: '#F7EDF1',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagText: { fontSize: 14, fontWeight: '500' },
  imagesSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  mainImageLarge: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  grid4Images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: '#111',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 6,
  },
});

export default PlaceDetail;