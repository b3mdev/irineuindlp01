import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LotesSection from './components/LotesSection';
import VantagensSection from './components/VantagensSection';
import LocalizacaoSection from './components/LocalizacaoSection';
import ContatoSection from './components/ContatoSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LotesSection />
      <VantagensSection />
      <LocalizacaoSection />
      <ContatoSection />
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;