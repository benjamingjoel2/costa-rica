import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Doodle } from "@/components/kit/Doodle";
import { Plate } from "@/components/ui/Plate";

export function WildSide() {
  return (
    <section aria-labelledby="wild-title" className="frame grid gap-10 py-10 md:grid-cols-12">
      <div className="flex flex-col justify-between gap-10 md:col-span-4">
        <BoxHeading id="wild-title" text="Take A Walk On The Wild Side" size="m" />
        <div>
          <p className="text-lead">
            Toucans in the canopy, sloths in the cecropia, red-eyed tree frogs after dark and scarlet macaws over the Osa. We plan
            your days around the habitats, seasons and hours when wildlife is most active, with guides who know where to look.
          </p>
          <BoxButton href="/experiences#wildlife" className="mt-6">
            Discover wildlife
          </BoxButton>
        </div>
      </div>
      <div className="flex items-center justify-center md:col-span-3">
        <Doodle name="binoculars" className="h-36 w-36 md:h-44 md:w-44" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:col-span-5">
        <Plate image="toucan" ratio="aspect-[3/4]" sizes="(min-width: 768px) 20vw, 50vw" />
        <div className="grid gap-3">
          <Plate image="fronds" ratio="aspect-square" sizes="(min-width: 768px) 20vw, 50vw" />
          <Plate image="canal" ratio="aspect-square" sizes="(min-width: 768px) 20vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
