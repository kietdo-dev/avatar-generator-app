# SOLID Refactor Playbook for Avatar Generator App

A practical, repo-specific guide to incrementally refactor this codebase for SOLID principles, atomic design, and long-term maintainability.

---

## 1) Repo Architecture Summary

**Entry Points:**
- [`src/main.tsx`](src/main.tsx): React app bootstrap, renders [`App`](src/App.tsx) into `#root`.
- [`index.html`](index.html): Vite entry, loads `/src/main.tsx`.

**Routing:**  
_No explicit routing detected (no react-router or similar)._

**Providers/Global State:**  
_No global state/context providers found in the provided structure._

**Main Directories:**
- `src/components/atoms/`: Smallest UI units (e.g., [`ItemSelect.tsx`](src/components/atoms/ItemSelect.tsx))
- `src/components/molecules/`: Composed UI (e.g., [`AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx), [`AvatarGenerator.css`](src/components/molecules/AvatarGenerator.css))
- `src/constants/`: Static data (e.g., [`items.ts`](src/constants/items.ts))
- `src/interfaces/`: TypeScript interfaces (e.g., [`index.ts`](src/interfaces/index.ts))
- `src/assets/`: Images/SVGs

**Data Flow (Textual Diagram):**
```
User Input (atoms: ItemSelect) 
  → Molecule (AvatarGenerator): manages state, renders avatar, handles feature selection
    → Constants (items.ts): provides options
    → Interfaces (index.ts): types for props/state
  → App.tsx: wraps AvatarGenerator, may add layout/global styles
  → main.tsx: renders App
```
- No evidence of API fetching or side-effects; all data appears local/static.

---

## 2) SOLID Smells Inventory (Current State)

### Single Responsibility Principle (SRP)
- [`src/components/molecules/AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx):  
  - Handles state, UI rendering, feature selection, and possibly export logic (if html2canvas is used here).
- [`src/App.tsx`](src/App.tsx):  
  - May act as both layout and feature orchestrator.

### Open/Closed Principle (OCP)
- [`AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx):  
  - Likely uses if/switch for feature selection (eyes, nose, mouth, etc.), which could be strategy/adapters.

### Liskov Substitution Principle (LSP)
- Atoms/molecules may expect certain prop shapes; risk if props are loosely typed or optional fields are misused.

### Interface Segregation Principle (ISP)
- Props interfaces in [`AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx) and [`ItemSelect.tsx`](src/components/atoms/ItemSelect.tsx) may be "kitchen sink" types.

### Dependency Inversion Principle (DIP)
- UI components may directly import constants or utility logic, rather than using domain interfaces/ports.

---

### Top 10 Offenders (Prioritized)

1. **[`src/components/molecules/AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx)**
   - God component: state, rendering, selection logic, possibly export.
   - SRP, OCP, ISP, DIP violations.

2. **[`src/App.tsx`](src/App.tsx)**
   - Potentially mixes layout, state, and feature orchestration.

3. **[`src/components/atoms/ItemSelect.tsx`](src/components/atoms/ItemSelect.tsx)**
   - May have broad props interface; check for type safety and SRP.

4. **[`src/constants/items.ts`](src/constants/items.ts)**
   - If directly imported everywhere, DIP violation.

5. **[`src/interfaces/index.ts`](src/interfaces/index.ts)**
   - Check for "mega" interfaces used in multiple places.

6. **Prop drilling chains** in AvatarGenerator → ItemSelect.

7. **Non-null assertions** in [`src/main.tsx`](src/main.tsx):  
   - `document.getElementById('root')!`

8. **No test setup** detected (no `test/`, `__tests__`, or Vitest/Jest config).

9. **ESLint config**:  
   - Some rules off (e.g., `no-use-before-define`, `dot-notation`), but strict on type safety (`no-explicit-any`).

10. **tsconfig**:  
    - `strict: true`, but check for `skipLibCheck`, `noEmit`, and unused parameter rules.

---

## 3) Incremental Refactor Plan (Safe, Small PRs)

### Milestone 1: Decompose AvatarGenerator

- [ ] **Extract stateful logic to `useAvatarGenerator` hook**
  - Current: State, handlers, and rendering in one file.
  - Proposed:  
    - `useAvatarGenerator.ts` (handles state, selection, export logic)
    - Presentational `AvatarGenerator` (props-driven)
  - Steps:
    1. Move all state/handlers to `src/hooks/useAvatarGenerator.ts`.
    2. Refactor `AvatarGenerator.tsx` to accept props from the hook.
    3. Update `App.tsx` to use the hook and pass props.
    4. Acceptance: No UI/behavior change, all tests pass.
    5. Rollback: Revert to single file if issues.

- [ ] **Split feature rendering into subcomponents**
  - Current: All facial features rendered inline.
  - Proposed:  
    - `FaceShape.tsx`, `Eyes.tsx`, `Nose.tsx`, `Mouth.tsx`, `Hair.tsx` in `molecules/` or `atoms/`.
  - Steps:
    1. Extract each feature to its own presentational component.
    2. Pass only relevant props.
    3. Acceptance: Avatar renders as before.
    4. Rollback: Inline rendering.

### Milestone 2: Interface Segregation & Type Safety

- [ ] **Refine Props interfaces**
  - Current: Large, possibly optional-heavy interfaces.
  - Proposed:  
    - Split into smaller, feature-specific interfaces.
    - Use discriminated unions for feature types.
  - Steps:
    1. Audit all props in `AvatarGenerator`, `ItemSelect`.
    2. Refactor to smaller interfaces.
    3. Acceptance: Type errors resolved, no runtime breakage.
    4. Rollback: Restore previous interfaces.

- [ ] **Remove non-null assertions**
  - Current: `document.getElementById('root')!`
  - Proposed:  
    - Add runtime check or fallback.
  - Steps:
    1. Replace with safe check and error if not found.
    2. Acceptance: App still mounts, error thrown if root missing.
    3. Rollback: Restore assertion.

### Milestone 3: Dependency Inversion & OCP

- [ ] **Introduce domain ports for feature options**
  - Current: UI imports constants directly.
  - Proposed:  
    - Define interfaces in `src/interfaces/featureOptions.ts`.
    - Provide via context or factory.
  - Steps:
    1. Create interface for feature options.
    2. Refactor consumers to depend on interface.
    3. Acceptance: No direct imports from constants in UI.
    4. Rollback: Restore direct imports.

- [ ] **Replace if/switch with strategy pattern for feature rendering**
  - Current: Branching logic for feature selection.
  - Proposed:  
    - Define strategy interface for rendering features.
    - Implement adapters for each feature.
  - Steps:
    1. Identify branching logic.
    2. Refactor to strategy/adapters.
    3. Acceptance: All features render via strategy.
    4. Rollback: Restore branching.

---

## 4) Guardrails and Automation

### `.eslintrc.cjs`
```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'simple-import-sort',
    'import',
    'react-hooks',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'max-lines-per-function': ['warn', 50],
    'complexity': ['warn', 8],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-cycle': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Cross-layer imports are not allowed. Use public interfaces.',
          },
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'react-refresh/only-export-components': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        'max-lines': ['warn', 300],
      },
    },
  ],
};
```

### `.dependency-cruiser.cjs`
```js
module.exports = {
  forbidden: [
    {
      name: 'no-cross-atomic-layer',
      severity: 'error',
      comment: 'Atoms cannot import molecules/organisms/pages. Molecules cannot import organisms/pages.',
      from: { path: '^src/components/atoms' },
      to: { path: '^src/components/(molecules|organisms|pages)' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'No circular dependencies allowed.',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: 'node_modules' },
    tsPreCompilationDeps: false,
    combinedDependencies: true,
    reporterOptions: {
      dot: { collapsePattern: 'node_modules/[^/]+' },
    },
  },
};
```

### `.github/PULL_REQUEST_TEMPLATE.md`
```md
# SOLID Refactor PR Checklist

- [ ] SRP: Each component/hook has one reason to change
- [ ] OCP: New features/extensions via strategy/adapters, not if/switch
- [ ] LSP: No prop contract surprises; prefer composition
- [ ] ISP: No "kitchen sink" props/context; interfaces are focused
- [ ] DIP: UI depends on domain interfaces, not infra/constants
- [ ] No prop drilling chains >2 levels
- [ ] No cross-layer imports (atoms → molecules, etc.)
- [ ] No circular dependencies (run `pnpm dep:check`)
- [ ] All types are explicit; no `any` or unsafe casts
- [ ] All tests pass (if present)
- [ ] Lint and format pass (`pnpm lint`, `pnpm format`)
- [ ] Characterization tests for risky changes

**Describe what this PR does and why:**
```

### `package.json` scripts
```json
// Add or update in package.json "scripts":
{
  "lint": "eslint . --max-warnings=0",
  "lint:fix": "eslint . --fix",
  "dep:check": "dependency-cruiser --config .dependency-cruiser.cjs src",
  "dep:graph": "dependency-cruiser --config .dependency-cruiser.cjs --output-type dot src | dot -Tsvg -o dependency-graph.svg",
  "prune": "pnpm dedupe && pnpm install"
}
```

---

## 5) Patterns and Recipes by Principle

### SRP: Container/Presentational Split + useX Hook

**Example:**
```ts
// src/hooks/useAvatarGenerator.ts
import { useState } from "react";
import { AvatarOptions } from "../interfaces";

export function useAvatarGenerator(initial: AvatarOptions) {
  const [options, setOptions] = useState(initial);
  // ...handlers
  return { options, setOptions /*, ...handlers */ };
}
```
```tsx
// src/components/molecules/AvatarGenerator.tsx
import { AvatarOptions } from "../../interfaces";
type Props = AvatarOptions & { onChange: (opts: AvatarOptions) => void };
export function AvatarGenerator({ face, eyes, nose, mouth, hair, onChange }: Props) {
  // render only
}
```

### OCP: Strategy Interface + Adapters

**Example:**
```ts
// src/interfaces/FeatureRenderer.ts
export interface FeatureRenderer {
  render(option: string): JSX.Element;
}
```
```ts
// src/components/features/EyesRenderer.tsx
import { FeatureRenderer } from "../../interfaces/FeatureRenderer";
export const EyesRenderer: FeatureRenderer = {
  render: (option) => <div className={`avatar-eyes-${option}`} />,
};
```
```tsx
// Usage in AvatarGenerator
const featureRenderers = { eyes: EyesRenderer, /* ... */ };
featureRenderers[feature].render(option)
```

### LSP: Prefer Composition

**Instead of:**
```tsx
// Subclassing or prop shape surprises
<ItemSelect {...props as any} />
```
**Do:**
```tsx
// Compose with explicit, focused props
<ItemSelect value={eyes} onChange={setEyes} options={eyeOptions} />
```

### ISP: Break Large Props

**Before:**
```ts
type AvatarProps = {
  face: string;
  eyes: string;
  nose: string;
  mouth: string;
  hair: string;
  onChange: (opts: AvatarProps) => void;
};
```
**After:**
```ts
type FaceProps = { face: string; onChange: (face: string) => void };
type EyesProps = { eyes: string; onChange: (eyes: string) => void };
// ...etc
```
**Caller:**
```tsx
<FaceSelect face={face} onChange={setFace} />
<EyesSelect eyes={eyes} onChange={setEyes} />
```

### DIP: Domain Ports and Infra Adapters

**Define:**
```ts
// src/interfaces/FeatureOptionsProvider.ts
export interface FeatureOptionsProvider {
  getOptions(feature: string): string[];
}
```
**Adapter:**
```ts
// src/constants/itemsAdapter.ts
import { items } from "./items";
export const ItemsFeatureOptionsProvider: FeatureOptionsProvider = {
  getOptions: (feature) => items[feature] || [],
};
```
**Wiring:**
```tsx
// Provide via context or prop
<AvatarGenerator featureOptionsProvider={ItemsFeatureOptionsProvider} />
```

---

## 6) Copilot-First Workflow (“Vibe Coding”)

**Step-by-step:**
1. **Explore:**  
   - "Show me all props interfaces in `src/components/molecules/AvatarGenerator.tsx`."
   - "List all stateful logic in `AvatarGenerator`."
2. **Plan:**  
   - "Suggest a container/presentational split for `AvatarGenerator`."
   - "What are the atomic design violations in `src/components/`?"
3. **Refactor:**  
   - "Extract state logic from `AvatarGenerator` to a `useAvatarGenerator` hook."
   - "Split the props interface for `ItemSelect` into smaller ones."
4. **Test:**  
   - "Generate characterization tests for `AvatarGenerator`."
5. **PR:**  
   - "Draft a PR description using the SOLID checklist."
6. **Review:**  
   - "Check for prop drilling and cross-layer imports in this diff."

**Tips:**
- Keep PRs <200 lines, 1-2 files.
- Add/maintain characterization tests before refactor.
- Run `pnpm lint`, `pnpm dep:check` before PR.
- If stuck, reset context: "Summarize the current state of `AvatarGenerator` after my last commit."

---

## 7) Risk, Testing, and Rollout

- **Characterization tests:**  
  - Add for [`AvatarGenerator.tsx`](src/components/molecules/AvatarGenerator.tsx) covering all feature combinations.
- **Performance/regression hotspots:**  
  - Avatar rendering, export logic (if html2canvas is used).
- **Feature flags/dark launch:**  
  - If adding new rendering logic, gate with a prop or env var.

---

## 8) Backlog

1. **Add Vitest/Jest setup and basic tests**  
   - Impact: High (test safety); Difficulty: Low  
   - Files: `src/components/molecules/AvatarGenerator.tsx`, `src/components/atoms/ItemSelect.tsx`
2. **Introduce routing for multi-page flows**  
   - Impact: Medium; Difficulty: Medium  
   - Files: `src/App.tsx`
3. **Audit all `any` and non-null assertions**  
   - Impact: High; Difficulty: Low  
   - Files: `src/main.tsx`, all components
4. **Enforce atomic design boundaries with dependency-cruiser**  
   - Impact: High; Difficulty: Low  
   - Files: `.dependency-cruiser.cjs`
5. **Document all interfaces in `src/interfaces/`**  
   - Impact: Medium; Difficulty: Low  
   - Files: `src/interfaces/index.ts`
6. **Add global error boundary**  
   - Impact: Medium; Difficulty: Medium  
   - Files: `src/App.tsx`
7. **Extract all feature logic to strategies/adapters**  
   - Impact: High; Difficulty: Medium  
   - Files: `src/components/molecules/AvatarGenerator.tsx`, `src/interfaces/FeatureRenderer.ts`
8. **Add visual regression tests**  
   - Impact: Medium; Difficulty: High  
   - Files: All UI components

---

## Next Pass TODO

- Add full characterization test examples for risky components.
- Expand on performance monitoring/optimization strategies.
- Provide more detailed migration/rollback scripts.
- Add sample Vitest/Jest config and test files.
- Document example dependency graph output and review process.

---