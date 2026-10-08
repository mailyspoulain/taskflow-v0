import { useEffect, useRef, useState } from "react";
import { PRIORITIES, type Priority } from "../priority";

type Props = { onAdd: (title: string, priority: Priority) => void };

export function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>(2); // Moyenne par défaut
    const inputRef = useRef<HTMLInputElement>(null);

    const error = title.length > 80 ? "80 caractères maximum" : null;

    // focus au montage
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || error) return;
        onAdd(title.trim(), priority);
        setTitle("");
        // focus après chaque ajout
        inputRef.current?.focus();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="new-task" className="sr-only">
                Nouvelle tâche
            </label>
            <input
                id="new-task"
                ref={inputRef}
                value={title}
                placeholder="Nouvelle tâche"
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "new-task-error" : undefined}
            />

            <label htmlFor="new-task-priority" className="sr-only">
                Priorité
            </label>
            <select
                id="new-task-priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as Priority)}
            >
                {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>
                        {p.label}
                    </option>
                ))}
            </select>

            {error && (
                <p id="new-task-error" role="alert">
                    {error}
                </p>
            )}
            <button disabled={!title.trim() || !!error}>Ajouter</button>
        </form>
    );
}