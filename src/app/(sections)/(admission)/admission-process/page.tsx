import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import ProcessSteps from "./components/ProcessSteps"

export default function AdmissionProcessPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="min-h-screen">
        <Hero />
        <ProcessSteps />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
