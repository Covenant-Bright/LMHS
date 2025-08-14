import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import PolicySections from "./components/PolicySections"

export default function SchoolPolicyPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
    <Header />
    <main className="min-h-screen">
    <Hero />
    <PolicySections />
    </main>
    <Footer />
    <WhatsAppButton />
    </div>
  )
}
