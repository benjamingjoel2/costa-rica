import { notFound } from "next/navigation";

// Any URL that matches no page renders the localized not-found page inside the site layout.
export default function CatchAll() {
  notFound();
}
