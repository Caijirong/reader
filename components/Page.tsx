import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

interface PageProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    scroll?: boolean;
}

export default function Page({ style, children, scroll = false }: PageProps) {
    const Content = scroll ? ScrollView : View;

    return (
        <SafeAreaView edges={['top']}>
            <Content
                style={style}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </Content>
        </SafeAreaView>
    );
}