import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// المكون ودالة الخادم التي سنختبرها
import StudentsPage, { getServerSideProps } from './index';

// نحتاج لمحاكاة (mock) الـ hooks والاعتماديات الخارجية
const mockUseGetStudentsPageQuery = jest.fn();
jest.mock('@/app/api/studentApiSlice', () => ({
    // نقوم بمحاكاة الـ hook الذي يستخدمه المكون
    useGetStudentsPageQuery: (page: number) => mockUseGetStudentsPageQuery(page),
}));

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(), // دالة push فارغة للاختبار
    }),
}));

// ####################################################################
// ## اختبار المكون - StudentsPage Component Tests ##
// ####################################################################

describe('StudentsPage Component', () => {

    // قبل كل اختبار، نقوم بإعادة تعيين المحاكاة
    beforeEach(() => {
        mockUseGetStudentsPageQuery.mockClear();
    });

    it('should render loading state correctly', () => {
        // 1. إعداد المحاكاة: نجعل الـ hook يرجع حالة "تحميل"
        mockUseGetStudentsPageQuery.mockReturnValue({ isLoading: true });

        // 2. عرض المكون
        render(<StudentsPage />);

        // 3. التحقق: نتأكد من وجود نص "Loading..."
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should render error state correctly', () => {
        // 1. إعداد المحاكاة: نجعل الـ hook يرجع حالة "خطأ"
        mockUseGetStudentsPageQuery.mockReturnValue({ isError: true });

        render(<StudentsPage />);

        // 3. التحقق: نتأكد من وجود رسالة الخطأ
        expect(screen.getByText(/Failed to load students/i)).toBeInTheDocument();
    });

    it('should render students list successfully', () => {
        // 1. إعداد بيانات وهمية
        const mockData = {
            students: [
                { _id: '1', studentId: 'S1', name: 'Ahmed', email: 'ahmed@test.com' },
                { _id: '2', studentId: 'S2', name: 'Fatima', email: 'fatima@test.com' },
            ],
            currentPage: 1,
            totalPages: 1,
        };
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false, isError: false });

        render(<StudentsPage />);

        // 3. التحقق: نتأكد من عرض أسماء الطلاب
        expect(screen.getByText('Ahmed')).toBeInTheDocument();
        expect(screen.getByText('Fatima')).toBeInTheDocument();
    });

    it('should disable "Previous" button on the first page', () => {
        const mockData = { students: [], currentPage: 1, totalPages: 5 };
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false });

        render(<StudentsPage />);

        // التحقق: زر "Previous" يجب أن يكون معطلاً
        expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
    });

    it('should disable "Next" button on the last page', () => {
        const mockData = { students: [], currentPage: 5, totalPages: 5 };
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false });

        render(<StudentsPage />);

        // التحقق: زر "Next" يجب أن يكون معطلاً
        expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
    });
});


// ####################################################################
// ## اختبار دالة الخادم - getServerSideProps Tests ##
// ####################################################################

describe('getServerSideProps', () => {
    
    it('should redirect to /login if no token is found', async () => {
        // 1. إعداد سياق (context) وهمي بدون كوكيز
        const context = {
            req: {
                cookies: {},
            },
        };
        
        // 2. استدعاء الدالة
        const response = await getServerSideProps(context as any);

        // 3. التحقق: نتوقع أن تقوم بإعادة التوجيه
        expect(response).toEqual({
            redirect: {
                destination: '/login',
                permanent: false,
            },
        });
    });

    it('should return empty props if token is found', async () => {
        // 1. إعداد سياق وهمي مع توكن
        const context = {
            req: {
                cookies: {
                    token: 'a-valid-token',
                },
            },
        };

        // 2. استدعاء الدالة
        const response = await getServerSideProps(context as any);

        // 3. التحقق: نتوقع أن تسمح بالمرور
        expect(response).toEqual({
            props: {},
        });
    });
});