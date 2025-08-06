import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ScreenLayout from "@/components/ui/ScreenLayout";
import { useEffect, useState } from "react";
import moment from "moment";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Transaction } from "@/types/Transaction";
import { Colors } from "@/config/theme";
import TransactionsService from "@/services/TransactionsService";

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
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
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
  vatSection: {
    backgroundColor: Colors.componentBg,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  vatBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vatBadgeText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 12,
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

export default function TransactionDetailScreen() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await TransactionsService.find(id as string);
      setTransaction(transaction);
    };
    fetchTransaction();
  }, [id]);

  if (!transaction) {
    return <Text>Cargando...</Text>;
  }
  return (
    <ScreenLayout
      title="Detalles del registro"
      contentTitle=""
    >
      <ScrollView style={styles.container}>
        {/* Header with type and amount */}
        <View style={[
          styles.header,
          { backgroundColor: transaction.type === 'ingreso' ? Colors.success + '15' : Colors.error + '15' }
        ]}>
          <View style={styles.typeContainer}>
            <IconSymbol 
              name={transaction.type === 'ingreso' ? 'arrow.down' : 'arrow.up'} 
              size={24} 
              color={transaction.type === 'ingreso' ? Colors.success : Colors.error}
            />
            <Text style={[
              styles.typeText,
              { color: transaction.type === 'ingreso' ? Colors.success : Colors.error }
            ]}>
              {transaction.type === 'ingreso' ? 'Ingreso' : 'Egreso'}
            </Text>
          </View>
          <Text style={styles.amount}>₡{transaction.amount.toLocaleString('es-CR')}</Text>
        </View>

        {/* Transaction details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.value}>{transaction.description || 'Sin descripción'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Categoría</Text>
            <Text style={styles.value}>{transaction.category || 'Sin categoría'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.value}>{moment(transaction.date).format('D [de] MMMM, YYYY')}</Text>
          </View>

          {transaction.hasVat && (
            <>
              <View style={styles.separator} />
              <View style={styles.vatSection}>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>IVA incluido</Text>
                  <View style={styles.vatBadge}>
                    <Text style={styles.vatBadgeText}>{transaction.vatRate}%</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Monto sin IVA</Text>
                  <Text style={styles.value}>
                    ₡{(transaction.amount / (1 + transaction.vatRate / 100)).toLocaleString('es-CR')}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Monto del IVA</Text>
                  <Text style={styles.value}>
                    ₡{(transaction.amount - (transaction.amount / (1 + transaction.vatRate / 100))).toLocaleString('es-CR')}
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fecha de creación</Text>
            <Text style={styles.value}>{moment(transaction.createdAt).format('D [de] MMMM, YYYY')}</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors.error + '15' }]}
            onPress={() => {
              // Implement delete functionality
            }}
          >
            <IconSymbol name="trash.fill" size={20} color={Colors.error} />
            <Text style={[styles.actionText, { color: Colors.error }]}>Eliminar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors.primary + '15' }]}
            onPress={() => {
              // Implement edit functionality
            }}
          >
            <IconSymbol name="pencil" size={20} color={Colors.primary} />
            <Text style={[styles.actionText, { color: Colors.primary }]}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
