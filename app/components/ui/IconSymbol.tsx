// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'plus.circle.fill': 'add-circle',
  'swap.horizontal': 'swap-horiz',
  'person.fill': 'person',
  'person.2.fill': 'people',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'trash.fill': 'delete',
  'pencil': 'edit',
  'calendar': 'calendar-today',
  'dollarsign.circle.fill': 'attach-money',
} as const;

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses Material Icons across all platforms.
 * Icon `name`s are based on SF Symbols and mapped to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialIconName = MAPPING[name];
  if (!materialIconName) {
    console.warn(`No mapping found for icon: ${name}`);
    return null;
  }
  return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
}
