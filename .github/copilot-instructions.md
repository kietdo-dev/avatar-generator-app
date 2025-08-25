# Copilot Repository Instructions — React + TypeScript (Vite, pnpm), Atomic Design, SOLID
Owner: @LyHoaNam • Last updated: 2025-08-25

Scope
- Tech: React + TypeScript, Vite, pnpm.
- Atomic UI folders: src/components/atoms → molecules → organisms → pages.
- Cross-cutting: src/hooks, src/domain/ports, src/infra/adapters, src/constants, src/interfaces (and/or src/types).
- Goal: Suggestions and edits must follow SOLID, atomic boundaries, and clean dependency direction.

Operating procedure (always)
1) Clarify
- Restate the task in 1–2 sentences. If layer/requirements are unclear, ask targeted questions.
2) Plan
- Propose a short, ordered checklist with exact file paths, the SRP split (presentational/container/hook), ports to define/use, and tests to add/update. Wait for approval.
3) Diff
- Show unified diffs for each file. Keep changes minimal and reversible. Do not apply yet.
4) Apply
- After approval, apply the diffs. If behavior may change, write/update characterization tests first.
5) Validate
- Re-scan your diff against the rules below. List risks and propose a PR summary (Before/After, risks, test plan).

Repository rules (apply in all suggestions)
- Atomic boundaries
  - Never import “up” the hierarchy:
    - atoms must not import molecules/organisms/pages
    - molecules must not import organisms/pages
    - organisms must not import pages
  - Avoid cycles; prefer one-way data flow.

- Placement map
  - UI: src/components/{atoms|molecules|organisms|pages}
  - State/effects: src/hooks
  - Domain contracts: src/domain/ports
  - Infra implementations: src/infra/adapters
  - Types/interfaces: src/interfaces (and/or src/types). Prefer domain contracts in src/domain/ports.

- SOLID (actionable)
  - SRP: Separate fetch/transform/render.
    - useX hook = effects + state; Presentational component = render-only; Container = wiring-only.
  - OCP: Add behavior via small interfaces/strategies or discriminated unions; avoid growing if/switch forests.
  - LSP: Don’t surprise callers; prefer composition over inheritance; keep prop contracts stable.
  - ISP: Split Props/contexts into focused interfaces (DataProps, ActionProps, ViewProps).
  - DIP: UI depends on domain ports (src/domain/ports/*). Infra lives in src/infra/adapters/* and is injected via context/factories. No direct infra imports in UI.

- TypeScript hygiene
  - No new any, unsafe casts, or non-null assertions.
  - Prefer interface for object shapes; explicitly type public exports.
  - Use discriminated unions for variant states.

- UI/a11y/performance
  - Presentational components contain no side-effects or data fetching.
  - Provide accessible names/labels for controls; use role="alert" for error UI.
  - For lists > 50 items, consider virtualization; avoid expensive work in render; use stable keys and memoization when justified.
  - Co-locate CSS with components; prefer BEM-ish class names; avoid global overrides.

Change safety defaults
- Prefer additive, smallest-possible changes; do not change public APIs without explicit approval.
- For risky refactors, write characterization tests first, then refactor.

Preferred minimal examples
```ts
// DIP: domain port
// src/domain/ports/NotificationsPort.ts
export interface NotificationsPort {
  list(limit?: number): Promise<Array<{ id: string; text: string; read: boolean }>>;
}
```

```tsx
// SRP: presentational props (no I/O)
export interface NotificationsViewProps {
  items: Array<{ id: string; text: string; read: boolean }>;
  loading: boolean; error: unknown;
  onMarkRead(id: string): void;
}
```

What not to do
- No cross-layer imports that violate atoms→molecules→organisms→pages.
- No side-effects in presentational components.
- No broad conditionals when a strategy/adapter or union type fits.
- Don’t widen types or weaken contracts to “make it compile.”

If uncertain
- Ask 1–2 clarifying questions before editing.
- Offer two minimal alternatives with trade-offs; prefer the safer, smaller change.

References
- #docs/SOLID-Refactor-Playbook.md (repo-specific refactor steps and guardrails)