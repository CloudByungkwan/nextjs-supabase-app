import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 환경변수가 유효한 URL 형식인지 확인
function isValidHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const hasEnvVars =
  isValidHttpUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
