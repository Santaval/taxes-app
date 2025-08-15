import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { Colors, Spacing, Typography, BorderRadius } from '@/config/theme';
import { router } from 'expo-router';

interface Transaction {
  id: string;
  type: 'ingreso' | 'egreso';
  description?: string;
  category?: string;
  amount: number;
  hasVat: boolean;
  vatRate: number;
  date: string;
}

type ListProps = {
  transactions: Transaction[];
}


const TransactionItem = React.memo(({ transaction, onPress }: { 
  transaction: Transaction; 
  onPress?: () => void;
}) => {
  const isIncome = transaction.type === 'ingreso';
  
  const formatCurrency = (amount: number) => {
    return '₡' + amount.toLocaleString('es-CR');
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).locale('es').format('D [de] MMMM, YYYY');
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={[
          styles.iconBackground, 
          { backgroundColor: isIncome ? Colors.success + '15' : Colors.error + '15' }
        ]}>
          <FontAwesome5 
            name={isIncome ? 'arrow-down' : 'arrow-up'} 
            size={20} 
            color={isIncome ? Colors.success : Colors.error}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainInfo}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description} numberOfLines={1}>
              {transaction.description || (isIncome ? 'Ingreso' : 'Egreso')}
            </Text>
            {transaction.category && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{transaction.category}</Text>
              </View>
            )}
          </View>
          <Text style={[
            styles.amount, 
            { color: isIncome ? Colors.success : Colors.error }
          ]}>
            {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
          </Text>
        </View>

        <View style={styles.secondaryInfo}>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          {transaction.hasVat && (
            <View style={styles.vatBadge}>
              <Text style={styles.vatText}>IVA {transaction.vatRate}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});
TransactionItem.displayName = "TransactionItem";

export default function TransactionList({transactions} : ListProps) {
  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionItem 
      transaction={item} 
      onPress={() => router.push(`/transactions/${item.id}`)}
    />
  );

  const keyExtractor = (item: Transaction) => item.id;

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md
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
  descriptionContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  description: {
    fontSize: Typography.size.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  categoryContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: Typography.size.xs,
    color: Colors.secondaryText,
  },
  amount: {
    fontSize: Typography.size.md,
    fontWeight: '600',
  },
  secondaryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: Typography.size.sm,
    color: Colors.secondaryText,
  },
  vatBadge: {
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: Spacing.sm,
  },
  vatText: {
    fontSize: Typography.size.xs,
    color: Colors.primary,
    fontWeight: '500',
  },
});
