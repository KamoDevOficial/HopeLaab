import { useState } from 'react'
import SneakerStage from './components/Backdrop/SneakerStage'
import Header from './components/Header/Header'
import Hero from './components/Sections/Hero'
import Pitch from './components/Sections/Pitch'
import Services from './components/Sections/Services'
import Process from './components/Sections/Process'
import Reviews from './components/Sections/Reviews'
import Cta from './components/Sections/Cta'
import Footer from './components/Sections/Footer'
import SockBot from './components/SockBot/SockBot'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <>
      <SneakerStage />
      <Header />
      <main>
        <Hero />
        <Pitch />
        <Services />
        <Process />
        <Reviews />
        <Cta onOpenChat={() => setChatOpen(true)} />
      </main>
      <Footer />
      <SockBot open={chatOpen} onOpenChange={setChatOpen} />
    </>
  )
}
