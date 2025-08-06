import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Colors } from '../../config/theme';
import QuickActions from '@/components/home/QuickActions';
import FinancialSummary from '@/components/home/FinancialSummary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import ScreenLayout from '@/components/ui/ScreenLayout';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Increment the key to force re-render of child components
    setRefreshKey(prev => prev + 1);
    setRefreshing(false);
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <ScreenLayout
        title='Inicio'
        headerContent={ <FinancialSummary key={`financial-${refreshKey}`} />}
        contentTitle=''
      >
       
      <QuickActions /> 
      </ScreenLayout>
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
