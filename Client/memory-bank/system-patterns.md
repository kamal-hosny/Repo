# System Patterns - Task-Flow LMS Frontend

## Design Patterns Overview

### Architectural Patterns

#### 1. Component-Based Architecture
```typescript
// Hierarchical component structure
Layout Components (Top Level)
  ├── Dashboard Components (Role-specific)
  │   ├── Feature Components (Domain-specific)
  │   │   ├── UI Components (Reusable primitives)
  │   │   └── Shared Components (Cross-cutting concerns)
  │   └── Tab/Section Components
  └── Public Components (Landing pages)

// Pattern Benefits:
// - Clear separation of concerns
// - High reusability
// - Easy testing and maintenance
// - Scalable architecture
```

#### 2. Context Provider Pattern
```typescript
// Layered context structure for cross-cutting concerns
<ThemeProvider>
  <LanguageProvider>
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  </LanguageProvider>
</ThemeProvider>

// Pattern Implementation
interface ContextPattern<T> {
  Provider: React.FC<{ children: React.ReactNode; value?: T }>;
  Consumer: React.FC<{ children: (value: T) => React.ReactNode }>;
  useContext: () => T;
}

// Example: Theme Context Pattern
const createContextPattern = <T,>(
  name: string,
  defaultValue?: T
): ContextPattern<T> => {
  const Context = React.createContext<T | undefined>(defaultValue);
  Context.displayName = name;

  const Provider: React.FC<{ children: React.ReactNode; value?: T }> = ({
    children,
    value
  }) => (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );

  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return { Provider, Consumer: Context.Consumer, useContext };
};
```

#### 3. Role-Based Access Control (RBAC) Pattern
```typescript
// Hierarchical role system with permission inheritance
interface RoleHierarchy {
  SUPER_ADMIN: {
    inherits: [];
    permissions: ['*']; // All permissions
  };
  ADMIN: {
    inherits: [];
    permissions: [
      'users:create', 'users:read', 'users:update', 'users:delete',
      'courses:read', 'assignments:read'
    ];
  };
  TEACHER: {
    inherits: [];
    permissions: [
      'assignments:create', 'assignments:update', 'assignments:delete',
      'submissions:read', 'submissions:grade',
      'students:read', 'courses:manage'
    ];
  };
  STUDENT: {
    inherits: [];
    permissions: [
      'assignments:read', 'submissions:create', 'submissions:update',
      'grades:read', 'profile:read', 'profile:update'
    ];
  };
}

// Role Guard Component Pattern
const RoleGuard: React.FC<{
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ allowedRoles, children, fallback = <UnauthorizedMessage /> }) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// Permission-based rendering pattern
const PermissionGuard: React.FC<{
  permission: string;
  children: React.ReactNode;
}> = ({ permission, children }) => {
  const { user } = useAuth();
  const hasPermission = checkPermission(user?.role, permission);
  
  return hasPermission ? <>{children}</> : null;
};
```

### Data Fetching Patterns

#### 1. Custom Hook Pattern
```typescript
// Standardized data fetching hook pattern
interface UseDataFetchingResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useDataFetching = <T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
): UseDataFetchingResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Role-specific data fetching patterns
const useStudentData = (studentId: string) => {
  const { data: profile, loading: profileLoading } = useDataFetching(
    () => studentAPI.getProfile(studentId),
    [studentId]
  );
  
  const { data: assignments, loading: assignmentsLoading } = useDataFetching(
    () => studentAPI.getAssignments(studentId),
    [studentId]
  );
  
  return {
    profile,
    assignments,
    loading: profileLoading || assignmentsLoading
  };
};
```

#### 2. Optimistic Updates Pattern
```typescript
// Optimistic update pattern for better UX
const useOptimisticUpdate = <T, U>(
  currentData: T,
  updateFn: (data: U) => Promise<T>,
  optimisticUpdateFn: (current: T, update: U) => T
) => {
  const [data, setData] = useState(currentData);
  const [isUpdating, setIsUpdating] = useState(false);

  const performUpdate = async (updateData: U) => {
    // Optimistic update
    const optimisticResult = optimisticUpdateFn(data, updateData);
    setData(optimisticResult);
    setIsUpdating(true);

    try {
      // Actual API call
      const actualResult = await updateFn(updateData);
      setData(actualResult);
    } catch (error) {
      // Revert on error
      setData(currentData);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return { data, performUpdate, isUpdating };
};

// Example: Assignment submission with optimistic updates
const useAssignmentSubmission = (assignmentId: string) => {
  const { data: submissions, setData } = useSubmissions(assignmentId);
  
  const submitAssignment = useOptimisticUpdate(
    submissions,
    (submissionData) => submissionAPI.create(assignmentId, submissionData),
    (current, newSubmission) => [...current, { ...newSubmission, id: 'temp', status: 'SUBMITTING' }]
  );
  
  return { submissions: submitAssignment.data, submitAssignment: submitAssignment.performUpdate };
};
```

### State Management Patterns

#### 1. Reducer Pattern for Complex State
```typescript
// Complex state management using useReducer pattern
interface DashboardState {
  activeTab: string;
  filters: Record<string, any>;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  selectedItems: string[];
  bulkActions: boolean;
}

type DashboardAction =
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'UPDATE_FILTERS'; payload: Record<string, any> }
  | { type: 'SET_SORT'; payload: { sortBy: string; sortOrder: 'asc' | 'desc' } }
  | { type: 'SELECT_ITEM'; payload: string }
  | { type: 'SELECT_ALL'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'TOGGLE_BULK_ACTIONS' };

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload, selectedItems: [] };
    
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    
    case 'SELECT_ITEM':
      const isSelected = state.selectedItems.includes(action.payload);
      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(id => id !== action.payload)
          : [...state.selectedItems, action.payload]
      };
    
    case 'SELECT_ALL':
      return { ...state, selectedItems: action.payload };
    
    case 'CLEAR_SELECTION':
      return { ...state, selectedItems: [], bulkActions: false };
    
    case 'TOGGLE_BULK_ACTIONS':
      return { ...state, bulkActions: !state.bulkActions };
    
    default:
      return state;
  }
};

// Custom hook for dashboard state management
const useDashboardState = (initialTab: string = 'overview') => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    activeTab: initialTab,
    filters: {},
    sortBy: 'createdAt',
    sortOrder: 'desc',
    selectedItems: [],
    bulkActions: false
  });

  const actions = {
    setActiveTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
    updateFilters: (filters: Record<string, any>) => dispatch({ type: 'UPDATE_FILTERS', payload: filters }),
    setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } }),
    selectItem: (id: string) => dispatch({ type: 'SELECT_ITEM', payload: id }),
    selectAll: (ids: string[]) => dispatch({ type: 'SELECT_ALL', payload: ids }),
    clearSelection: () => dispatch({ type: 'CLEAR_SELECTION' }),
    toggleBulkActions: () => dispatch({ type: 'TOGGLE_BULK_ACTIONS' })
  };

  return { state, actions };
};
```

#### 2. Form State Management Pattern
```typescript
// Comprehensive form state management pattern
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

interface ValidationRule<T> {
  validate: (value: any, allValues: T) => string | undefined;
  message: string;
}

interface FormConfig<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule<T>[]>>;
  onSubmit: (values: T) => Promise<void>;
}

const useForm = <T extends Record<string, any>>(config: FormConfig<T>) => {
  const [state, setState] = useState<FormState<T>>({
    values: config.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true
  });

  const validateField = useCallback((name: keyof T, value: any): string | undefined => {
    const rules = config.validationRules?.[name];
    if (!rules) return undefined;

    for (const rule of rules) {
      const error = rule.validate(value, state.values);
      if (error) return error;
    }
    return undefined;
  }, [config.validationRules, state.values]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(state.values).forEach(key => {
      const error = validateField(key as keyof T, state.values[key]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setState(prev => ({ ...prev, errors: newErrors, isValid }));
    return isValid;
  }, [state.values, validateField]);

  const handleChange = (name: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: validateField(name, value) }
    }));
  };

  const handleBlur = (name: keyof T) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setState(prev => ({ ...prev, touched: Object.keys(prev.values).reduce((acc, key) => ({ ...acc, [key]: true }), {}) }));
    
    if (!validateForm()) return;

    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await config.onSubmit(state.values);
    } catch (error) {
      // Handle submission error
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const reset = () => {
    setState({
      values: config.initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true
    });
  };

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
};
```

### UI Component Patterns

#### 1. Compound Component Pattern
```typescript
// Compound component pattern for flexible, composable UI
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
const Tabs: React.FC<{ defaultValue: string; children: React.ReactNode }> = ({
  defaultValue,
  children
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Compound components
const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tabs-list" role="tablist">
    {children}
  </div>
);

const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const { activeTab, setActiveTab } = useTabs();
  
  return (
    <button
      className={`tab-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={activeTab === value}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== value) return null;
  
  return (
    <div className="tab-content" role="tabpanel">
      {children}
    </div>
  );
};

// Attach compound components
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

// Usage
const DashboardTabs = () => (
  <Tabs defaultValue="overview">
    <Tabs.List>
      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      <Tabs.Trigger value="assignments">Assignments</Tabs.Trigger>
      <Tabs.Trigger value="grades">Grades</Tabs.Trigger>
    </Tabs.List>
    
    <Tabs.Content value="overview">
      <OverviewContent />
    </Tabs.Content>
    
    <Tabs.Content value="assignments">
      <AssignmentsContent />
    </Tabs.Content>
    
    <Tabs.Content value="grades">
      <GradesContent />
    </Tabs.Content>
  </Tabs>
);
```

#### 2. Render Props Pattern
```typescript
// Render props pattern for flexible data sharing
interface DataFetcherProps<T> {
  fetcher: () => Promise<T>;
  children: (result: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => React.ReactNode;
}

const DataFetcher = <T,>({ fetcher, children }: DataFetcherProps<T>) => {
  const { data, loading, error, refetch } = useDataFetching(fetcher);
  
  return <>{children({ data, loading, error, refetch })}</>;
};

// Usage with render props
const StudentAssignments = ({ studentId }: { studentId: string }) => (
  <DataFetcher fetcher={() => studentAPI.getAssignments(studentId)}>
    {({ data: assignments, loading, error, refetch }) => {
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorMessage message={error} onRetry={refetch} />;
      if (!assignments?.length) return <EmptyState message="No assignments found" />;
      
      return (
        <div className="assignments-list">
          {assignments.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      );
    }}
  </DataFetcher>
);
```

### Error Handling Patterns

#### 1. Error Boundary Pattern
```typescript
// Error boundary pattern for graceful error handling
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; resetError: () => void }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({
  error,
  resetError
}) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetError}>Try again</button>
  </div>
);

// Feature-specific error boundaries
const DashboardErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={DashboardErrorFallback}>
    {children}
  </ErrorBoundary>
);
```

#### 2. Error Recovery Patterns
```typescript
// Automatic retry pattern for transient errors
const useRetryableAPI = <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(async () => {
    setLoading(true);
    setError(null);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await apiCall();
        setData(result);
        setRetryCount(0);
        setLoading(false);
        return;
      } catch (err) {
        setRetryCount(attempt + 1);
        
        if (attempt === maxRetries) {
          setError(err instanceof Error ? err.message : 'Request failed');
          setLoading(false);
          return;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      }
    }
  }, [apiCall, maxRetries, retryDelay]);

  return { data, loading, error, retryCount, executeWithRetry };
};
```

### Performance Optimization Patterns

#### 1. Virtualization Pattern
```typescript
// Virtual scrolling pattern for large lists
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const VirtualList = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### 2. Memoization Patterns
```typescript
// Smart memoization patterns for performance
const ExpensiveComponent = React.memo<{
  data: ComplexData[];
  filters: FilterOptions;
  onItemClick: (id: string) => void;
}>(({ data, filters, onItemClick }) => {
  // Expensive computation memoized
  const processedData = useMemo(() => {
    return data
      .filter(item => matchesFilters(item, filters))
      .sort((a, b) => sortComparator(a, b, filters.sortBy));
  }, [data, filters]);

  // Callback memoized to prevent child re-renders
  const handleItemClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {processedData.map(item => (
        <ItemComponent
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for complex props
  return (
    prevProps.data === nextProps.data &&
    shallowEqual(prevProps.filters, nextProps.filters) &&
    prevProps.onItemClick === nextProps.onItemClick
  );
});
```

These system patterns provide a robust foundation for building scalable, maintainable, and performant React applications while following established best practices and design principles.