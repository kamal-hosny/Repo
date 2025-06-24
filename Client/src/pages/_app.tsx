import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ReduxProvider } from '@/components/providers/ReduxProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  )
}
