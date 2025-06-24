import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ReduxProvider } from '@/components/providers/ReduxProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClientHydration } from '@/components/providers/ClientHydration'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ClientHydration>
        <ThemeProvider>
          <LanguageProvider>
            <Component {...pageProps} />
          </LanguageProvider>
        </ThemeProvider>
      </ClientHydration>
    </ReduxProvider>
  )
}
