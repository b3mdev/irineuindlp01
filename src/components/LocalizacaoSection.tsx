import React from 'react';
import { MapPin, Car, Plane, Train, Clock } from 'lucide-react';

const LocalizacaoSection = () => {
  const distancias = [
    {
      icon: Car,
      destino: 'Centro da Cidade',
      distancia: '15 km',
      tempo: '18 min'
    },
    {
      icon: Plane,
      destino: 'Aeroporto Internacional',
      distancia: '25 km',
      tempo: '30 min'
    },
    {
      icon: Train,
      destino: 'Terminal Ferroviário',
      distancia: '8 km',
      tempo: '12 min'
    },
    {
      icon: MapPin,
      destino: 'Porto de Santos',
      distancia: '120 km',
      tempo: '1h 30min'
    }
  ];

  return (
    <section id="localizacao" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Localização Privilegiada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estrategicamente posicionado para facilitar a logística e 
            conectar seu negócio aos principais centros econômicos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mapa Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
              {/* Map placeholder with pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M20 20c0-11-9-20-20-20v20h20zm0 0c0 11-9 20-20 20v-20h20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              
              <div className="text-center z-10">
                <MapPin className="text-blue-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Mapa Interativo
                </h3>
                <p className="text-gray-600">
                  Visualize a localização estratégica
                </p>
              </div>

              {/* Location pins */}
              <div className="absolute top-1/4 left-1/3 bg-red-500 w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 right-1/4 bg-blue-500 w-3 h-3 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/3 left-1/2 bg-green-500 w-3 h-3 rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>

          {/* Distâncias */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Principais Distâncias
            </h3>
            
            <div className="space-y-6">
              {distancias.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                          <IconComponent className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {item.destino}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {item.distancia}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-gray-500">
                          <Clock size={16} className="mr-1" />
                          <span className="text-sm">{item.tempo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
              <h4 className="text-xl font-bold mb-2">
                Quer conhecer pessoalmente?
              </h4>
              <p className="text-blue-100 mb-4">
                Agende uma visita técnica gratuita com nossos especialistas.
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalizacaoSection;