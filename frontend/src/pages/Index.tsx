import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FitAssessment from "@/components/FitAssessment";
import AIChat from "@/components/AIChat";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenChat={openChat} />
      <main>
        <Hero onOpenChat={openChat} />
        <Experience />
        <FitAssessment />
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground text-lg">
                Interested in discussing an opportunity? Drop me a message.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
