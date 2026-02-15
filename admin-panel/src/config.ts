// Admin Panel Configuration
// Handle both Node.js (process) and browser environments
const getEnvVar = (key: string, defaultValue: string = '') => {
  // For webpack/browser environment
  if (typeof window !== 'undefined') {
    // Check if it's defined on window (webpack DefinePlugin)
    return (window as any)[key] || defaultValue;
  }
  // For Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

export const config = {
  // Backend API URL
  API_URL: getEnvVar('REACT_APP_API_URL', 'http://localhost:3004/api'),

  // Environment
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
};

// Export individual values for convenience
export const API_BASE_URL = config.API_URL;
