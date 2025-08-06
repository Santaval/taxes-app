import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/config/theme';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Transaction } from '@/types/Transaction';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Categorías predefinidas - idealmente vendrían de una API o configuración del usuario
const CATEGORIES = [
  'Salario',
  'Servicios profesionales',
  'Ventas',
  'Alquiler',
  'Transporte',
  'Alimentación',
  'Servicios públicos',
  'Otros',
] as const;

const transactionSchema = z.object({
  type: z.enum(['ingreso', 'egreso']),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  amount: z.string().min(1, 'El monto es requerido'),
  hasVat: z.boolean(),
  vatRate: z.string(),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSave: (transaction: Omit<Transaction, 'id' | 'userID' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TransactionForm: React.ForwardRefRenderFunction<
  { handleSubmit: () => void },
  TransactionFormProps
> = ({ onSave, onCancel }, ref) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'ingreso',
      description: '',
      category: '',
      amount: '',
      hasVat: false,
      vatRate: '13',
      date: new Date(),
    },
  });

  const hasVat = watch('hasVat');

  const onSubmit = (data: TransactionFormData) => {
    onSave({
      ...data,
      amount: parseFloat(data.amount),
      vatRate: data.hasVat ? parseFloat(data.vatRate) : 0,
      date: moment(data.date).format('YYYY-MM-DD'),
    });
  };
;

  // Expose handleSubmit to parent
  React.useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit)
  }));

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* Selector de tipo */}
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                value === 'ingreso' && styles.typeButtonActive,
                value === 'ingreso' && { backgroundColor: Colors.success + '15' }
              ]}
              onPress={() => onChange('ingreso')}
            >
              <FontAwesome5 
                name="arrow-down" 
                size={16} 
                color={value === 'ingreso' ? Colors.success : Colors.secondaryText}
              />
              <Text style={[
                styles.typeText,
                value === 'ingreso' && { color: Colors.success }
              ]}>Ingreso</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                value === 'egreso' && styles.typeButtonActive,
                value === 'egreso' && { backgroundColor: Colors.error + '15' }
              ]}
              onPress={() => onChange('egreso')}
            >
              <FontAwesome5 
                name="arrow-up" 
                size={16} 
                color={value === 'egreso' ? Colors.error : Colors.secondaryText}
              />
              <Text style={[
                styles.typeText,
                value === 'egreso' && { color: Colors.error }
              ]}>Egreso</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Campo de monto */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Monto</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[
                styles.amountInput,
                errors.amount && styles.inputError
              ]}
              value={value}
              onChangeText={(text) => onChange(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              placeholder="₡0"
              placeholderTextColor={Colors.secondaryText}
            />
          )}
        />
        {errors.amount && (
          <Text style={styles.errorText}>{errors.amount.message}</Text>
        )}
      </View>

      {/* Campo de descripción */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[
                styles.input,
                errors.description && styles.inputError
              ]}
              value={value}
              onChangeText={onChange}
              placeholder="Escribe una descripción breve"
              placeholderTextColor={Colors.secondaryText}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}
      </View>

      {/* Selector de categoría */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoría</Text>
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <>
              <TouchableOpacity
                style={[
                  styles.categorySelector,
                  errors.category && styles.inputError
                ]}
                onPress={() => setShowCategories(!showCategories)}
              >
                <Text style={[
                  styles.categoryText,
                  !value && styles.placeholderText
                ]}>
                  {value || 'Selecciona una categoría'}
                </Text>
                <FontAwesome5 
                  name={showCategories ? 'chevron-up' : 'chevron-down'} 
                  size={16} 
                  color={Colors.secondaryText}
                />
              </TouchableOpacity>
              {showCategories && (
                <View style={styles.categoriesList}>
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={styles.categoryItem}
                      onPress={() => {
                        onChange(cat);
                        setShowCategories(false);
                      }}
                    >
                      <Text style={[
                        styles.categoryItemText,
                        value === cat && styles.categoryItemTextSelected
                      ]}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}
        />
        {errors.category && (
          <Text style={styles.errorText}>{errors.category.message}</Text>
        )}
      </View>

      {/* Switch de IVA */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Incluye IVA?</Text>
        <Controller
          control={control}
          name="hasVat"
          render={({ field: { value, onChange } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ false: Colors.lightGray, true: Colors.primary + '50' }}
              thumbColor={value ? Colors.primary : Colors.secondaryText}
            />
          )}
        />
      </View>

      {/* Campo de tasa de IVA */}
      {hasVat && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tasa de IVA (%)</Text>
          <Controller
            control={control}
            name="vatRate"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.vatRate && styles.inputError
                ]}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="13"
                placeholderTextColor={Colors.secondaryText}
              />
            )}
          />
          {errors.vatRate && (
            <Text style={styles.errorText}>{errors.vatRate.message}</Text>
          )}
        </View>
      )}

      {/* Selector de fecha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha</Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {moment(value).format('D [de] MMMM, YYYY')}
                </Text>
                <FontAwesome5 
                  name="calendar-alt" 
                  size={16} 
                  color={Colors.secondaryText}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.componentBg,
    gap: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  typeButtonActive: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  typeText: {
    fontSize: Typography.size.md,
    fontWeight: '600',
    color: Colors.secondaryText,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.size.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.size.xs,
    marginTop: Spacing.xs,
  },
  amountInput: {
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.size.xl,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categorySelector: {
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryText: {
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  placeholderText: {
    color: Colors.secondaryText,
  },
  categoriesList: {
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  categoryItemText: {
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  categoryItemTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dateSelector: {
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dateText: {
    fontSize: Typography.size.md,
    color: Colors.text,
  },
});

export default React.forwardRef(TransactionForm);
