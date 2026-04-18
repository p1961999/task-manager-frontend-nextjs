import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name is required").regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const taskSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  status: z.enum(["pending", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, "Due date is required"),
});
