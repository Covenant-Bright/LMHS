import Header from "@/components/Header"
import Hero from "./components/Hero"

export default function TeacherPortalPage() {
  return (
     <div className="relative w-full min-h-screen flex flex-col">
         <Header />
         <main className="min-h-screen">
         <Hero />
         </main>
         </div>
  )
}
