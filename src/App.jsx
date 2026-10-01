import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import MobileStickyBar from './components/layout/MobileStickyBar';

// Views
import HomeView from './views/HomeView';
import VastuInteriorsView from './views/VastuInteriorsView';
import VastuView from './views/VastuView';
import InteriorsView from './views/InteriorsView';
import ServicesView from './views/ServicesView';
import ToolsView from './views/ToolsView';
import InsightsView from './views/InsightsView';
import ConsultationView from './views/ConsultationView';
import ContactView from './views/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser history popstate if back/forward button clicked
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#22201E] relative selection:bg-[#B89758]/25 selection:text-[#161514]">
      {/* Primary Sticky Header */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeTab === "home" && <HomeView onNavigate={handleNavigate} />}
        {activeTab === "vastu-interiors" && <VastuInteriorsView onNavigate={handleNavigate} />}
        {activeTab === "vastu" && <VastuView onNavigate={handleNavigate} />}
        {activeTab === "interiors" && <InteriorsView onNavigate={handleNavigate} />}
        {activeTab === "services" && <ServicesView onNavigate={handleNavigate} />}
        {activeTab === "tools" && <ToolsView />}
        {activeTab === "insights" && <InsightsView onNavigate={handleNavigate} />}
        {activeTab === "consultation" && <ConsultationView />}
        {activeTab === "contact" && <ContactView onNavigate={handleNavigate} />}
      </main>

      {/* Primary Architectural Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Global WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenConsultation={() => handleNavigate("consultation")} />
    </div>
  );
}
