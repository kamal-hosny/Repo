import { Outlet } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Toaster
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Outlet />
    </>
  );
}

export default App;
