import { endOfMonth, isValid, parseISO } from "date-fns";

export function getBillingCycleRange(monthString: string | undefined, cycleDate: number | undefined) {
  const date = monthString ? parseISO(`${monthString}-01`) : new Date();
  if (!isValid(date)) return { startDate: undefined, endDate: undefined };

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed

  let startYear = year;
  let startMonth = month;
  let endYear = year;
  let endMonth = month;

  const cutOff = cycleDate && cycleDate >= 1 && cycleDate <= 28 ? cycleDate : 1;

  if (cutOff === 1) {
    // Normal calendar month
    const start = new Date(year, month, 1);
    const end = endOfMonth(start);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  } else {
    // Billing cycle month starts on cutOff date of the PREVIOUS month
    if (month === 0) {
      startYear = year - 1;
      startMonth = 11;
    } else {
      startMonth = month - 1;
    }

    const start = new Date(startYear, startMonth, cutOff);
    
    // Ends on cutOff - 1 of CURRENT month
    const end = new Date(endYear, endMonth, cutOff - 1);
    end.setHours(23, 59, 59, 999);

    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  }
}
