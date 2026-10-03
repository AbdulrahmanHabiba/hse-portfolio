import { notFound } from "next/navigation";

/** Catch-all so unknown URLs render the localized not-found page instead of the global one. */
export default function CatchAll() {
  notFound();
}
