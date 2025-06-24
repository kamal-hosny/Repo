# Component Inventory - Unified Router Architecture

## Core Router Components

### ProtectedRoute.tsx

**Location**: `src/components/routing/ProtectedRoute.tsx`
**Purpose**: Authentication check and localStorage preference restoration
**Responsibilities**:

- Verify user authentication status
- Restore theme preference from localStorage
- Restore language preference from localStorage
- Apply document-level theme and direction settings
- Redirect to login if not authenticated

### GlobalRouter.tsx

**Location**: `src/components/routing/GlobalRouter.tsx`
**Purpose**: Unified routing logic for all user roles
**Responsibilities**:

- Handle role-based routing decisions
- Provide unified page access for all roles
- Manage navigation state
- Support route-based role permissions

## Provider Components

### ReduxProvider

**Location**: `src/store/` (Redux Toolkit configuration)
**Purpose**: Global state management foundation
**Features**:

- Centralized application state
- Authentication state management
- Preference state management
- Future feature state preparation

### ClientHydration

**Location**: `src/components/providers/ClientHydration.tsx`
**Purpose**: SSR to CSR transition handling
**Features**:

- Prevents hydration mismatches
- Smooth client-side initialization
- Loading state management

### ThemeProvider

**Location**: `src/components/providers/ThemeProvider.tsx`
**Purpose**: Theme management and persistence
**Features**:

- Light/Dark theme switching
- localStorage persistence
- Document-level theme application
- Theme state management

### LanguageProvider

**Location**: `src/components/providers/LanguageProvider.tsx`
**Purpose**: Internationalization and direction handling
**Features**:

- English/Arabic language switching
- RTL/LTR direction management
- localStorage persistence
- Document direction application

## Page Components (Unified)

### index.tsx (Landing Page)

**Location**: `src/pages/index.tsx`
**Purpose**: Landing page with test-simple content
**Access**: Public (no authentication required)
**Features**:

- Welcome interface
- Authentication prompts
- Basic system information

### student.tsx (Unified Student Portal)

**Location**: `src/pages/student.tsx`
**Purpose**: Student portal accessible to all roles with role-based content
**Access**: All authenticated users
**Content Control**:

- **Students**: Full student dashboard and functionality
- **Teachers**: Teacher view of student information and management
- **Admins**: Administrative student management tools
- **Super Admins**: Comprehensive student system oversight

### teacher.tsx (Unified Teacher Portal)

**Location**: `src/pages/teacher.tsx`
**Purpose**: Teacher portal accessible to all roles with role-based content
**Access**: All authenticated users
**Content Control**:

- **Teachers**: Full teacher dashboard and tools
- **Students**: Basic teacher contact and information
- **Admins**: Administrative teacher management
- **Super Admins**: Comprehensive teacher system management

### admin.tsx (Unified Admin Portal)

**Location**: `src/pages/admin.tsx`
**Purpose**: Admin portal accessible to all roles with role-based content
**Access**: All authenticated users
**Content Control**:

- **Admins**: Full administrative dashboard and tools
- **Teachers**: Limited admin information and contact
- **Students**: Basic admin contact information
- **Super Admins**: Super admin view of admin operations

### superadmin.tsx (Unified Super Admin Portal)

**Location**: `src/pages/superadmin.tsx`
**Purpose**: Super admin portal accessible to all roles with role-based content
**Access**: All authenticated users
**Content Control**:

- **Super Admins**: Full system administration tools
- **Admins**: Limited super admin information and escalation
- **Teachers**: Basic system support contact
- **Students**: Access notice with alternative contacts

## Utility Components

### RoleGuard

**Location**: `src/components/common/RoleGuard.tsx`
**Purpose**: Role-based content visibility control
**Usage**: Wrap content that should only be visible to specific roles
**Props**:

- `allowedRoles`: Array of roles that can see the content
- `children`: Content to conditionally render
- `fallback`: Optional fallback content for unauthorized users

### LoadingSpinner

**Location**: `src/components/ui/LoadingSpinner.tsx`
**Purpose**: Loading state indication during authentication and routing
**Features**:

- Consistent loading animation
- Theme-aware styling
- Accessibility support

## Hook Components

### useAuth

**Location**: `src/hooks/useAuth.ts`
**Purpose**: Authentication state and user information access
**Returns**:

- `user`: Current authenticated user object
- `isAuthenticated`: Boolean authentication status
- `login`: Authentication function
- `logout`: Sign out function

### useTheme

**Location**: `src/hooks/useTheme.ts`
**Purpose**: Theme state and controls access
**Returns**:

- `theme`: Current theme ('light' | 'dark')
- `toggleTheme`: Function to switch themes
- `setTheme`: Function to set specific theme

### useLanguage

**Location**: `src/hooks/useLanguage.ts`
**Purpose**: Language and direction state access
**Returns**:

- `language`: Current language ('en' | 'ar')
- `direction`: Current direction ('ltr' | 'rtl')
- `changeLanguage`: Function to switch languages

## Application Structure

### \_app.tsx (Root Application)

**Location**: `src/pages/_app.tsx`
**Purpose**: Application root with optimal provider hierarchy
**Provider Stack**:

```typescript
<ReduxProvider>
  <ClientHydration>
    <ThemeProvider>
      <LanguageProvider>
        <ProtectedRoute>
          <GlobalRouter>
            <Component />
          </GlobalRouter>
        </ProtectedRoute>
      </LanguageProvider>
    </ThemeProvider>
  </ClientHydration>
</ReduxProvider>
```

## Future Components (Planned)

### SocketProvider

**Purpose**: Real-time communication management
**Features**: Socket.io connection, event handling, connection state

### NotificationProvider

**Purpose**: Live notification system
**Features**: Real-time alerts, notification queue, user interaction

### CollaborationProvider

**Purpose**: Real-time collaboration features
**Features**: Live editing, presence tracking, conflict resolution

### TaskManagement Components

**Purpose**: Assignment and task workflow system
**Components**: TaskCreation, TaskSubmission, TaskReview, TaskList

### UserManagement Components

**Purpose**: User administration interface
**Components**: UserList, UserProfile, UserPermissions, UserActivity

## Component Design Principles

### Unified Access Pattern

- All pages accessible to all authenticated roles
- Content control handled at component level, not route level
- Consistent interface patterns across role types

### Role-Based Content Control

- Use RoleGuard components for conditional rendering
- Graceful fallbacks for unauthorized content
- Clear role-based messaging and alternatives

### State Management Integration

- All components integrate with Redux for global state
- Local state for component-specific functionality
- Consistent state patterns across components

### Accessibility & Internationalization

- RTL/LTR support in all components
- Theme-aware styling throughout
- Keyboard navigation support
- Screen reader compatibility

### Future Extensibility

- Component architecture ready for feature module integration
- Socket.io integration points prepared
- Mobile-responsive design foundation
- Performance optimization ready (lazy loading, memoization) - Task-Flow LMS Frontend

## Layout Components

### Core Layout System

```typescript
// components/layout/DashboardLayout.tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  sidebarOpen = true,
  onSidebarToggle,
}) => {
  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} isOpen={sidebarOpen} />
      <Header onMenuToggle={onSidebarToggle} />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

// components/layout/AuthLayout.tsx
interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = "Task-Flow",
  subtitle = "Learning Management System",
}) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

// components/layout/PublicLayout.tsx
interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout">
      <PublicNavbar />
      <main className="public-content">{children}</main>
      <Footer />
    </div>
  );
};
```

### Navigation Components

```typescript
// components/layout/Sidebar.tsx
interface SidebarProps {
  userRole: UserRole;
  isOpen: boolean;
  onNavigate?: (path: string) => void;
}

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType;
  roles: UserRole[];
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    roles: ["STUDENT", "TEACHER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    label: "Courses",
    path: "/courses",
    icon: CoursesIcon,
    roles: ["STUDENT", "TEACHER"],
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: AssignmentsIcon,
    roles: ["STUDENT", "TEACHER"],
  },
  {
    label: "Users",
    path: "/users",
    icon: UsersIcon,
    roles: ["ADMIN", "SUPER_ADMIN"],
    children: [
      {
        label: "Students",
        path: "/users/students",
        icon: StudentIcon,
        roles: ["TEACHER", "ADMIN", "SUPER_ADMIN"],
      },
      {
        label: "Teachers",
        path: "/users/teachers",
        icon: TeacherIcon,
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  isOpen,
  onNavigate,
}) => {
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            userRole={userRole}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
};

// components/layout/Header.tsx
interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button onClick={onMenuToggle} className="menu-toggle">
          <MenuIcon />
        </button>
        <h1 className="header-title">Task-Flow</h1>
      </div>

      <div className="header-right">
        <NotificationCenter />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <LanguageSwitcher
          currentLanguage={language}
          onLanguageChange={changeLanguage}
        />
        <UserMenu user={user} onLogout={logout} />
      </div>
    </header>
  );
};
```

## Dashboard Components

### Role-Specific Dashboards

```typescript
// components/dashboards/StudentDashboard.tsx
interface StudentDashboardProps {
  studentId: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentId,
}) => {
  const { data: profile } = useStudentProfile(studentId);
  const { data: courses } = useStudentCourses(studentId);
  const { data: assignments } = useStudentAssignments(studentId);
  const { data: grades } = useStudentGrades(studentId);

  return (
    <div className="student-dashboard">
      <DashboardHeader title="Student Dashboard" user={profile} />

      <div className="dashboard-grid">
        <PersonalInfoCard profile={profile} />
        <QuickStatsCard
          totalCourses={courses?.length || 0}
          pendingAssignments={
            assignments?.filter((a) => a.status === "PENDING").length || 0
          }
          averageGrade={calculateAverageGrade(grades)}
        />
        <RecentAssignmentsCard assignments={assignments?.slice(0, 5)} />
        <UpcomingDeadlinesCard
          assignments={getUpcomingDeadlines(assignments)}
        />
      </div>

      <div className="dashboard-content">
        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <CoursesTab courses={courses} />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsTab assignments={assignments} studentId={studentId} />
          </TabsContent>

          <TabsContent value="grades">
            <GradesTab grades={grades} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarTab studentId={studentId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// components/dashboards/TeacherDashboard.tsx
interface TeacherDashboardProps {
  teacherId: string;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherId,
}) => {
  const { data: profile } = useTeacherProfile(teacherId);
  const { data: lectures } = useUpcomingLectures(teacherId);
  const { data: students } = useTeacherStudents(teacherId);
  const { data: courses } = useTeacherCourses(teacherId);

  return (
    <div className="teacher-dashboard">
      <DashboardHeader title="Teacher Dashboard" user={profile} />

      <div className="dashboard-grid">
        <PersonalInfoCard profile={profile} />
        <UpcomingLecturesCard lectures={lectures?.slice(0, 3)} />
        <StudentStatsCard
          totalStudents={students?.length || 0}
          activeCourses={courses?.length || 0}
        />
        <PendingReviewsCard teacherId={teacherId} />
      </div>

      <div className="dashboard-content">
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentsTab students={students} teacherId={teacherId} />
          </TabsContent>

          <TabsContent value="courses">
            <TeacherCoursesTab courses={courses} teacherId={teacherId} />
          </TabsContent>

          <TabsContent value="assignments">
            <TeacherAssignmentsTab teacherId={teacherId} />
          </TabsContent>

          <TabsContent value="lectures">
            <LecturesTab lectures={lectures} teacherId={teacherId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// components/dashboards/AdminDashboard.tsx
interface AdminDashboardProps {
  adminId: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminId }) => {
  const { data: profile } = useAdminProfile(adminId);
  const { data: teachers } = useAdminTeachers(adminId);
  const { data: students } = useAdminStudents(adminId);

  return (
    <div className="admin-dashboard">
      <DashboardHeader title="Admin Dashboard" user={profile} />

      <div className="dashboard-grid">
        <PersonalInfoCard profile={profile} />
        <UserStatsCard
          totalTeachers={teachers?.length || 0}
          totalStudents={students?.length || 0}
          onlineTeachers={
            teachers?.filter((t) => t.onlineStatus === "ONLINE").length || 0
          }
        />
        <RecentActivityCard adminId={adminId} />
        <SystemHealthCard />
      </div>

      <div className="dashboard-content">
        <Tabs defaultValue="teachers">
          <TabsList>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <TeachersManagementTab teachers={teachers} adminId={adminId} />
          </TabsContent>

          <TabsContent value="students">
            <StudentsManagementTab students={students} adminId={adminId} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab adminId={adminId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
```

## Feature Components

### Authentication Components

```typescript
// components/features/auth/LoginForm.tsx
interface LoginFormProps {
  onSuccess: (user: User) => void;
  onError: (error: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(credentials);
      onSuccess(response.user);
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <Label htmlFor="email">Email or University ID</Label>
        <Input
          id="email"
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
      </div>

      <Button type="submit" loading={loading} className="login-button">
        Login
      </Button>
    </form>
  );
};

// components/features/auth/RoleGuard.tsx
interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback = <div>Unauthorized</div>,
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
```

### Task Management Components

```typescript
// components/features/tasks/AssignmentCreationForm.tsx
interface AssignmentCreationFormProps {
  courseId: string;
  onSuccess: (assignment: Assignment) => void;
  onCancel: () => void;
}

export const AssignmentCreationForm: React.FC<AssignmentCreationFormProps> = ({
  courseId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CreateAssignmentRequest>({
    title: "",
    description: "",
    dueDate: "",
    maxGrade: 100,
    courseId,
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const assignment = await assignmentAPI.create({
        ...formData,
        attachments,
      });
      onSuccess(assignment);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="assignment-form">
      <div className="form-row">
        <div className="form-group">
          <Label htmlFor="title">Assignment Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter assignment title"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="maxGrade">Maximum Grade</Label>
          <Input
            id="maxGrade"
            type="number"
            value={formData.maxGrade}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                maxGrade: parseInt(e.target.value),
              }))
            }
            min="1"
            max="1000"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter assignment description and instructions"
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          required
        />
      </div>

      <div className="form-group">
        <Label>Attachments</Label>
        <FileUpload
          files={attachments}
          onFilesChange={setAttachments}
          maxFiles={5}
          maxFileSize={10 * 1024 * 1024} // 10MB
          acceptedTypes={["pdf", "doc", "docx", "txt"]}
        />
      </div>

      <div className="form-actions">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Create Assignment
        </Button>
      </div>
    </form>
  );
};

// components/features/tasks/AssignmentSubmissionForm.tsx
interface AssignmentSubmissionFormProps {
  assignment: Assignment;
  existingSubmission?: Submission;
  onSuccess: (submission: Submission) => void;
  onCancel: () => void;
}

export const AssignmentSubmissionForm: React.FC<
  AssignmentSubmissionFormProps
> = ({ assignment, existingSubmission, onSuccess, onCancel }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState(existingSubmission?.notes || "");
  const [loading, setLoading] = useState(false);

  const isBeforeDeadline = new Date() < new Date(assignment.dueDate);
  const canSubmit = isBeforeDeadline || !existingSubmission;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);

    try {
      let submission;
      if (existingSubmission) {
        submission = await submissionAPI.update(existingSubmission.id, {
          files,
          notes,
        });
      } else {
        submission = await submissionAPI.create(assignment.id, {
          files,
          notes,
        });
      }
      onSuccess(submission);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submission-form">
      <div className="assignment-info">
        <h3>{assignment.title}</h3>
        <p className="assignment-description">{assignment.description}</p>
        <div className="assignment-meta">
          <span className="due-date">
            Due: {formatDate(assignment.dueDate)}
          </span>
          <span className="max-grade">
            Max Grade: {assignment.maxGrade} points
          </span>
        </div>
      </div>

      {assignment.attachments.length > 0 && (
        <div className="assignment-attachments">
          <h4>Assignment Files</h4>
          <FileList files={assignment.attachments} downloadable />
        </div>
      )}

      <form onSubmit={handleSubmit} className="submission-form-content">
        <div className="form-group">
          <Label>Submission Files</Label>
          <FileUpload
            files={files}
            onFilesChange={setFiles}
            maxFiles={3}
            maxFileSize={50 * 1024 * 1024} // 50MB
            acceptedTypes={assignment.allowedFileTypes}
            disabled={!canSubmit}
          />
        </div>

        <div className="form-group">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes or comments about your submission"
            rows={3}
            disabled={!canSubmit}
          />
        </div>

        {!isBeforeDeadline && (
          <Alert variant="warning">
            The deadline for this assignment has passed.
            {existingSubmission
              ? " You can no longer modify your submission."
              : " Late submissions may not be accepted."}
          </Alert>
        )}

        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {canSubmit && (
            <Button type="submit" loading={loading}>
              {existingSubmission ? "Update Submission" : "Submit Assignment"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

// components/features/tasks/AssignmentReviewPanel.tsx
interface AssignmentReviewPanelProps {
  assignment: Assignment;
  submissions: Submission[];
  onGradeSubmission: (
    submissionId: string,
    grade: number,
    feedback: string
  ) => void;
}

export const AssignmentReviewPanel: React.FC<AssignmentReviewPanelProps> = ({
  assignment,
  submissions,
  onGradeSubmission,
}) => {
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [gradeForm, setGradeForm] = useState({ grade: 0, feedback: "" });

  const handleGradeSubmit = () => {
    if (selectedSubmission) {
      onGradeSubmission(
        selectedSubmission.id,
        gradeForm.grade,
        gradeForm.feedback
      );
      setSelectedSubmission(null);
      setGradeForm({ grade: 0, feedback: "" });
    }
  };

  return (
    <div className="review-panel">
      <div className="assignment-header">
        <h2>{assignment.title}</h2>
        <div className="assignment-stats">
          <span>Total Submissions: {submissions.length}</span>
          <span>
            Graded: {submissions.filter((s) => s.grade !== null).length}
          </span>
          <span>
            Pending: {submissions.filter((s) => s.grade === null).length}
          </span>
        </div>
      </div>

      <div className="review-content">
        <div className="submissions-list">
          <h3>Submissions</h3>
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`submission-item ${
                selectedSubmission?.id === submission.id ? "selected" : ""
              }`}
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="student-info">
                <span className="student-name">{submission.studentName}</span>
                <span className="submission-date">
                  {formatDate(submission.submittedAt)}
                </span>
              </div>
              <div className="submission-status">
                {submission.grade !== null ? (
                  <span className="graded">
                    {submission.grade}/{assignment.maxGrade}
                  </span>
                ) : (
                  <span className="pending">Pending Review</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedSubmission && (
          <div className="submission-details">
            <div className="submission-header">
              <h4>{selectedSubmission.studentName}'s Submission</h4>
              <span className="submission-time">
                Submitted: {formatDateTime(selectedSubmission.submittedAt)}
              </span>
            </div>

            <div className="submission-files">
              <h5>Submitted Files</h5>
              <FileList files={selectedSubmission.files} downloadable />
            </div>

            {selectedSubmission.notes && (
              <div className="submission-notes">
                <h5>Student Notes</h5>
                <p>{selectedSubmission.notes}</p>
              </div>
            )}

            <div className="grading-section">
              <h5>Grading</h5>
              <div className="grade-form">
                <div className="form-group">
                  <Label htmlFor="grade">
                    Grade (out of {assignment.maxGrade})
                  </Label>
                  <Input
                    id="grade"
                    type="number"
                    min="0"
                    max={assignment.maxGrade}
                    value={gradeForm.grade}
                    onChange={(e) =>
                      setGradeForm((prev) => ({
                        ...prev,
                        grade: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={gradeForm.feedback}
                    onChange={(e) =>
                      setGradeForm((prev) => ({
                        ...prev,
                        feedback: e.target.value,
                      }))
                    }
                    placeholder="Provide feedback for the student"
                    rows={4}
                  />
                </div>

                <Button onClick={handleGradeSubmit}>Submit Grade</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

## Shared Components

### Cross-platform Components

```typescript
// components/shared/ThemeToggle.tsx
interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  size = "md",
}) => {
  return (
    <button
      onClick={onToggle}
      className={`theme-toggle theme-toggle--${size}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

// components/shared/LanguageSwitcher.tsx
interface LanguageSwitcherProps {
  currentLanguage: "en" | "ar";
  onLanguageChange: (language: "en" | "ar") => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: "en", label: "English", dir: "ltr" },
    { code: "ar", label: "العربية", dir: "rtl" },
  ];

  return (
    <Select value={currentLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="language-switcher">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span dir={lang.dir}>{lang.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// components/shared/FileUpload.tsx
interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: string[];
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ["pdf", "doc", "docx", "txt", "jpg", "png"],
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      // Validate file type
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !acceptedTypes.includes(extension)) {
        toast.error(`File type .${extension} is not allowed`);
        return false;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        toast.error(`File ${file.name} is too large`);
        return false;
      }

      return true;
    });

    const newFiles = [...files, ...validFiles].slice(0, maxFiles);
    onFilesChange(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="file-upload">
      <div
        className={`file-drop-zone ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          if (!disabled) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFileSelect({ target: { files: droppedFiles } } as any);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <UploadIcon />
        <p>Drop files here or click to browse</p>
        <p className="file-restrictions">
          Max {maxFiles} files, {formatFileSize(maxFileSize)} each
          <br />
          Allowed: {acceptedTypes.join(", ")}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.map((type) => `.${type}`).join(",")}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        disabled={disabled}
      />

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="file-remove"
                disabled={disabled}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Notification Components

```typescript
// components/features/notifications/NotificationCenter.tsx
export const NotificationCenter: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="notification-trigger">
          <BellIcon />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="notification-panel">
        <div className="notification-header">
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="mark-all-read">
              Mark all as read
            </button>
          )}
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <p className="no-notifications">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={() => markAsRead(notification.id)}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// components/features/notifications/NotificationItem.tsx
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ASSIGNMENT_CREATED":
        return <AssignmentIcon />;
      case "GRADE_POSTED":
        return <GradeIcon />;
      case "DUE_DATE_APPROACHING":
        return <ClockIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div
      className={`notification-item ${!notification.read ? "unread" : ""}`}
      onClick={onMarkAsRead}
    >
      <div className="notification-icon">
        {getNotificationIcon(notification.type)}
      </div>

      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>

      {!notification.read && <div className="unread-indicator" />}
    </div>
  );
};
```

## UI Primitive Components

### Basic Form Components

```typescript
// components/ui/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="input-group">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <input
          ref={ref}
          className={`input ${error ? "input--error" : ""} ${className || ""}`}
          {...props}
        />
        {error && <span className="input-error">{error}</span>}
        {helperText && !error && (
          <span className="input-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`button button--${variant} button--${size} ${
          className || ""
        }`}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {!loading && leftIcon && (
          <span className="button-icon">{leftIcon}</span>
        )}
        <span className="button-text">{children}</span>
        {!loading && rightIcon && (
          <span className="button-icon">{rightIcon}</span>
        )}
      </button>
    );
  }
);

// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  header,
  footer,
}) => {
  return (
    <div className={`card ${className || ""}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
```

## Component Organization Summary

### Component Categories

1. **Layout Components**: 3 main layouts (Dashboard, Auth, Public)
2. **Dashboard Components**: 4 role-specific dashboards
3. **Feature Components**: 15+ specialized components for core features
4. **Shared Components**: 8 cross-platform components
5. **UI Primitives**: 12+ basic form and display components

### Reusability Score

- **High Reusability**: UI primitives, shared components (80%+ reuse)
- **Medium Reusability**: Layout components, some feature components (40-60% reuse)
- **Role Specific**: Dashboard components (20-30% reuse)

### Component Dependencies

- All components depend on shared UI primitives
- Feature components use shared utilities and hooks
- Dashboard components compose multiple feature components
- Layout components provide structure for all other components
