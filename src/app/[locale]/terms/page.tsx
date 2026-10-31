import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Booking terms",
    description: `The terms on which ${site.name} plans and arranges tailor-made Costa Rica journeys, from first enquiry to travel.`,
    path: "/terms",
  });
}

const email = site.contactEmail ?? "";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <LegalPage title="Booking terms" href="/terms">
      <p>
        {t("These terms explain how ")}{t(site.name)}{t(" plans and arranges tailor-made journeys in Costa Rica, and what we and you can expect of each other. Please read them before you confirm a trip. In these terms, “we” and “us” mean ")}{t(site.name)}{t(" ")}
        {t("and “you” means the person making the booking on behalf of everyone travelling.")}
      </p>

      <h2>{t("1. Enquiries and proposals")}</h2>
      <p>
        {t("Sending an enquiry through this website, by email or in conversation does not create a booking or commit you to anything. We reply with questions and then a written proposal: a suggested itinerary with the places to stay, activities and transport we recommend, and the price for your party. Journeys shown on this website are examples for inspiration, not fixed packages.")}
      </p>
      <p>
        {t("A proposal is based on availability when we write it. Places to stay, guides and activities are not held until you confirm and we have secured them, so details can change until then.")}
      </p>

      <h2>{t("2. Confirming your trip")}</h2>
      <p>
        {t("Your booking is confirmed when you have accepted a final itinerary in writing, paid the deposit set out in it and we have sent you a written confirmation. From that point a contract exists between you and ")}{t(site.name)}{t(" on these terms and on anything else stated in your confirmation. The person who books must be at least 18 and confirms that everyone travelling has agreed to these terms.")}
      </p>

      <h2>{t("3. Deposit and balance")}</h2>
      <p>
        {t("A deposit is payable to confirm a trip, and the balance is due before you travel. The amounts and due dates are stated in your proposal and confirmation, because they depend on the places and services in your itinerary. Some services, such as certain lodges, domestic flights and special-season stays, require full payment earlier; where that applies we tell you before you confirm. If the balance is not paid by its due date, we may treat the booking as cancelled by you and apply the cancellation charges below.")}
      </p>

      <h2>{t("4. Prices")}</h2>
      <p>
        {t("The price in your confirmation is the price you pay, except where a change you ask for, or a government action such as a new tax or fee, changes our costs. If that happens we explain the change in writing before it applies. Anything not listed as included in your confirmation, such as international flights, travel insurance, visas, tips and personal expenses, is not included.")}
      </p>

      <h2>{t("5. Changes you make")}</h2>
      <p>
        {t("If you would like to change your trip after confirming, tell us in writing as soon as possible. We will do our best to help, but cannot promise that every change is possible. Any extra cost, including charges from the places and services already booked, is payable by you, and we tell you what it is before we make the change.")}
      </p>

      <h2>{t("6. If you cancel")}</h2>
      <p>
        {t("You can cancel at any time by writing to us. Cancellation charges then apply, which increase as your travel date approaches and reflect the costs that the places and services in your itinerary charge us. The charges for your trip are set out in your confirmation. We recommend travel insurance that covers cancellation (see section 9).")}
      </p>

      <h2>{t("7. If we change or cancel")}</h2>
      <p>
        {t("Occasionally we may need to change part of your trip, for example if a lodge closes, a road or park is shut, or a supplier cannot provide a service. If a change is minor we will tell you and arrange an alternative of a similar standard. If it is significant, we will offer you the choice of an alternative arrangement, a different trip, or cancelling with a full refund of what you have paid us for the arrangements affected.")}
      </p>
      <p>
        {t("We will not cancel a confirmed trip unless we have to. If we do, you will receive a full refund of the money you have paid us. We are not responsible for changes or cancellations caused by events outside our control, such as extreme weather, volcanic activity, natural disasters, epidemics, government action, strikes or civil unrest, but we will always help you to make other arrangements.")}
      </p>

      <h2>{t("8. Passports, visas and health")}</h2>
      <p>
        {t("Each traveller is responsible for holding a valid passport, any visa or entry permit required for Costa Rica and for any country they pass through, and for meeting the health and vaccination requirements in force when they travel. We can share general information, but entry rules change and depend on nationality, so please check them with the relevant embassy or official government source before you travel and seek medical advice in good time. We are not responsible if you cannot travel or are refused entry because these requirements were not met.")}
      </p>

      <h2>{t("9. Travel insurance")}</h2>
      <p>
        {t("Adequate travel insurance is a condition of travelling with us. It should cover cancellation, medical treatment, emergency repatriation, personal belongings and the activities in your itinerary, such as hiking, rafting or ziplining. Please send us your policy details before you travel if we ask for them.")}
      </p>

      <h2>{t("10. During your trip")}</h2>
      <p>
        {t("Please follow the guidance of your guides, drivers and hosts, especially on safety, wildlife and protected areas. Wildlife sightings, weather and sea conditions can never be guaranteed. If anyone’s behaviour puts others at risk or causes serious disruption, a guide or host may have to end that person’s participation in an activity or the trip, without a refund.")}
      </p>
      <p>
        {t("Please tell us before you confirm about any medical condition, disability or dietary need that may affect your trip, so that we can check that the arrangements are suitable.")}
      </p>

      <h2>{t("11. Our responsibility to you")}</h2>
      <p>
        {t("We will plan and arrange your trip with reasonable skill and care, and we choose the places and services in it carefully. Where any part of your arranged trip is not provided as agreed through our fault or the fault of a supplier we booked for you, we will offer appropriate compensation. Our responsibility does not extend to problems caused by you or someone in your party, by a third party not connected with the services we arranged, or by unusual and unforeseeable events beyond our control.")}
      </p>
      <p>
        {t("Where international conventions limit the compensation payable by airlines, hotels or other carriers, our liability is limited in the same way. Except for death or personal injury caused by our negligence, or where the law does not allow it to be limited, our total liability to you is limited to the price of your trip. Nothing in these terms affects your statutory rights.")}
      </p>

      <h2>{t("12. Complaints")}</h2>
      <p>
        {t("If something is not right during your trip, please tell your guide, your host or us straight away so that it can be put right there and then. If you are still unhappy, write to us at ")}<a href={`mailto:${email}`}>{t(email)}</a>{t(" within 28 days of returning, and we will reply in full as quickly as we can.")}
      </p>

      <h2>{t("13. This website")}</h2>
      <p>
        {t("The journeys, destination guides and articles on this website are for inspiration and general information and are offered in good faith; details may change. The text, design and branding belong to ")}{t(site.name)}{t(" and may not be reproduced without permission. How we handle personal information is explained in our ")}<Link href="/privacy">{t("privacy policy")}</Link>{t(" and our")}{t(" ")}
        <Link href="/cookies">{t("cookie policy")}</Link>.
      </p>

      <h2>{t("14. Governing law")}</h2>
      <p>
        {t("These terms and any booking made under them are governed by the law that applies to the contract between you and")}{t(" ")}
        {t(site.name)}{t(", and any dispute will be dealt with by the courts that have jurisdiction under that law. If you are a consumer, you keep any protection given to you by the law of the country where you live.")}
      </p>

      <h2>{t("15. Contact")}</h2>
      <p>
        {t(site.name)}, <a href={`mailto:${email}`}>{t(email)}</a>.
      </p>
    </LegalPage>
  );
}
