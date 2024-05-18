// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestRecord = {
  id: string;
  name: string;
  content: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestRecordsRaw = Omit<LatestRecord, 'amount'> & {
  amount: number;
};

export type RecordsTable = {
  id: string;
  hater_id: string;
  name: string;
  date: string;
  content: string;
  status: 'solved' | 'unsolved';
};

export type HatersTableType = {
  id: string;
  name: string;
  total_records: number;
  total_unsolved: number;
  total_solved: number;
};

export type FormattedHatersTable = {
  id: string;
  name: string;
  total_records: number;
  total_unsolved: number;
  total_solved: number;
};

export type HaterField = {
  id: string;
  name: string;
};

export type RecordForm = {
  id: string;
  hater_id: string;
  content: string;
  status: 'solved' | 'unsolved';
};
