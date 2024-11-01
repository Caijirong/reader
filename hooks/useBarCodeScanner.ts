import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';

interface UseBarCodeScannerProps {
    onSuccess?: (data: string) => void;
    onError?: (error: any) => void;
}

export function useBarCodeScanner({ onSuccess, onError }: UseBarCodeScannerProps = {}) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const router = useRouter();

    const requestPermission = useCallback(async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            
            if (status === 'granted') {
                router.push('/scan');
            } else {
                Alert.alert('提示', '需要相机权限才能扫码');
                onError?.('Camera permission denied');
            }
        } catch (error) {
            console.error('请求相机权限失败:', error);
            onError?.(error);
        }
    }, [router, onError]);

    const handleBarCodeScanned = useCallback(({ data }: { data: string }) => {
        try {
            const jsonData = JSON.parse(data);
            onSuccess?.(jsonData);
        } catch (error) {
            Alert.alert('错误', '无效的书源数据格式');
            onError?.(error);
        }
    }, [onSuccess, onError]);

    return {
        hasPermission,
        requestPermission,
        handleBarCodeScanned
    };
} 