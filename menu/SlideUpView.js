import React, { useRef, useEffect } from "react";
import { View, Animated, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const SlideUpView = ({ visible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? height * 0.1 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[styles.slideContainer, { transform: [{ translateY: slideAnim }] }]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>ปิด</Text>
      </TouchableOpacity>

      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeText: {
    fontSize: 16,
    color: "red",
  },
  content: {
    flex: 1,
  },
});

export default SlideUpView;
