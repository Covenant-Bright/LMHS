import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import GalleryGrid from "./components/GalleryGrid"

export default function PhotoGalleryPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
    <main className="min-h-screen">
      <Hero />
      <GalleryGrid />
    </main>
    <Footer />
      <WhatsAppButton />
    </div>
  )
}
