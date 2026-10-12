import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="frame flex min-h-[80svh] flex-col justify-center pb-24 pt-36">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="mt-8 max-w-3xl text-display-l text-forest">
        This path doesn&rsquo;t lead <em className="italic font-normal">anywhere.</em>
      </h1>
      <p className="mt-6 max-w-xl text-stone">The page you were looking for has moved or never existed. These are good places to pick up the trail.</p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <ButtonLink href="/journeys">Explore the journeys</ButtonLink>
        <Link href="/destinations" className="font-semibold text-forest underline decoration-terra underline-offset-4">
          Destination guides
        </Link>
        <Link href="/plan" className="font-semibold text-forest underline decoration-terra underline-offset-4">
          Plan your trip
        </Link>
      </div>
    </section>
  );
}
