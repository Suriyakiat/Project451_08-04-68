import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import MapScreen from "./menu/MapScreen";
import LoginScreen from "./comp/LoginScreen";
import LogoScreen from "./comp/LogoScreen";
import SlideUpView from "./menu/SlideUpView";
import PlacesList from "./menu/PlacesList";
import SignupScreen from "./comp/Signup";
import { ThemeProvider } from "./components/ThemeContext";
import { ProfileProvider } from "./components/ProfileContext";
import Menu from "./components/Menu";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import CProfile from "./components/Cporfile";

import EditField from "./components/EditField";
import SelectProfile from "./components/SelectProfile";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RoomTour from "./comp/RoomTour";
import Createroom from "./menu/Createroom";

import LovePlaces from "./components/LovePlaces";
import Review from "./components/Review";
import PlaceDetail from "./components/PlaceDetail";

import Review_health from "./components/Review_health";
import PlaceDetail_health from "./components/PlaceDetail_health";
import HealthPlaces from "./components/HealthPlaces";

import PlaceDetail_work from "./components/PlaceDetail_work";
import Review_work from "./components/Review_work";
import WorkPlaces from "./components/WorkPlaces";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomHeader = ({ title }) => {
  const navigation = useNavigation(); // ✅ ใช้ได้ใน component เท่านั้น

  const handleExplore = () => {
    navigation.navigate("Menu");
  };

  return (
    <Header
      centerComponent={{ text: title, style: styles.headerText }}
      leftComponent={
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      }
      rightComponent={
        <View style={styles.rightIcons}>
          <Ionicons
            name="notifications"
            size={40}
            color="white"
            style={styles.iconSpacing}
          />
          <TouchableOpacity style={styles.button} onPress={handleExplore}>
            <Ionicons name="menu" size={40} color="white" />
          </TouchableOpacity>
        </View>
      }
      containerStyle={styles.header}
    />
  );
};

// ✅ HomeScreen (มีปุ่มเปิด SlideUpView และปุ่มเข้าสู่ระบบ)
function HomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [places, setPlaces] = useState([]); // ✅ เก็บสถานที่ใกล้ฉัน

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="" />
      <MapScreen onPlacesLoaded={(data) => setPlaces(data)} />{" "}
      {/* ✅ ดึงข้อมูลจาก Google API */}
      {/* ✅ ปุ่มเปิด SlideUpView */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.openButtonText}>▲ เปิด</Text>
      </TouchableOpacity>
      {/* ✅ SlideUpView แสดง PlacesList */}
      <SlideUpView visible={isVisible} onClose={() => setIsVisible(false)}>
        <PlacesList places={places} />
      </SlideUpView>
    </View>
  );
}

// ✅ ProfileScreen
function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="" />
      <View style={styles.center}>
        <Text>Profile Screen</Text>
      </View>
    </View>
  );
}

// ✅ Bottom Tab Navigator
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home")
            return <Ionicons name="home" size={size} color={color} />;
          if (route.name === "Profile")
            return <AntDesign name="pluscircleo" size={size} color={color} />;
          if (route.name === "Map")
            return <AntDesign name="user" size={size} color={color} />;
          if (route.name === "usergroup")
            return <AntDesign name="addusergroup" size={size} color={color} />;
          if (route.name === "user")
            return <AntDesign name="adduser" size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "" }} />
      <Tab.Screen
        name="usergroup"
        component={ProfileScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Createroom"
        component={Createroom}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="user"
        component={ProfileScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Map"
        component={ProfileScreen}
        options={{ title: "" }}
      />
    </Tab.Navigator>
  );
}

// ✅ Main App
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Logo" component={LogoScreen} />

              <Stack.Screen
                name="Login"
                component={(props) => (
                  <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                )}
              />

              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Main" component={MyTabs} />
              <Stack.Screen
                name="CProfile"
                component={CProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Setting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectProfile"
                component={SelectProfile}
                options={{ headerShown: false }}
              />
            <Stack.Screen name="LovePlaces" 
            component={LovePlaces} />
            <Stack.Screen
              name="PlaceDetail"
              component={PlaceDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Review"
              component={Review}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="HealthPlaces" component={HealthPlaces} />
            <Stack.Screen
              name="PlaceDetail_health"
              component={PlaceDetail_health}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Review_health"
              component={Review_health}
              options={{ headerShown: false }}
            />
              <Stack.Screen name="RoomTour" 
              component={RoomTour} />

              <Stack.Screen
                name="EditField"
                component={EditField}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="WorkPlaces" component={WorkPlaces} />
            <Stack.Screen
              name="PlaceDetail_work"
              component={PlaceDetail_work}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Review_work"
              component={Review_work}
              options={{ headerShown: false }}
            />
            </Stack.Navigator>
          </NavigationContainer>
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "pink",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 15,
  },
  openButton: {
    height: 25,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  openButtonText: {
    color: "darkblue",
    fontSize: 12,
  },
  loginButton: {
    position: "absolute",
    bottom: 140,
    alignSelf: "center",
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
});
