declare global {
  interface CustomJwtSessionClaims {
    o?: {
      id: string;
      rol: string;
      slg: string;
    };
  }
}

export {};