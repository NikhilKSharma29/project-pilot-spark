
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectStatus } from "@/types/project";
import { mockProjects } from "@/data/mockData";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => project.status === activeFilter);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage all your side projects in one place.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["all", "planned", "in-progress", "completed", "on-hold"].map((status) => (
          <Button
            key={status}
            variant={activeFilter === status ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(status as ProjectStatus | "all")}
            className="whitespace-nowrap"
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
          </Button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {activeFilter === "all"
              ? "You haven't created any projects yet."
              : `You don't have any ${activeFilter.replace("-", " ")} projects.`}
          </p>
          <Button asChild>
            <Link to="/dashboard/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="mb-2">{project.name}</CardTitle>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 h-10 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech.id} variant="secondary" className="font-normal">
                        {tech.name}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="outline" className="font-normal">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <div className="flex justify-between w-full">
                    <span>{project.tasks.filter(t => t.completed).length} / {project.tasks.length} tasks completed</span>
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
