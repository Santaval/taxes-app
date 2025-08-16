import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenLayout from "@/components/ui/ScreenLayout";
import { useEffect, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import type Client from "@/types/Client";
import { Colors } from "@/config/theme";
import { useClients } from "@/contexts/ClientsContext";
import ClientsService from "@/services/ClientsService";

export default function ClientDetailScreen() {
  const [client, setClient] = useState<Client | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { deleteClient } = useClients();

  useEffect(() => {
    const fetchClient = async () => {
      const clientData = await ClientsService.find(id as string);
      setClient(clientData);
    };
    fetchClient();
  }, [id]);

  if (!client) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScreenLayout title="Detalles del cliente" contentTitle="">
      <ScrollView style={styles.container}>
        {/* Header with client info */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <IconSymbol name="person.circle" size={24} color={Colors.primary} />
            <Text style={styles.name}>{client.name}</Text>
          </View>
        </View>

        {/* Client details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.value}>{client.email}</Text>
          </View>

          {client.phone && (
            <>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.label}>Teléfono</Text>
                <Text style={styles.value}>{client.phone}</Text>
              </View>
            </>
          )}

          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fecha de registro</Text>
            <Text style={styles.value}>
              {new Date(client.createdAt).toLocaleDateString('es-CR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.error + '15' }]}
            onPress={() => {
              Alert.alert(
                'Eliminar cliente',
                '¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                      deleteClient(id as string);
                    },
                  },
                ]
              );
            }}
          >
            <IconSymbol name="trash.fill" size={20} color={Colors.error} />
            <Text style={[styles.actionText, { color: Colors.error }]}>
              Eliminar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.primary + '15' }]}
            onPress={() => {
              router.push({
                pathname: '/clients/edit',
                params: { id }
              });
            }}
          >
            <IconSymbol name="pencil" size={20} color={Colors.primary} />
            <Text style={[styles.actionText, { color: Colors.primary }]}>
              Editar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: Colors.primary + '15',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: Colors.secondaryText,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    marginTop: 'auto',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontWeight: '600',
  },
});
