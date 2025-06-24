import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building, MapPin, Phone, Mail, Globe, Users } from "lucide-react";

interface University {
    _id: string;
    name: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    description?: string;
    establishedYear?: number;
    studentCount?: number;
}

const UniversityPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [university, setUniversity] = useState<University | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (id && id !== "*") {
            // Simulate API call - replace with actual API call
            setIsLoading(true);
            setTimeout(() => {
                // Mock university data - replace with actual API call
                const mockUniversity: University = {
                    _id: id as string,
                    name: "Enterprise University",
                    location: "New York, NY",
                    email: "info@enterprise-university.edu",
                    phone: "+1 (555) 123-4567",
                    website: "https://enterprise-university.edu",
                    description: "A leading institution in higher education, dedicated to excellence in teaching, research, and community service.",
                    establishedYear: 1985,
                    studentCount: 15000
                };
                setUniversity(mockUniversity);
                setIsLoading(false);
            }, 1000);
        } else {
            setIsError(true);
            setIsLoading(false);
        }
    }, [id]);

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Loading University - Enterprise University</title>
                </Head>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading university information...</p>
                    </div>
                </div>
            </>
        );
    }

    if (isError || !university) {
        return (
            <>
                <Head>
                    <title>University Not Found - Enterprise University</title>
                </Head>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h1 className="text-xl font-semibold text-red-800 mb-2">University Not Found</h1>
                            <p className="text-red-600 mb-4">
                                The university you're looking for doesn't exist or has been removed.
                            </p>
                            <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700">
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{university.name} - Enterprise University</title>
                <meta name="description" content={`Learn more about ${university.name}`} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center space-x-2">
                                <Building className="h-8 w-8 text-blue-600" />
                                <span className="font-serif text-xl font-semibold text-gray-900">
                                    Enterprise University
                                </span>
                            </Link>
                            <Button variant="ghost" onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* University Header */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <Building className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-serif font-bold">{university.name}</h1>
                                    {university.location && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{university.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {university.description && (
                                <p className="text-blue-100 text-lg">{university.description}</p>
                            )}
                        </div>
                    </div>

                    {/* University Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Contact Information */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="space-y-3">
                                    {university.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-gray-500" />
                                            <span className="text-gray-700">{university.email}</span>
                                        </div>
                                    )}
                                    {university.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-gray-500" />
                                            <span className="text-gray-700">{university.phone}</span>
                                        </div>
                                    )}
                                    {university.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-gray-500" />
                                            <a
                                                href={university.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                {university.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* University Stats */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">University Facts</h2>
                                <div className="space-y-3">
                                    {university.establishedYear && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Established:</span>
                                            <span className="font-medium text-gray-900">{university.establishedYear}</span>
                                        </div>
                                    )}
                                    {university.studentCount && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Students:</span>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium text-gray-900">{university.studentCount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="flex flex-wrap gap-4">
                                <Button onClick={() => router.push('/students')} className="bg-blue-600 hover:bg-blue-700">
                                    View All Students
                                </Button>
                                <Button variant="outline" onClick={() => router.push('/')}>
                                    Back to Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default UniversityPage;
