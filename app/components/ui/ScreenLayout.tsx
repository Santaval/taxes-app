import { StyleSheet, SafeAreaView, ViewStyle } from 'react-native';
import { Colors } from '@/config/theme';
import ContentContainer from './ContentContainer';
import Header from './Header';

interface ScreenLayoutProps {
  /** Title to display in the header */
  title: string;
  /** Content to display in the header below the title */
  headerContent?: React.ReactNode;
  /** Title for the content container */
  contentTitle?: string;
  /** Main content to display in the container */
  children: React.ReactNode;
  /** Additional styles for the page container */
  containerStyle?: ViewStyle;
  /** Additional styles for the content container */
  contentStyle?: ViewStyle;
  /** Additional styles for the header */
  headerStyle?: ViewStyle;
}

/**
 * A reusable layout component that provides a consistent screen structure
 * with a header and content container
 * @param {ScreenLayoutProps} props - Component props
 */
export default function ScreenLayout({
  title,
  headerContent,
  contentTitle,
  children,
  containerStyle,
  contentStyle,
  headerStyle,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView style={[styles.pageContainer, containerStyle]}>
      <Header title={title} containerStyle={headerStyle}>
        {headerContent}
      </Header>

      <ContentContainer title={contentTitle} containerStyle={contentStyle}>
        {children}
      </ContentContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
    color: Colors.white,
  },
}); 