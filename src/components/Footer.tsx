import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg font-bold text-xl inline-block mb-6">
              Irineu Imóveis
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Há mais de 20 anos conectando empresários aos melhores lotes industriais. 
              Sua parceira estratégica para o crescimento do seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Início
                </a>
              </li>
              <li>
                <a href="#lotes" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Lotes Disponíveis
                </a>
              </li>
              <li>
                <a href="#vantagens" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Vantagens
                </a>
              </li>
              <li>
                <a href="#localizacao" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Localização
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="text-blue-400 mr-3" size={18} />
                <span className="text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-blue-400 mr-3" size={18} />
                <span className="text-gray-300">contato@irineuimoveis.com.br</span>
              </div>
              <div className="flex items-start">
                <MapPin className="text-blue-400 mr-3 mt-1" size={18} />
                <div className="text-gray-300">
                  <p>Rua das Indústrias, 123</p>
                  <p>São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Irineu Imóveis. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;