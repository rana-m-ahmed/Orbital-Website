import "server-only";
import { open, access } from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";
import type { leadSchema } from "./lead-schema";
import nodemailer from "nodemailer";

export type SavedLead = z.infer<typeof leadSchema> & {
  id: string;
  createdAt: string;
};

export async function deliverLead(lead: SavedLead, dir: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return false;

  const marker = dir ? path.join(dir, lead.id + ".sent") : "";

  if (marker) {
    try {
      await access(marker);
      return true;
    } catch {
      /* Not delivered yet. */
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.LEAD_EMAIL_TO || "operations@reachorbital.tech",
      replyTo: lead.email,
      subject: "ORBITAL project request",
      text: `Project request ${lead.id}\nReceived: ${lead.createdAt}\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\nService: ${lead.service}\n\n${lead.message}`,
    });

    if (marker) {
      try {
        const file = await open(marker, "wx", 0o600);
        try {
          await file.writeFile(new Date().toISOString());
          await file.sync();
        } finally {
          await file.close();
        }
      } catch (err) {
        console.warn("Failed to write sent marker:", err);
      }
    }

    return true;
  } catch (error) {
    console.error("Failed to send email via SMTP:", error);
    return false;
  }
}
