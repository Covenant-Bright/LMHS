import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Hero from "./components/Hero"
import EventsCalendar from "./components/EventsCalendar"

export default function UpcomingEventsPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
    <main className="min-h-screen">
      <Hero />
      <EventsCalendar />
    </main>
    <Footer />
      <WhatsAppButton />
    </div>
  )
}
