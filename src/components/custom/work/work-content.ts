export const workCopy = {
  eyebrow: "02 — THE WORK ALREADY EXISTS",
  headlineLead: "Most businesses do not need more software.",
  headlineClose: "They need the work they already do to run better.",
  supporting:
    "Requests, decisions, information and follow-ups already move through your business every day.",
  supportingClose:
    "The problem is not that the work does not exist. It is that too much of it still depends on memory, repetition and manual coordination.",
  closing: "This is where a custom operator begins.",
  closingSupport:
    "Built around the work your business already does — not around a generic AI tool.",
  closingAction: "Let’s talk about your business",
} as const;

export const customerRequestSteps = [
  { id: "message", label: "New customer message", meta: "MESSAGE" },
  { id: "forward", label: "Forwarded to another chat", meta: "INTERNAL CHAT" },
  { id: "sheet", label: "Someone opens a spreadsheet", meta: "STOCK SHEET" },
  { id: "owner", label: "Someone asks the owner", meta: "APPROVAL" },
] as const;

export const reportSources = [
  { id: "sales", label: "Sales spreadsheet", value: "184 orders", kind: "sheet" },
  { id: "campaign", label: "Campaign results", value: "+12.4%", kind: "metric" },
  { id: "orders", label: "Orders list", value: "39 pending", kind: "list" },
  { id: "messages", label: "Customer messages", value: "67 open", kind: "messages" },
] as const;

export const decisionQuestions = [
  { id: "approve", label: "Can we approve this?", meta: "SALES · 11:26" },
  { id: "price", label: "Which price should I use?", meta: "ORDERS · 11:29" },
  { id: "client", label: "What should I tell the client?", meta: "SUPPORT · 11:31" },
  { id: "valid", label: "Is this still valid?", meta: "OPERATIONS · 11:34" },
] as const;

export const operatorFlow = ["REQUEST", "CHECK", "DECIDE", "RESPOND", "FOLLOW UP"] as const;

export const sceneLabels = [
  { id: "request", number: "01", label: "Customer request" },
  { id: "report", number: "02", label: "Weekly report" },
  { id: "decision", number: "03", label: "One person" },
  { id: "flow", number: "04", label: "Operator flow" },
  { id: "closing", number: "05", label: "Begin here" },
] as const;
