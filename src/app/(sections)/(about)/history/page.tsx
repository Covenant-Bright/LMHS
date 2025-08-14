import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Intro from "./components/Intro"

export default function Home() {
  
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Intro />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

