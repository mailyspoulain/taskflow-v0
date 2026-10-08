import { useState, useEffect, useMemo, useRef } from "react";
import type { Task } from "../types";

type Props = { task: Task };

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function TaskEditor({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const words = useMemo(() => countWords(title), [title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // simulation d'un enregistrement
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <small>{words} mots</small>
      <button disabled={saving}>Enregistrer</button>
    </form>
  );
}