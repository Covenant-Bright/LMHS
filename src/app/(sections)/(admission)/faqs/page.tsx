import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import FAQSection from "./components/FAQSection"

export default function FAQsPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="min-h-screen">
        <Hero />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
