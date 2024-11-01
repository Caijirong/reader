import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

interface UseDocumentPickerOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    type?: string;
}

export const useDocumentPicker = (options: UseDocumentPickerOptions = {}) => {
    const { 
        onSuccess, 
        onError,
        type = 'application/json'
    } = options;

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type,
                copyToCacheDirectory: true
            });

            if (result.canceled) {
                return;
            }

            try {
                const response = await fetch(result.assets[0].uri);
                const content = await response.text();
                const jsonData = JSON.parse(content);
                
                onSuccess?.(jsonData);
            } catch (e) {
                Alert.alert('错误', '无效的文件格式');
                onError?.(e as Error);
            }
        } catch (err) {
            console.error('选择文件错误:', err);
            Alert.alert('错误', '文件选择失败');
            onError?.(err as Error);
        }
    };

    return { pickDocument };
}; 