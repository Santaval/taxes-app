import React, { useState, useCallback } from 'react';
import { Modal, View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import type Client from '../../types/Client';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Colors, Spacing, Typography, BorderRadius } from '@/config/theme';

interface ClientSelectProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (client: Client) => void;
  clients: Client[];
  title?: string;
}

export default function ClientSelect({ 
  isVisible, 
  onClose, 
  onSelect, 
  clients,
  title = "Seleccionar Cliente" 
}: ClientSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.phone && client.phone.includes(searchQuery))
  );

  const renderClient = useCallback(({ item }: { item: Client }) => (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <FontAwesome name="user" size={20} color={Colors.primary} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainInfo}>
          <View style={styles.nameContainer}>
            <ThemedText style={styles.clientName}>{item.name}</ThemedText>
            <ThemedText style={styles.clientEmail}>{item.email}</ThemedText>
          </View>
        </View>
        {item.phone && (
          <View style={styles.secondaryInfo}>
            <ThemedText style={styles.phone}>
              <FontAwesome name="phone" size={12} color={Colors.secondaryText} /> {item.phone}
            </ThemedText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  ), [onSelect, onClose]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="close" size={24} color={textColor} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { color: textColor, borderColor: textColor }]}
            placeholder="Buscar clientes..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredClients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.componentBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  clientItem: {
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
  clientName: {
    fontSize: Typography.size.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  clientEmail: {
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
});
