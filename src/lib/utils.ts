import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtBaht(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}฿${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtBahtShort(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}฿${Math.abs(n).toLocaleString("en-US")}`;
}

export function thaiDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}
