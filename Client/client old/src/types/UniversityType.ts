interface University {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: string;
  students: string[]; 
  courses: string[];  
  teachers: string[]; 
  description: string;
  website: string;
  establishedYear: number;
  logo: string;
  lectures: string[];
}

interface PaginatedUniversitiesResponse {
  universities: University[];
  currentPage: string;
  totalPages: number;
}

interface GetUniversitiesParams {
  page: number;
  limit: number;
}

export type { University, PaginatedUniversitiesResponse , GetUniversitiesParams }