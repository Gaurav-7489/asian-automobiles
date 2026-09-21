/**
 * Public business facts for Asian Automobiles.
 *
 * SOURCE OF TRUTH:
 * Asian Automobiles Website Design & Development Blueprint supplied by the client.
 *
 * Keep public-facing claims constrained to the verified facts below.
 * Confirmation-gated items must not be converted into firm public claims until
 * the client explicitly confirms them.
 */

export const businessFacts = {
  name: "Asian Automobiles",
  address: {
    street: "283 / V-526, Govt Rest House, Kattoor Road",
    locality: "Irinjalakuda",
    district: "Thrissur",
    postalCode: "680121",
    region: "Kerala",
    country: "India",
    full: "283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala",
  },
  phones: {
    primaryDisplay: "+91 93490 02038",
    primaryHref: "+919349002038",
    landlineDisplay: "0480 2828167",
    landlineHref: "+914802828167",
  },
  positioning: {
    businessType: "Automobile parts and car repair & services",
    vehiclePositioning: "Independent multi-brand service center for private cars",
    pillars: ["Service & repair", "Automobile spare parts"],
  },
  services: [
    "General repair",
    "Car AC service & repair",
    "Accident restoration",
    "Denting & painting",
    "Computerized wheel alignment",
    "Wheel balancing",
    "Tyre repair",
    "Rim repair",
    "Automobile spare parts",
  ],
  insurance: {
    researchReferences: ["New India Assurance", "United India Insurance"],
    publicNote:
      "The supplied research references cashless-network relationships with New India Assurance and United India Insurance. Current insurer participation and case eligibility should be confirmed with the workshop before repair work begins.",
  },
  confirmationGates: {
    establishedYear:
      "The supplied research lists 1996, but the blueprint requires client confirmation before using it as a live trust claim.",
    hours:
      "Opening hours are not confirmed; conflicting public listings were found. Ask customers to call before travelling.",
    vehicleBrands:
      "Exact makes and models currently serviced require client confirmation.",
    insurerNetwork:
      "Current active cashless-insurance relationships require client confirmation.",
    warranties:
      "Parts and labour warranty terms require client confirmation.",
    facilityDetails:
      "Exact bay count, lift count and equipment brands require client confirmation.",
    emergencySupport:
      "Towing or breakdown assistance is not confirmed.",
    whatsapp:
      "The official business WhatsApp number is not confirmed in the supplied research.",
    email:
      "The primary customer-facing email address is not confirmed in the supplied research.",
    ownership:
      "Ownership / leadership is unresolved in the supplied research and should not be published until confirmed.",
  },
} as const;

export const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=283%20V-526%20Govt%20Rest%20House%20Kattoor%20Road%20Irinjalakuda%20Thrissur%20680121%20Kerala";
