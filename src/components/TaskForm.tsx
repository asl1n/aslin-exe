import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { ListPlus } from "lucide-react";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      priority,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8"
    >
      <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
        <ListPlus size={20} className="text-blue-600" />
        <h2>Create New Task</h2>
      </div>
      <div className="grid gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description..."
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none h-20"
        />
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all cursor-pointer font-bold"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
