"use client";

import MapDisplay from '@/components/map/map-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { AlertTriangle } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
        <p className="text-muted-foreground">View your current position on the map.</p>
      </div>

      {!GOOGLE_MAPS_API_KEY && (
         <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-destructive">Map Configuration Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-destructive">
              The Google Maps API key is not configured. Please set the <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable in your <code>.env.local</code> file.
              The map functionality will be limited until this is resolved.
            </CardDescription>
          </CardContent>
        </Card>
      )}
      
      <Card className="shadow-lg">
        <CardContent className="p-0">
          {/* The MapDisplay component needs to control its own height, e.g. aspect ratio or fixed height */}
          <div className="aspect-video md:h-[600px] w-full">
             <MapDisplay />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
