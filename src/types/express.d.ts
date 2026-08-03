export {};

declare global {
  namespace Express {
    interface Response {
      renderView: (view: string, data?: Record<string, unknown>) => void;
    }
  }
}
