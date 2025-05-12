"use client";

import type { LocationPoint } from '@/lib/types';

const HISTORY_STORAGE_KEY = 'saferouteSOS_routeHistory';

export const getRouteHistory = (): LocationPoint[] => {
  if (typeof window === 'undefined') return [];
  const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const addLocationToHistory = (location: Omit<LocationPoint, 'timestamp'>): LocationPoint => {
  if (typeof window === 'undefined') return location as LocationPoint; // Should not happen
  const history = getRouteHistory();
  const newLocationPoint: LocationPoint = { ...location, timestamp: Date.now() };
  const updatedHistory = [newLocationPoint, ...history]; // Add to the beginning
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  return newLocationPoint;
};

export const clearRouteHistory = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_STORAGE_KEY);
};
