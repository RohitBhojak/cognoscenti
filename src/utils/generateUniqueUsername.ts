import { getUserByUsername } from '../models/UserRepository.js';
import crypto from 'crypto';

const generateUniqueUsername = async (email: string) => {
  const baseName = email
    .split('@')[0]
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 24);

  let user, candidate;
  do {
    const suffix = crypto.randomBytes(2).toString('hex');
    candidate = `${baseName}_${suffix}`;
    user = await getUserByUsername(candidate);
  } while (user);

  return candidate;
};

export default generateUniqueUsername;
