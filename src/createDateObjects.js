import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import startOfMonth from 'date-fns/startOfMonth';
import subDays from 'date-fns/subDays';

export default function createDateObjects(date, weekOffset = 0) {
  const firstDayOfMonth = startOfMonth(date);

  let diff = getDay(firstDayOfMonth) - weekOffset;
  if (diff < 0) diff += 7;

  const prevMonthDays = [];
  for (let i = 0; i < diff; i++) {
    prevMonthDays.push({
      day: subDays(firstDayOfMonth, diff - i),
      classNames: 'prevMonth'
    });
  }

  const currentMonthDays = [];
  for (let i = 1; i < getDaysInMonth(date) + 1; i++) {
    currentMonthDays.push({
      day: new Date(date.getYear(), date.getMonth(), i)
    });
  }

  const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

  const nextMonthDays = [];
  const lastDayOfMonth = currentMonthDays[currentMonthDays.length - 1].day;
  let i = 1;
  while ((daysAdded + i) % 7 !== 0) {
    nextMonthDays.push({
      day: addDays(lastDayOfMonth, i),
      classNames: 'nextMonth'
    });

    i = i + 1;
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}
