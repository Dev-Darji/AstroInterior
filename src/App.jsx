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

// Hash routes such as #tools/kundli keep views linkable and the back button working
const parseHash = () => {
  const [tab, sub] = window.location.hash.replace(/^#\/?/, "").split("/");
  return { tab: tab || "home", sub: sub || null };
};

export default function App() {
  const [route, setRoute] = useState(() => ({ ...parseHash(), nonce: 0 }));
  const activeTab = route.tab;

  const handleNavigate = (tabId, sub = null) => {
    setRoute((r) => ({ tab: tabId, sub, nonce: r.nonce + 1 }));
    window.history.pushState(null, "", `#${tabId}${sub ? `/${sub}` : ""}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setRoute((r) => ({ ...parseHash(), nonce: r.nonce + 1 }));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isToolsTab = activeTab === "tools" || activeTab === "numerology" || activeTab === "kundli";
  const initialTool = activeTab === "tools" ? route.sub || "kundli" : activeTab;

  return (
    <div className={`min-h-screen flex flex-col ${isToolsTab ? "bg-[#07071a]" : "bg-[#FDFBF7]"} text-[#22201E] relative selection:bg-[#B89758]/25 selection:text-[#161514]`}>
      {/* Primary Sticky Header */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeTab === "home" && <HomeView onNavigate={handleNavigate} />}
        {(activeTab === "vastu-interiors" || activeTab === "about") && <VastuInteriorsView onNavigate={handleNavigate} />}
        {activeTab === "vastu" && <VastuView onNavigate={handleNavigate} />}
        {activeTab === "interiors" && <InteriorsView onNavigate={handleNavigate} />}
        {(activeTab === "services" || activeTab === "astrology") && <ServicesView onNavigate={handleNavigate} />}
        {isToolsTab && (
          <ToolsView
            key={route.nonce}
            initialTool={initialTool}
            onToolChange={(id) => window.history.replaceState(null, "", `#tools/${id}`)}
          />
        )}
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
