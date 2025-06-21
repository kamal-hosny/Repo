import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Inter, Playfair_Display } from "next/font/google";

// Optimize font loading with next/font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${playfairDisplay.variable}`}>
      <ReduxProvider>
        <Toaster
          reverseOrder={false}
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Component {...pageProps} />
      </ReduxProvider>
    </div>
  );
}
