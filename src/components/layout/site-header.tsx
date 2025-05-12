import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import MainNav from './main-nav';
import { ModeToggle } from '@/components/mode-toggle';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-primary">SaferouteSOS</span>
        </Link>
        <div className="flex items-center space-x-4">
          <MainNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
