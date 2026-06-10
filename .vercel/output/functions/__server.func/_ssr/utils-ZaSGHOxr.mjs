import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function fmtBaht(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}฿${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function fmtBahtShort(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}฿${Math.abs(n).toLocaleString("en-US")}`;
}
function thaiDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}
export {
  fmtBaht as a,
  cn as c,
  fmtBahtShort as f,
  thaiDate as t
};
