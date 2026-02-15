// Public site config
const getEnvVar = (key: string, def = ''): string => {
  if (typeof window !== 'undefined' && (window as any)[key]) return (window as any)[key];
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && (process.env as any)[key]) return (process.env as any)[key] as string;
  return def;
};

export const PUBLIC_API_BASE_URL = getEnvVar('PUBLIC_API_BASE_URL', 'http://localhost:3004/api');















