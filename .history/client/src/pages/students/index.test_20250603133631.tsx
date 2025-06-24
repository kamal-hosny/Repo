import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GetServerSidePropsContext } from 'next'; // استيراد النوع المطلوب

// المكون ودالة الخادم التي سنختبرها
import StudentsPage, { getServerSideProps } from './index';

// --- إعداد المحاكاة (Mocking) ---
const mockUseGetStudentsPageQuery = jest.fn();
jest.mock('@/app/api/studentApiSlice', () => ({
    useGetStudentsPageQuery: (page: number) => mockUseGetStudentsPageQuery(page),
}));

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// --- بداية الاختبارات ---

describe('StudentsPage Component', () => {
    beforeEach(() => {
        mockUseGetStudentsPageQuery.mockClear();
    });

    it('should render loading state correctly', () => {
        mockUseGetStudentsPageQuery.mockReturnValue({ isLoading: true });
        render(<StudentsPage />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should render error state correctly', () => {
        mockUseGetStudentsPageQuery.mockReturnValue({ isError: true });
        render(<StudentsPage />);
        expect(screen.getByText(/Failed to load students/i)).toBeInTheDocument();
    });

    it('should render students list successfully', () => {
        const mockData = {
            students: [
                { _id: '1', studentId: 'S1', name: 'Student One', email: 'one@test.com' },
                { _id: '2', studentId: 'S2', name: 'Student Two', email: 'two@test.com' },
            ],
            currentPage: 1,
            totalPages: 1,
        };
        mockUseGetStudentsPageQuery.mockReturnValue({ data: mockData, isLoading: false, isError: false });
        render(<StudentsPage />);
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

describe('getServerSideProps', () => {
    
    it('should redirect to /login if no token is found', async () => {
        // الإصلاح: تعريف كائن context بشكل جزئي ولكن بtypes صحيحة
        const context = {
            req: {
                cookies: {},
            },
        } as GetServerSidePropsContext; // استخدام النوع الصحيح
        
        const response = await getServerSideProps(context);

        expect(response).toEqual({
            redirect: {
                destination: '/login',
                permanent: false,
            },
        });
    });

    it('should return empty props if token is found', async () => {
        // الإصلاح: تعريف كائن context بشكل جزئي ولكن بtypes صحيحة
        const context = {
            req: {
                cookies: {
                    token: 'a-valid-token',
                },
            },
        } as GetServerSidePropsContext; // استخدام النوع الصحيح

        const response = await getServerSideProps(context);
        
        expect(response).toEqual({ props: {} });
    });
});