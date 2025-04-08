import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
    return (
        <ImageBackground 
            source={require('../assets/background2.png')} // พื้นหลัง
            style={styles.background}
            resizeMode="cover"
        >
            {/* ✅ เพิ่มโลโก้ที่มุมซ้ายบน */}
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/logo.png')} // เปลี่ยนเป็น path โลโก้ของคุณ
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        position: 'absolute',
        top: 20,  // ปรับตำแหน่งให้อยู่ด้านบน
        left: 2, // ปรับให้ชิดซ้าย
    },
    logo: {
        width: 60, // ปรับขนาดโลโก้
        height: 60, // ปรับขนาดโลโก้
    },
});

export default Background;
