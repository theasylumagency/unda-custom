export type FragmentIcon =
  | "user"
  | "database"
  | "alert"
  | "edit"
  | "shield"
  | "review"
  | "action"
  | "decision";

export const knowledgeFragments = [
  { id: "approval", label: "APPROVAL REQUIRED", mobileLabel: "YOUR RULES", icon: "user", emphasis: true },
  { id: "history", label: "CHECK CUSTOMER HISTORY", icon: "database" },
  { id: "exceptions", label: "ESCALATE EXCEPTIONS", icon: "alert" },
  { id: "crm", label: "UPDATE CRM", icon: "edit" },
  { id: "policy", label: "RESPONSE POLICY 04", icon: "shield" },
  { id: "review", label: "MANAGER REVIEW", mobileLabel: "HUMAN APPROVAL", icon: "review" },
  { id: "action", label: "DEFINED ACTION", mobileLabel: "DEFINED ACTION", icon: "action" },
  { id: "decision", label: "HUMAN DECISION", icon: "decision" },
] satisfies ReadonlyArray<{
  id: string;
  label: string;
  mobileLabel?: string;
  icon: FragmentIcon;
  emphasis?: boolean;
}>;

export const operatorModules = [
  { id: "context", title: "CONTEXT", description: "Understands what’s happening" },
  { id: "rules", title: "RULES", description: "Knows what to do and what to avoid" },
  { id: "actions", title: "ACTIONS", description: "Carries out defined work" },
  { id: "boundaries", title: "BOUNDARIES", description: "Operates within limits you set" },
] as const;
