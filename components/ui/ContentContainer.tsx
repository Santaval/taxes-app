import { Spacing, Typography } from '@/config/theme';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';

interface ContentContainerProps {
  title?: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

/**
 * A reusable container component for displaying content with an optional title
 * @param {ContentContainerProps} props - Component props
 * @param {string} [props.title] - Optional title to display above the content
 * @param {React.ReactNode} props.children - Content to be displayed inside the container
 * @param {ViewStyle} [props.containerStyle] - Optional additional styles for the outer container
 * @param {ViewStyle} [props.contentStyle] - Optional additional styles for the content area
 */
export default function ContentContainer({ 
  title, 
  children, 
  containerStyle,
  contentStyle 
}: ContentContainerProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: Spacing.xl,
    height: "100%",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: "bold",
    marginBottom: Spacing.md,
  },
  content: {
    flex: 1,
  },
}); 