import { createContext, type ReactNode, useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleCompletion: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("accswift_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("accswift_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks([task, ...tasks]);

  const removeTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleCompletion = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, removeTask, toggleCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
}
