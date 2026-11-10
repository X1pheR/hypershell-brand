export type Member = {
  id: string
  name: string
  email: string
  role: "Owner" | "Editor" | "Viewer"
  status: "Active" | "Invited" | "Suspended"
  joined: string
}

export const members: Member[] = [
  { id: "M-1001", name: "Olivia Carter", email: "olivia@example.test", role: "Owner", status: "Active", joined: "2026-08-12" },
  { id: "M-1002", name: "Noah Jensen", email: "noah@example.test", role: "Editor", status: "Active", joined: "2026-09-08" },
  { id: "M-1003", name: "Ava Mitchell", email: "ava@example.test", role: "Viewer", status: "Invited", joined: "2026-10-14" },
  { id: "M-1004", name: "Liam Walker", email: "liam@example.test", role: "Editor", status: "Active", joined: "2026-09-23" },
  { id: "M-1005", name: "Mia Thompson", email: "mia@example.test", role: "Viewer", status: "Suspended", joined: "2026-07-21" },
  { id: "M-1006", name: "Ethan Brooks", email: "ethan@example.test", role: "Editor", status: "Active", joined: "2026-10-02" },
  { id: "M-1007", name: "Sophia Lewis", email: "sophia@example.test", role: "Viewer", status: "Active", joined: "2026-10-18" },
  { id: "M-1008", name: "James Wilson", email: "james@example.test", role: "Viewer", status: "Invited", joined: "2026-11-01" },
]

export const activity = [
  { who: "Olivia Carter", action: "Updated workspace permissions", time: "10 min ago", kind: "Settings" },
  { who: "Ethan Brooks", action: "Completed the design review", time: "42 min ago", kind: "Review" },
  { who: "Noah Jensen", action: "Published a new report", time: "2 hours ago", kind: "Document" },
  { who: "Ava Mitchell", action: "Received an invitation", time: "Yesterday", kind: "Access" },
]
