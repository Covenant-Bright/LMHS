import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import About from "./components/About"
import MapSection from "./components/MapSection"

export default function LivingMiracleSchoolAgbejaPage() {
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

export const metadata = {
  title: "Living Miracle School Agbeja | Quality Education in Ibadan",
  description:
    "Discover Living Miracle School Agbeja - providing quality education and nurturing tomorrow's leaders in the heart of Agbeja community, Ibadan.",
  keywords: "Living Miracle School, Agbeja, Ibadan, quality education, secondary school, Nigeria",
}
