export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${Math.ceil(num / 1000)}K`;
  return `${Math.ceil(num / 1000000)}M`;
};
