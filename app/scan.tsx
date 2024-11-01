import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { useRouter } from 'expo-router';
import { useState } from 'react';
// 引入 Ionicons 图标
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
    const router = useRouter();
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
        setScanned(true);
        try {
            JSON.parse(data);
            router.back();
        } catch (error) {
            console.error('Invalid JSON data:', error);
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
            {/* 添加返回按钮 */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    // 添加返回按钮样式
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
}); 