import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import FormDownload from "./components/FormDownload"

export default function ApplicationFormPage() {
  return (
       <div className="relative w-full min-h-screen flex flex-col">
    <Header />
    <main className="min-h-screen">
      <Hero />
      <FormDownload />
    </main>
    <Footer />
    <WhatsAppButton />
    </div>
  )
}
