import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import ClientsService from '@/services/ClientsService';
import type Client from '@/types/Client';
import { useAuth } from './AuthContext';

interface ClientsContextData {
  clients: Client[];
  loading: boolean;
  error: string | null;
  createClient: (data: Omit<Client, 'id' | 'userID' | 'createdAt'>) => Promise<void>;
  updateClient: (id: string, data: Partial<Omit<Client, 'id' | 'userID' | 'createdAt'>>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  refreshClients: () => Promise<void>;
}

const ClientsContext = createContext<ClientsContextData | undefined>(undefined);

export function ClientsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = React.useCallback(async () => {
    setLoading(true);
    try {
      const clients = await ClientsService.all();
      setClients(clients);
      setError(null);
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al obtener clientes");
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = async (data: Omit<Client, 'id' | 'userID' | 'createdAt'>) => {
    try {
      const client = await ClientsService.create(data);
      console.error('Creating client with data:', client);
      setClients([client, ...clients]);
      router.push("/(tabs)/clients");
      showToast.success("Cliente creado exitosamente");
    } catch (error) {
        console.error('Error al crear el cliente:', error);
      showToast.error(error instanceof Error ? error.message : "Error al crear el cliente");
      setError(error as string);
    }
  };

  const updateClient = async (id: string, data: Partial<Omit<Client, 'id' | 'userID' | 'createdAt'>>) => {
    try {
      const updatedClient = await ClientsService.update(id, data);
      setClients(clients.map(c => 
        c.id === id ? updatedClient : c
      ));
      router.back();
      showToast.success("Cliente actualizado exitosamente");
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al actualizar el cliente");
      setError(error as string);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await ClientsService.delete(id);
      setClients(clients.filter(c => c.id !== id));
      router.replace('/(tabs)/clients');
      showToast.success("Cliente eliminado exitosamente");
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al eliminar el cliente");
      setError(error as string);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClients();
    }
  }, [user, fetchClients]);

  return (
    <ClientsContext.Provider 
      value={{ 
        clients, 
        loading, 
        error, 
        createClient,
        updateClient,
        deleteClient,
        refreshClients: fetchClients,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
}
