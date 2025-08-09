import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/config/theme';
import ClientForm from '@/components/clients/ClientForm';
import type Client from '@/types/Client';
import ScreenLayout from '@/components/ui/ScreenLayout';
import { useRouter } from 'expo-router';
import { useClients } from '@/contexts/ClientsContext';

export default function NewClientScreen() {
  const router = useRouter();
  const { createClient } = useClients();
  const formRef = React.useRef<{ handleSubmit: () => void }>(null);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async (client: Omit<Client, 'id' | 'userID' | 'createdAt'>) => {
    try {
      await createClient(client);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  return (
    <ScreenLayout title="Nuevo Cliente">
      <View style={styles.container}>
        <ClientForm 
          ref={formRef}
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.componentBg,
  },
});
