"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "./session";

const FormSchema = z.object({
  id: z.string(),
  haterId: z.string({
    invalid_type_error: "请选择一个仇家",
  }),
  content: z.string(),
  status: z.enum(["solved", "unsolved"], {
    invalid_type_error: "请选择目前对该事件的情绪状态",
  }),
  date: z.string(),
});

const CreateRecord = FormSchema.omit({ id: true, date: true });
const UpdateRecord = FormSchema.omit({ id: true, date: true });

const HaterFormSchema = z.object({
  name: z.string(),
});
const CreateHater = HaterFormSchema.pick({ name: true });

export type State = {
  errors?: {
    haterId?: string[];
    content?: string[];
    status?: string[];
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createRecord(prevState: State, formData: FormData) {
  const validatedFields = CreateRecord.safeParse({
    haterId: formData.get("haterId"),
    content: formData.get("content"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Record.",
    };
  }

  const { haterId, content, status } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO records (hater_id, content, status, date)
    VALUES (${haterId}, ${content}, ${status}, ${date})
  `;
  } catch (e) {
    return {
      message: "Database Error: Failed to Create Record.",
    };
  }
  revalidatePath("/test/logs");
  revalidatePath("/test/haters");
  revalidatePath("/test/analysis");
  redirect("/test/logs");
}

export async function updateRecord(id: string, formData: FormData) {
  const { haterId, content, status } = UpdateRecord.parse({
    haterId: formData.get("haterId"),
    content: formData.get("content"),
    status: formData.get("status"),
  });

  try {
    await sql`
      UPDATE records
      SET hater_id = ${haterId}, content = ${content}, status = ${status}
      WHERE id = ${id}
    `;

    revalidatePath("/test/logs");
    revalidatePath("/test/haters");
    revalidatePath("/test/analysis");
    redirect("/test/logs");
  } catch (e) {
    return {
      message: "Database Error: Failed to Update Record.",
    };
  }
  revalidatePath("/diary/record");
  revalidatePath("/diary/haters");
  redirect("/diary/record");
}

export async function deleteRecord(id: string) {
  // throw new Error('Failed to Delete Record');
  try {
    await sql`DELETE FROM records WHERE id = ${id}`;
    revalidatePath("/test/logs");
    revalidatePath("/test/haters");
    revalidatePath("/test/analysis");
  } catch (e) {
    return { message: "Database Error: Failed to Delete Record." };
  }
}

export async function createHater(formData: FormData) {
  const { name } = CreateHater.parse({
    name: formData.get("name"),
  });
  try {
    await sql`
    INSERT INTO haters (name)
    VALUES (${name})
  `;
  } catch (e) {
    return {
      message: "Database Error: Failed to Create Hater.",
    };
  }
  revalidatePath("/test/haters");
  revalidatePath("/test/analysis");
  redirect("/test/haters");
}

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export async function signup(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Library API
  try {
    const data =
      await sql`INSERT INTO users (name, email, password,role) VALUES (${name}, ${email}, ${hashedPassword},'user') RETURNING id`;

    if (!data) {
      return {
        errors: "An error occurred while creating your account.",
      };
    }

    // Current steps:
    // 4. Create user session
    await createSession(data.rows[0].id);
  } catch (error) {
    console.log(error);
    return {
      errors: "An error occurred while creating your account.",
    };
  }

  // 5. Redirect user
  redirect("/test/logs");
}

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  console.log("进入登录流程");
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before comparing it with the store
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Get the user info from the database or call an Library API
  try {
    const data =
      await sql`SELECT * FROM users WHERE email=${email} AND password=${hashedPassword}`;

    if (!data) {
      return {
        errors: "An error occurred while verifying your account.",
      };
    }

    if (data.rowCount === 0) {
      return {
        errors: "你的账号密码有误",
      };
    }

    // Current steps:
    // 4. Create user session
    await createSession(data.rows[0].id);
  } catch (error) {
    console.log(error);
    return {
      errors: "An error occurred while creating your account.",
    };
  }

  // 5. Redirect user
  redirect("/test/logs");
}
