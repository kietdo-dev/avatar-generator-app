# SOLID Principles Quick Reference

## Quick Checks When Coding

### 🎯 Single Responsibility Principle (SRP)
**Question**: "Does this component/function do only ONE thing?"

**Red Flags**:
- Component handles both UI rendering AND business logic
- Function does multiple unrelated tasks
- Component manages its own data fetching AND validation

**Solutions**:
```typescript
// ❌ Bad: Doing too much
const UserProfile = () => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState();
  
  // Data fetching
  useEffect(() => { /* fetch user */ }, []);
  
  // Validation  
  const validateUser = () => { /* validation logic */ };
  
  // Rendering
  return <div>...</div>;
};

// ✅ Good: Separated concerns
const useUserData = () => { /* only data fetching */ };
const useUserValidation = () => { /* only validation */ };
const UserProfile = ({ user, onValidate }) => { /* only rendering */ };
```

### 🔓 Open/Closed Principle (OCP)
**Question**: "Can I extend this without modifying the source?"

**Techniques**:
- Use composition via props
- Generic types for reusability
- Configuration objects instead of hardcoded values

```typescript
// ✅ Good: Extensible via props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return <button className={`btn btn-${variant}`} {...props} />;
};
```

### 🔄 Liskov Substitution Principle (LSP)
**Question**: "Can I replace this with its interface without breaking anything?"

**Focus**: Strong TypeScript typing and consistent contracts

```typescript
// ✅ Good: Consistent interface
interface DataDisplay<T> {
  data: T;
  onSelect: (item: T) => void;
}

const UserList: FC<DataDisplay<User>> = ({ data, onSelect }) => { /* ... */ };
const ProductList: FC<DataDisplay<Product>> = ({ data, onSelect }) => { /* ... */ };
```

### 🧩 Interface Segregation Principle (ISP)
**Question**: "Does this component need ALL these props?"

**Red Flags**:
- Props interface with 10+ properties
- Optional props everywhere
- Component only uses 2 out of 8 props

```typescript
// ❌ Bad: Too many responsibilities
interface BadProps {
  userData: User;
  onSaveUser: () => void;
  onDeleteUser: () => void;
  productData: Product;
  onSaveProduct: () => void;
  themeConfig: Theme;
  localeConfig: Locale;
}

// ✅ Good: Focused interfaces
interface UserControlsProps {
  user: User;
  onSave: () => void;
  onDelete: () => void;
}

interface ThemeProps {
  theme: Theme;
}
```

### 🔄 Dependency Inversion Principle (DIP)
**Question**: "Am I depending on concrete implementations or abstractions?"

**Guidelines**:
- Import from `domain/ports` not `infrastructure`
- Use dependency injection via props
- Avoid direct API calls in components

```typescript
// ❌ Bad: Direct dependency on implementation
import { fetchUserFromAPI } from '../api/userAPI';

// ✅ Good: Depend on abstraction
import { getUserData } from '@src/domain/ports/userService';

const UserProfile: FC<{ getUserData: () => Promise<User> }> = ({ getUserData }) => {
  // Component doesn't know HOW data is fetched
};
```

## Pre-Commit Checklist

Before committing code, ask:

- [ ] **SRP**: Does each file have a single, clear purpose?
- [ ] **OCP**: Can I extend functionality without modifying existing code?
- [ ] **LSP**: Are my interfaces consistent and substitutable?
- [ ] **ISP**: Are my prop interfaces minimal and focused?
- [ ] **DIP**: Am I depending on abstractions, not concrete implementations?

## Component Size Guidelines

- **Atoms**: 10-30 lines
- **Molecules**: 30-80 lines  
- **Organisms**: 50-150 lines
- **Pages**: Mostly composition, minimal logic

If a component exceeds these lines, consider breaking it down!

## Common Refactoring Patterns

### Extract Custom Hook (SRP)
```typescript
// Before: Component doing too much
const MyComponent = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);
  
  return loading ? <Spinner /> : <DataDisplay data={data} />;
};

// After: Extracted hook
const useDataFetching = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);
  
  return { data, loading };
};

const MyComponent = () => {
  const { data, loading } = useDataFetching();
  return loading ? <Spinner /> : <DataDisplay data={data} />;
};
```

### Composition over Inheritance (OCP)
```typescript
// Good: Flexible composition
const Modal: FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose
}) => (
  <div className="modal">
    <button onClick={onClose}>×</button>
    {children}
  </div>
);

// Usage: Can put anything inside
<Modal onClose={handleClose}>
  <UserForm />
</Modal>

<Modal onClose={handleClose}>
  <ProductList />
</Modal>
```
