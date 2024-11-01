import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Book as BookType } from '@/types/book';
import { Image } from 'expo-image';

// 计算书籍尺寸
const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 20;
const gapBetweenBooks = 20;
const bookWidth = (screenWidth - horizontalPadding * 2 - gapBetweenBooks * 2) / 3;
const bookHeight = bookWidth * 1.3;

export default function Book({ book }: { book: BookType }) {
    return (
        <View style={styles.container}>
            <Image
                source={book.cover}
                style={styles.cover}
                contentFit="cover"
            />
            <ThemedText style={styles.title}>
                {book.title}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10
    },
    cover: {
        width: bookWidth,
        height: bookHeight,
        borderRadius: 8
    },
    title: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
        width: bookWidth
    }
});