
import { format } from "date-fns";

// Format date to display format
export const formatDisplayDate = (date: Date): string => {
  return format(date, 'dd MMM yyyy');
};
