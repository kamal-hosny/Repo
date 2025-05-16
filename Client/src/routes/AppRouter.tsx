import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
// Core
import App from "@/App";
import Student from "@/components/Student/Student";
import StudentsPage from "@/pages/StudentsPage";

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/:id" element={<Student />} />
    </Route>
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
