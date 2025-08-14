import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Main from "@/components/Main"
import Academic from "@/components/Academic"
import Admission from "@/components/Admission"
import Carousel from "@/components/Carousel"
import News from "@/components/News"
import ContactForms from "@/components/Contact-forms"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Header />
      <Hero />
      <Main />
      <Academic />
      <Admission />
      <Carousel />
      <News />
      <ContactForms />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}


