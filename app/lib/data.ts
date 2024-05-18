import { sql } from '@vercel/postgres';
import {
  HaterField,
  HatersTableType,
  RecordForm,
  RecordsTable,
  LatestRecordsRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestRecords() {
  noStore();
  try {
    const data = await sql<LatestRecordsRaw>`
      SELECT records.content, haters.name, records.id
      FROM records
      JOIN haters ON records.hater_id = haters.id
      ORDER BY records.date DESC
      LIMIT 5`;

    const latestRecords = data.rows.map((record) => ({
      ...record,
    }));
    return latestRecords;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest records.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const recordsCountPromise = sql`SELECT COUNT(*) FROM records`;
    const hatersCountPromise = sql`SELECT COUNT(*) FROM haters`;
    const recordsStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'solved' THEN 1 ELSE 0 END) AS "solved",
         SUM(CASE WHEN status = 'unsolved' THEN 1 ELSE 0 END) AS "unsolved"
         FROM records`;

    const data = await Promise.all([
      recordsCountPromise,
      hatersCountPromise,
      recordsStatusPromise,
    ]);

    const numberOfRecords = Number(data[0].rows[0].count ?? '0');
    const numberOfHaters = Number(data[1].rows[0].count ?? '0');
    const totalSolvedRecords = Number(data[2].rows[0].solved ?? '0');
    const totalUnsolvedRecords = Number(data[2].rows[0].unsolved ?? '0');

    return {
      numberOfHaters,
      numberOfRecords,
      totalSolvedRecords,
      totalUnsolvedRecords,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRecords(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const records = await sql<RecordsTable>`
      SELECT
        records.id,
        records.content,
        records.date,
        records.status,
        haters.name 
      FROM records 
      LEFT JOIN haters ON records.hater_id = haters.id
      WHERE
        haters.name ILIKE ${`%${query}%`} OR
        records.date::text ILIKE ${`%${query}%`} OR
        records.status ILIKE ${`%${query}%`}
      ORDER BY records.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return records.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch records.');
  }
}

export async function fetchRecordsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM records
    JOIN haters ON records.hater_id = haters.id
    WHERE
      haters.name ILIKE ${`%${query}%`} OR
      records.date::text ILIKE ${`%${query}%`} OR
      records.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of records.');
  }
}

export async function fetchRecordById(id: string) {
  noStore();
  try {
    const data = await sql<RecordForm>`
      SELECT
        records.id,
        records.hater_id,
        records.content,
        records.status
      FROM records
      WHERE records.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
    }));
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch record by id.');
  }
}

export async function fetchAllHaters() {
  noStore();
  try {
    const data = await sql<HaterField>`
      SELECT
        id,
        name
      FROM haters
      ORDER BY name ASC
    `;

    const haters = data.rows;
    return haters;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all haters.');
  }
}

export async function fetchFilteredHaters(query: string) {
  try {
    const data = await sql<HatersTableType>`
		SELECT
		  haters.id,
		  haters.name,
		  COUNT(records.id) AS total_records,
		  SUM(CASE WHEN records.status = 'unsolved' then 1 else 0 end) AS total_unsolved,
		  SUM(CASE WHEN records.status = 'solved' then 1 else 0 end) AS total_solved
		FROM haters
		LEFT JOIN records ON haters.id = records.hater_id
		WHERE
		  haters.name ILIKE ${`%${query}%`} 
		GROUP BY haters.id, haters.name
		ORDER BY haters.name ASC
	  `;

    const haters = data.rows.map((hater) => ({
      ...hater,
      total_unsolved: hater.total_unsolved,
      total_solved: hater.total_solved,
    }));

    return haters;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch haters table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
