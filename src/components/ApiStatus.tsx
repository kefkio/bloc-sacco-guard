import { useEffect, useState } from 'react'

const ApiStatus = () => {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/health')
      .then(r => r.json())
      .then(d => { if (!cancelled) setOk(Boolean(d?.ok)) })
      .catch(() => { if (!cancelled) setOk(false) })
    return () => { cancelled = true }
  }, [])

  if (ok === null) return <span className="text-xs text-muted-foreground">API…</span>
  return ok
    ? <span className="text-xs text-green-600">API OK</span>
    : <span className="text-xs text-red-600">API Down</span>
}

export default ApiStatus


