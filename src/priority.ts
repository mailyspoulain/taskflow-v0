export type Priority = 1 | 2 | 3;

export const PRIORITIES: { value: Priority; label: string }[] = [
    { value: 1, label: "Haute" },
    { value: 2, label: "Moyenne" },
    { value: 3, label: "Basse" },
];

export const priorityBadge = (p: Priority) => `P${p}`;