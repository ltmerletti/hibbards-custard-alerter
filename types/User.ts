export interface User {
  id: string;
  whitelist: string[];
  blacklist: string[];
  customInstructions: string;
}
