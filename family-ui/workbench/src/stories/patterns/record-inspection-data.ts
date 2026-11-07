// Fictional, identical across all native inspection comparisons.
// Product schemas, routes, authorization and writes remain product-owned.
export const records = [
  { id: "EX-101", name: "Inventory review", kind: "Review", status: "Ready", owner: "Ada", summary: "Fictional inventory changes; no live source or backend." },
  { id: "EX-102", name: "Service lifecycle check", kind: "Check", status: "Pending", owner: "Morgan", summary: "This check is synthetic and its status is not a health signal." },
  { id: "EX-103", name: "Documentation refresh", kind: "Draft", status: "Draft", owner: "Robin", summary: "A sample draft with no mutation or save action." },
] as const
export type RecordSample = (typeof records)[number]
