"use client";

import { useState, useEffect } from 'react';
import RouteHistoryList from '@/components/history/route-history-list';
import type { LocationPoint } from '@/lib/types';
import { getRouteHistory, clearRouteHistory as clearHistoryService } from '@/lib/services/history-service';
import { Button } from '@/components/ui/button';
import { ListChecks, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';


export default function HistoryPage() {
  const [history, setHistory] = useState<LocationPoint[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setHistory(getRouteHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistoryService();
    setHistory([]);
    toast({
        title: 'History Cleared',
        description: 'Your route history has been successfully cleared.',
      });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route History</h1>
          <p className="text-muted-foreground">Review your logged locations and timestamps.</p>
        </div>
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" /> Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your route history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/90">
                  Clear History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {history.length === 0 ? (
         <Card className="text-center py-10">
          <CardHeader>
            <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
             <ListChecks className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4">No Route History Yet</CardTitle>
            <CardDescription>Your location logs will appear here when you use features like SOS or Check-in.</CardDescription>
          </CardHeader>
          <CardContent>
             <Link href="/" legacyBehavior passHref>
                <Button >
                    Go to Dashboard
                </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <RouteHistoryList history={history} />
      )}
    </div>
  );
}

// Temporary Link import for the button above, should be from 'next/link'
import Link from 'next/link';
