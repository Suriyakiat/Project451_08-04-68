// Menu.js
import React, { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { ProfileContext } from './ProfileContext';
import { ThemeContext } from './ThemeContext';

const Menu = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  const menuItems = [
    { title: 'Edit Profile', icon: 'list', top: 235, action: () => navigation.navigate('Profile') },
    { title: 'Friend', icon: 'users', top: 310, action: () => {} },
    { title: 'Notification', icon: 'bell', top: 383, action: () => {} },
    { title: 'Trip', icon: 'briefcase', top: 455, action: () => {} },
    { title: 'Setting', icon: 'settings', top: 526, action: () => navigation.navigate('Settings') },
    { title: 'Logout', icon: 'log-out', top: 600, action: () => {} },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#FFFFFF' : '#BDBDBD' }]}>
      {/* ✅ Header bar + Back Button */}
      <SafeAreaView style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Icon name="arrow-left" type="feather" size={28} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.header}>
        <Avatar size={82} rounded source={profile.avatar} containerStyle={styles.avatar} />
      </View>

      <Text style={[styles.welcomeText, { color: isLight ? '#000' : '#333' }]}>
        Welcome {profile.name}
      </Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.menuItem, {
            top: item.top,
            backgroundColor: isLight ? '#FFFFFF' : '#D6D6D6',
            borderBottomColor: isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.6)',
          }]}
          onPress={item.action}
        >
          <Icon name={item.icon} type="feather" size={30} style={styles.menuIcon} color={isLight ? '#000' : '#333'} />
          <Text style={[styles.menuText, { color: isLight ? '#000' : '#333' }]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    height: 77,
    backgroundColor: '#FCDEE6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
  },
  header: {
    position: 'absolute',
    top: 91,
    left: 155,
    width: 82,
    height: 79,
    backgroundColor: '#D9D9D9',
    borderRadius: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    position: 'absolute',
    top: 175,
    left: 91,
    fontSize: 24,
    fontFamily: 'Inria Serif',
  },
  menuItem: {
    position: 'absolute',
    left: 14,
    width: 366,
    height: 60,
    borderRadius: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 20,
  },
  menuText: {
    fontSize: 20,
  },
});

export default Menu;
