# API Documentation - Student Management System Frontend

## API Architecture Overview

The frontend implements a modern API integration strategy using Redux Toolkit Query (RTK Query) for efficient data fetching, caching, and state management. The API layer is designed with a modular approach, featuring a base API slice and feature-specific slices.

## Base API Configuration

### API Slice Foundation (`src/app/api/apiSlice.ts`)

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ 
  baseUrl: process.env.NEXT_PUBLIC_API_URL, 
  credentials: "include" 
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Student"],
    endpoints: () => ({}),
});
```

**Configuration Details:**
- **Base URL**: Environment-configured API endpoint
- **Credentials**: Include cookies for authentication
- **Tag Types**: Cache invalidation management
- **Endpoints**: Empty base - extended by feature slices

### Environment Configuration
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Authentication API (`src/app/api/auth.ts`)

### Login Endpoint
**RTK Query Definition:**
```typescript
login: builder.mutation({
    query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: credentials,
    }),
}),
```

**Frontend Usage:**
```typescript
const [login, { isLoading }] = useLoginMutation();

const handleLogin = async (credentials: loginInput) => {
  try {
    const response = await login(credentials).unwrap();
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("student", JSON.stringify(response.student));
    // Navigate to dashboard
  } catch (error) {
    // Handle error
  }
};
```

**Request Format:**
- **Method**: POST
- **URL**: `/api/auth/login`
- **Content-Type**: application/json
- **Body**: 
```typescript
interface loginInput {
  studentId: string;
  password: string;
}
```

**Response Format:**
```typescript
interface LoginResponse {
  token: string;
  student: Student;
  message?: string;
}
```

### Logout Endpoint
**RTK Query Definition:**
```typescript
logout: builder.mutation({
    query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
    }),
}),
```

**Request Format:**
- **Method**: POST
- **URL**: `/api/auth/logout`
- **Authentication**: Required (JWT token)

## Student API (`src/app/api/studentApiSlice.ts`)

### Get Students Page Endpoint
**RTK Query Definition:**
```typescript
getStudentsPage: builder.query<PaginatedStudentsResponse, number>({
    query: (page) => ({
        url: `${STUDENT_URL}?page=${page}`,
        method: "GET",
    }),
}),
```

**Frontend Usage:**
```typescript
const { data, isLoading, isError } = useGetStudentsPageQuery(page, {
  refetchOnMountOrArgChange: true,
});

const students = data?.students ?? [];
const currentPage = Number(data?.currentPage ?? page);
const totalPages = Number(data?.totalPages ?? page);
```

**Request Format:**
- **Method**: GET
- **URL**: `/api/students?page={pageNumber}`
- **Query Parameters**:
  - `page`: Page number (integer, starting from 1)

**Response Format:**
```typescript
interface PaginatedStudentsResponse {
  students: Student[];
  currentPage: number;
  totalPages: number;
}

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
```

### Get Student by ID Endpoint
**RTK Query Definition:**
```typescript
getStudentById: builder.query<Student, string>({
    query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "GET",
    }),
}),
```

**Frontend Usage:**
```typescript
const { data: student, isLoading, isError } = useGetStudentByIdQuery(id as string, {
  refetchOnMountOrArgChange: true,
  skip: !id, // Skip query if no ID provided
});
```

**Request Format:**
- **Method**: GET
- **URL**: `/api/students/{studentId}`
- **Path Parameters**:
  - `studentId`: MongoDB ObjectId string

**Response Format:**
```typescript
// Single Student object (same interface as above)
```

## API Constants (`src/app/constants.ts`)

```typescript
export const STUDENT_URL = "/api/students";
export const AUTH_URL = "/api/auth";
```

## State Management Integration

### Redux Store Configuration (`src/app/store.ts`)
```typescript
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch);
```

### Provider Integration (`src/pages/_app.tsx`)
```typescript
import { ReduxProvider } from "@/components/providers/ReduxProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
```

## Error Handling Patterns

### API Error Handling
```typescript
// In components
const { data, isLoading, isError, error } = useQuery();

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return (
    <div className="text-red-500">
      {error?.data?.message || "An error occurred"}
    </div>
  );
}
```

### Authentication Error Handling
```typescript
// In login component
try {
  const res = await login(studentDetails).unwrap();
  toast.success("Login successful");
  // Handle success
} catch (error) {
  toast.error("Login failed");
  console.error("Login failed", error);
}
```

## Caching Strategy

### Cache Tags
```typescript
tagTypes: ["Student"]
```

### Cache Invalidation
```typescript
// On mutations that affect student data
invalidatesTags: ["Student"]
```

### Automatic Refetching
```typescript
// Components can configure refetch behavior
const { data } = useGetStudentsPageQuery(page, {
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
```

## Authentication Flow

### Token Management
1. **Login Success**: Store JWT in localStorage
2. **Request Interceptor**: Attach token to API requests
3. **Token Validation**: Client-side expiry checks
4. **Logout**: Clear localStorage and redirect

### Request Authentication
```typescript
// Automatic token attachment (to be implemented)
prepareHeaders: (headers, { getState }) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
},
```

## Loading States

### Query Loading States
```typescript
interface QueryState {
  isLoading: boolean;     // Initial loading
  isFetching: boolean;    // Background refetch
  isSuccess: boolean;     // Successful response
  isError: boolean;       // Error state
  error: any;            // Error details
}
```

### UI Loading Components
```typescript
// Skeleton loading for student cards
if (isLoading) {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}
```

## Performance Optimizations

### Query Optimization
- **Selective Fetching**: Skip queries when data not needed
- **Background Updates**: Refetch on focus/reconnect
- **Deduplication**: Automatic request deduplication

### Data Normalization
```typescript
// RTK Query handles response caching automatically
// Data is normalized by endpoint and parameters
```

### Memory Management
- **Automatic Cleanup**: Unused queries cleaned from cache
- **Subscription Management**: Component unmount cleanup
- **Background Sync**: Configurable background updates

## Future API Enhancements

### Planned Endpoints
1. **Search API**: Global search functionality
2. **Filter API**: Advanced filtering options
3. **Upload API**: File upload capabilities
4. **Real-time API**: WebSocket integration

### Enhanced Error Handling
1. **Retry Logic**: Automatic retry for failed requests
2. **Offline Support**: Cache-first strategies
3. **Rate Limiting**: Request throttling
4. **Error Boundaries**: Component-level error isolation

### Security Enhancements
1. **Token Refresh**: Automatic token renewal
2. **Request Signing**: HMAC request verification
3. **CSRF Protection**: Cross-site request forgery prevention
4. **Rate Limiting**: API abuse prevention

## API Testing Strategy

### Unit Testing
```typescript
// Mock RTK Query hooks for component testing
const mockUseGetStudentsPageQuery = jest.fn();
jest.mock('@/app/api/studentApiSlice', () => ({
  useGetStudentsPageQuery: mockUseGetStudentsPageQuery,
}));
```

### Integration Testing
```typescript
// Test API slice behavior
import { studentApiSlice } from '@/app/api/studentApiSlice';
import { store } from '@/app/store';

// Test endpoint behavior with mock server
```

### End-to-End Testing
```typescript
// Test complete user flows
test('user can login and view students', async () => {
  // Navigate to login
  // Enter credentials
  // Verify redirect to students page
  // Verify student data displayed
});
```