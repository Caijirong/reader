import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';
import Page from '@/components/Page';
import { Book as BookType } from '@/types/book';
import Book from '@/components/Book';

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
  const rows = mockBooks.reduce((acc: BookType[][], curr, i) => {
    if (i % 3 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []);

  return (
    <Page style={{ paddingHorizontal: 20 }} scroll>
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
    </Page>
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