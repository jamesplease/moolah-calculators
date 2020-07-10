interface DateObject {
  month: number;
  year: number;
}

export default function addYears(date: DateObject, years: number) {
  const newYear = date.year + years;

  return {
    year: newYear,
    month: date.month,
  };
}
