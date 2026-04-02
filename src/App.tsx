import { Header }     from './components/Header'
import { SetupGuide } from './components/SetupGuide'
import { Features }   from './components/Features'

export default function App() {
  return (
    <>
      {/* CSS-only theme switcher — three radios, auto is default */}
      <input type="radio" name="theme" id="theme-auto"  className="theme-radio" defaultChecked />
      <input type="radio" name="theme" id="theme-light" className="theme-radio" />
      <input type="radio" name="theme" id="theme-dark"  className="theme-radio" />

      <div className="page-accent" />
      <main className="mx-auto max-w-4xl px-6 pb-14 pt-16">
        <Header />
        <SetupGuide />
        <Features />
      </main>
    </>
  )
}
