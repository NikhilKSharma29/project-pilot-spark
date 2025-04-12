
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      <main className={cn("flex-1 p-6 md:p-8 overflow-y-auto", className)}>
        {children}
      </main>
    </div>
  );
}
