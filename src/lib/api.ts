export type Health = { ok: boolean; ts: number };
export type NextId = { nextId: number };

export async function getHealth(): Promise<Health | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function getNextId(): Promise<NextId | null> {
  try {
    const res = await fetch('/api/nextId');
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
