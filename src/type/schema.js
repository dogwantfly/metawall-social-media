import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "email 格式錯誤" }),
  password: z.string().min(8, { message: "密碼至少需要 8 個字元" })
  .regex(/[a-zA-Z]/, { message: "密碼需要包含至少一個英文字符" })
  .regex(/[0-9]/, { message: "密碼需要包含至少一個數字" }),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: "email 格式錯誤" }),
  password: z.string().min(8, { message: "密碼至少需要 8 個字元" })
  .regex(/[a-zA-Z]/, { message: "密碼需要包含至少一個英文字符" })
  .regex(/[0-9]/, { message: "密碼需要包含至少一個數字" }),
  confirmPassword: z.string().min(8, { message: "密碼至少需要 8 個字元" })
  .regex(/[a-zA-Z]/, { message: "密碼需要包含至少一個英文字符" })
  .regex(/[0-9]/, { message: "密碼需要包含至少一個數字" }),
  nickname: z.string().trim().min(2, { message: "暱稱至少需要 2 個字元" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  nickname: z.string().trim().min(2, { message: "暱稱至少需要 2 個字元" }),
  gender: z.enum(["male", "female"], { message: "請選擇有效的性別選項" }),
});

export const passwordSchema = z.object({
  password: z.string().min(8, { message: "密碼至少需要 8 個字元" })
  .regex(/[a-zA-Z]/, { message: "密碼需要包含至少一個英文字符" })
  .regex(/[0-9]/, { message: "密碼需要包含至少一個數字" }),
  confirmPassword: z.string().min(8, { message: "密碼至少需要 8 個字元" })
  .regex(/[a-zA-Z]/, { message: "密碼需要包含至少一個英文字符" })
  .regex(/[0-9]/, { message: "密碼需要包含至少一個數字" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });