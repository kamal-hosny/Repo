import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
// Core
import App from "@/App";
import StudentsPage from "@/pages/StudentsPage";
import StudentDetailsPage from "@/pages/StudentDetailsPage";

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/:id" element={<StudentDetailsPage />} />
    </Route>
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
