# Smart Prompts for Avatar Generator Development

## ✅ Effective Prompts:

### For New Features:
- "Add beard styles to the avatar following SOLID principles"
- "Create an accessories feature (hats, glasses) using the existing pattern"
- "Refactor AvatarGenerator.tsx to follow SRP - extract business logic"

### For Refactoring:
- "Split this component following interface segregation principle"  
- "Extract the avatar state management to a custom hook"
- "Create a configuration object for all avatar features (OCP)"

## ❌ Avoid These Prompts:
- "Make it work" (too vague)
- "Add everything at once" (violates SRP)
- "Just fix the component" (no architectural guidance)

## 🎯 Prompt Templates:

**New Feature**: "Add {feature} to avatar with styles: {style1, style2, style3}. Follow existing pattern: useAvatarFeature hook + FeatureControl component + CSS classes .avatar-{feature}-{style}"

**Refactoring**: "Refactor {component} to follow SRP. Extract {specific_logic} to custom hook. Keep component under 50 lines."

**Architecture**: "Implement {feature} using dependency inversion. Create abstraction in domain/ports, implementation in infrastructure."