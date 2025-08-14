import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import Intro from "./components/Intro"
import Carousel from "./components/Carousel"

export default function Home() {
 
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Intro />
        <Carousel />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

