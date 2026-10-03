import clsx, { type ClassValue } from "clsx";

/** Tiny wrapper so call sites read `cn(...)` and we can swap the implementation later. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "a\nb\n\n c " -> ["a", "b", "c"]  (used for textarea -> string[] fields) */
export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
