import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { MapPin, Building, Truck, Zap, Shield, Users, Info } from 'lucide-react';

// Types for our markers
interface MarkerData {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  description: string;
  category: 'industrial' | 'services' | 'infrastructure' | 'security' | 'common';
  details: {
    area?: string;
    capacity?: string;
    hours?: string;
    features?: string[];
  };
  image?: string;
}

// Marker categories with colors and icons
const markerCategories = {
  industrial: {
    color: '#3B82F6', // Blue
    icon: Building,
    label: 'Áreas Industriais'
  },
  services: {
    color: '#10B981', // Green
    icon: Truck,
    label: 'Serviços e Logística'
  },
  infrastructure: {
    color: '#F59E0B', // Yellow
    icon: Zap,
    label: 'Infraestrutura'
  },
  security: {
    color: '#EF4444', // Red
    icon: Shield,
    label: 'Segurança'
  },
  common: {
    color: '#8B5CF6', // Purple
    icon: Users,
    label: 'Áreas Comuns'
  }
};

// Sample marker data for the industrial development
const markersData: MarkerData[] = [
  {
    id: '1',
    position: { lat: -26.9194, lng: -49.0661 },
    title: 'Setor A - Lotes Premium',
    description: 'Área destinada a indústrias de grande porte com infraestrutura completa',
    category: 'industrial',
    details: {
      area: '15.000m²',
      capacity: '8 lotes disponíveis',
      features: ['Energia trifásica', 'Água industrial', 'Gás natural', 'Fibra óptica']
    },
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '2',
    position: { lat: -26.9184, lng: -49.0651 },
    title: 'Setor B - Médio Porte',
    description: 'Lotes ideais para indústrias de médio porte e startups industriais',
    category: 'industrial',
    details: {
      area: '8.000m²',
      capacity: '12 lotes disponíveis',
      features: ['Energia trifásica', 'Água industrial', 'Acesso pavimentado']
    },
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '3',
    position: { lat: -26.9204, lng: -49.0671 },
    title: 'Centro Logístico',
    description: 'Hub de distribuição e armazenagem com acesso direto às rodovias',
    category: 'services',
    details: {
      area: '5.000m²',
      capacity: '50 veículos/dia',
      hours: '24h',
      features: ['Docas de carga', 'Pátio de manobras', 'Balança rodoviária']
    },
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '4',
    position: { lat: -26.9174, lng: -49.0641 },
    title: 'Subestação Elétrica',
    description: 'Subestação de energia com capacidade para todo o complexo',
    category: 'infrastructure',
    details: {
      capacity: '138kV',
      hours: '24h',
      features: ['Energia trifásica', 'Backup automático', 'Monitoramento remoto']
    },
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '5',
    position: { lat: -26.9214, lng: -49.0681 },
    title: 'Portaria Principal',
    description: 'Controle de acesso principal com segurança 24 horas',
    category: 'security',
    details: {
      hours: '24h',
      features: ['Controle biométrico', 'CFTV', 'Guarita blindada', 'Cancela automática']
    },
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '6',
    position: { lat: -26.9164, lng: -49.0631 },
    title: 'Centro Administrativo',
    description: 'Área administrativa com salas comerciais e serviços',
    category: 'common',
    details: {
      area: '2.000m²',
      hours: '8h às 18h',
      features: ['Salas comerciais', 'Auditório', 'Restaurante', 'Estacionamento']
    },
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '7',
    position: { lat: -26.9224, lng: -49.0691 },
    title: 'Estação de Tratamento',
    description: 'Estação de tratamento de água e efluentes industriais',
    category: 'infrastructure',
    details: {
      capacity: '1000m³/dia',
      hours: '24h',
      features: ['Tratamento primário', 'Tratamento secundário', 'Monitoramento automático']
    },
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  },
  {
    id: '8',
    position: { lat: -26.9154, lng: -49.0621 },
    title: 'Área de Convivência',
    description: 'Espaço para eventos e confraternizações dos colaboradores',
    category: 'common',
    details: {
      area: '1.500m²',
      capacity: '200 pessoas',
      features: ['Churrasqueiras', 'Quadra esportiva', 'Playground', 'Área verde']
    },
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  }
];

// Map component
const MapComponent: React.FC<{ markers: MarkerData[] }> = ({ markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: -26.9184, lng: -49.0651 },
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    });

    setMap(mapInstance);

    // Create info window
    const infoWindowInstance = new google.maps.InfoWindow();
    setInfoWindow(infoWindowInstance);

    // Add markers
    markers.forEach((markerData) => {
      const category = markerCategories[markerData.category];
      
      // Create custom marker icon
      const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: category.color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
        scale: 12
      };

      const marker = new google.maps.Marker({
        position: markerData.position,
        map: mapInstance,
        title: markerData.title,
        icon: markerIcon,
        animation: google.maps.Animation.DROP
      });

      // Add click listener
      marker.addListener('click', () => {
        setSelectedMarker(markerData);
        
        const content = `
          <div style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
            <div style="margin-bottom: 12px;">
              <img src="${markerData.image || 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'}" 
                   alt="${markerData.title}" 
                   style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
              ${markerData.title}
            </h3>
            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
              ${markerData.description}
            </p>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
              ${markerData.details.area ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #374151;"><strong>Área:</strong> ${markerData.details.area}</p>` : ''}
              ${markerData.details.capacity ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #374151;"><strong>Capacidade:</strong> ${markerData.details.capacity}</p>` : ''}
              ${markerData.details.hours ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #374151;"><strong>Funcionamento:</strong> ${markerData.details.hours}</p>` : ''}
              ${markerData.details.features ? `
                <div style="margin-top: 8px;">
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #374151; font-weight: 600;">Características:</p>
                  <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #6b7280;">
                    ${markerData.details.features.map(feature => `<li>${feature}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>
        `;

        infoWindowInstance.setContent(content);
        infoWindowInstance.open(mapInstance, marker);
      });
    });

  }, [markers]);

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
};

// Legend component
const MapLegend: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Info className="mr-2 text-blue-600" size={20} />
        Legenda do Mapa
      </h3>
      <div className="space-y-3">
        {Object.entries(markerCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          return (
            <div key={key} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3 border-2 border-white shadow-sm"
                style={{ backgroundColor: category.color }}
              />
              <IconComponent size={16} className="mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">{category.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Dica:</strong> Clique nos marcadores para ver informações detalhadas de cada área.
        </p>
      </div>
    </div>
  );
};

// Main Interactive Map component
const InteractiveMap: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const render = (status: any) => {
    if (status === 'LOADING') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando mapa interativo...</p>
          </div>
        </div>
      );
    }

    if (status === 'FAILURE') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Erro ao carregar o mapa</p>
            <p className="text-sm text-gray-500">Verifique sua conexão com a internet</p>
          </div>
        </div>
      );
    }

    setIsLoading(false);
    return <MapComponent markers={markersData} />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Map */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Mapa Interativo do Empreendimento
            </h3>
            <p className="text-gray-600">
              Explore as diferentes áreas e infraestruturas do complexo industrial
            </p>
          </div>
          <div className="h-96">
            <Wrapper
              apiKey="AIzaSyD7ReYi091Zmk0y0BoSJdL6K3BI64ztzlI"
              render={render}
              libraries={['places']}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="lg:col-span-1">
        <MapLegend />
        
        {/* Additional Info */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h4 className="font-bold text-lg mb-3">Visita Técnica</h4>
          <p className="text-blue-100 text-sm mb-4">
            Agende uma visita presencial para conhecer todas as facilidades do empreendimento.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 w-full">
            Agendar Visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;