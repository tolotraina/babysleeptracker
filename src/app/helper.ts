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
  if (diff.hours) parts.push(`${diff.hours}h`);
  if (diff.minutes) parts.push(`${diff.minutes}m`);
  return parts.join(' ');
};