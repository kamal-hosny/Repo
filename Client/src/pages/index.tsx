import { ThemeToggle } from '../components/ui/theme-toggle'
import { LanguageSwitcher } from '../components/ui/language-switcher'

export default function Home() {
  return (
    <div className="min-h-screen bg-theme text-theme p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with theme controls */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-logo text-primary">Task-Flow</h1>
          <div className="flex gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Demo content */}
        <div className="grid gap-6">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-body font-semibold text-primary mb-4">
              Theme Configuration Demo
            </h2>
            <p className="font-body text-theme mb-4">
              This page demonstrates the custom theme configuration for Task-Flow LMS.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary rounded-lg text-white">
                <h3 className="font-body font-semibold">Primary Color</h3>
                <p className="text-sm opacity-90">#369EFF</p>
              </div>
              <div className="p-4 border border-primary/30 rounded-lg">
                <h3 className="font-body font-semibold text-theme">Background</h3>
                <p className="text-sm text-theme/70">Dynamic theme-based</p>
              </div>
              <div className="p-4 border border-primary/30 rounded-lg">
                <h3 className="font-body font-semibold text-theme">Text</h3>
                <p className="text-sm text-theme/70">Dynamic theme-based</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-body font-semibold text-theme mb-2">Font Families:</h3>
                <p className="font-signature text-2xl text-primary">Dancing Script - For signatures</p>
                <p className="font-logo text-xl text-primary">Edu NSW ACT Hand - For logos</p>
                <p className="font-body text-theme">Lora - For body text and general content</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-xl font-body font-semibold text-primary mb-4">
              Available Theme Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
              <div>
                <h4 className="font-semibold text-theme mb-2">Colors:</h4>
                <ul className="space-y-1 text-theme/80">
                  <li><code className="bg-primary/10 px-2 py-1 rounded">bg-theme</code> - Dynamic background</li>
                  <li><code className="bg-primary/10 px-2 py-1 rounded">text-theme</code> - Dynamic text</li>
                  <li><code className="bg-primary/10 px-2 py-1 rounded">text-primary</code> - Primary color text</li>
                  <li><code className="bg-primary/10 px-2 py-1 rounded">bg-primary</code> - Primary background</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-theme mb-2">Fonts:</h4>
                <ul className="space-y-1 text-theme/80">
                  <li><code className="bg-primary/10 px-2 py-1 rounded">font-signature</code> - Dancing Script</li>
                  <li><code className="bg-primary/10 px-2 py-1 rounded">font-logo</code> - Edu NSW ACT Hand</li>
                  <li><code className="bg-primary/10 px-2 py-1 rounded">font-body</code> - Lora</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
