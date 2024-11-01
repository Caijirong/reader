import Page from '@/components/Page';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const groups = [
    {
        key: 'bookSource',
        title: '书源',
        items: [
            { key: 'bookSource-1', title: '书源1' },
            { key: 'bookSource-2', title: '书源2' },
        ],
    },
    {
        key: 'about',
        title: '关于',
        items: [
            { key: 'about-1', title: '关于1' },
            { key: 'about-2', title: '关于2' },
        ],
    },
];

export default function SettingsScreen() {
    const router = useRouter();

    const handlePress = (key: string) => {
        switch (key) {
            case 'bookSource-1':
                router.push('/settings/bookSource');
                break;
            case 'settings-2':
                console.log('设置2');
                break;
            case 'about-1':
                router.push('/settings/about');
                break;
            case 'about-2':
                router.push('/settings/about');
                break;
            default:
                break;
        }
    };

    return (
        <Page>
            {groups.map((group) => (
                <View key={group.key} style={styles.section}>
                    <ThemedText style={styles.sectionHeader}>{group.title}</ThemedText>
                    <View style={styles.sectionContent}>
                        {group.items.map((item, index) => (
                            <Pressable
                                key={item.key}
                                style={({ pressed }) => [
                                    styles.item,
                                    index !== group.items.length - 1 && styles.itemBorder,
                                    pressed && styles.itemPressed
                                ]}
                                onPress={() => handlePress(item.key)}
                            >
                                <ThemedText style={styles.itemText}>{item.title}</ThemedText>
                                <Ionicons name="chevron-forward" size={20} color="#c7c7cc" />
                            </Pressable>
                        ))}
                    </View>
                </View>
            ))}
        </Page>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    sectionHeader: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#6b6b6b',
        marginBottom: 6,
        marginLeft: 16,
    },
    sectionContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    item: {
        padding: 12,
        paddingRight: 16,
        backgroundColor: '#ffffff',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c8c8c8',
    },
    itemPressed: {
        backgroundColor: '#f2f2f7', // iOS 风格的按压效果
    },
    itemText: {
        fontSize: 16,
    },
});

