import { User as AppUser } from './database.ts';
export {};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends AppUser {}

    interface Response {
      renderView: (view: string, data?: Record<string, unknown>) => void;
    }
  }
}
