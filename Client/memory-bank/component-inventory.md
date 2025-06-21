# Component Inventory - Student Management System Frontend

## Component Architecture Overview

The application follows a component-based architecture with a well-defined design system. Components are organized into categories: UI primitives, composite components, page components, and providers.

## Design System Components (`src/components/ui/`)

### Card System Components

#### Card (`card.tsx`)
**Purpose**: Base container component for content grouping
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: 
- Base: `rounded-xl border bg-card text-card-foreground shadow`
- Customizable via className prop

#### CardHeader (`card.tsx`)
**Purpose**: Header section for card components
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `flex flex-col space-y-1.5 p-6`

#### CardTitle (`card.tsx`)
**Purpose**: Title element within card headers
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `font-semibold leading-none tracking-tight`

#### CardDescription (`card.tsx`)
**Purpose**: Descriptive text in card headers
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `text-sm text-muted-foreground`

#### CardContent (`card.tsx`)
**Purpose**: Main content area of cards
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `p-6 pt-0`

#### CardFooter (`card.tsx`)
**Purpose**: Footer section for actions/additional info
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `flex items-center p-6 pt-0`

### Form Components

#### Button (`button.tsx`)
**Purpose**: Primary interactive element
**Props Interface**: 
```typescript
interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```
**Variants**:
- `default`: Primary button style
- `destructive`: Danger/delete actions
- `outline`: Secondary actions
- `secondary`: Alternative styling
- `ghost`: Minimal styling
- `link`: Text link appearance

**Sizes**:
- `default`: Standard button size
- `sm`: Compact button
- `lg`: Large button
- `icon`: Square icon button

#### Input (`input.tsx`)
**Purpose**: Text input field component
**Props Interface**: `React.ComponentProps<"input">`
**Features**:
- Forward ref implementation
- Tailwind styling with focus states
- Placeholder and disabled state support
- File input compatibility

#### Label (`label.tsx`)
**Purpose**: Form label component with accessibility features
**Dependencies**: `@radix-ui/react-label`
**Props Interface**: 
```typescript
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
VariantProps<typeof labelVariants>
```
**Features**:
- Accessibility-compliant labeling
- Disabled state styling
- Screen reader optimization

### Feedback Components

#### Badge (`badge.tsx`)
**Purpose**: Status indicators and small informational elements
**Props Interface**: 
```typescript
interface BadgeProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants>
```
**Variants**:
- `default`: Standard badge styling
- `secondary`: Alternative badge style
- `destructive`: Error/warning badges
- `outline`: Bordered badge style

#### Skeleton (`skeleton.tsx`)
**Purpose**: Loading state placeholders
**Props Interface**: `React.HTMLAttributes<HTMLDivElement>`
**Styling**: `animate-pulse rounded-md bg-primary/10`
**Usage**: Content loading states, shimmer effects

### Layout Components

#### CardHeader (Standalone) (`card-header.tsx`)
**Purpose**: Reusable header component
**Note**: Duplicate of card header component
**Components**: CardHeader, CardTitle
**Usage**: Standalone header implementations

## Provider Components (`src/components/providers/`)

#### ReduxProvider (`ReduxProvider.tsx`)
**Purpose**: Redux store provider wrapper
**Dependencies**: `react-redux`, `@/app/store`
**Implementation**: 
```typescript
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```
**Usage**: Wraps entire application in `_app.tsx`

## Page Components (`src/pages/`)

### Authentication Pages

#### Login Page (`login.tsx`)
**Purpose**: User authentication interface
**Features**:
- Form validation with React Hook Form
- RTK Query login mutation
- JWT token management
- Loading states and error handling
- Responsive design

**State Management**:
- Local state for form data
- RTK Query for API calls
- localStorage for token persistence

**Dependencies**: 
- `@/app/api/auth` (useLoginMutation)
- `@/types/StudentType` (loginInput interface)
- UI components (Card, Input, Label, Button)
- `react-hot-toast` for notifications

#### Home Page (`index.tsx`)
**Purpose**: Application entry point
**Behavior**: Automatic redirect to login page
**Implementation**: useEffect with router.push

### Student Management Pages

#### Students Listing (`students/index.tsx`)
**Purpose**: Paginated display of all students
**Features**:
- Pagination controls
- Student cards with quick actions
- University navigation links
- Responsive grid layout

**State Management**:
- RTK Query for student data fetching
- Local state for pagination
- URL-based routing for student details

**Components Used**:
- Card system for student display
- Button for pagination
- Loading and error states

#### Student Details (`students/[id].tsx`)
**Purpose**: Individual student profile page
**Features**:
- Dynamic routing with Next.js
- Student information display
- Course enrollment listing
- University information
- Navigation controls

**Data Fetching**: RTK Query with student ID parameter
**Error Handling**: 404 and loading states
**Responsive Design**: Mobile-optimized layout

### Error Pages

#### 404 Page (`404.tsx`)
**Purpose**: Not found error handling
**Features**: 
- User-friendly error message
- Navigation back to students page
- Consistent styling with app theme

### Application Wrapper Pages

#### App Component (`_app.tsx`)
**Purpose**: Global application wrapper
**Features**:
- Redux Provider integration
- Toast notification setup
- Global CSS imports
- Page component rendering

**Configuration**:
```typescript
<ReduxProvider>
  <Toaster
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        background: "#363636",
        color: "#fff",
      },
    }}
  />
  <Component {...pageProps} />
</ReduxProvider>
```

#### Document Component (`_document.tsx`)
**Purpose**: HTML document structure
**Features**: 
- Custom HTML structure
- Language specification
- Body styling classes

## API Integration Components

### RTK Query Slices (`src/app/api/`)

#### Base API Slice (`apiSlice.ts`)
**Purpose**: Central API configuration
**Features**:
- Base query configuration
- Tag-based caching system
- Credential handling

#### Authentication API (`auth.ts`)
**Purpose**: Authentication operations
**Endpoints**:
- `login`: User authentication mutation
- `logout`: Session termination mutation

#### Student API (`studentApiSlice.ts`)
**Purpose**: Student data operations
**Endpoints**:
- `getStudentsPage`: Paginated student listing
- `getStudentById`: Individual student details

## Utility Components

### Utils Library (`src/lib/utils.ts`)
**Purpose**: Utility functions
**Primary Function**: 
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
**Usage**: Intelligent Tailwind class merging

## Component Usage Patterns

### Forward Ref Pattern
Most UI components implement React.forwardRef for ref forwarding:
```typescript
const Component = React.forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => (
    <Element ref={ref} className={cn(baseClasses, className)} {...props} />
  )
);
```

### Variant Pattern
Components use class-variance-authority for type-safe styling variants:
```typescript
const variants = cva("base-classes", {
  variants: {
    variant: { default: "classes" },
    size: { default: "classes" }
  }
});
```

### Composition Pattern
Complex components are built through composition:
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Performance Considerations

### Code Splitting
- Page-level components automatically split by Next.js
- Dynamic imports for heavy components
- Lazy loading implementation where beneficial

### Memoization
- React.memo for expensive renders
- useMemo for computed values
- useCallback for event handlers

### Bundle Optimization
- Tree shaking for unused code
- Component library selective imports
- Minimal dependency footprint

## Accessibility Features

### Screen Reader Support
- Radix UI primitives provide ARIA attributes
- Semantic HTML structure
- Proper heading hierarchy

### Keyboard Navigation
- Tab order management
- Focus indicators
- Keyboard shortcuts where applicable

### Color Contrast
- WCAG compliant color schemes
- High contrast mode support
- Color-blind friendly palettes