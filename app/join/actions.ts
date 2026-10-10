"use server";

import { validateJoin, type JoinFormValues } from "@/lib/join-form";

export type JoinResult = { ok: true } | { ok: false; message: string };

export async function submitJoinForm(values: JoinFormValues): Promise<JoinResult> {
  const errors = validateJoin(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Some details need another look. Please check each step." };
  }

  // TODO: deliver the application (email, Sanity document, CRM, ...). Nothing stores it yet.
  console.info("[join] new application", { ...values, email: "<redacted>", mobile: "<redacted>" });

  return { ok: true };
}
