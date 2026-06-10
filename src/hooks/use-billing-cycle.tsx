import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useBillingCycle() {
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wanjot_selectedMonth') || format(new Date(), 'yyyy-MM');
    }
    return format(new Date(), 'yyyy-MM');
  });

  const [billingCycleDate, setBillingCycleDate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wanjot_billingCycleDate');
      return stored ? parseInt(stored, 10) : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem('wanjot_selectedMonth', selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    localStorage.setItem('wanjot_billingCycleDate', billingCycleDate.toString());
  }, [billingCycleDate]);

  return {
    selectedMonth,
    setSelectedMonth,
    billingCycleDate,
    setBillingCycleDate
  };
}
