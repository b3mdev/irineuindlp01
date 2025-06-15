import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Building, 
  Users, 
  Briefcase,
  ExternalLink,
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'economia' | 'infraestrutura' | 'industria' | 'governo' | 'desenvolvimento';
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
}

const AraquariNews = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const categories = {
    all: { label: 'Todas', icon: Tag, color: 'text-gray-600 bg-gray-100' },
    economia: { label: 'Economia', icon: TrendingUp, color: 'text-green-600 bg-green-100' },
    infraestrutura: { label: 'Infraestrutura', icon: Building, color: 'text-blue-600 bg-blue-100' },
    industria: { label: 'Indústria', icon: Briefcase, color: 'text-purple-600 bg-purple-100' },
    governo: { label: 'Governo', icon: Users, color: 'text-red-600 bg-red-100' },
    desenvolvimento: { label: 'Desenvolvimento', icon: MapPin, color: 'text-yellow-600 bg-yellow-100' }
  };

  const newsData: NewsItem[] = [
    {
      id: '1',
      title: 'Araquari registra crescimento de 18% no setor industrial em 2024',
      summary: 'Município se consolida como polo industrial de Santa Catarina com chegada de novas empresas e expansão das existentes.',
      content: 'O município de Araquari registrou um crescimento expressivo de 18% no setor industrial durante o primeiro semestre de 2024, segundo dados da Secretaria de Desenvolvimento Econômico. O crescimento é atribuído à chegada de novas empresas e à expansão das indústrias já estabelecidas na região. A cidade tem se destacado pela sua localização estratégica, próxima ao Porto de Itajaí e com acesso facilitado às principais rodovias do estado. Além disso, os incentivos fiscais oferecidos pela prefeitura têm atraído investimentos significativos para o setor.',
      category: 'economia',
      date: '2024-12-15',
      readTime: '3 min',
      image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Crescimento', 'Indústria', 'Economia'],
      featured: true
    },
    {
      id: '2',
      title: 'Nova rodovia conectará Araquari ao Porto de Itajaí',
      summary: 'Investimento de R$ 120 milhões em infraestrutura viária promete reduzir tempo de transporte em 40%.',
      content: 'O Governo do Estado anunciou um investimento de R$ 120 milhões para a construção de uma nova rodovia que conectará diretamente Araquari ao Porto de Itajaí. A obra, que deve ser concluída até 2026, promete reduzir o tempo de transporte de cargas em até 40%, beneficiando diretamente o setor industrial da região. A nova via terá 25 quilômetros de extensão e contará com pista dupla, facilitando o escoamento da produção industrial local. O projeto também prevê a construção de viadutos e passarelas para pedestres, garantindo maior segurança no trânsito.',
      category: 'infraestrutura',
      date: '2024-12-12',
      readTime: '4 min',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Rodovia', 'Porto', 'Logística'],
      featured: true
    },
    {
      id: '3',
      title: 'Multinacional alemã anuncia fábrica em Araquari',
      summary: 'Empresa do setor automotivo investirá R$ 200 milhões e gerará 800 empregos diretos na região.',
      content: 'A multinacional alemã AutoTech anunciou oficialmente a instalação de sua primeira fábrica no Brasil, escolhendo Araquari como sede da operação. O investimento de R$ 200 milhões na nova unidade industrial deve gerar 800 empregos diretos e mais de 2.000 indiretos. A empresa, especializada em componentes automotivos de alta tecnologia, escolheu a cidade pela proximidade com o porto, qualidade da mão de obra local e incentivos fiscais oferecidos. A previsão é que a fábrica entre em operação no segundo semestre de 2025.',
      category: 'industria',
      date: '2024-12-10',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Multinacional', 'Empregos', 'Automotivo'],
      featured: false
    },
    {
      id: '4',
      title: 'Prefeitura lança programa de incentivos para startups industriais',
      summary: 'Iniciativa oferece isenção fiscal e suporte técnico para empresas inovadoras do setor industrial.',
      content: 'A Prefeitura de Araquari lançou o programa "Araquari Inovação", voltado para atrair startups e empresas de base tecnológica para o setor industrial. O programa oferece isenção de IPTU por cinco anos, redução de taxas municipais e acesso a incubadoras tecnológicas. Além disso, as empresas participantes terão suporte técnico especializado e acesso a linhas de crédito facilitadas. O objetivo é diversificar a matriz industrial da cidade e atrair investimentos em tecnologia e inovação.',
      category: 'governo',
      date: '2024-12-08',
      readTime: '3 min',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Startups', 'Inovação', 'Incentivos'],
      featured: false
    },
    {
      id: '5',
      title: 'Novo distrito industrial será inaugurado em 2025',
      summary: 'Área de 500 hectares contará com infraestrutura completa e capacidade para 50 empresas.',
      content: 'O novo distrito industrial de Araquari, com área total de 500 hectares, será inaugurado no primeiro trimestre de 2025. O empreendimento contará com infraestrutura completa, incluindo energia elétrica trifásica, água industrial, tratamento de efluentes, fibra óptica e acesso rodoviário pavimentado. O distrito terá capacidade para abrigar até 50 empresas de médio e grande porte, com lotes que variam de 5.000 a 50.000 metros quadrados. O investimento total na infraestrutura foi de R$ 80 milhões, com recursos públicos e privados.',
      category: 'desenvolvimento',
      date: '2024-12-05',
      readTime: '4 min',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Distrito Industrial', 'Infraestrutura', 'Desenvolvimento'],
      featured: true
    },
    {
      id: '6',
      title: 'Araquari entre as 10 cidades que mais crescem em SC',
      summary: 'Município registra crescimento populacional de 8% e econômico de 15% nos últimos dois anos.',
      content: 'Araquari foi classificada entre as 10 cidades que mais crescem em Santa Catarina, segundo estudo do Instituto de Pesquisa Econômica Aplicada (IPEA). O município registrou crescimento populacional de 8% e econômico de 15% nos últimos dois anos. O crescimento é atribuído principalmente ao desenvolvimento industrial, que tem atraído trabalhadores de toda a região. A cidade também se destaca pelos investimentos em educação técnica e qualificação profissional, preparando mão de obra especializada para o setor industrial.',
      category: 'economia',
      date: '2024-12-03',
      readTime: '3 min',
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Crescimento', 'Ranking', 'População'],
      featured: false
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const featuredNews = newsData.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const NewsCard = ({ news, featured = false }: { news: NewsItem; featured?: boolean }) => {
    const categoryInfo = categories[news.category];
    const IconComponent = categoryInfo.icon;

    return (
      <article 
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
          featured ? 'md:col-span-2 lg:col-span-1' : ''
        }`}
        onClick={() => setSelectedNews(news)}
      >
        <div className="relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              featured ? 'h-64' : 'h-48'
            }`}
          />
          <div className="absolute top-4 left-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo.color}`}>
              <IconComponent size={12} className="mr-1" />
              {categoryInfo.label}
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <Clock size={12} className="inline mr-1" />
            {news.readTime}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar size={14} className="mr-2" />
            {formatDate(news.date)}
          </div>

          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
            featured ? 'text-xl' : 'text-lg'
          }`}>
            {news.title}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {news.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {news.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
              Ler mais
            </span>
            <ArrowRight size={16} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    );
  };

  const NewsModal = ({ news, onClose }: { news: NewsItem; onClose: () => void }) => {
    const categoryInfo = categories[news.category];
    const IconComponent = categoryInfo.icon;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.color}`}>
                <IconComponent size={14} className="mr-2" />
                {categoryInfo.label}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar size={14} className="mr-2" />
              {formatDate(news.date)}
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-2" />
              {news.readTime} de leitura
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {news.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {news.summary}
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {news.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-blue-600 mr-3" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Notícias de Araquari
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe as últimas novidades sobre desenvolvimento econômico, 
            infraestrutura e oportunidades de investimento na região.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === key
                    ? `${category.color} shadow-lg`
                    : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <IconComponent size={16} className="mr-2" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Featured News */}
        {selectedCategory === 'all' && featuredNews.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <TrendingUp className="mr-3 text-blue-600" size={24} />
              Destaques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.map((news) => (
                <NewsCard key={news.id} news={news} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'all' ? regularNews : filteredNews).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Tag size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-500">
              Não há notícias disponíveis para esta categoria no momento.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Quer receber as últimas notícias?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Cadastre-se em nossa newsletter e fique por dentro de todas as 
            oportunidades de investimento e desenvolvimento em Araquari.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center">
              <ExternalLink size={16} className="mr-2" />
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
};

export default AraquariNews;