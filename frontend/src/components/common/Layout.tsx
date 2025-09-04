import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}
