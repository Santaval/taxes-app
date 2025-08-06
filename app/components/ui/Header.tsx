import { Colors, Spacing, Typography } from '@/config/theme';
import { StyleSheet, View, Text } from 'react-native';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  containerStyle?: object;
}

/**
 * A reusable header component that can display a title and optional children
 * @param {HeaderProps} props - Component props
 * @param {string} props.title - The title to display in the header
 * @param {React.ReactNode} [props.children] - Optional children to render below the title
 * @param {object} [props.containerStyle] - Optional additional styles for the container
 */
export default function Header({ title, children, containerStyle }: HeaderProps) {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    alignItems: 'center',
    rowGap: Spacing.xl,
  },
  title: {
    color: Colors.white,
    fontSize: Typography.size.md,
  },
}); 