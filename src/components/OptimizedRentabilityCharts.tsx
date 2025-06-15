import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TrendingUp, BarChart3, PieChart, Calculator, DollarSign, Calendar, Target } from 'lucide-react';
import { useOptimizedIntersection, useReducedMotion } from './AnimationOptimizer';

interface ChartData {
  period: string;
  investment: number;
  revenue: number;
  profit: number;
  roi: number;
}

const OptimizedRentabilityCharts = () => {
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie'>('line');
  const [selectedPeriod, setSelectedPeriod] = useState<'5' | '10' | '15'>('10');
  const [animationProgress, setAnimationProgress] = useState(0);
  const { elementRef, isVisible } = useOptimizedIntersection();
  const prefersReducedMotion = useReducedMotion();

  // Memoized chart data to prevent unnecessary recalculations
  const chartData: Record<string, ChartData[]> = useMemo(() => ({
    '5': [
      { period: 'Ano 1', investment: 320000, revenue: 38400, profit: 38400, roi: 12 },
      { period: 'Ano 2', investment: 320000, revenue: 42240, profit: 80640, roi: 13.2 },
      { period: 'Ano 3', investment: 320000, revenue: 46464, profit: 127104, roi: 14.5 },
      { period: 'Ano 4', investment: 320000, revenue: 51110, profit: 178214, roi: 16 },
      { period: 'Ano 5', investment: 320000, revenue: 56221, profit: 234435, roi: 17.6 }
    ],
    '10': [
      { period: 'Ano 1', investment: 320000, revenue: 38400, profit: 38400, roi: 12 },
      { period: 'Ano 2', investment: 320000, revenue: 42240, profit: 80640, roi: 13.2 },
      { period: 'Ano 3', investment: 320000, revenue: 46464, profit: 127104, roi: 14.5 },
      { period: 'Ano 4', investment: 320000, revenue: 51110, profit: 178214, roi: 16 },
      { period: 'Ano 5', investment: 320000, revenue: 56221, profit: 234435, roi: 17.6 },
      { period: 'Ano 6', investment: 320000, revenue: 61843, profit: 296278, roi: 19.3 },
      { period: 'Ano 7', investment: 320000, revenue: 68027, profit: 364305, roi: 21.3 },
      { period: 'Ano 8', investment: 320000, revenue: 74830, profit: 439135, roi: 23.4 },
      { period: 'Ano 9', investment: 320000, revenue: 82313, profit: 521448, roi: 25.7 },
      { period: 'Ano 10', investment: 320000, revenue: 90544, profit: 611992, roi: 28.3 }
    ],
    '15': [
      { period: 'Ano 1', investment: 320000, revenue: 38400, profit: 38400, roi: 12 },
      { period: 'Ano 3', investment: 320000, revenue: 46464, profit: 127104, roi: 14.5 },
      { period: 'Ano 5', investment: 320000, revenue: 56221, profit: 234435, roi: 17.6 },
      { period: 'Ano 7', investment: 320000, revenue: 68027, profit: 364305, roi: 21.3 },
      { period: 'Ano 10', investment: 320000, revenue: 90544, profit: 611992, roi: 28.3 },
      { period: 'Ano 12', investment: 320000, revenue: 109853, profit: 831847, roi: 34.3 },
      { period: 'Ano 15', investment: 320000, revenue: 142847, profit: 1284705, roi: 44.6 }
    ]
  }), []);

  const currentData = useMemo(() => chartData[selectedPeriod], [chartData, selectedPeriod]);

  // Optimized animation with reduced motion support
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      setAnimationProgress(100);
      return;
    }

    let animationId: number;
    const startTime = performance.now();
    const duration = 800; // Reduced from 2500ms to 800ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(easeOutCubic * 100);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [activeChart, selectedPeriod, isVisible, prefersReducedMotion]);

  // Memoized chart components to prevent unnecessary re-renders
  const LineChart = useCallback(() => {
    const maxProfit = Math.max(...currentData.map(d => d.profit));
    const maxROI = Math.max(...currentData.map(d => d.roi));

    return (
      <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="60"
              y1={60 + i * 48}
              x2="740"
              y2={60 + i * 48}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
          
          {/* Profit line */}
          <polyline
            fill="none"
            stroke="url(#profitGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={currentData.map((d, i) => {
              const x = 60 + (i * (680 / (currentData.length - 1)));
              const y = 252 - ((d.profit / maxProfit) * 192 * (animationProgress / 100));
              return `${x},${y}`;
            }).join(' ')}
            style={{
              strokeDasharray: prefersReducedMotion ? 'none' : '1000',
              strokeDashoffset: prefersReducedMotion ? 0 : 1000 - (animationProgress * 10),
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.3s ease-out'
            }}
          />
          
          {/* Data points */}
          {currentData.map((d, i) => {
            const x = 60 + (i * (680 / (currentData.length - 1)));
            const profitY = 252 - ((d.profit / maxProfit) * 192 * (animationProgress / 100));
            
            return (
              <circle 
                key={i} 
                cx={x} 
                cy={profitY} 
                r="6" 
                fill="#3b82f6" 
                className="drop-shadow-sm"
                style={{
                  opacity: prefersReducedMotion ? 1 : animationProgress / 100,
                  transition: 'opacity 0.3s ease-out'
                }}
              />
            );
          })}
          
          {/* Gradients */}
          <defs>
            <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }, [currentData, animationProgress, prefersReducedMotion]);

  const BarChart = useCallback(() => {
    const maxValue = Math.max(...currentData.map(d => d.revenue));
    
    return (
      <div className="relative h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-end justify-between h-full space-x-2">
          {currentData.map((d, i) => {
            const height = (d.revenue / maxValue) * 240 * (animationProgress / 100);
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="relative w-full max-w-12">
                  <div 
                    className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg shadow-lg"
                    style={{ 
                      height: `${height}px`,
                      transition: prefersReducedMotion ? 'none' : 'height 0.3s ease-out'
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2">
                  {d.period.replace('Ano ', '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [currentData, animationProgress, prefersReducedMotion]);

  const PieChart = useCallback(() => {
    const totalProfit = currentData[currentData.length - 1].profit;
    const initialInvestment = currentData[0].investment;
    const netGain = totalProfit - initialInvestment;
    
    const data = [
      { label: 'Investimento Inicial', value: initialInvestment, color: '#ef4444' },
      { label: 'Lucro Líquido', value: netGain, color: '#10b981' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    
    return (
      <div className="relative h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 flex items-center justify-center">
        <div className="relative">
          <svg width="200" height="200">
            {data.map((item, i) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360 * (animationProgress / 100);
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle += (percentage / 100) * 360;
              
              const startX = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              return (
                <path
                  key={i}
                  d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={item.color}
                  className="drop-shadow-lg hover:opacity-80 transition-opacity duration-200"
                />
              );
            })}
            <circle cx="100" cy="100" r="40" fill="white" className="drop-shadow-sm" />
          </svg>
        </div>
      </div>
    );
  }, [currentData, animationProgress]);

  const finalData = currentData[currentData.length - 1];

  return (
    <div ref={elementRef} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Simulação de Rentabilidade</h3>
            <p className="text-blue-100">Projeções baseadas em dados históricos do mercado</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{finalData.roi}%</div>
            <div className="text-blue-200 text-sm">ROI Anual Médio</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'line', icon: TrendingUp, label: 'Evolução' },
              { key: 'bar', icon: BarChart3, label: 'Receita' },
              { key: 'pie', icon: PieChart, label: 'Composição' }
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveChart(key as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeChart === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '5' | '10' | '15')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="5">5 Anos</option>
              <option value="10">10 Anos</option>
              <option value="15">15 Anos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="p-6">
        {activeChart === 'line' && <LineChart />}
        {activeChart === 'bar' && <BarChart />}
        {activeChart === 'pie' && <PieChart />}
      </div>

      {/* Key Metrics */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: DollarSign, value: `R$ ${(finalData.profit / 1000).toFixed(0)}k`, label: 'Lucro Total', color: 'bg-blue-100 text-blue-600' },
            { icon: TrendingUp, value: `${finalData.roi}%`, label: 'ROI Final', color: 'bg-green-100 text-green-600' },
            { icon: Calculator, value: `R$ ${(finalData.revenue / 1000).toFixed(0)}k`, label: 'Receita Anual', color: 'bg-purple-100 text-purple-600' },
            { icon: Target, value: `${Math.round((finalData.profit / finalData.investment) * 100)}%`, label: 'Retorno Total', color: 'bg-yellow-100 text-yellow-600' }
          ].map(({ icon: Icon, value, label, color }, index) => (
            <div key={index} className="text-center">
              <div className={`flex items-center justify-center w-12 h-12 ${color} rounded-full mx-auto mb-3`}>
                <Icon size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedRentabilityCharts;