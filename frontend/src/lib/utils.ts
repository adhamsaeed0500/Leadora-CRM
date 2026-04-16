import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string, handling Tailwind class conflicts.
 * Uses clsx for conditional classes and tailwind-merge to ensure the last class wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
