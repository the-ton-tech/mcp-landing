import { Header }     from './components/Header'
import { SetupGuide } from './components/SetupGuide'
import { Features }   from './components/Features'

export default function App() {
  return (
    <>
      <div className="page-accent" />
      <main className="mx-auto max-w-4xl px-6 pb-14 pt-16">
        <Header />
        <SetupGuide />
        <Features />
      </main>
    </>
  )
}
