"use client";

import { useState, useEffect, useCallback } from 'react';
import type { LocationPoint } from '@/lib/types';

interface GeolocationState {
  location: LocationPoint | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeolocationState & { getLocation: () => void } {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation is not supported by your browser', loading: false }));
      return;
    }

    setState(s => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState(s => ({ ...s, error: error.message, loading: false }));
      }
    );
  }, []);

  useEffect(() => {
    // Initial attempt to get location, can be removed if manual trigger is preferred
    // getLocation(); 
    // For this app, let's make it explicit call via getLocation for components
    // and just set loading to false initially.
     setState(s => ({ ...s, loading: false }));
  }, [getLocation]);

  return { ...state, getLocation };
}
