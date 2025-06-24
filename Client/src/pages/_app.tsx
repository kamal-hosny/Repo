import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ReduxProvider } from '@/components/providers/ReduxProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClientHydration } from '@/components/providers/ClientHydration'
import { UnifiedRouter } from '@/components/routing/UnifiedRouter'
import { UniversalLayout } from '@/components/layout/UniversalLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ClientHydration>
        <ThemeProvider>
          <LanguageProvider>
            <UnifiedRouter>
              <UniversalLayout>
                <Component {...pageProps} />
              </UniversalLayout>
            </UnifiedRouter>
          </LanguageProvider>
        </ThemeProvider>
      </ClientHydration>
    </ReduxProvider>
  )
}
