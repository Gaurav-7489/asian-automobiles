"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { findService } from "@/lib/service-catalog";
import { WhatsAppLeadForm } from "@/components/enquiry/whatsapp-lead-form";

/**
 * Reads `?service=` on the client so the contact page itself stays fully static.
 * Only ids from the published catalogue are accepted; anything else is ignored.
 */
function FormWithSelectedService() {
  const service = findService(useSearchParams().get("service"));
  return <WhatsAppLeadForm key={service?.id ?? "none"} mode={service?.mode ?? "service"} selectedService={service?.id} />;
}

export function ContactEnquiryForm() {
  return (
    <Suspense fallback={<WhatsAppLeadForm mode="service" />}>
      <FormWithSelectedService />
    </Suspense>
  );
}
