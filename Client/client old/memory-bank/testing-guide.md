# Testing Guide - Student Management System Frontend

## Testing Strategy Overview

### Testing Pyramid
```
E2E Tests (10%)
    ↑
Integration Tests (20%)
    ↑
Unit Tests (70%)
```

### Testing Principles
- **Write tests that provide confidence**
- **Test behavior, not implementation**
- **Keep tests simple and focused**
- **Use real user interactions**
- **Mock at the network boundary**

## Testing Stack

### Core Testing Libraries
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **MSW (Mock Service Worker)**: API mocking
- **Playwright**: End-to-end testing
- **@testing-library/jest-dom**: Custom Jest matchers

### Setup Configuration
```typescript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

```typescript
// jest.setup.js
import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))
```

## Unit Testing

### Component Testing Patterns

#### Basic Component Test
```typescript
// StudentCard.test.tsx
import { render, screen } from '@testing-library/react'
import { StudentCard } from '../StudentCard'

const mockStudent = {
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  universityId: {
    _id: 'uni1',
    name: 'Test University'
  },
  courses: [],
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01'
}

describe('StudentCard', () => {
  it('renders student information correctly', () => {
    render(<StudentCard student={mockStudent} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Test University')).toBeInTheDocument()
  })

  it('handles missing university gracefully', () => {
    const studentWithoutUniversity = {
      ...mockStudent,
      universityId: null
    }
    
    render(<StudentCard student={studentWithoutUniversity} />)
    
    expect(screen.getByText('No University')).toBeInTheDocument()
  })
})
```

#### Interactive Component Test
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button', { name: /click me/i }))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when loading', () => {
    render(<Button disabled>Loading...</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })
})
```

#### Form Testing
```typescript
// LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { LoginForm } from '../LoginForm'
import { apiSlice } from '@/app/api/apiSlice'

// Create test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

const renderWithProvider = (component: React.ReactElement) => {
  const store = createTestStore()
  return render(
    <Provider store={store}>{component}</Provider>
  )
}

describe('LoginForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Student ID is required')).toBeInTheDocument()
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LoginForm />)
    
    await user.type(screen.getByLabelText(/student id/i), 'student123')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))
    
    // Assert form submission behavior
    // This would typically involve mocking the API call
  })
})
```

### Hook Testing
```typescript
// useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('initial')
  })

  it('stores and retrieves values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new value')
    })
    
    expect(result.current[0]).toBe('new value')
    expect(localStorage.getItem('test-key')).toBe('"new value"')
  })
})
```

## Integration Testing

### API Integration Testing with MSW
```typescript
// studentApi.test.tsx
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { StudentsPage } from '../pages/students'

const mockStudentsResponse = {
  students: [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      universityId: { _id: 'uni1', name: 'Test University' },
      courses: [],
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01'
    }
  ],
  currentPage: 1,
  totalPages: 1
}

const server = setupServer(
  rest.get('/api/students', (req, res, ctx) => {
    return res(ctx.json(mockStudentsResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>{component}</Provider>
  )
}

describe('Students API Integration', () => {
  it('fetches and displays students', async () => {
    renderWithProvider(<StudentsPage />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/students', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }))
      })
    )
    
    renderWithProvider(<StudentsPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load students/i)).toBeInTheDocument()
    })
  })
})
```

### Page Integration Testing
```typescript
// studentsPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { StudentsPage } from '../pages/students'
import { createTestStore, createMockServer } from '@/test-utils'

describe('Students Page Integration', () => {
  it('handles pagination correctly', async () => {
    const user = userEvent.setup()
    const store = createTestStore()
    
    render(
      <Provider store={store}>
        <StudentsPage />
      </Provider>
    )
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument()
    })
    
    // Test pagination
    const nextPageButton = screen.getByRole('button', { name: '2' })
    await user.click(nextPageButton)
    
    await waitFor(() => {
      // Assert page 2 content is loaded
      expect(screen.getByText('Page 2 Student')).toBeInTheDocument()
    })
  })

  it('navigates to student detail page', async () => {
    const user = userEvent.setup()
    const mockPush = jest.fn()
    
    jest.mock('next/router', () => ({
      useRouter: () => ({
        push: mockPush,
        query: {},
        pathname: '/students'
      })
    }))
    
    render(<StudentsPage />)
    
    await waitFor(() => {
      const studentCard = screen.getByTestId('student-card-1')
      return user.click(studentCard)
    })
    
    expect(mockPush).toHaveBeenCalledWith('/students/1')
  })
})
```

## End-to-End Testing

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E Test Examples
```typescript
// login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('successful login flow', async ({ page }) => {
    await page.goto('/login')
    
    // Fill login form
    await page.fill('[data-testid="student-id-input"]', 'student123')
    await page.fill('[data-testid="password-input"]', 'password123')
    
    // Submit form
    await page.click('[data-testid="login-button"]')
    
    // Verify successful login
    await expect(page).toHaveURL('/students')
    await expect(page.locator('h1')).toContainText('Students')
  })

  test('handles invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid="student-id-input"]', 'invalid')
    await page.fill('[data-testid="password-input"]', 'wrong')
    await page.click('[data-testid="login-button"]')
    
    // Verify error message
    await expect(page.locator('[role="alert"]')).toContainText('Invalid credentials')
  })
})

// students.spec.ts
test.describe('Student Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/login')
    await page.fill('[data-testid="student-id-input"]', 'student123')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/students')
  })

  test('displays student list with pagination', async ({ page }) => {
    // Verify students are displayed
    await expect(page.locator('[data-testid="student-card"]')).toHaveCount(10)
    
    // Test pagination
    await page.click('[data-testid="next-page-button"]')
    await expect(page.locator('[data-testid="current-page"]')).toContainText('2')
  })

  test('navigates to student detail page', async ({ page }) => {
    await page.click('[data-testid="student-card"]:first-child')
    
    await expect(page).toHaveURL(/\/students\/\w+/)
    await expect(page.locator('[data-testid="student-name"]')).toBeVisible()
  })

  test('handles search functionality', async ({ page }) => {
    await page.fill('[data-testid="search-input"]', 'John Doe')
    await page.press('[data-testid="search-input"]', 'Enter')
    
    await expect(page.locator('[data-testid="student-card"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="student-card"]')).toContainText('John Doe')
  })
})
```

### Visual Regression Testing
```typescript
// visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('student list page appearance', async ({ page }) => {
    await page.goto('/students')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('students-page.png')
  })

  test('student card component appearance', async ({ page }) => {
    await page.goto('/students')
    
    const studentCard = page.locator('[data-testid="student-card"]').first()
    await expect(studentCard).toHaveScreenshot('student-card.png')
  })

  test('responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/students')
    
    await expect(page).toHaveScreenshot('students-mobile.png')
  })
})
```

## Testing Utilities

### Test Setup Utilities
```typescript
// test-utils.tsx
import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/app/api/apiSlice'

// Create a test store with initial state
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  })
}

// Custom render function with providers
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any
  store?: ReturnType<typeof createTestStore>
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// Mock data factories
export const createMockStudent = (overrides = {}) => ({
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  universityId: {
    _id: 'uni1',
    name: 'Test University'
  },
  courses: [],
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  ...overrides,
})

export const createMockStudentsResponse = (count = 10) => ({
  students: Array.from({ length: count }, (_, i) => 
    createMockStudent({ _id: `${i + 1}`, name: `Student ${i + 1}` })
  ),
  currentPage: 1,
  totalPages: Math.ceil(count / 10),
})
```

### Custom Testing Hooks
```typescript
// testing-hooks.ts
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createTestStore } from './test-utils'

export const renderHookWithProvider = (hook: () => any, initialState = {}) => {
  const store = createTestStore(initialState)
  
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  
  return renderHook(hook, { wrapper })
}
```

## Testing Best Practices

### Component Testing Best Practices
1. **Test User Interactions**: Focus on what users actually do
2. **Use Accessible Queries**: Prefer queries that work with assistive technologies
3. **Test Error States**: Ensure components handle errors gracefully
4. **Mock at Network Boundary**: Use MSW for API mocking
5. **Avoid Testing Implementation Details**: Test behavior, not internal state

### Good vs Bad Testing Examples
```typescript
// ❌ Bad: Testing implementation details
test('component has correct state', () => {
  const component = render(<StudentCard student={mockStudent} />)
  expect(component.state.isExpanded).toBe(false)
})

// ✅ Good: Testing user behavior
test('expands when clicked', async () => {
  const user = userEvent.setup()
  render(<StudentCard student={mockStudent} />)
  
  await user.click(screen.getByRole('button', { name: /expand/i }))
  
  expect(screen.getByText('Additional Details')).toBeVisible()
})

// ❌ Bad: Testing with implementation-specific selectors
test('renders student name', () => {
  render(<StudentCard student={mockStudent} />)
  expect(document.querySelector('.student-name')).toHaveTextContent('John Doe')
})

// ✅ Good: Testing with accessible queries
test('renders student name', () => {
  render(<StudentCard student={mockStudent} />)
  expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument()
})
```

### Performance Testing
```typescript
// performance.test.tsx
import { render } from '@testing-library/react'
import { performance } from 'perf_hooks'
import { StudentList } from '../StudentList'

describe('Performance Tests', () => {
  it('renders large student list efficiently', () => {
    const manyStudents = Array.from({ length: 1000 }, (_, i) => 
      createMockStudent({ _id: `${i}`, name: `Student ${i}` })
    )
    
    const start = performance.now()
    render(<StudentList students={manyStudents} />)
    const end = performance.now()
    
    // Ensure rendering takes less than 100ms
    expect(end - start).toBeLessThan(100)
  })
})
```

## Continuous Integration Testing

### GitHub Actions Configuration
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run type checking
        run: npx tsc --noEmit
        
      - name: Run unit tests
        run: npm test -- --coverage --watchAll=false
        
      - name: Run E2E tests
        run: npx playwright test
        
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
```

This comprehensive testing guide provides all the necessary information for implementing a robust testing strategy for the Student Management System frontend, ensuring high code quality and reliability.
