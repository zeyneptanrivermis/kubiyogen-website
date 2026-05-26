import { randomUUID } from 'crypto';

export const createAccessCodeValue = () => {
  return `KBY-${randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;
};

export const defaultAccessCodeExpiry = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
};
