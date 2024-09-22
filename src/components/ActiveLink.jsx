"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { useTheme } from 'next-themes';


const ActiveLink = ({ href, children, className }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        isActive ? 
          (theme === 'dark' ? "text-white" : "text-black") :
          (theme === 'dark' ? "text-zinc-400" : "text-zinc-600"),
        className
      )}

    >
      {children}
    </Link>
  );
};

export default ActiveLink;