
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft,
  ExternalLink, 
  Github, 
  Loader2, 
  Plus, 
  Trash2, 
  X, 
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Project, ProjectStatus, Task } from "@/types/project";
import { mockProjects } from "@/data/mockData";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newTag, setNewTag] = useState("");

  // For handling auto-save on blur
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProject = mockProjects.find((p) => p.id === id);
    setProject(foundProject || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Button onClick={() => navigate("/dashboard")}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleProjectUpdate = (field: keyof Project, value: any) => {
    if (!project) return;

    setProject({
      ...project,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });

    // Simulate auto-save
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 500);
  };

  const handleAddTask = () => {
    if (!newTask.trim() || !project) return;

    const newTaskObj: Task = {
      id: `task-${Date.now()}`,
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    handleProjectUpdate("tasks", [...project.tasks, newTaskObj]);
    setNewTask("");
  };

  const handleTaskChange = (taskId: string, completed: boolean) => {
    if (!project) return;
    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    );
    handleProjectUpdate("tasks", updatedTasks);
  };

  const handleRemoveTask = (taskId: string) => {
    if (!project) return;
    const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
    handleProjectUpdate("tasks", updatedTasks);
  };

  const handleAddTag = () => {
    if (!newTag.trim() || !project) return;

    const tagExists = project.techStack.some(
      (tag) => tag.name.toLowerCase() === newTag.toLowerCase()
    );

    if (tagExists) {
      setNewTag("");
      return;
    }

    const newTagObj = {
      id: `tag-${Date.now()}`,
      name: newTag,
    };

    handleProjectUpdate("techStack", [...project.techStack, newTagObj]);
    setNewTag("");
  };

  const handleRemoveTag = (tagId: string) => {
    if (!project) return;
    const updatedTechStack = project.techStack.filter((tag) => tag.id !== tagId);
    handleProjectUpdate("techStack", updatedTechStack);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="mr-4"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              value={project.name}
              onChange={(e) => handleProjectUpdate("name", e.target.value)}
              className="text-2xl font-bold border-none bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {saving && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Saving...
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Select
              value={project.status}
              onValueChange={(value) =>
                handleProjectUpdate("status", value as ProjectStatus)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={project.description}
                onChange={(e) => handleProjectUpdate("description", e.target.value)}
                className="min-h-32 resize-none"
                placeholder="Describe your project..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tasks</CardTitle>
              <div className="text-sm text-muted-foreground">
                {project.tasks.filter((t) => t.completed).length} / {project.tasks.length} completed
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No tasks yet. Add your first task below.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {project.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between bg-secondary/30 p-3 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={task.id}
                            checked={task.completed}
                            onCheckedChange={(checked) =>
                              handleTaskChange(task.id, checked === true)
                            }
                          />
                          <label
                            htmlFor={task.id}
                            className={`text-sm ${
                              task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.title}
                          </label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTask(task.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex mt-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="rounded-r-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTask();
                    }}
                  />
                  <Button
                    onClick={handleAddTask}
                    className="rounded-l-none"
                    disabled={!newTask.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    GitHub Repository
                  </label>
                  <div className="flex">
                    <div className="bg-secondary rounded-l-md px-2 flex items-center">
                      <Github className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      value={project.githubUrl || ""}
                      onChange={(e) => handleProjectUpdate("githubUrl", e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Deployment URL
                  </label>
                  <div className="flex">
                    <div className="bg-secondary rounded-l-md px-2 flex items-center">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      value={project.deploymentUrl || ""}
                      onChange={(e) =>
                        handleProjectUpdate("deploymentUrl", e.target.value)
                      }
                      placeholder="https://your-project.com"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.techStack.length === 0 ? (
                  <div className="text-muted-foreground text-sm">
                    No technologies added yet.
                  </div>
                ) : (
                  project.techStack.map((tech) => (
                    <Badge key={tech.id} variant="secondary" className="pr-1">
                      {tech.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTag(tech.id)}
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
              <div className="flex">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a technology..."
                  className="rounded-r-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTag();
                  }}
                />
                <Button
                  onClick={handleAddTag}
                  className="rounded-l-none"
                  disabled={!newTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Open in Calendar
              </Button>
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  <div className="flex justify-between">
                    <span>Created</span>
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
