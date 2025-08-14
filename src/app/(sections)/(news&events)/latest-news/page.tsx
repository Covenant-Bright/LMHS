import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import NewsGrid from "./components/NewsGrid"

export default function LatestNewsPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
    <Header />
    <main className="min-h-screen">
    <Hero />
    <NewsGrid />
    </main>
    <Footer />
    <WhatsAppButton />
    </div>
  )
}
