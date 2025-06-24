import { useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from 'next'; // استيراد النوع للـ Type Safety
import { parseCookies } from 'nookies'; // مكتبة قراءة الكوكيز

// استيراد المكونات والـ Hooks الخاصة بك
import { useGetStudentsPageQuery } from "@/app/api/studentApiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Student } from "@/types/StudentType";


// ####################################################################
// ## الجزء الأول: مكون الصفحة (الكود الخاص بك بدون تغيير) ##
// ####################################################################

const StudentsPage = () => {
    // كل الكود الخاص بك سيبقى هنا كما هو تماماً
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetStudentsPageQuery(page, {
        refetchOnMountOrArgChange: true,
    });

    const router = useRouter();

    const students = data?.students ?? [];
    const currentPage = Number(data?.currentPage ?? page);
    const totalPages = Number(data?.totalPages ?? page);

    const renderPageNumbers = () => {
        // ... الكود الخاص بك
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-semibold mb-4">Students</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load students.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* ... الكود الخاص بك لعرض الطلاب */}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-2 black">
                        {/* ... الكود الخاص بك لترقيم الصفحات */}
                    </div>
                </>
            )}
        </div>
    );
};


// ####################################################################
// ## الجزء الثاني: الحارس الأمني (دالة الخادم) ##
// ####################################################################

export const getServerSideProps: GetServerSideProps = async (context) => {
    // 1. قراءة الكوكيز على الخادم
    const { token } = parseCookies(context);

    // 2. التحقق من وجود التوكن
    if (!token) {
        // إذا لم يكن المستخدم مسجلاً، أعد توجيهه فوراً لصفحة الدخول
        // مكون StudentsPage لن يتم عرضه أبداً
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // 3. إذا كان التوكن موجوداً، اسمح بعرض الصفحة
    // نمرر props فارغة لأن المكون نفسه سيقوم بجلب البيانات
    return {
        props: {},
    };
};


export default StudentsPage;