import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { GripVertical, Trash2, CheckCircle, Circle } from "lucide-react";

export default function TaskList() {
  const { tasks, setTasks, removeTask, toggleCompletion } = useTasks();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Priority Style Mapping
  const priorityStyles = {
    high: "border-l-4 border-l-red-500 bg-red-50/30",
    medium: "border-l-4 border-l-amber-500 bg-amber-50/30",
    low: "border-l-4 border-l-emerald-500 bg-emerald-50/30",
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newList = [...tasks];
    const item = newList.splice(draggedIndex, 1)[0];
    newList.splice(index, 0, item);
    setDraggedIndex(index);
    setTasks(newList);
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
          No tasks found. Get started by adding one!
        </div>
      ) : (
        tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={() => setDraggedIndex(null)}
            className={`flex items-center justify-between bg-white p-4 rounded-xl border transition-all cursor-default group
              ${draggedIndex === index ? "opacity-30 border-blue-400 scale-95" : "border-slate-100 shadow-sm hover:border-slate-300"}
              ${!task.completed ? priorityStyles[task.priority] : "border-l-4 border-l-slate-300 bg-slate-50 opacity-60"}
            `}
          >
            <div className="flex items-center gap-4 flex-1">
              <GripVertical
                size={18}
                className="text-slate-300 cursor-grab active:cursor-grabbing group-hover:text-slate-400"
              />
              <div
                onClick={() => toggleCompletion(task.id)}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                {task.completed ? (
                  <CheckCircle className="text-emerald-500" />
                ) : (
                  <Circle className="text-slate-300" />
                )}
              </div>
              <div>
                <h3
                  className={`font-bold tracking-tight ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}
                >
                  {task.title}
                </h3>
                <p className="text-xs text-slate-500">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Priority Badge */}
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                  task.priority === "high"
                    ? "text-red-600 border-red-100 bg-white"
                    : task.priority === "medium"
                      ? "text-amber-600 border-amber-100 bg-white"
                      : "text-emerald-600 border-emerald-100 bg-white"
                }`}
              >
                {task.priority}
              </span>

              <button
                onClick={() => removeTask(task.id)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
