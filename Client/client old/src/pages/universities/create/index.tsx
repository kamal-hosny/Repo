"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { usePostUniversityMutation } from "@/app/api/UniversityApiSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Building2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const initialState = {
  name: "",
  address: "",
  phone: "",
  email: "",
  location: "",
  students: [], 
  courses: [],  
  teachers: [], 
  description: "",
  website: "",
  establishedYear: "",
  logo: "",
  lectures: [],
};

const CreateUniversityPage = () => {
  const [form, setForm] = useState(initialState);
  const [postUniversity, { isLoading }] = usePostUniversityMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!form.name || !form.email) {
      toast.error("Name and Email are required.");
      return;
    }
    try {
      await postUniversity({
        ...form,
        establishedYear: form.establishedYear ? Number(form.establishedYear) : 0,
      }).unwrap();
      toast.success("University created successfully!");
      router.push("/universities");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create university.");
    }
  };

  return (
    <>
      <Head>
        <title>Become a Partner University - Enterprise University</title>
        <meta name="description" content="Partner with Enterprise University. Create your university profile to join our network." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="font-serif text-xl font-semibold text-gray-900">
                  Enterprise University
                </span>
              </Link>
              <Button variant="ghost" asChild>
                <Link href="/universities" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Directory
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Become a Partner University</h1>
              <p className="text-gray-600">Create your university profile to join our global network</p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-serif font-bold text-gray-900">
                  University Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">University Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Enterprise University"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="info@university.edu"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="123 Main St, City, Country"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City, Country"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://university.edu"
                      value={form.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      name="establishedYear"
                      type="number"
                      placeholder="1985"
                      value={form.establishedYear}
                      onChange={handleChange}
                      min={1000}
                      max={3000}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      name="logo"
                      type="url"
                      placeholder="https://logo-url.com/logo.png"
                      value={form.logo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Describe your university..."
                      value={form.description}
                      onChange={handleChange}
                      className="h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      "Create University"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Want to become a partner? {" "}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Learn more
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Need help? {" "}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUniversityPage;