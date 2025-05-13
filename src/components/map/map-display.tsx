"use client";

import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useGeolocation } from '@/hooks/use-geolocation';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { addLocationToHistory } from '@/lib/services/history-service';
import { Loader2, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco, fallback
const defaultZoom = 15;

export default function MapDisplay() {
  const { location, error: geoError, loading: geoLoading, getLocation } = useGeolocation();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapKey, setMapKey] = useState(Date.now()); // To force re-render Map component

  useEffect(() => {
    getLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch location on mount

  useEffect(() => {
    // Check if location is valid before using it
    if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
      const newCenter = { lat: location.latitude, lng: location.longitude };
      setMapCenter(newCenter);
      setMapKey(Date.now()); // Force re-render of Map component with new center
      addLocationToHistory({ latitude: location.latitude, longitude: location.longitude });
    } else {
      // If location is invalid, fallback to defaultCenter and log an error
      setMapCenter(defaultCenter);
      console.error("Invalid location data received, using default center.");
    }
  }, [location]);


  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted rounded-md p-8 text-center">
        <WifiOff className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-semibold mb-2">Map Unavailable</h3>
        <p className="text-sm text-muted-foreground">
          Google Maps API Key is not configured. Please set it up to use this feature.
        </p>
        <img 
            src="https://picsum.photos/800/450?grayscale" 
            alt="Map placeholder" 
            data-ai-hint="map placeholder" 
            className="mt-4 rounded-md opacity-50 max-w-full h-auto"
        />
      </div>
    );
  }
  
  if (geoLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-md">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Map & Location...</p>
      </div>
    );
  }

  if (geoError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted rounded-md p-8 text-center">
        <WifiOff className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-destructive">Error Fetching Location</h3>
        <p className="text-sm text-muted-foreground mb-4">{geoError}</p>
        <Button onClick={getLocation}>Try Again</Button>
         <img 
            src="https://picsum.photos/800/450?blur=2" 
            alt="Error placeholder" 
            data-ai-hint="error map" 
            className="mt-4 rounded-md opacity-50 max-w-full h-auto"
        />
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        key={mapKey} // Force re-render when center changes significantly
        defaultCenter={defaultCenter}
        center={mapCenter}
        defaultZoom={defaultZoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="saferouteSOSMap" // Optional: for custom styling in Google Cloud Console
        className="w-full h-full rounded-md"
      >
        {location && typeof location.latitude === 'number' &&
         typeof location.longitude === 'number' &&
         !isNaN(location.latitude) &&
         !isNaN(location.longitude) && (
         <AdvancedMarker
          position={{ lat: location.latitude, lng: location.longitude }}
         title="My Current Location"
         >
         <Pin
        background={'hsl(var(--primary))'}
        borderColor={'hsl(var(--primary-foreground))'}
        glyphColor={'hsl(var(--primary-foreground))'}
         />
        </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
}
