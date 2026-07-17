export const operatorProfilesCopy = {
  eyebrow: "04 — WHAT AN OPERATOR CAN TAKE ON",
  headlineLead: "An operator does not need to run your whole business.",
  headlineClose: "It needs to take responsibility for the right part of it.",
  supporting:
    "Start with one clear area of work. Define what should keep moving, what the operator can handle and when a person should step in.",
  closingLead: "Different businesses need different operators.",
  closingSupport:
    "The principle stays the same: one clear responsibility, the right context and defined limits.",
  cta: "Explore operator solutions",
} as const;

export const operatorProfiles = [
  {
    id: "social",
    number: "01",
    name: "SOCIAL MEDIA OPERATOR",
    availability: "READY-MADE OPERATOR",
    summary: "Keeps your brand present, consistent and moving week after week.",
    visualLabel:
      "A recurring social media operating cycle from brand context and planning through review, publishing and learning.",
    details: [
      {
        term: "RESPONSIBILITY",
        description: "Keep the brand’s social presence active, consistent and aligned with the business.",
      },
      {
        term: "WATCHES",
        description: "The content calendar, brand context, upcoming offers, events and approved priorities.",
      },
      {
        term: "DOES",
        description: "Plans the weekly content, prepares posts, coordinates review and publishes approved material on schedule.",
      },
      {
        term: "BRINGS TO YOU",
        description: "New campaigns, sensitive brand decisions and anything that needs direct founder input.",
      },
    ],
  },
  {
    id: "requests",
    number: "02",
    name: "CUSTOMER REQUEST OPERATOR",
    availability: "CUSTOM OPERATOR",
    summary: "Keeps each incoming request moving toward the right next action.",
    visualLabel:
      "An incoming customer request moving through context, checks, response and follow-up, with unusual cases escalated to a person.",
    details: [
      {
        term: "RESPONSIBILITY",
        description: "Keep incoming customer requests moving from the first message to the right next action.",
      },
      {
        term: "WATCHES",
        description: "Messages, website enquiries, customer information, product or service details and previous conversations.",
      },
      {
        term: "DOES",
        description: "Understands the request, checks the relevant information, prepares or sends permitted responses, updates the record and follows up when needed.",
      },
      {
        term: "BRINGS TO YOU",
        description: "Unusual requests, complaints, special conditions and decisions outside its defined limits.",
      },
    ],
  },
] as const;

export const socialCycle = [
  { id: "context", label: "BRAND CONTEXT" },
  { id: "plan", label: "WEEKLY PLAN" },
  { id: "create", label: "CREATE" },
  { id: "review", label: "REVIEW", human: true },
  { id: "publish", label: "PUBLISH" },
  { id: "learn", label: "LEARN" },
] as const;

export const requestFlow = [
  { id: "request", label: "REQUEST" },
  { id: "context", label: "CONTEXT" },
  { id: "check", label: "CHECK" },
  { id: "respond", label: "RESPOND" },
  { id: "follow-up", label: "FOLLOW UP" },
  { id: "complete", label: "COMPLETE" },
] as const;
