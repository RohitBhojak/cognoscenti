import { CreateFederatedCredential, FederatedCredential } from '../types/database.js';
import pool from './pool.js';

export const getFederatedCredentialByProviderAndSubject = async (
  provider: string,
  subject: string
): Promise<FederatedCredential | null> => {
  const { rows } = await pool.query(
    'SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2',
    [provider, subject]
  );

  return rows[0] ?? null;
};

export const insertFederatedCredential = async (input: CreateFederatedCredential) => {
  const { rows } = await pool.query<FederatedCredential>(
    'INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3) RETURNING *',
    [input.user_id, input.provider, input.subject]
  );

  return rows[0];
};
