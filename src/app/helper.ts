import { format, parseISO } from 'date-fns';
import { intervalToDurationWithOptions } from "date-fns/fp";

export const formatDisplayDateTime = (isoString: string): string => {
  return format(parseISO(isoString), 'dd / MM / yyyy \'at\' HH:mm');
};

export const formatDuration = (startIso: string, endIso: string): string => {
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  const diff = intervalToDurationWithOptions({ roundingMethod: 'floor' })({ start, end });
  const parts = [];
  if (diff.days) parts.push(`${diff.days} day${diff.days > 1 ? 's' : ''}`);
  if (diff.hours) parts.push(`${diff.hours} hour${diff.hours > 1 ? 's' : ''}`);
  if (diff.minutes) parts.push(`${diff.minutes} minute${diff.minutes > 1 ? 's' : ''}`);
  return parts.join(' ');
};

export const isDayTime = (isoString: string): boolean => {
  const date = parseISO(isoString);
  const hour = date.getHours();
  return hour >= 6 && hour < 18; // Example: Daytime is from 6 AM to 6 PM
}