import { useEffect, useState } from "react";

import { FilterBar } from "./components/FilterBar";
import { FocusTimer } from "./components/FocusTimer";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";
import { nextStatus, type Filter, type Priority, type Task } from "./types";

import { useLocalStorage } from "./hook/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("all");

  // États dérivés : calculés pendant le rendu, jamais dupliqués dans un useState
  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    document.title = `(${remaining}) TaskFlow`;
  }, [remaining]);

  const add = (title: string, priority: Priority) =>
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, status: "todo", priority }]);
  const cycle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)));
  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <main className="app">
      <header className="app-header">
        <h1>TaskFlow <small>{remaining} restante(s)</small></h1>
        <ThemeToggle />
      </header>
      <FocusTimer />
      <TaskForm onAdd={add} />
      <FilterBar value={filter} onChange={setFilter} />
      <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
    </main>
  );
}