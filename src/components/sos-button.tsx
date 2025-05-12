"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Siren, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation } from '@/hooks/use-geolocation';
import { getContacts } from '@/lib/services/contact-service';
import { addLocationToHistory } from '@/lib/services/history-service';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function SosButton() {
  const { toast } = useToast();
  const { location, error: geoError, loading: geoLoading, getLocation } = useGeolocation();
  const [isSending, setIsSending] = useState(false);

  const handleSos = async () => {
    setIsSending(true);
    getLocation(); // Request location
  };

  // Effect to handle SOS once location is available
  // This is a bit complex due to async nature of getLocation
  // A better approach might involve a state machine or more refined effect dependencies
  // For now, this direct handling after getLocation is called will be used.

  useState(() => {
    if (isSending && !geoLoading) { // Check if we were sending and location process finished
      if (geoError) {
        toast({
          variant: 'destructive',
          title: 'SOS Failed',
          description: `Could not get location: ${geoError}. Please enable location services.`,
        });
        setIsSending(false);
        return;
      }

      if (location) {
        const contacts = getContacts();
        if (contacts.length === 0) {
          toast({
            variant: 'destructive',
            title: 'SOS Failed',
            description: 'No emergency contacts configured. Please add contacts first.',
          });
          setIsSending(false);
          return;
        }

        // Simulate sending SMS/Email
        console.log('SOS Alert:', {
          message: 'Emergency SOS! My current location is:',
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: new Date(location.timestamp).toLocaleString(),
          contacts: contacts.map(c => ({ name: c.name, phone: c.phone, email: c.email })),
        });

        addLocationToHistory({ latitude: location.latitude, longitude: location.longitude });

        toast({
          title: 'SOS Alert Sent!',
          description: `Alert sent to ${contacts.length} contact(s) with your current location. (Simulated)`,
        });
      }
      setIsSending(false); // Reset sending state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, geoError, geoLoading, isSending, toast]); // Add all dependencies that are used


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="lg"
          className="w-full md:w-auto h-16 text-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse hover:animate-none"
          disabled={isSending || geoLoading}
        >
          {isSending || geoLoading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <Siren className="mr-2 h-6 w-6" />
          )}
          SEND SOS
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
            Confirm SOS Activation
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately send an alert with your current location to all your emergency contacts. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSos} className="bg-destructive hover:bg-destructive/90">
            Yes, Send SOS
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
