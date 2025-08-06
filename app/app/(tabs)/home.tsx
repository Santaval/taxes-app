import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../config/theme';
import AuthService from '@/services/AuthService';
import { User } from '@/types/User';
import HomeHeader from '@/components/home/HomeHeader';
import QuickActions from '@/components/home/QuickActions';
import FinancialSummary from '@/components/home/FinancialSummary';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [monthlyStats] = useState({
    totalBilled: 2500000, // Ejemplo: ₡2,500,000
    totalVAT: 325000, // Ejemplo: ₡325,000 (13% IVA)
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AuthService.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <FinancialSummary
          income={monthlyStats.totalBilled}
          expenses={monthlyStats.totalVAT * 7.69} // Ejemplo: multiplicamos el IVA por un factor para simular gastos totales
        />
        <HomeHeader user={user} monthlyStats={monthlyStats} />
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gradientColors.start,
  },
});
