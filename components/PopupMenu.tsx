import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface MenuItem {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
}

interface PopupMenuProps {
    visible: boolean;
    onClose: () => void;
    items: MenuItem[];
    top: number;
}

export function PopupMenu({ visible, onClose, items, top }: PopupMenuProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalOverlay}
                onPress={onClose}
            >
                <View style={[
                    styles.menuContainer,
                    { top }
                ]}>
                    {items.map((item, index) => (
                        <View key={item.label}>
                            {index > 0 && <View style={styles.divider} />}
                            <Pressable
                                style={styles.menuItem}
                                onPress={item.onPress}
                            >
                                <Ionicons name={item.icon} size={20} color="black" />
                                <ThemedText style={styles.menuText}>{item.label}</ThemedText>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuContainer: {
        position: 'absolute',
        right: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        minWidth: 120,
    },
    menuText: {
        marginLeft: 10,
        fontSize: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
    },
}); 