"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MapPin, History as HistoryIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/history', label: 'History', icon: HistoryIcon },
  { href: '/project-report', label: 'Project Report', icon: FileText },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 lg:space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 px-3 py-2 rounded-md",
            pathname === item.href ? 'text-primary bg-muted' : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
