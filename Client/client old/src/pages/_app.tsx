import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Inter, Playfair_Display } from "next/font/google";
import { useRouter } from "next/router";

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
  const router = useRouter();

  // Don't show global toaster on students page (it has its own)
  const showGlobalToaster = router.pathname !== '/students';

  return (
    <div className={`${inter.variable} ${playfairDisplay.variable}`}>
      <ReduxProvider>
        {showGlobalToaster && (
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
        )}
        <Component {...pageProps} />
      </ReduxProvider>
    </div>
  );
}
