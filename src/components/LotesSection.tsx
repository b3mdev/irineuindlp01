import React from 'react';
import { MapPin, Ruler, Building, FileText, TrendingUp } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

const LotesSection = () => {
  const lotes = [
    {
      id: 1,
      area: '500m²',
      price: 'R$ 180.000',
      pricePerM2: 'R$ 360/m²',
      location: 'Setor A - Frente Principal',
      features: ['Energia Trifásica', 'Água Industrial', 'Documentação Regular', 'Acesso Pavimentado'],
      roi: '12% a.a.',
      status: 'Disponível'
    },
    {
      id: 2,
      area: '750m²',
      price: 'R$ 250.000',
      pricePerM2: 'R$ 333/m²',
      location: 'Setor B - Esquina Comercial',
      features: ['Energia Trifásica', 'Água Industrial', 'Acesso Duplo', 'Zoneamento Industrial'],
      roi: '14% a.a.',
      status: 'Reservado'
    },
    {
      id: 3,
      area: '1.000m²',
      price: 'R$ 320.000',
      pricePerM2: 'R$ 320/m²',
      location: 'Setor C - Premium',
      features: ['Energia Trifásica', 'Água Industrial', 'Vista Privilegiada', 'Maior Metragem'],
      roi: '15% a.a.',
      status: 'Disponível'
    },
    {
      id: 4,
      area: '1.200m²',
      price: 'R$ 380.000',
      pricePerM2: 'R$ 317/m²',
      location: 'Setor D - Corporativo',
      features: ['Energia Trifásica', 'Água Industrial', 'Gás Natural', 'Fibra Óptica'],
      roi: '16% a.a.',
      status: 'Disponível'
    }
  ];

  return (
    <section id="lotes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Portfólio de Investimentos
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oportunidades selecionadas com análise técnica completa, projeção de retorno 
            e documentação regularizada para investidores exigentes.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="mb-16">
          <InteractiveMap />
        </div>

        {/* Lotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {lotes.map((lote) => (
            <div
              key={lote.id}
              className="bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-slate-100">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Building size={40} className="mx-auto mb-2" />
                    <p className="text-sm font-medium">Lote {lote.area}</p>
                    <p className="text-xs">400x300px</p>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  lote.status === 'Disponível' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {lote.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-slate-600">
                    <MapPin size={16} className="mr-2 text-slate-500" />
                    <span className="text-sm">{lote.location}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Ruler size={16} className="mr-2 text-slate-500" />
                    <span className="text-sm font-semibold">{lote.area}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {lote.price}
                  </div>
                  <div className="text-sm text-slate-500">
                    {lote.pricePerM2} • ROI: <span className="text-green-600 font-semibold">{lote.roi}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {lote.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition-colors duration-300 text-sm">
                    Detalhes
                  </button>
                  <button className="flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 px-4 py-3 rounded-lg transition-colors duration-300">
                    <FileText size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Analysis CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Análise Completa de Investimento
              </h3>
              <p className="text-slate-600 mb-6">
                Receba um relatório detalhado com projeções financeiras, análise de mercado 
                e comparativo de rentabilidade para tomar a melhor decisão de investimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center">
                  <TrendingUp className="mr-2" size={20} />
                  Solicitar Análise
                </button>
                <button className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Agendar Reunião
                </button>
              </div>
            </div>
            <div className="bg-slate-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <TrendingUp size={60} className="mx-auto mb-4" />
                <p className="text-lg font-medium">Gráfico de Rentabilidade</p>
                <p className="text-sm">600x400px recomendado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotesSection;