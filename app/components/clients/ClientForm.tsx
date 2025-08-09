import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/config/theme';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Client from '@/types/Client';

const clientSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido').min(1, 'El correo electrónico es requerido'),
  phone: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  onSave: (client: Omit<Client, 'id' | 'userID' | 'createdAt'>) => void;
  onCancel: () => void;
  initialValues?: Client;
}

const ClientForm: React.ForwardRefRenderFunction<
  { handleSubmit: () => void },
  ClientFormProps
> = ({ onSave, onCancel, initialValues }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          email: initialValues.email,
          phone: initialValues.phone,
        }
      : {
          name: '',
          email: '',
          phone: '',
        },
  });

  const onSubmit = (data: ClientFormData) => {
    onSave(data);
  };

  React.useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
  }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="Nombre del cliente"
              placeholderTextColor={Colors.secondaryText}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="correo@ejemplo.com"
              placeholderTextColor={Colors.secondaryText}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono (opcional)</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="1234-5678"
              placeholderTextColor={Colors.secondaryText}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone.message}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: 150,
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
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.size.md,
    fontWeight: '600',
  },
});

export default React.forwardRef(ClientForm);
