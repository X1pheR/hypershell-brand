import { Badge } from "@/components/ui/badge"

import type { RecordSample } from "./record-inspection-data"

export function RecordDetails({ record }: { record: RecordSample }) {
  return <dl className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-3 gap-y-3 text-sm">
    <dt className="text-muted-foreground">ID</dt><dd>{record.id}</dd>
    <dt className="text-muted-foreground">Type</dt><dd>{record.kind}</dd>
    <dt className="text-muted-foreground">Status</dt><dd><Badge variant="outline">{record.status}</Badge></dd>
    <dt className="text-muted-foreground">Owner</dt><dd>{record.owner}</dd>
    <dt className="text-muted-foreground">Summary</dt><dd className="min-w-0 break-words">{record.summary}</dd>
  </dl>
}
