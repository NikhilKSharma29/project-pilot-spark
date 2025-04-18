
import { Project } from "@/types/project";

// Generate mock data
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Personal Portfolio Website",
    description: "My personal website showcasing my portfolio of projects and skills. Built with modern web technologies focusing on performance and design.",
    status: "in-progress",
    githubUrl: "https://github.com/user/portfolio",
    deploymentUrl: "https://myportfolio.dev",
    techStack: [
      { id: "tech-1", name: "React" },
      { id: "tech-2", name: "TypeScript" },
      { id: "tech-3", name: "Tailwind CSS" },
      { id: "tech-4", name: "Next.js" },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Design landing page",
        completed: true,
        createdAt: "2025-04-01T12:00:00Z",
      },
      {
        id: "task-2",
        title: "Implement responsive navbar",
        completed: true,
        createdAt: "2025-04-02T12:00:00Z",
      },
      {
        id: "task-3",
        title: "Create project showcase section",
        completed: false,
        dueDate: "2025-04-15T00:00:00Z",
        createdAt: "2025-04-03T12:00:00Z",
      },
      {
        id: "task-4",
        title: "Add contact form with validation",
        completed: false,
        dueDate: "2025-04-18T00:00:00Z",
        createdAt: "2025-04-04T12:00:00Z",
      },
      {
        id: "task-5",
        title: "Optimize for SEO",
        completed: false,
        dueDate: "2025-04-20T00:00:00Z",
        createdAt: "2025-04-05T12:00:00Z",
      },
    ],
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-05T16:30:00Z",
  },
  {
    id: "project-2",
    name: "Weather App",
    description: "A simple weather application that provides current conditions and forecasts based on user location or search.",
    status: "completed",
    githubUrl: "https://github.com/user/weather-app",
    deploymentUrl: "https://myweatherapp.netlify.app",
    techStack: [
      { id: "tech-5", name: "JavaScript" },
      { id: "tech-6", name: "React" },
      { id: "tech-7", name: "Weather API" },
      { id: "tech-8", name: "CSS" },
    ],
    tasks: [
      {
        id: "task-6",
        title: "Set up API integration",
        completed: true,
        createdAt: "2025-03-10T12:00:00Z",
      },
      {
        id: "task-7",
        title: "Design UI for current conditions",
        completed: true,
        createdAt: "2025-03-12T12:00:00Z",
      },
      {
        id: "task-8",
        title: "Implement 5-day forecast",
        completed: true,
        createdAt: "2025-03-14T12:00:00Z",
      },
      {
        id: "task-9",
        title: "Add geolocation support",
        completed: true,
        createdAt: "2025-03-18T12:00:00Z",
      },
    ],
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-03-25T14:20:00Z",
  },
  {
    id: "project-3",
    name: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and customers for an e-commerce platform.",
    status: "planned",
    githubUrl: "",
    deploymentUrl: "",
    techStack: [
      { id: "tech-9", name: "Next.js" },
      { id: "tech-10", name: "Tailwind CSS" },
      { id: "tech-11", name: "Supabase" },
      { id: "tech-12", name: "TypeScript" },
    ],
    tasks: [
      {
        id: "task-10",
        title: "Design database schema",
        completed: false,
        dueDate: "2025-05-02T00:00:00Z",
        createdAt: "2025-04-08T12:00:00Z",
      },
      {
        id: "task-11",
        title: "Create authentication system",
        completed: false,
        dueDate: "2025-05-05T00:00:00Z",
        createdAt: "2025-04-09T12:00:00Z",
      },
      {
        id: "task-12",
        title: "Design product management UI",
        completed: false,
        dueDate: "2025-05-10T00:00:00Z",
        createdAt: "2025-04-10T12:00:00Z",
      },
    ],
    createdAt: "2025-04-08T11:00:00Z",
    updatedAt: "2025-04-10T15:45:00Z",
  },
  {
    id: "project-4",
    name: "Recipe Sharing App",
    description: "Mobile-first web app for sharing and discovering recipes with social features.",
    status: "on-hold",
    githubUrl: "https://github.com/user/recipe-app",
    deploymentUrl: "",
    techStack: [
      { id: "tech-13", name: "React Native" },
      { id: "tech-14", name: "Firebase" },
      { id: "tech-15", name: "Redux" },
    ],
    tasks: [
      {
        id: "task-13",
        title: "Design user profile pages",
        completed: true,
        createdAt: "2025-02-15T12:00:00Z",
      },
      {
        id: "task-14",
        title: "Implement recipe upload with photos",
        completed: false,
        dueDate: "2025-03-01T00:00:00Z",
        createdAt: "2025-02-17T12:00:00Z",
      },
      {
        id: "task-15",
        title: "Create comment system",
        completed: false,
        createdAt: "2025-02-20T12:00:00Z",
      },
    ],
    createdAt: "2025-02-15T10:30:00Z",
    updatedAt: "2025-03-01T09:15:00Z",
  },
];
