import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import About from "./components/About"
import MapSection from "./components/MapSection"

export default function MiracleInternationalSchoolMoletePage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
