export const parseTimeString = (time: string): number => {
  const [mm, ss, xx] = time.trim().split(/[:.]/);
  const minutes = Number(mm);
  const seconds = Number(ss);
  const fraction = xx ? Number(xx) / (xx.length === 3 ? 1000 : 100) : 0;
  return minutes * 60 + seconds + fraction;
};
