import { describe, expect, it } from "vitest"
import { activity, members } from "./data"

describe("synthetic workbench records", () => {
  it("uses stable unique member identifiers and emails", () => {
    expect(new Set(members.map(m => m.id)).size).toBe(members.length)
    expect(new Set(members.map(m => m.email)).size).toBe(members.length)
  })
  it("keeps all member statuses and roles within documented options", () => {
    expect(members.every(m => ["Active", "Invited", "Suspended"].includes(m.status))).toBe(true)
    expect(members.every(m => ["Owner", "Editor", "Viewer"].includes(m.role))).toBe(true)
  })
  it("has nonempty synthetic activity records", () => {
    expect(activity.length).toBeGreaterThan(0)
    expect(activity.every(item => item.who && item.action && item.time)).toBe(true)
  })
})
