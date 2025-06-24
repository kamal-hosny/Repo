import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// المكون ودالة الخادم التي سنختبرها
import StudentsPage, { getServerSideProps } from './index';

// --- إعداد المحاكاة (Mocking) ---
// 1. نقوم بمحاكاة الـ hook الذي يستخدمه المكون لجلب البيانات
const mockUseGetStudentsPageQuery = jest.fn();
jest.mock('@/app/api/studentApiSlice', () => ({
    useGetStudentsPageQuery: (page: number) => mockUseGetStudentsPageQuery(page),
}));

// 2. نقوم بمحاكاة الراوتر الخاص بـ Next.js
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(), // دالة push فارغة لأننا لا نريد التنقل الفعلي في الاختبار
    }),
}));


// --- بداية الاختبارات ---

// الجزء الأول: اختبار المكون المرئي (Component)
describe('StudentsPage Component', () => {

    // قبل كل اختبار، ننظف المحاكاة من أي نتائج سابقة
    beforeEach(() => {
        mockUseGetStudentsPageQuery.mockClear();
    });

    it('should render loading state correctly', () => {
        // نجعل الـ hook يرجع حالة "تحميل"
        mockUseGetStudentsPageQuery.mockReturnValue({ isLoading: true });
        render(<StudentsPage />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should render error state correctly', () => {
        // نجعل الـ hook يرجع حالة "خطأ"
        mockUseGetStudentsPageQuery.mockReturnValue({ isError: true });
        render(<StudentsPage />);
        expect(screen.getByText(/Failed to load students/i)).toBeInTheDocument();
    });

    it('should render students list successfully', () => {
        // نجهز بيانات وهمية للطلاب
        const mockData = {
            students: [
                { _id: '1', studentId: 'S1', name: 'Student One', email: 'one@test.com' },
                { _id: '2', studentId: 'S2', name: 'Student Two', email: 'two@test.com' },
            ],
            currentPage: 1,
            totalPages: 1,
        };
        // نجعل الـ hook يرجع البيانات الوهمية بنجاح
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false, isError: false });
        render(<StudentsPage />);
        
        // نتأكد من عرض أسماء الطلاب على الشاشة
        expect(screen.getByText('Student One')).toBeInTheDocument();
        expect(screen.getByText('Student Two')).toBeInTheDocument();
    });

    it('should disable "Previous" button on the first page', () => {
        const mockData = { students: [], currentPage: 1, totalPages: 5 };
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false });
        render(<StudentsPage />);
        expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
    });
});


// الجزء الثاني: اختبار دالة الخادم (getServerSideProps)
describe('getServerSideProps', () => {
    
    it('should redirect to /login if no token is found', async () => {
        // نجهز سياق (context) وهمي بدون توكن
        const context = { req: { cookies: {} } };
        const response = await getServerSideProps(context as any);

        // نتوقع أن تقوم الدالة بإعادة التوجيه
        expect(response).toEqual({
            redirect: {
                destination: '/login',
                permanent: false,
            },
        });
    });

    it('should return empty props if token is found', async () => {
        // نجهز سياق وهمي مع توكن
        const context = { req: { cookies: { token: 'valid-token' } } };
        const response = await getServerSideProps(context as any);
        
        // نتوقع أن تسمح الدالة بالمرور وتعيد props فارغة
        expect(response).toEqual({ props: {} });
    });
});