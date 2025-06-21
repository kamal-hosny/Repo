import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
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
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
