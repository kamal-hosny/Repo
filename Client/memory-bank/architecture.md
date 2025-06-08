# Architecture Documentation - Student Management System Frontend

## System Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Next.js Pages Router  │  React Components  │  Tailwind CSS │
├─────────────────────────────────────────────────────────────┤
│                     BUSINESS LOGIC LAYER                    │
├─────────────────────────────────────────────────────────────┤
│    Redux Toolkit Store    │    RTK Query    │    Custom Hooks│
├─────────────────────────────────────────────────────────────┤
│                      DATA ACCESS LAYER                      │
├─────────────────────────────────────────────────────────────┤
│        API Clients        │     Caching     │   Local Storage│
├─────────────────────────────────────────────────────────────┤
│                     EXTERNAL SERVICES                       │
└─────────────────────────────────────────────────────────────┘
│               Backend API Server (Node.js/Express)           │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Architecture

#### Frontend Framework Layer
- **Next.js 15.3.3**: React meta-framework
  - **Pages Router**: File-based routing system
  - **Turbopack**: Fast development bundler
  - **Webpack**: Production bundler with optimizations
  - **React 19.0.0**: Core UI library with latest features

#### State Management Layer
- **Redux Toolkit**: Predictable state container
  - **RTK Query**: Server state management with caching
  - **Immer**: Immutable state updates
  - **Redux DevTools**: Development debugging

#### UI/Styling Layer
- **Tailwind CSS 4.x**: Utility-first CSS framework
  - **PostCSS**: CSS processing and transformations
  - **Radix UI**: Accessible component primitives
  - **Class Variance Authority**: Type-safe styling variants

#### Development Tools Layer
- **TypeScript 5.x**: Static type checking
  - **ESLint**: Code quality and consistency
  - **Prettier**: Code formatting (via ESLint)
  - **React Hook Form**: Performant form handling
  - **Zod**: Runtime schema validation

## Component Architecture

### Component Hierarchy
```
App Root (_app.tsx)
├── ReduxProvider
├── Toaster (Global Notifications)
└── PageComponent
    ├── Layout Components
    │   ├── Navigation
    │   ├── Header
    │   └── Footer
    ├── Feature Components
    │   ├── StudentList
    │   ├── StudentCard
    │   ├── Pagination
    │   └── SearchFilters
    └── UI Primitives
        ├── Button
        ├── Input
        ├── Card
        └── Loading States
```

### Component Design Patterns

#### Compound Component Pattern
```typescript
// Card system with related components
<Card>
  <CardHeader>
    <CardTitle>Student Information</CardTitle>
    <CardDescription>Academic details</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Student data */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### Forward Ref Pattern
```typescript
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-base-styles", className)}
    {...props}
  />
));
```

#### Render Props Pattern (via RTK Query hooks)
```typescript
const StudentList = () => {
  const { data, isLoading, error } = useGetStudentsQuery(page);
  
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;
  
  return <StudentGrid students={data.students} />;
};
```

## State Management Architecture

### Redux Store Structure
```typescript
interface RootState {
  api: {
    queries: {
      // RTK Query managed state
      getStudents: QueryState<PaginatedStudentsResponse>;
      getStudent: QueryState<Student>;
      // ... other queries
    };
    mutations: {
      login: MutationState<LoginResponse>;
      // ... other mutations
    };
  };
}
```

### Data Flow Architecture
```
User Interaction
      ↓
Component Event Handler
      ↓
RTK Query Hook
      ↓
API Request
      ↓
Backend Response
      ↓
RTK Query Cache Update
      ↓
Component Re-render
      ↓
UI Update
```

### Caching Strategy
```typescript
// Cache invalidation tags
tagTypes: ['Student', 'University', 'Course']

// Providing cache tags
providesTags: (result, error, arg) => [
  { type: 'Student', id: 'LIST' },
  ...result?.students.map(({ _id }) => ({ type: 'Student', id: _id }))
]

// Invalidating cache on mutations
invalidatesTags: [{ type: 'Student', id: 'LIST' }]
```

## API Integration Architecture

### API Layer Structure
```
src/app/api/
├── apiSlice.ts          # Base API configuration
├── auth.ts              # Authentication endpoints
└── studentApiSlice.ts   # Student-related endpoints
```

### Request/Response Flow
```typescript
// Request interceptor (baseQuery)
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Response transformation
transformResponse: (response: APIResponse<Student[]>) => {
  return response.data.map(student => ({
    ...student,
    fullName: `${student.firstName} ${student.lastName}`
  }));
}
```

### Error Handling Architecture
```typescript
// Global error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Handle token expiration
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  }
  
  return result;
};
```

## Routing Architecture

### File-Based Routing Structure
```
pages/
├── index.tsx              # Home page (/) - redirects to login
├── login.tsx              # Authentication (/login)
├── 404.tsx                # Error page (/404)
├── _app.tsx               # App wrapper
├── _document.tsx          # Document head
├── api/                   # API routes
│   └── hello.ts           # Example API route
└── students/              # Student routes
    ├── index.tsx          # Student list (/students)
    └── [id].tsx           # Student details (/students/:id)
```

### Route Protection Pattern
```typescript
// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);
  
  if (!isAuthenticated) return <LoadingSpinner />;
  return <>{children}</>;
};
```

## Data Architecture

### Type System Structure
```typescript
// Core data models
interface Student {
  _id: string;
  name: string;
  email: string;
  universityId: {
    _id: string;
    name: string;
  } | null;
  courses: Course[];
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  name: string;
}

// API response types
interface PaginatedStudentsResponse {
  students: Student[];
  currentPage: number;
  totalPages: number;
}

// Form input types
interface LoginInput {
  studentId: string;
  password: string;
}
```

### Data Validation Architecture
```typescript
// Zod schemas for runtime validation
const loginSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Integration with React Hook Form
const form = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    studentId: "",
    password: ""
  }
});
```

## UI Architecture

### Design System Structure
```
components/ui/
├── primitives/           # Base components
│   ├── button.tsx        # Button with variants
│   ├── input.tsx         # Form inputs
│   └── label.tsx         # Form labels
├── composite/            # Complex components
│   ├── card.tsx          # Card system
│   ├── badge.tsx         # Status indicators
│   └── skeleton.tsx      # Loading states
└── layout/               # Layout components
    ├── container.tsx     # Content containers
    └── grid.tsx          # Grid systems
```

### Styling Architecture
```typescript
// Tailwind configuration
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... design tokens
      }
    }
  }
}
```

### Component Variant System
```typescript
// Class Variance Authority pattern
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## Security Architecture

### Authentication Flow
```
1. User submits credentials
   ↓
2. Frontend validates input (Zod)
   ↓
3. API call to /auth/login
   ↓
4. Backend validates & returns JWT
   ↓
5. Frontend stores JWT in localStorage
   ↓
6. JWT included in subsequent requests
   ↓
7. Protected routes check token presence
```

### Security Measures
```typescript
// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// XSS protection (React built-in + validation)
const UserContent = ({ content }: { content: string }) => {
  // React automatically escapes content
  return <div>{content}</div>;
};

// CSRF protection
const baseQuery = fetchBaseQuery({
  credentials: 'include', // Include cookies
  prepareHeaders: (headers) => {
    headers.set('X-Requested-With', 'XMLHttpRequest');
    return headers;
  },
});
```

## Performance Architecture

### Code Splitting Strategy
```typescript
// Route-based splitting (automatic with Next.js)
// pages/students/[id].tsx → students-[id]-[hash].js

// Component-based splitting
const LazyStudentProfile = dynamic(
  () => import('../components/StudentProfile'),
  { loading: () => <ProfileSkeleton /> }
);

// Library splitting
const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
});
```

### Caching Architecture
```typescript
// RTK Query caching
const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<PaginatedStudentsResponse, number>({
      query: (page) => `/students?page=${page}`,
      keepUnusedDataFor: 300, // 5 minutes
      refetchOnMountOrArgChange: true,
      providesTags: ['Student'],
    }),
  }),
});

// Next.js automatic caching
// Static pages cached indefinitely
// API routes cached based on headers
// Images optimized and cached
```

### Bundle Optimization
```typescript
// Next.js configuration
const nextConfig = {
  experimental: {
    optimizeCss: true,
    swcMinify: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
```

## Deployment Architecture

### Build Process
```
Source Code
    ↓
TypeScript Compilation
    ↓
Next.js Build Process
    ↓
Static Generation (where applicable)
    ↓
Bundle Optimization
    ↓
Asset Optimization
    ↓
Production Build Artifacts
```

### Environment Configuration
```typescript
// Environment-specific configurations
interface EnvironmentConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  debugMode: boolean;
  analyticsId?: string;
}

const config: EnvironmentConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  environment: process.env.NODE_ENV as any,
  debugMode: process.env.NODE_ENV === 'development',
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
};
```

## Monitoring and Observability

### Error Tracking Architecture
```typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    console.error('Application Error:', error, errorInfo);
    
    // Send to monitoring service
    if (typeof window !== 'undefined') {
      // Analytics.track('Frontend Error', { error: error.message });
    }
  }
}

// API error tracking
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: () => ({}),
}).enhanceEndpoints({
  addTagTypes: ['Student'],
  endpoints: {
    getStudents: {
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // Log API errors
          console.error('API Error:', error);
        }
      },
    },
  },
});
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send performance metrics to analytics service
  console.log('Performance Metric:', metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Scalability Considerations

### Component Scalability
- **Atomic Design**: Components built from small, reusable pieces
- **Prop Drilling**: Avoided through RTK Query and context
- **Performance**: React.memo and useMemo for expensive operations
- **Bundle Size**: Dynamic imports for large components

### State Scalability
- **Normalized State**: RTK Query handles state normalization
- **Cache Management**: Automatic cache invalidation and cleanup
- **Memory Management**: Unused data automatically garbage collected
- **Concurrent Features**: Ready for React 18 concurrent features

### API Scalability
- **Pagination**: Implemented for large datasets
- **Caching**: Intelligent caching reduces API calls
- **Error Recovery**: Retry logic and graceful degradation
- **Rate Limiting**: Client-side throttling capabilities

This architecture documentation provides a comprehensive understanding of how the Student Management System frontend is structured, enabling developers and architects to quickly grasp the system design and make informed decisions about modifications and enhancements.
