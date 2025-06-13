import React from 'react';
import { 
  MapPin, 
  Truck, 
  Zap, 
  Shield, 
  Wrench, 
  Users, 
  Clock, 
  Award,
  CheckCircle
} from 'lucide-react';

const VantagensSection = () => {
  const vantagens = [
    {
      icon: MapPin,
      title: 'Localização Estratégica',
      description: 'Próximo às principais rodovias e centros de distribuição',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Truck,
      title: 'Acesso Logístico',
      description: 'Fácil acesso para veículos pesados e transporte de carga',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Zap,
      title: 'Energia Trifásica',
      description: 'Infraestrutura elétrica completa para operações industriais',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Shield,
      title: 'Segurança 24h',
      description: 'Monitoramento e segurança patrimonial em tempo integral',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Wrench,
      title: 'Infraestrutura Completa',
      description: 'Água, esgoto, gás natural e telefonia disponíveis',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Users,
      title: 'Mão de Obra Qualificada',
      description: 'Região com disponibilidade de profissionais especializados',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  const beneficios = [
    'Documentação 100% regularizada',
    'Financiamento facilitado',
    'Sem taxa de condomínio',
    'Próximo a universidades técnicas',
    'Transporte público disponível',
    'Centros comerciais na região'
  ];

  return (
    <section id="vantagens" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que Escolher Nossos Lotes?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos muito mais que um simples terreno. É a base completa 
            para o sucesso do seu empreendimento industrial.
          </p>
        </div>

        {/* Vantagens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vantagens.map((vantagem, index) => {
            const IconComponent = vantagem.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className={`inline-flex p-4 rounded-2xl ${vantagem.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {vantagem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {vantagem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefícios Adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Benefícios Exclusivos
            </h3>
            <div className="space-y-4">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center group">
                  <CheckCircle className="text-green-500 mr-4 group-hover:scale-110 transition-transform duration-300" size={24} />
                  <span className="text-gray-700 text-lg">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <Award className="text-white mb-4" size={48} />
              <h4 className="text-2xl font-bold mb-4">
                Certificação ISO 14001
              </h4>
              <p className="text-blue-100 mb-6">
                Nosso empreendimento segue os mais altos padrões ambientais 
                e de sustentabilidade industrial.
              </p>
              <div className="flex items-center text-blue-200">
                <Clock className="mr-2" size={20} />
                <span>Aprovação ambiental em até 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VantagensSection;