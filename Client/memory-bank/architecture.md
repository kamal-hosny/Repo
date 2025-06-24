# Architecture - Task-Flow LMS Frontend

## System Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Task-Flow Frontend                   │
├─────────────────────────────────────────────────────────┤
│  Authentication Layer                                   │
│  ├── Login System (/login)                             │
│  ├── Role-based Routing                                │
│  └── Session Management                                │
├─────────────────────────────────────────────────────────┤
│  Dashboard Layer                                        │
│  ├── Student Dashboard (/student/:id)                  │
│  ├── Teacher Dashboard (/teacher/:id)                  │
│  ├── Admin Dashboard (/admin/:id)                      │
│  └── Super Admin Dashboard (/superadmin/:id)           │
├─────────────────────────────────────────────────────────┤
│  Feature Modules                                        │
│  ├── Task Management System                            │
│  ├── User Management System                            │
│  ├── Notification System                               │
│  └── File Management System                            │
├─────────────────────────────────────────────────────────┤
│  Cross-cutting Concerns                                 │
│  ├── Internationalization (AR/EN)                      │
│  ├── Theme System (Light/Dark)                         │
│  ├── Real-time Communication (Socket.io)               │
│  └── Responsive Design System                          │
├─────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                   │
│  ├── Next.js Framework                                 │
│  ├── State Management                                  │
│  ├── API Integration                                   │
│  └── Local Storage Management                          │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

### Core Components Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── PublicLayout.tsx
│   │   └── Navigation.tsx
│   ├── dashboards/
│   │   ├── StudentDashboard.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── SuperAdminDashboard.tsx
│   ├── features/
│   │   ├── tasks/
│   │   │   ├── TaskCreation.tsx
│   │   │   ├── TaskSubmission.tsx
│   │   │   ├── TaskReview.tsx
│   │   │   └── TaskList.tsx
│   │   ├── users/
│   │   │   ├── UserManagement.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── UserList.tsx
│   │   └── notifications/
│   │       ├── NotificationCenter.tsx
│   │       ├── NotificationItem.tsx
│   │       └── NotificationProvider.tsx
│   ├── shared/
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── FileUpload.tsx
│   │   └── LoadingSpinner.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Table.tsx
```

## Routing Architecture

### Route Structure & Access Control
```typescript
// Public Routes
/ (Landing Page) - No authentication required

// Authentication Route
/login - Public access, redirects based on role after login

// Protected Routes with Role-based Access
/student/:id - Student role only
/teacher/:id - Teacher role only  
/admin/:id - Admin role only
/superadmin/:id - Super Admin role only

// List Pages with Permission-based Visibility
/students - Accessible by Teachers, Admins, Super Admins
/teachers - Accessible by Admins, Super Admins
/admins - Accessible by Super Admins only

// Feature-specific Routes
/courses/:id - Role-based access to course details
/assignments/:id - Assignment-specific pages
/grades/:studentId - Grade management pages
/calendar - Academic calendar view
```

### Role-based Routing Logic
```typescript
interface RouteGuard {
  path: string;
  allowedRoles: UserRole[];
  redirectPath: string;
}

const routeGuards: RouteGuard[] = [
  { 
    path: '/student/:id', 
    allowedRoles: ['STUDENT'], 
    redirectPath: '/unauthorized' 
  },
  { 
    path: '/teacher/:id', 
    allowedRoles: ['TEACHER'], 
    redirectPath: '/unauthorized' 
  },
  { 
    path: '/admin/:id', 
    allowedRoles: ['ADMIN'], 
    redirectPath: '/unauthorized' 
  },
  { 
    path: '/superadmin/:id', 
    allowedRoles: ['SUPER_ADMIN'], 
    redirectPath: '/unauthorized' 
  },
  { 
    path: '/students', 
    allowedRoles: ['TEACHER', 'ADMIN', 'SUPER_ADMIN'], 
    redirectPath: '/unauthorized' 
  }
];
```

## State Management Architecture

### State Structure
```typescript
interface ApplicationState {
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
  };
  
  dashboard: {
    currentRole: UserRole;
    personalInfo: UserProfile;
    activeNotifications: Notification[];
  };
  
  tasks: {
    studentTasks: Task[];
    teacherTasks: Task[];
    submissions: Submission[];
    grades: Grade[];
  };
  
  users: {
    students: Student[];
    teachers: Teacher[];
    admins: Admin[];
  };
  
  ui: {
    theme: 'light' | 'dark';
    language: 'en' | 'ar';
    sidebarOpen: boolean;
    notifications: UINotification[];
  };
  
  realtime: {
    connected: boolean;
    onlineUsers: string[];
    liveNotifications: LiveNotification[];
  };
}
```

### Context Providers Structure
```typescript
// Theme & Language Context
<ThemeProvider>
  <LanguageProvider>
    // Authentication Context
    <AuthProvider>
      // Real-time Context
      <SocketProvider>
        // Notification Context
        <NotificationProvider>
          // Main Application
          <App />
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  </LanguageProvider>
</ThemeProvider>
```

## Real-time Architecture

### Socket Integration
```typescript
interface SocketEvents {
  // Incoming Events
  'notification:new': (notification: Notification) => void;
  'task:updated': (task: Task) => void;
  'user:status': (status: UserStatus) => void;
  'grade:posted': (grade: Grade) => void;
  
  // Outgoing Events
  'user:online': (userId: string) => void;
  'notification:read': (notificationId: string) => void;
  'task:submit': (submission: Submission) => void;
}

// Socket Provider Implementation
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_ENDPOINT, {
        auth: { token: user.token }
      });
      setSocket(newSocket);
      
      return () => newSocket.close();
    }
  }, [user]);
  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
```

## Internationalization Architecture

### Language & Direction Handling
```typescript
interface I18nConfig {
  languages: {
    en: {
      dir: 'ltr';
      label: 'English';
      locale: 'en-US';
    };
    ar: {
      dir: 'rtl';
      label: 'العربية';
      locale: 'ar-SA';
    };
  };
  defaultLanguage: 'en';
  fallbackLanguage: 'en';
}

// Language Provider Implementation
const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
      document.dir = direction;
    }
  }, []);
  
  const changeLanguage = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLanguage);
    document.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };
  
  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

## Theme Architecture

### Theme System Implementation
```typescript
interface ThemeConfig {
  themes: {
    light: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
    };
    dark: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
    };
  };
  defaultTheme: 'light';
}

// Theme Provider with Persistence
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Security Architecture

### Authentication & Authorization Flow
```typescript
// Authentication Flow
1. User submits credentials at /login
2. Frontend validates input and sends to backend
3. Backend returns JWT token and user role
4. Frontend stores token and redirects based on role
5. Protected routes verify token and role permissions
6. Real-time socket connection authenticated with token

// Role-based Component Rendering
interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  allowedRoles, 
  children, 
  fallback = null 
}) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }
  
  return <>{children}</>;
};
```

## Performance Architecture

### Optimization Strategies
- **Code Splitting**: Route-based and component-based lazy loading
- **Caching**: API response caching with proper invalidation
- **Memoization**: React.memo and useMemo for expensive computations
- **Virtual Scrolling**: For large lists of students/tasks
- **Image Optimization**: Next.js Image component for profile pictures
- **Bundle Optimization**: Tree shaking and dead code elimination

### Monitoring & Analytics
- **Performance Metrics**: Core Web Vitals tracking
- **Error Monitoring**: Error boundaries and error reporting
- **User Analytics**: Navigation patterns and feature usage
- **Real-time Monitoring**: Socket connection health and message delivery