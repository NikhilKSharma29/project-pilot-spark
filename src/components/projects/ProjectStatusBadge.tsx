
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

export default function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const getStatusConfig = (status: ProjectStatus) => {
    switch (status) {
      case "planned":
        return { label: "Planned", variant: "outline" as const };
      case "in-progress":
        return { label: "In Progress", variant: "default" as const };
      case "completed":
        return { label: "Completed", variant: "secondary" as const };
      case "on-hold":
        return { label: "On Hold", variant: "outline" as const };
      default:
        return { label: status, variant: "outline" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={cn("capitalize", className)}>
      {config.label}
    </Badge>
  );
}
