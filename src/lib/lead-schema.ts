import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email.").max(254),
  company: z.string().trim().min(2, "Please enter your company.").max(150),
  service: z.enum([
    "Not sure yet",
    "AI Receptionist",
    "AI Calling Agents",
    "Workflow Automation",
    "Custom Software",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
  consent: z.literal("on", { error: "Please agree to the privacy notice." }),
});
export type LeadState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
