const getSplitDate = (date?: string | null) => {
  if (!date)
    return {
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
      second: '',
    };

  const [ymd, hms] = date.split(' ');
  const [year, month, day] = ymd.split('-').map(Number);
  const [hour, minute, second] = hms.split(':').map(Number);
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};

const formatBirthedAt = (birthedAt?: string | null) => {
  if (!birthedAt) return [null, null];
  try {
    const [ydm, hm] = birthedAt.split(' ');
    const [h, m, s] = hm.split(':');
    let newTime = '';

    if (!Number(s)) {
      newTime = `${h}시 ${m}분`;
    } else {
      newTime = `모름`;
    }
    return [ydm, newTime];
  } catch {
    return [null, null];
  }
};

function getLastDay({
  year,
  monthIndex,
}: {
  year: number;
  monthIndex: number;
}) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function yearsGenerator({
  from = new Date().getFullYear() - 100,
  to,
}: {
  from?: number;
  to: number;
}) {
  return Array.from({ length: to - from + 1 }, (_, i) => ({
    value: from + i,
    text: `${from + i}년`,
  })).reverse();
}

function monthsGenerator() {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    text: `${i + 1}월`,
  }));
}

function daysGenerator({ year, month }: { year: number; month: number }) {
  return Array.from(
    { length: getLastDay({ year, monthIndex: month - 1 }) },
    (_, i) => ({
      value: i + 1,
      text: `${i + 1}일`,
    })
  );
}

function hourGenerator() {
  return Array.from({ length: 24 }, (_, i) => ({
    value: i,
    text: `${i}시`,
  }));
}

function minutesGenerator() {
  return Array.from({ length: 60 }, (_, i) => ({
    value: i,
    text: `${i}분`,
  }));
}

const getOriginDateToSplit = (date: string) => {
  const { year, month, day, hour, minute } = getSplitDate(date);

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    0
  );
};

export {
  getSplitDate,
  formatBirthedAt,
  getLastDay,
  yearsGenerator,
  monthsGenerator,
  daysGenerator,
  hourGenerator,
  minutesGenerator,
  getOriginDateToSplit,
};
