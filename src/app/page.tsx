"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SosButton from '@/components/sos-button';
import { Users, MapPin, ListChecks, ArrowRight, BellRing } from 'lucide-react';
import { getContacts } from '@/lib/services/contact-service';
import type { EmergencyContact } from '@/lib/types';
import { useGeolocation } from '@/hooks/use-geolocation';
import { addLocationToHistory } from '@/lib/services/history-service';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [contactsCount, setContactsCount] = useState(0);
  const { location, error: geoError, loading: geoLoading, getLocation } = useGeolocation();
  const { toast } = useToast();

  useEffect(() => {
    setContactsCount(getContacts().length);
    getLocation(); // Fetch location on dashboard load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckIn = () => {
    getLocation(); // Refresh location
    if (location && !geoError) {
      addLocationToHistory({ latitude: location.latitude, longitude: location.longitude });
      toast({
        title: 'Checked In!',
        description: 'Your current location has been logged to your route history.',
      });
    } else if (geoError) {
      toast({
        variant: 'destructive',
        title: 'Check-in Failed',
        description: `Could not get location: ${geoError}`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Stay Safe</CardTitle>
          <CardDescription className="text-center text-lg">
            Your personal safety companion. In case of emergency, press the SOS button below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <SosButton />
          <p className="text-sm text-muted-foreground">
            This will alert your emergency contacts with your current location.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Location</CardTitle>
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {geoLoading && <p className="text-sm text-muted-foreground">Fetching location...</p>}
            {geoError && <p className="text-sm text-destructive">Error: {geoError}</p>}
            {location && !geoError && (
              <>
                <div className="text-2xl font-bold">Location Acquired</div>
                <p className="text-xs text-muted-foreground">
                  Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
                </p>
              </>
            )}
            {!location && !geoError && !geoLoading && <p className="text-sm text-muted-foreground">Location not available. Enable GPS.</p>}
             <Button variant="outline" size="sm" className="mt-4 w-full" onClick={handleCheckIn} disabled={geoLoading}>
              <BellRing className="mr-2 h-4 w-4" /> Log My Location (Check-in)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactsCount}</div>
            <p className="text-xs text-muted-foreground">
              {contactsCount === 1 ? 'contact configured' : 'contacts configured'}
            </p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/contacts">Manage Contacts <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Route History</CardTitle>
            <ListChecks className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View Logs</div>
            <p className="text-xs text-muted-foreground">
              Check your timestamped location records.
            </p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/history">View History <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
