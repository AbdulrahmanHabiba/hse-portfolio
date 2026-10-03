import { z } from "zod";

/** Shape returned by every form Server Action (consumed by useActionState). */
export type ActionState = {
  ok: boolean;
  /** Key under "dashboard.feedback" / "contact.feedback" - resolved in the UI. */
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /**
   * Submitted values, echoed back. React 19 resets uncontrolled forms after an action,
   * so without this the user would lose everything they typed when validation fails.
   */
  values?: Record<string, string>;
};

export const initialState: ActionState = { ok: false };

/** FormData -> plain string record (files are ignored; this app has none). */
export function valuesOf(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

/** Validate FormData against a zod schema and return typed data, or a ready-to-return ActionState. */
export function parseForm<S extends z.ZodType>(schema: S, formData: FormData) {
  const values = valuesOf(formData);
  const result = schema.safeParse(values);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error as z.ZodError<Record<string, unknown>>);
    return {
      success: false as const,
      state: { ok: false, message: "validation", fieldErrors, values } satisfies ActionState,
    };
  }
  return { success: true as const, data: result.data as z.output<S>, values };
}
