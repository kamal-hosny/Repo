# Development Guide - Task-Flow LMS Frontend

## Getting Started

### Prerequisites
```bash
# Required software versions
Node.js: 18.x or higher
npm: 9.x or higher (or yarn 3.x)
Git: Latest stable version

# Recommended development tools
VS Code with extensions:
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer
```

### Project Setup
```bash
# Clone the repository
git clone <repository-url>
cd task-flow-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Environment Configuration
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Project Structure

### Directory Organization
```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (headers, sidebars, etc.)
│   ├── dashboards/      # Role-specific dashboard components
│   ├── features/        # Feature-specific components
│   │   ├── auth/        # Authentication components
│   │   ├── tasks/       # Assignment/task management
│   │   ├── users/       # User management components
│   │   ├── notifications/ # Notification system
│   │   └── files/       # File upload/management
│   ├── shared/          # Cross-cutting components
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── LoadingStates.tsx
│   └── ui/              # Basic UI primitives
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Modal.tsx
├── contexts/            # React context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   ├── LanguageContext.tsx
│   └── SocketContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useSocket.ts
│   ├── useNotifications.ts
│   └── useFileUpload.ts
├── lib/                 # Utility libraries and configurations
│   ├── api.ts           # API client configuration
│   ├── socket.ts        # Socket.io configuration
│   ├── utils.ts         # General utilities
│   └── validations.ts   # Form validation schemas
├── pages/               # Next.js pages (if using Pages Router)
│   ├── index.tsx        # Landing page
│   ├── login.tsx        # Authentication page
│   ├── student/         # Student pages
│   ├── teacher/         # Teacher pages
│   ├── admin/           # Admin pages
│   └── superadmin/      # Super admin pages
├── styles/              # Global styles and themes
│   ├── globals.css      # Global CSS
│   ├── themes.css       # Theme variables
│   └── components.css   # Component-specific styles
├── types/               # TypeScript type definitions
│   ├── auth.ts          # Authentication types
│   ├── user.ts          # User-related types
│   ├── task.ts          # Assignment/task types
│   └── api.ts           # API response types
└── utils/               # Helper functions
    ├── constants.ts     # Application constants
    ├── formatters.ts    # Data formatting utilities
    └── validators.ts    # Input validation functions
```

## Development Workflow

### Feature Development Process
```bash
# 1. Create feature branch
git checkout -b feature/assignment-creation

# 2. Develop feature following component patterns
# - Create types first in /types
# - Implement API calls in /lib/api.ts
# - Create components in appropriate /components subdirectory
# - Add pages in /pages if needed
# - Write tests for components

# 3. Test feature locally
npm run dev
npm run test
npm run lint

# 4. Commit with conventional commit format
git commit -m "feat: add assignment creation form for teachers"

# 5. Push and create pull request
git push origin feature/assignment-creation
```

### Component Development Pattern
```typescript
// 1. Define types first
// types/assignment.ts
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxGrade: number;
  courseId: string;
  teacherId: string;
  createdAt: Date;
  attachments: File[];
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  dueDate: string;
  maxGrade: number;
  courseId: string;
  attachments?: File[];
}

// 2. Create API function
// lib/api.ts
export const assignmentAPI = {
  create: async (data: CreateAssignmentRequest): Promise<Assignment> => {
    const response = await fetch(`${API_URL}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// 3. Create component
// components/features/tasks/AssignmentForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { assignmentAPI } from '@/lib/api';
import { CreateAssignmentRequest } from '@/types/assignment';

interface AssignmentFormProps {
  courseId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AssignmentForm: React.FC<AssignmentFormProps> = ({
  courseId,
  onSuccess,
  onCancel
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAssignmentRequest>({
    title: '',
    description: '',
    dueDate: '',
    maxGrade: 100,
    courseId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await assignmentAPI.create(formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form implementation */}
    </form>
  );
};
```

## Code Standards

### TypeScript Guidelines
```typescript
// Use strict type definitions
interface User {
  id: string;           // Always use string for IDs
  name: string;
  email: string;
  role: UserRole;       // Use enums for fixed values
  createdAt: Date;      // Use Date objects, not strings
  profile?: UserProfile; // Use optional properties when appropriate
}

// Use enums for constants
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER', 
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

// Use generic types for reusable patterns
interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Use union types for state management
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Use proper error handling types
interface APIError {
  code: string;
  message: string;
  details?: Record<string, string>;
}
```

### Component Patterns
```typescript
// Functional components with TypeScript
interface ComponentProps {
  title: string;
  optional?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  optional = false,
  children,
  onClick
}) => {
  // Use hooks at the top
  const [state, setState] = useState<string>('');
  const { user } = useAuth();
  
  // Event handlers
  const handleClick = () => {
    onClick?.();
  };
  
  // Render
  return (
    <div onClick={handleClick}>
      <h2>{title}</h2>
      {optional && <p>Optional content</p>}
      {children}
    </div>
  );
};

// Export default for pages, named exports for components
export default Component;
```

### Styling Guidelines
```css
/* Use CSS custom properties for theming */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-text: #1f2937;
  --border-radius: 0.5rem;
  --spacing-unit: 0.25rem;
}

[data-theme="dark"] {
  --color-background: #1f2937;
  --color-text: #f9fafb;
}

/* Use logical properties for RTL support */
.component {
  margin-inline-start: 1rem;  /* instead of margin-left */
  margin-inline-end: 1rem;    /* instead of margin-right */
  padding-block: 0.5rem;      /* instead of padding-top/bottom */
  border-inline-start: 1px solid; /* instead of border-left */
}

/* Use BEM methodology for class naming */
.dashboard-card {
  /* Block */
}

.dashboard-card__header {
  /* Element */
}

.dashboard-card--featured {
  /* Modifier */
}
```

## Testing Strategy

### Unit Testing Setup
```typescript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);

// Component testing example
// __tests__/components/AssignmentForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AssignmentForm } from '@/components/features/tasks/AssignmentForm';
import { AuthProvider } from '@/contexts/AuthContext';

const mockProps = {
  courseId: 'course-1',
  onSuccess: jest.fn(),
  onCancel: jest.fn()
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AssignmentForm', () => {
  test('renders form fields correctly', () => {
    renderWithProviders(<AssignmentForm {...mockProps} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
  });
  
  test('submits form with valid data', async () => {
    renderWithProviders(<AssignmentForm {...mockProps} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Assignment' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    
    await waitFor(() => {
      expect(mockProps.onSuccess).toHaveBeenCalled();
    });
  });
});
```

### Integration Testing
```typescript
// __tests__/integration/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'next/router';
import Login from '@/pages/login';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/login'
  })
}));

describe('Authentication Flow', () => {
  test('redirects to student dashboard after successful login', async () => {
    // Mock API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: 'mock-token',
          user: { id: '1', role: 'STUDENT' }
        })
      })
    );
    
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'student@university.edu' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(Router.push).toHaveBeenCalledWith('/student/1');
    });
  });
});
```

## Performance Optimization

### Code Splitting Strategy
```typescript
// Dynamic imports for role-specific dashboards
const StudentDashboard = dynamic(() => import('@/components/dashboards/StudentDashboard'), {
  loading: () => <DashboardSkeleton />,
  ssr: false
});

const TeacherDashboard = dynamic(() => import('@/components/dashboards/TeacherDashboard'), {
  loading: () => <DashboardSkeleton />
});

// Lazy load feature components
const AssignmentCreationModal = lazy(() => 
  import('@/components/features/tasks/AssignmentCreationModal')
);

// Code splitting by route
export default function DashboardPage() {
  const { user } = useAuth();
  
  const DashboardComponent = useMemo(() => {
    switch (user?.role) {
      case 'STUDENT': return StudentDashboard;
      case 'TEACHER': return TeacherDashboard;
      case 'ADMIN': return AdminDashboard;
      case 'SUPER_ADMIN': return SuperAdminDashboard;
      default: return null;
    }
  }, [user?.role]);
  
  if (!DashboardComponent) return <div>Unauthorized</div>;
  
  return <DashboardComponent />;
}
```

### Memoization Patterns
```typescript
// Memoize expensive calculations
const StudentStats = ({ assignments }: { assignments: Assignment[] }) => {
  const stats = useMemo(() => {
    return {
      completed: assignments.filter(a => a.status === 'SUBMITTED').length,
      pending: assignments.filter(a => a.status === 'PENDING').length,
      overdue: assignments.filter(a => 
        a.status === 'PENDING' && new Date(a.dueDate) < new Date()
      ).length
    };
  }, [assignments]);
  
  return <StatsDisplay stats={stats} />;
};

// Memoize callback functions
const TaskList = ({ tasks, onTaskUpdate }: TaskListProps) => {
  const handleTaskClick = useCallback((taskId: string) => {
    onTaskUpdate(taskId);
  }, [onTaskUpdate]);
  
  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onClick={handleTaskClick}
        />
      ))}
    </div>
  );
};

// Memoize components to prevent unnecessary re-renders
const TaskItem = React.memo<TaskItemProps>(({ task, onClick }) => {
  return (
    <div onClick={() => onClick(task.id)}>
      {task.title}
    </div>
  );
});
```

## Deployment Guide

### Build Process
```bash
# Production build
npm run build

# Static export (if needed)
npm run export

# Analyze bundle size
npm run analyze

# Performance testing
npm run lighthouse
```

### Environment-specific Configurations
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Internationalization
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false
  },
  
  // Environment-specific settings
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'api.taskflow.edu'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## Troubleshooting

### Common Issues and Solutions

#### Authentication Issues
```typescript
// Issue: Token expiration handling
// Solution: Implement token refresh mechanism
const useTokenRefresh = () => {
  const { token, setToken } = useAuth();
  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { newToken } = await response.json();
        setToken(newToken);
      } catch (error) {
        // Redirect to login
        window.location.href = '/login';
      }
    };
    
    // Refresh 2 hours before expiration
    const interval = setInterval(refreshToken, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);
};
```

#### Socket Connection Issues
```typescript
// Issue: Socket disconnection handling
// Solution: Implement reconnection logic
const useSocketReconnection = () => {
  const { socket, connect } = useSocket();
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected, attempting reconnection...');
      setTimeout(() => {
        connect();
      }, 5000);
    });
    
    return () => {
      socket.off('disconnect');
    };
  }, [socket, connect]);
};
```

#### RTL Layout Issues
```css
/* Issue: Components not adapting to RTL */
/* Solution: Use logical CSS properties */
.problematic-component {
  /* Instead of: margin-left: 1rem; */
  margin-inline-start: 1rem;
  
  /* Instead of: text-align: left; */
  text-align: start;
  
  /* Instead of: float: right; */
  float: inline-end;
}

/* Use direction-specific styles when needed */
[dir="rtl"] .special-case {
  transform: scaleX(-1);
}
```

### Debug Configuration
```javascript
// next.config.js - Development debugging
const nextConfig = {
  // Enable source maps in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
  
  // Enable React DevTools
  experimental: {
    reactStrictMode: true,
  },
};
```