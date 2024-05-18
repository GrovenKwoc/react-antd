import 'server-only';
import { sql } from '@vercel/postgres';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await sql`
      SELECT * FROM users WHERE id = ${session.userId}
    `;

    console.log(data);
    if (data.rowCount > 0) {
      const user = data.rows[0];
      return user;
    } else return null;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
