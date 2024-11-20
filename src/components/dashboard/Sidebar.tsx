"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Search, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-primary/10' : '';
  };

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-screen">
      <nav className="p-4 space-y-2">
        <Link
          href="/dashboard/products"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors ${isActive('/dashboard/products')}`}
        >
          <Package size={20} />
          <span>Productos</span>
        </Link>
        
        <Link
          href="/dashboard/search"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors ${isActive('/dashboard/search')}`}
        >
          <Search size={20} />
          <span>Buscar</span>
        </Link>
        
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors ${isActive('/dashboard/settings')}`}
        >
          <Settings size={20} />
          <span>Configuración</span>
        </Link>
      </nav>
    </aside>
  );
}