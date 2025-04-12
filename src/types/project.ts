
export type ProjectStatus = "planned" | "in-progress" | "completed" | "on-hold";

export type TechTag = {
  id: string;
  name: string;
  color?: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  githubUrl?: string;
  deploymentUrl?: string;
  techStack: TechTag[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};
