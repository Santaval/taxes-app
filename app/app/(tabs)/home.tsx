import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../config/theme';
import QuickActions from '@/components/home/QuickActions';
import FinancialSummary from '@/components/home/FinancialSummary';
import { SafeAreaView } from 'react-native-safe-area-context';
import IvaSummary from '@/components/home/IVASummary';
import Greeting from '@/components/home/Greeting';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Greeting />
        <FinancialSummary />
        <IvaSummary />
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
