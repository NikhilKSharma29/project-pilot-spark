
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard" || pathname.includes("/projects/"),
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
      current: pathname === "/calendar",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: pathname === "/settings",
    },
  ];

  return (
    <div className="w-16 md:w-64 h-full md:min-h-screen bg-card border-r border-border flex flex-col justify-between">
      <div>
        <div className="px-3 py-3 md:py-6 md:px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-semibold text-primary-foreground">P</span>
            </div>
            <span className="font-semibold text-lg hidden md:block">
              ProjectPilot
            </span>
          </Link>
        </div>
        <div className="px-3 py-2 md:px-4">
          <Button
            asChild
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Link to="/dashboard/new">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden md:block">New Project</span>
            </Link>
          </Button>
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                item.current
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  item.current ? "text-foreground" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
              <span className="hidden md:block">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          size="sm"
          asChild
        >
          <Link to="/">
            <LogOut className="h-4 w-4" />
            <span className="hidden md:block">Logout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
