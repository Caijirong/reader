import { View, Pressable, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert } from 'react-native';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PopupMenu, MenuItem } from '@/components/PopupMenu';
import { useBarCodeScanner } from '@/hooks/useBarCodeScanner';
import { BookSourceType } from '@/types/bookSource';
import useBookSource from '@/hooks/useBookSource';
import { SearchBar } from '@/components/SearchBar';

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
    const [searchText, setSearchText] = useState('');
    const { getBookSource } = useBookSource();
    const [bookSource, setBookSource] = useState<BookSourceType[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
            headerShadowVisible: false, // 隐藏阴影
        });
    }, [navigation]);

    useEffect(() => {
        getBookSource().then(setBookSource);
    }, []);

    const filteredBookSource = useMemo(() => {
        const searchLower = searchText.toLowerCase();
        return bookSource.filter(source =>
            source.bookSourceName.toLowerCase().includes(searchLower) ||
            source.bookSourceUrl.toLowerCase().includes(searchLower)
        );
    }, [bookSource, searchText]);

    const renderItem = ({ item }: { item: BookSourceType }) => (
        <View style={styles.sourceItem}>
            <ThemedText style={styles.sourceName}>{item.bookSourceName}</ThemedText>
            <ThemedText style={styles.sourceUrl}>{item.bookSourceUrl}</ThemedText>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="搜索书源名称或网址"
                />
            </View>
            <FlatList
                data={filteredBookSource}
                renderItem={renderItem}
                keyExtractor={item => item.bookSourceUrl}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    listContainer: {
        padding: 10,
    },
    sourceItem: {
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    sourceName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    sourceUrl: {
        fontSize: 14,
        color: '#666',
    },
});