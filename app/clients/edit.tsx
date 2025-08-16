import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/config/theme';
import ClientForm from '@/components/clients/ClientForm';
import type Client from '@/types/Client';
import ScreenLayout from '@/components/ui/ScreenLayout';
import React, { useEffect, useState } from 'react';
import { useClients } from '@/contexts/ClientsContext';
import ClientsService from '@/services/ClientsService';

export default function EditClientScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { updateClient } = useClients();
  const [client, setClient] = useState<Client | null>(null);
  const formRef = React.useRef<{ handleSubmit: () => void }>(null);

  useEffect(() => {
    const fetchClient = async () => {
      const clientData = await ClientsService.find(id as string);
      setClient(clientData);
    };
    fetchClient();
  }, [id]);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async (data: Partial<Client>) => {
    try {
      await updateClient(id as string, data);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  if (!client) {
    return null;
  }

  return (
    <ScreenLayout title="Editar Cliente">
      <View style={styles.container}>
        <ClientForm
          ref={formRef}
          onSave={handleSave}
          onCancel={handleCancel}
          initialValues={client}
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
