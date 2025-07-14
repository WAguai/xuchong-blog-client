import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Array<string>): string => {
    const [YYYY, MM, DD, HH, MM2] = date;
    return `${YYYY}-${MM}-${DD} ${HH}:${MM2}`;
  };
