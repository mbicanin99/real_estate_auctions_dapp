export function parseDateTimeString(dateTimeString: string): string {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [day, month, year] = datePart.split('/');
  const hour = timePart.replace('h', '');
  return `${year}-${month}-${day}T${hour}:00:00Z`;
}
