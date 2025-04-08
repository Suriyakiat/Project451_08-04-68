import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Menu, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const width = 393;
const height = 852;

const SettingsScreen = () => {
  const [theme, setTheme] = useState('light');
  const [isOn, setIsOn] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
      <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
        {/* Header */}
        <Appbar.Header style={[styles.header, theme === 'dark' && styles.darkHeader, styles.fullWidthHeader]}>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="การตั้งค่า" titleStyle={[styles.title, theme === 'dark' && styles.darkText]} />
          <Appbar.Action icon="bell-outline" onPress={() => {}} />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={<Appbar.Action icon="dots-vertical" onPress={() => setVisible(true)} />}>
            <Menu.Item onPress={() => {}} title="Option 1" />
            <Menu.Item onPress={() => {}} title="Option 2" />
          </Menu>
        </Appbar.Header>

        {/* Theme Selector */}
        <View style={styles.section}>
          <Text style={[styles.label, theme === 'dark' && styles.darkText]}>ธีมแอพ</Text>
          <Picker
            selectedValue={theme}
            onValueChange={(itemValue) => setTheme(itemValue)}
            style={[styles.picker, theme === 'dark' && styles.darkPicker]}>
            <Picker.Item label="สว่าง" value="light" />
            <Picker.Item label="มืด" value="dark" />
          </Picker>
        </View>

        {/* Custom Toggle Switch */}
        <View style={styles.section}>
          <Text style={[styles.label, theme === 'dark' && styles.darkText]}>การแจ้งเตือน</Text>
          <TouchableOpacity
            style={[styles.toggleSwitch, isOn ? styles.toggleSwitchOn : styles.toggleSwitchOff]}
            onPress={() => setIsOn(!isOn)}>
            <View style={[styles.toggleCircle, isOn ? styles.toggleCircleOn : styles.toggleCircleOff]} />
          </TouchableOpacity>
        </View>

        {/* Version and Help Links */}
        <Text style={[styles.version, theme === 'dark' && styles.darkText]}>Version : 0.0000000000001</Text>
        <Text style={[styles.link, theme === 'dark' && styles.darkLink]}>ความช่วยเหลือ / ติดต่อเรา</Text>

        {/* Bottom Navigation */}
        <View style={[styles.bottomNav, theme === 'dark' && styles.darkBottomNav]}>
          <Text style={[styles.bottomNavItem, theme === 'dark' && styles.darkText]}>🏠</Text>
          <Text style={[styles.bottomNavItem, theme === 'dark' && styles.darkText]}>🔍</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.bottomNavItem, theme === 'dark' && styles.darkText]}>👤</Text>
          <Text style={[styles.bottomNavItem, theme === 'dark' && styles.darkText]}>☰</Text>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: width * 0.04,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: width * 0.04,
  },
  header: {
    backgroundColor: '#FADADD',
    width: '100%',
    paddingTop: height * 0.04,
    paddingBottom: height * 0.015,
  },
  darkHeader: {
    backgroundColor: '#FADADD',
  },
  fullWidthHeader: {
    width: '100%',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  label: {
    fontSize: width * 0.045,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  picker: {
    width: width * 0.35,
    color: 'black',
  },
  darkPicker: {
    color: 'white',
    backgroundColor: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FADADD',
    paddingVertical: height * 0.025,
  },
  darkBottomNav: {
    backgroundColor: '#FADADD',
  },
  bottomNavItem: {
    fontSize: width * 0.07,
    color: 'black',
  },
  addButton: {
    width: width * 0.14,
    height: width * 0.14,
    backgroundColor: 'white',
    borderRadius: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: height * 0.01,
  },
  addButtonText: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: 'black',
  },
  version: {
    marginTop: height * 0.03,
    textAlign: 'center',
    fontSize: width * 0.035,
    color: 'black',
  },
  link: {
    textAlign: 'center',
    fontSize: width * 0.035,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  darkLink: {
    color: 'lightblue',
  },
});

export default SettingsScreen;
