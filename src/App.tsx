import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LotesSection from './components/LotesSection';
import VantagensSection from './components/VantagensSection';
import LocalizacaoSection from './components/LocalizacaoSection';
import ContatoSection from './components/ContatoSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import RentabilityCharts from './components/RentabilityCharts';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LotesSection />
      <VantagensSection />
      
      {/* Seção de Rentabilidade */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Análise de Rentabilidade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como seu investimento pode crescer ao longo do tempo com 
              projeções baseadas em dados reais do mercado imobiliário industrial.
            </p>
          </div>
          <RentabilityCharts />
        </div>
      </section>
      
      <LocalizacaoSection />
      <ContatoSection />
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;