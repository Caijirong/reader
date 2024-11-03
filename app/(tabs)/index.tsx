import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Book as BookType } from '@/types/book';
import Book from '@/components/Book';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// 默认封面
const defaultCover = require('@/assets/images/cat.jpeg');

// 生成随机长度的中文名字
function generateRandomChineseName(length: number) {
  return Array.from({ length }, () => String.fromCharCode(0x4e00 + Math.floor(Math.random() * 0x9fa5))).join('');
}

const mockBooks: BookType[] = Array.from({ length: 10 }, (_, index) => ({
  id: index.toString(),
  title: generateRandomChineseName(Math.floor(Math.random() * 10) + 5),
  cover: defaultCover,
  author: `Author ${index + 1}`,
  category: ['小说', '历史', '科技'][index % 3],
}));

export default function HomeScreen() {
  const navigation = useNavigation();
  const iconColor = useThemeColor({}, 'text');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // TODO: 实现搜索功能
            console.log('Search pressed');
          }}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="search" size={24} color={iconColor} />
        </TouchableOpacity>
      )
    });
  }, [navigation, iconColor]);

  const rows = mockBooks.reduce((acc: BookType[][], curr, i) => {
    if (i % 3 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 20 }}
    >
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={styles.bookCol}
        >
          {row.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bookCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    width: '100%'
  },
});