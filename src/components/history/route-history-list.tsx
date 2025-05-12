"use client";

import type { LocationPoint } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, CalendarClock } from 'lucide-react';

interface RouteHistoryListProps {
  history: LocationPoint[];
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export default function RouteHistoryList({ history }: RouteHistoryListProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Location Log</CardTitle>
        <CardDescription>A detailed record of your logged locations.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] md:h-[500px] rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[250px]">
                  <CalendarClock className="inline-block mr-2 h-4 w-4" /> Timestamp
                </TableHead>
                <TableHead><MapPin className="inline-block mr-2 h-4 w-4" /> Latitude</TableHead>
                <TableHead><MapPin className="inline-block mr-2 h-4 w-4" /> Longitude</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((log, index) => (
                <TableRow key={index} className={index % 2 === 0 ? '' : 'bg-muted/50'}>
                  <TableCell className="font-medium">{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>{log.latitude.toFixed(6)}</TableCell>
                  <TableCell>{log.longitude.toFixed(6)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
