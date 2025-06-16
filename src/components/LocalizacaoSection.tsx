import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Car, Plane, Train, Clock, Navigation, Building, Home } from 'lucide-react';
import { Wrapper } from '@googlemaps/react-wrapper';

interface Loteamento {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  zoom: number;
  features: string[];
  status: 'disponivel' | 'vendido' | 'reservado';
  area: string;
  price: string;
}

const LocalizacaoSection = () => {
  const [selectedLoteamento, setSelectedLoteamento] = useState<string>('geral');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  const loteamentos: Record<string, Loteamento> = {
    geral: {
      id: 'geral',
      name: 'Visão Geral - Araquari',
      description: 'Localização estratégica em Araquari, Santa Catarina',
      coordinates: { lat: -26.3717, lng: -48.7208 },
      zoom: 13,
      features: ['Acesso às principais rodovias', 'Próximo ao Porto de Itajaí', 'Centro industrial'],
      status: 'disponivel',
      area: 'Cidade completa',
      price: 'Variável'
    },
    setor_a: {
      id: 'setor_a',
      name: 'Setor A - Premium',
      description: 'Lotes industriais de alto padrão com infraestrutura completa',
      coordinates: { lat: -26.3650, lng: -48.7150 },
      zoom: 16,
      features: ['Energia trifásica', 'Água industrial', 'Gás natural', 'Fibra óptica'],
      status: 'disponivel',
      area: '5.000m² - 15.000m²',
      price: 'R$ 320/m²'
    },
    setor_b: {
      id: 'setor_b',
      name: 'Setor B - Empresarial',
      description: 'Ideal para médias empresas e indústrias de tecnologia',
      coordinates: { lat: -26.3680, lng: -48.7180 },
      zoom: 16,
      features: ['Energia trifásica', 'Internet de alta velocidade', 'Área comercial próxima'],
      status: 'disponivel',
      area: '2.000m² - 8.000m²',
      price: 'R$ 280/m²'
    },
    setor_c: {
      id: 'setor_c',
      name: 'Setor C - Logístico',
      description: 'Perfeito para centros de distribuição e logística',
      coordinates: { lat: -26.3720, lng: -48.7120 },
      zoom: 16,
      features: ['Acesso direto à rodovia', 'Pátio de manobras', 'Docas de carga'],
      status: 'reservado',
      area: '10.000m² - 25.000m²',
      price: 'R$ 250/m²'
    },
    setor_d: {
      id: 'setor_d',
      name: 'Setor D - Sustentável',
      description: 'Lotes com foco em sustentabilidade e energia renovável',
      coordinates: { lat: -26.3750, lng: -48.7250 },
      zoom: 16,
      features: ['Energia solar', 'Tratamento de efluentes', 'Certificação ambiental'],
      status: 'disponivel',
      area: '3.000m² - 12.000m²',
      price: 'R$ 350/m²'
    }
  };

  const distancias = [
    {
      icon: Car,
      destino: 'Centro de Araquari',
      distancia: '5 km',
      tempo: '8 min'
    },
    {
      icon: Plane,
      destino: 'Aeroporto de Joinville',
      distancia: '45 km',
      tempo: '35 min'
    },
    {
      icon: Train,
      destino: 'Porto de Itajaí',
      distancia: '35 km',
      tempo: '25 min'
    },
    {
      icon: MapPin,
      destino: 'Joinville (Centro Industrial)',
      distancia: '40 km',
      tempo: '30 min'
    }
  ];

  // Initialize map
  const initializeMap = () => {
    if (!mapRef.current) return;

    const currentLoteamento = loteamentos[selectedLoteamento];
    
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: currentLoteamento.coordinates,
      zoom: currentLoteamento.zoom,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    });

    setMap(mapInstance);
    addMarkersToMap(mapInstance);
  };

  // Add markers to map
  const addMarkersToMap = (mapInstance: google.maps.Map) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    if (selectedLoteamento === 'geral') {
      // Add markers for all sectors when showing general view
      Object.values(loteamentos).forEach((loteamento) => {
        if (loteamento.id !== 'geral') {
          const marker = new google.maps.Marker({
            position: loteamento.coordinates,
            map: mapInstance,
            title: loteamento.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: getStatusColor(loteamento.status),
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 10
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="max-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                  ${loteamento.name}
                </h3>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                  ${loteamento.description}
                </p>
                <div style="margin-bottom: 8px;">
                  <strong style="color: #374151;">Área:</strong> ${loteamento.area}<br>
                  <strong style="color: #374151;">Preço:</strong> ${loteamento.price}<br>
                  <strong style="color: #374151;">Status:</strong> 
                  <span style="color: ${getStatusColor(loteamento.status)}; font-weight: 600;">
                    ${getStatusLabel(loteamento.status)}
                  </span>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
                  <strong style="color: #374151; font-size: 12px;">Características:</strong>
                  <ul style="margin: 4px 0 0 0; padding-left: 16px; font-size: 12px; color: #6b7280;">
                    ${loteamento.features.map(feature => `<li>${feature}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });

          newMarkers.push(marker);
        }
      });
    } else {
      // Add single marker for selected loteamento
      const loteamento = loteamentos[selectedLoteamento];
      const marker = new google.maps.Marker({
        position: loteamento.coordinates,
        map: mapInstance,
        title: loteamento.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: getStatusColor(loteamento.status),
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
          scale: 12
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
              ${loteamento.name}
            </h3>
            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
              ${loteamento.description}
            </p>
            <div style="margin-bottom: 12px; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
              <div style="margin-bottom: 6px;">
                <strong style="color: #374151;">Área disponível:</strong> ${loteamento.area}
              </div>
              <div style="margin-bottom: 6px;">
                <strong style="color: #374151;">Preço por m²:</strong> ${loteamento.price}
              </div>
              <div>
                <strong style="color: #374151;">Status:</strong> 
                <span style="color: ${getStatusColor(loteamento.status)}; font-weight: 600;">
                  ${getStatusLabel(loteamento.status)}
                </span>
              </div>
            </div>
            <div>
              <strong style="color: #374151; font-size: 14px;">Infraestrutura:</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 16px; font-size: 13px; color: #6b7280;">
                ${loteamento.features.map(feature => `<li style="margin-bottom: 2px;">${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
      });

      // Auto-open info window for selected loteamento
      infoWindow.open(mapInstance, marker);

      newMarkers.push(marker);
    }

    setMarkers(newMarkers);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return '#10b981';
      case 'reservado': return '#f59e0b';
      case 'vendido': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'reservado': return 'Reservado';
      case 'vendido': return 'Vendido';
      default: return 'Indefinido';
    }
  };

  // Update map when loteamento changes
  useEffect(() => {
    if (map) {
      const currentLoteamento = loteamentos[selectedLoteamento];
      map.setCenter(currentLoteamento.coordinates);
      map.setZoom(currentLoteamento.zoom);
      addMarkersToMap(map);
    }
  }, [selectedLoteamento, map]);

  const render = (status: any) => {
    if (status === 'LOADING') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando mapa de Araquari...</p>
          </div>
        </div>
      );
    }

    if (status === 'FAILURE') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Erro ao carregar o mapa</p>
            <p className="text-sm text-gray-500">Verifique sua conexão com a internet</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-full" onLoad={initializeMap} />
      </div>
    );
  };

  return (
    <section id="localizacao" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Localização Privilegiada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estrategicamente posicionado em Araquari, Santa Catarina, 
            conectando seu negócio aos principais centros econômicos da região.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mapa do Google Maps */}
          <div className="space-y-6">
            {/* Dropdown de Seleção */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Navigation className="mr-3 text-blue-600" size={24} />
                  Selecione o Loteamento
                </h3>
              </div>
              
              <select
                value={selectedLoteamento}
                onChange={(e) => setSelectedLoteamento(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {Object.values(loteamentos).map((loteamento) => (
                  <option key={loteamento.id} value={loteamento.id}>
                    {loteamento.name}
                  </option>
                ))}
              </select>

              {/* Info do Loteamento Selecionado */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {loteamentos[selectedLoteamento].name}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {loteamentos[selectedLoteamento].description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Área:</span>
                    <br />
                    <span className="text-gray-600">{loteamentos[selectedLoteamento].area}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Preço:</span>
                    <br />
                    <span className="text-gray-600">{loteamentos[selectedLoteamento].price}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span 
                    className="ml-2 px-2 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${getStatusColor(loteamentos[selectedLoteamento].status)}20`,
                      color: getStatusColor(loteamentos[selectedLoteamento].status)
                    }}
                  >
                    {getStatusLabel(loteamentos[selectedLoteamento].status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Mapa Interativo - Araquari/SC
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore a localização e os diferentes setores do empreendimento
                </p>
              </div>
              <Wrapper
                apiKey="AIzaSyD7ReYi091Zmk0y0BoSJdL6K3BI64ztzlI"
                render={render}
                libraries={['places']}
              />
            </div>

            {/* Legenda */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Building className="mr-2 text-blue-600" size={20} />
                Legenda dos Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Disponível para venda</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Reservado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Vendido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Distâncias e Informações */}
          <div className="space-y-6">
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
            </div>

            {/* Características da Região */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Home className="mr-2" size={24} />
                Por que Araquari?
              </h4>
              <ul className="space-y-2 text-blue-100">
                <li>• Polo industrial em crescimento</li>
                <li>• Proximidade com Porto de Itajaí</li>
                <li>• Acesso facilitado às rodovias BR-101 e BR-280</li>
                <li>• Mão de obra qualificada disponível</li>
                <li>• Incentivos fiscais municipais</li>
                <li>• Infraestrutura urbana consolidada</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold mb-2 text-gray-900">
                Quer conhecer pessoalmente?
              </h4>
              <p className="text-gray-600 mb-4">
                Agende uma visita técnica gratuita com nossos especialistas 
                e conheça todos os loteamentos disponíveis.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Agendar Visita Técnica
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalizacaoSection;