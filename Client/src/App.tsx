import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Student from "./Components/Student/Student";
import Layout from "./Components/Layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/student", element: <Student /> },
      ],
    },
  ]);

  return (
    <>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
