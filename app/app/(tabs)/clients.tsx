import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import ScreenLayout from '@/components/ui/ScreenLayout';
import ClientList from '@/components/clients/ClientList';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/config/theme';
import { useClients } from '@/contexts/ClientsContext';

export default function ClientsScreen() {
  const { clients, refreshClients } = useClients();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshClients().finally(() => setRefreshing(false));
  }, [refreshClients]);

  // Refresh when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );
  return (
    <ScreenLayout
      title="Clientes"
      contentTitle=""
    >
      <View>
        <Link
          href="/clients/new"
          style={{ marginBottom: 16, alignItems: 'center', flexDirection: 'row' }}
        >
          <View style={styles.addButton}>
            <IconSymbol name="plus.circle.fill" size={15} color={'white'} />
            <Text style={{ marginLeft: 8, color: Colors.white }}>Agregar Cliente</Text>
          </View>
        </Link>
        <ClientList clients={clients} refreshing={refreshing} onRefresh={onRefresh} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8
  },
});
