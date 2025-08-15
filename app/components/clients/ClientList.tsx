import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/config/theme';
import { router } from 'expo-router';
import Client from '@/types/Client';

interface ListProps {
  clients: Client[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ClientItem = React.memo(({ client, onPress }: { 
  client: Client; 
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <FontAwesome5 
            name="user" 
            size={20} 
            color={Colors.primary}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {client.name}
            </Text>
            <Text style={styles.email}>{client.email}</Text>
          </View>
        </View>
        {client.phone && (
          <View style={styles.secondaryInfo}>
            <Text style={styles.phone}>
              <FontAwesome5 
                name="phone" 
                size={12} 
                color={Colors.secondaryText}
                style={styles.phoneIcon}
              /> {client.phone}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});
ClientItem.displayName = "ClientItem";

export default function ClientList({clients, refreshing, onRefresh} : ListProps) {
  const renderItem = ({ item }: { item: Client }) => (
    <ClientItem 
      client={item} 
      onPress={() => router.push({ pathname: '/clients/[id]', params: { id: item.id } })}
    />
  );

  const keyExtractor = (item: Client) => item.id;

  return (
    <FlatList
      data={clients}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      refreshControl={
        refreshing !== undefined && onRefresh
          ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
          : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  iconContainer: {
    marginRight: Spacing.md,
    justifyContent: 'center',
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary + '15',
  },
  contentContainer: {
    flex: 1,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  nameContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  name: {
    fontSize: Typography.size.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  email: {
    fontSize: Typography.size.sm,
    color: Colors.secondaryText,
  },
  secondaryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    fontSize: Typography.size.sm,
    color: Colors.secondaryText,
  },
  phoneIcon: {
    marginRight: Spacing.xs,
  }
});
