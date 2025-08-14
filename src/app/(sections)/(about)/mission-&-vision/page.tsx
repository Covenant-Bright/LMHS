import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import Mission from "./components/Vision"
import Vision from "./components/Mission"
import EducationalPhilosophy from "./components/Educational-Philosophy"
import LearningEnvironment from "./components/Learning-Environment"

export default function Home() {
  
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Vision />
        <EducationalPhilosophy />
        <LearningEnvironment />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

