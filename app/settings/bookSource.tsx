import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert } from 'react-native';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PopupMenu, MenuItem } from '@/components/PopupMenu';
import { useBarCodeScanner } from '@/hooks/useBarCodeScanner';

function HeaderRight() {
    const insets = useSafeAreaInsets();
    const [menuVisible, setMenuVisible] = useState(false);
    const { pickDocument } = useDocumentPicker({
        onSuccess: (jsonData) => {
            // TODO: 验证书源格式并保存
            console.log('导入的书源数据:', jsonData);
            Alert.alert('成功', '书源导入成功');
            setMenuVisible(false);
        },
        onError: (error) => {
            console.error('导入错误:', error);
        }
    });

    const { requestPermission } = useBarCodeScanner({
        onSuccess: (jsonData) => {
            // TODO: 验证并保存书源数据
            console.log('扫描的书源数据:', jsonData);
            Alert.alert('成功', '书源导入成功');
        },
        onError: (error) => {
            console.error('扫描错误:', error);
        }
    });

    const handleScan = () => {
        setMenuVisible(false);
        requestPermission();
    };

    const menuItems: MenuItem[] = [
        {
            icon: 'scan-outline',
            label: '扫一扫',
            onPress: handleScan,
        },
        {
            icon: 'folder-open-outline',
            label: '本地导入',
            onPress: pickDocument,
        },
    ];

    return (
        <>
            <Pressable onPress={() => setMenuVisible(true)}>
                <Ionicons name="add-sharp" size={24} color="black" />
            </Pressable>

            <PopupMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                items={menuItems}
                top={insets.top + 50}
            />
        </>
    );
}

export default function BookSourceScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
        });
    }, [navigation]);

    return (
        <View>
            <ThemedText>123</ThemedText>
        </View>
    );
}