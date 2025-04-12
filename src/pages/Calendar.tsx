
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { mockProjects } from "@/data/mockData";
import { Project, Task } from "@/types/project";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  
  // Get all tasks from all projects that have due dates
  const allTasks = mockProjects.flatMap(project => 
    project.tasks
      .filter(task => task.dueDate) // Only include tasks with due dates
      .map(task => ({
        ...task,
        project
      }))
  );

  // Convert the tasks into a date map for the calendar
  const tasksByDate: Record<string, { task: Task, project: Project }[]> = {};
  
  allTasks.forEach(({ task, project }) => {
    if (task.dueDate) {
      const dateStr = task.dueDate.split('T')[0]; // Format: YYYY-MM-DD
      if (!tasksByDate[dateStr]) {
        tasksByDate[dateStr] = [];
      }
      tasksByDate[dateStr].push({ task, project });
    }
  });

  // Function to get tasks for the selected date
  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    return tasksByDate[dateStr] || [];
  };

  const selectedDateTasks = getTasksForDate(date);
  
  // Custom function for the Calendar to highlight dates with tasks
  const isDayWithTask = (day: Date) => {
    const dateStr = day.toISOString().split('T')[0];
    return !!tasksByDate[dateStr];
  };

  // Navigation for month view
  const prevMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setMonth(today);
    setDate(today);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Plan your project tasks and set deadlines.</p>
        </div>
        <Button onClick={goToToday}>Today</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                month={month}
                onMonthChange={setMonth}
                className="rounded-md border"
                modifiers={{
                  withTasks: (date) => isDayWithTask(date),
                }}
                modifiersStyles={{
                  withTasks: { 
                    backgroundColor: 'hsl(var(--primary) / 0.2)',
                    fontWeight: 'bold' 
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {date
                  ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                  : "No date selected"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No tasks scheduled for this day
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateTasks.map(({ task, project }, index) => (
                    <div key={task.id} className="bg-card border border-border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <ProjectStatusBadge status={project.status} className="text-xs" />
                        <span className="text-xs text-muted-foreground">{project.name}</span>
                      </div>
                      <p className={`mb-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
