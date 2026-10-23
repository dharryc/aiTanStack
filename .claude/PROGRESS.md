# Student progress notes (for the tutor to read at session start)

Last updated: 2026-10-23

## Setup
- `npm install` and `npm run dev:all` work; app loads at http://localhost:5173.

## Stage 1: Why and setup — DONE
- Student wrapped `<App />` in `QueryClientProvider` in `frontend/src/main.tsx` with a `QueryClient`.
- Explained correctly why the provider is needed (React context; all descendants can use the hooks, like an auth wrapper).
- Understood that recreating a `QueryClient` on re-render would give an empty cache. Agreed it's fine inline in `main.tsx` since that code runs once. Optional: hoist to `const queryClient = new QueryClient()` and add `()`.

## Stage 2: Read employee list — IN PROGRESS
- Explained `useQuery`, `queryKey`, `queryFn`.
- Next task: student writes a fetch function in `frontend/src/api.ts` that GETs `http://localhost:3001/employees` and returns parsed JSON. Not started yet.
- Still to do: `useQuery` in `App.tsx`, explain `isPending` / `isError` / `isFetching`, ask what happens on a failed request.

## Stages 3-5: not started
