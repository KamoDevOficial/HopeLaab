import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Scene from './components/Scene/Scene'
import Cta from './components/Sections/Cta'
import Footer from './components/Sections/Footer'
import Process from './components/Sections/Process'
import Services from './components/Sections/Services'
import SockBot from './components/SockBot/SockBot'
import useReveal from './hooks/useReveal'
import useScrollProgress from './hooks/useScrollProgress'
import Loader from './loader/Loader'
import usePreload from './loader/usePreload'
import './components/Sections/sections.css'

export default function App() {
  const [botOpen, setBotOpen] = useState(false)
  const [revealed, setRevealed] = useState(false) // a tela de carregamento começou a sair: a cena e os cartões entram em cena
  const [gone, setGone] = useState(false) // a tela de carregamento saiu do DOM
  const { progress, ready } = usePreload()

  useScrollProgress()
  useReveal(revealed)
  useEffect(() => {
    document.documentElement.classList.toggle('loading', !revealed)
  }, [revealed])

  const openBot = () => setBotOpen(true)

  return (
    <>
      {/* tudo é montado já embaixo da tela de carregamento: o navegador rasteriza as camadas enquanto ela cobre a tela */}
      <Scene running={revealed} />
      <div className="candy sd" aria-hidden="true" />
      <Header />
      <main>
        <Hero onOpenBot={openBot} />
        <Services />
        <Process />
        <Cta onOpenBot={openBot} />
      </main>
      <Footer />
      <SockBot open={botOpen} onOpenChange={setBotOpen} />
      {!gone && <Loader progress={progress} ready={ready} onReveal={() => setRevealed(true)} onGone={() => setGone(true)} />}
    </>
  )
}
