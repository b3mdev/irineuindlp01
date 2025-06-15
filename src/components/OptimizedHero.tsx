import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useOptimizedIntersection, useReducedMotion } from './AnimationOptimizer';

const OptimizedHero = () => {
  const { elementRef, isVisible } = useOptimizedIntersection();
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Optimized animation classes
  const getAnimationClass = (delay = 0) => {
    if (prefersReducedMotion) return 'opacity-100 translate-y-0';
    
    return isVisible 
      ? `opacity-100 translate-y-0 transition-all duration-300 ease-out`
      : 'opacity-0 translate-y-8';
  };

  const getDelayedAnimationClass = (delay: number) => {
    if (prefersReducedMotion) return 'opacity-100 translate-y-0';
    
    return isVisible 
      ? `opacity-100 translate-y-0 transition-all duration-300 ease-out delay-${delay}`
      : 'opacity-0 translate-y-8';
  };

  return (
    <section 
      ref={elementRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-teal-50 to-blue-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight ${getAnimationClass()}`}>
              Lotes Industriais
              <br />
              <span className="text-gray-800">
                com a Melhor
              </span>
              <br />
              <span className="text-gray-800">
                Estrutura de
              </span>
              <br />
              <span className="text-gray-800">
                Santa Catarina
              </span>
            </h1>

            {/* Contact Form */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${getDelayedAnimationClass(100)}`}>
              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="O seu número de Telefone"
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500 transition-all duration-200"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center whitespace-nowrap">
                <ArrowRight className="mr-2" size={20} />
                Receber contato
              </button>
            </div>

            {/* Contact Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 ${getDelayedAnimationClass(200)}`}>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                WhatsApp
                <ArrowRight className="ml-2" size={20} />
              </button>
              
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                <Phone className="mr-2" size={20} />
                (47) 99999 9999
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative ${getDelayedAnimationClass(300)}`}>
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {!imageLoaded && (
                <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-3xl"></div>
              )}
              <img
                src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                alt="Vista aérea dos lotes industriais"
                className={`w-full h-[500px] object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              
              {/* Floating Cards */}
              <div className={`absolute top-6 right-6 bg-white rounded-2xl p-6 shadow-xl transition-all duration-300 ${isVisible && !prefersReducedMotion ? 'animate-float' : ''}`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">😊</div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">40+</div>
                  <div className="text-sm text-gray-600">anos de mercado</div>
                </div>
              </div>

              <div className={`absolute bottom-6 left-6 bg-white rounded-2xl p-6 shadow-xl transition-all duration-300 ${isVisible && !prefersReducedMotion ? 'animate-float-delayed' : ''}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-2">TOP</div>
                  <div className="text-2xl font-bold text-blue-900 mb-2">OF</div>
                  <div className="text-2xl font-bold text-blue-900">MIND</div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-8 h-1 bg-orange-400 rounded-full transition-all duration-300"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full transition-all duration-300"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHero;