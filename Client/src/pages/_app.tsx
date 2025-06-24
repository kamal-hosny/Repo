import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ReduxProvider } from '@/components/providers/ReduxProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClientHydration } from '@/components/providers/ClientHydration'
import { ProtectedRoute } from '@/components/routing/ProtectedRoute'
import { GlobalRouter } from '@/components/routing/GlobalRouter'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ClientHydration>
        <ThemeProvider>
          <LanguageProvider>
            <ProtectedRoute>
              <GlobalRouter>
                <Component {...pageProps} />
              </GlobalRouter>
            </ProtectedRoute>
          </LanguageProvider>
        </ThemeProvider>
      </ClientHydration>
    </ReduxProvider>
  )
}
