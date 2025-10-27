import { z } from "zod";

export const newClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().min(1, "Logo is required"),
});

export type NewClientSchema = z.infer<typeof newClientSchema>;
