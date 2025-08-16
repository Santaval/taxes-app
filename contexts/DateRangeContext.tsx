import { createContext, useContext, useState, ReactNode } from 'react';
import moment from 'moment';

type DateRange = {
  from: moment.Moment;
  to: moment.Moment;
};

type DateRangePreset = 'today' | 'week' | 'month' | 'year' | 'custom';

interface DateRangeContextData {
  range: DateRange;
  preset: DateRangePreset;
  setRange: (range: DateRange) => void;
  setPreset: (preset: DateRangePreset) => void;
  // Helpers para establecer rangos predefinidos
  setToday: () => void;
  setThisWeek: () => void;
  setThisMonth: () => void;
  setThisYear: () => void;
  setCustomRange: (from: moment.Moment, to: moment.Moment) => void;
  // Helpers para obtener información del rango
  getFormattedRange: () => string;
  getDurationInDays: () => number;
  isInRange: (date: moment.Moment | string | Date) => boolean;
}

const DateRangeContext = createContext<DateRangeContextData | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRangeState] = useState<DateRange>({
    from: moment().startOf('month'),
    to: moment().endOf('month'),
  });
  const [preset, setPresetState] = useState<DateRangePreset>('month');

  const setRange = (newRange: DateRange) => {
    setRangeState(newRange);
    setPresetState('custom');
  };

  const setPreset = (newPreset: DateRangePreset) => {
    setPresetState(newPreset);
    switch (newPreset) {
      case 'today':
        setToday();
        break;
      case 'week':
        setThisWeek();
        break;
      case 'month':
        setThisMonth();
        break;
      case 'year':
        setThisYear();
        break;
    }
  };

  const setToday = () => {
    setRangeState({
      from: moment().startOf('day'),
      to: moment().endOf('day'),
    });
    setPresetState('today');
  };

  const setThisWeek = () => {
    setRangeState({
      from: moment().startOf('week'),
      to: moment().endOf('week'),
    });
    setPresetState('week');
  };

  const setThisMonth = () => {
    setRangeState({
      from: moment().startOf('month'),
      to: moment().endOf('month'),
    });
    setPresetState('month');
  };

  const setThisYear = () => {
    setRangeState({
      from: moment().startOf('year'),
      to: moment().endOf('year'),
    });
    setPresetState('year');
  };

  const setCustomRange = (from: moment.Moment, to: moment.Moment) => {
    setRangeState({ from, to });
    setPresetState('custom');
  };

  const getFormattedRange = () => {
    if (range.from.isSame(range.to, 'day')) {
      return range.from.format('D [de] MMMM, YYYY');
    }
    if (range.from.isSame(range.to, 'month')) {
      return range.from.format('MMMM [de] YYYY');
    }
    if (range.from.isSame(range.to, 'year')) {
      return range.from.format('YYYY');
    }
    return `${range.from.format('D [de] MMM')} - ${range.to.format('D [de] MMM, YYYY')}`;
  };

  const getDurationInDays = () => {
    return range.to.diff(range.from, 'days') + 1;
  };

  const isInRange = (date: moment.Moment | string | Date) => {
    const momentDate = moment(date);
    return momentDate.isBetween(range.from, range.to, 'day', '[]');
  };

  return (
    <DateRangeContext.Provider
      value={{
        range,
        preset,
        setRange,
        setPreset,
        setToday,
        setThisWeek,
        setThisMonth,
        setThisYear,
        setCustomRange,
        getFormattedRange,
        getDurationInDays,
        isInRange,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
}
