export const approachCopy = {
  eyebrow: "03 — WHEN RULES ARE NOT ENOUGH",
  headlineLead: "Rules work when every case looks the same.",
  headlineClose: "Real work rarely does.",
  transition: "That is where we begin.",
  resultLead: "The result is not another generic AI tool.",
  resultClose:
    "It is a clearly defined operational role, built specifically for your business.",
  finalLead: "We do not begin with AI.",
  finalClose: "We begin with the work.",
  cta: "Start with your workflow",
} as const;

export const methodSteps = [
  {
    id: "find-friction",
    number: "01",
    label: "FIND THE FRICTION",
    title: "We find where the work breaks",
    body: "We look for the moments where tasks slow down, information gets lost, the same action is repeated or everything returns to one person for a decision.",
    visualLabel: "A workflow interrupted by repeated tasks, waiting and missing context.",
  },
  {
    id: "choose-approach",
    number: "02",
    label: "CHOOSE THE APPROACH",
    title: "We choose the right kind of solution",
    body: "Not every problem needs an AI operator. Sometimes a clearer rule is enough. Sometimes conventional automation is the right answer. And sometimes the work needs a system that can understand context, handle variation and know when to ask for help.",
    visualLabel: "Three valid paths: a rule, conventional automation or a custom operator.",
  },
  {
    id: "define-role",
    number: "03",
    label: "DEFINE THE ROLE",
    title: "We define the operator’s role",
    body: "Together, we decide what the operator should know, what it can access, what actions it may take and which decisions must remain with a person.",
    visualLabel: "A defined operational role bounded by knowledge, access, actions and limits.",
  },
  {
    id: "build-operator",
    number: "04",
    label: "BUILD AROUND THE BUSINESS",
    title: "We build it around your business",
    body: "We connect the relevant tools and information, test the operator on real situations and refine how it works until it fits the way your business actually operates.",
    visualLabel: "An operational role connected to existing business tools and human review.",
  },
] as const;

export const frictionSignals = [
  "REPEATED TASK",
  "WAITING",
  "MISSING CONTEXT",
  "MANUAL CHECK",
  "APPROVAL NEEDED",
] as const;

export const approachPaths = [
  {
    id: "rule",
    title: "RULE",
    description: "The action is always the same",
  },
  {
    id: "automation",
    title: "AUTOMATION",
    description: "The steps are known in advance",
  },
  {
    id: "operator",
    title: "CUSTOM OPERATOR",
    description: "Context and variation shape the action",
  },
] as const;

export const roleBoundaries = ["KNOWLEDGE", "ACCESS", "ACTIONS", "LIMITS"] as const;

export const businessSystems = [
  "INBOX",
  "SPREADSHEET",
  "CRM",
  "CALENDAR",
  "DOCUMENTS",
  "INTERNAL RULES",
] as const;

export const roleDefinition = [
  ["RESPONSIBILITY", "Customer requests"],
  ["KNOWLEDGE", "Business context"],
  ["ACCESS", "Relevant systems"],
  ["ACTIONS", "Defined work"],
  ["BOUNDARIES", "Human review"],
] as const;
