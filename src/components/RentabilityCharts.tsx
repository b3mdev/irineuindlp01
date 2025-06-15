import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Calculator, DollarSign, Calendar, Target, ArrowUp } from 'lucide-react';

interface ChartData {
  period: string;
  investment: number;
  revenue: number;
  profit: number;
  roi: number;
}

const RentabilityCharts = () => {
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie'>('line');
  const [selectedPeriod, setSelectedPeriod] = useState<'5' | '10' | '15'>('10');
  const [animationProgress, setAnimationProgress] = useState(0);

  // Sample data for different periods
  const chartData: Record<string, ChartData[]> = {
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
  };

  const currentData = chartData[selectedPeriod];

  // Animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(timer);
  }, [activeChart, selectedPeriod]);

  // Line Chart Component
  const LineChart = () => {
    const maxProfit = Math.max(...currentData.map(d => d.profit));
    const maxROI = Math.max(...currentData.map(d => d.roi));

    return (
      <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
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
          />
          
          {/* ROI line */}
          <polyline
            fill="none"
            stroke="url(#roiGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8,4"
            points={currentData.map((d, i) => {
              const x = 60 + (i * (680 / (currentData.length - 1)));
              const y = 252 - ((d.roi / maxROI) * 192 * (animationProgress / 100));
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {currentData.map((d, i) => {
            const x = 60 + (i * (680 / (currentData.length - 1)));
            const profitY = 252 - ((d.profit / maxProfit) * 192 * (animationProgress / 100));
            const roiY = 252 - ((d.roi / maxROI) * 192 * (animationProgress / 100));
            
            return (
              <g key={i}>
                <circle cx={x} cy={profitY} r="6" fill="#3b82f6" className="drop-shadow-sm" />
                <circle cx={x} cy={roiY} r="4" fill="#10b981" className="drop-shadow-sm" />
                <text x={x} y="275" textAnchor="middle" className="text-xs fill-gray-600">
                  {d.period.replace('Ano ', '')}
                </text>
              </g>
            );
          })}
          
          {/* Gradients */}
          <defs>
            <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center mb-2">
            <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-700">Lucro Acumulado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-green-500 border-dashed border-t mr-2"></div>
            <span className="text-xs text-gray-700">ROI (%)</span>
          </div>
        </div>
      </div>
    );
  };

  // Bar Chart Component
  const BarChart = () => {
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
                    className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-1000 ease-out shadow-lg"
                    style={{ height: `${height}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                      R$ {(d.revenue / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                  {d.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Pie Chart Component
  const PieChart = () => {
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
          <svg width="200" height="200" className="transform rotate-0">
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
                  className="drop-shadow-lg hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle cx="100" cy="100" r="40" fill="white" className="drop-shadow-sm" />
            <text x="100" y="95" textAnchor="middle" className="text-sm font-bold fill-gray-800">
              {selectedPeriod} Anos
            </text>
            <text x="100" y="110" textAnchor="middle" className="text-xs fill-gray-600">
              ROI Total
            </text>
          </svg>
          
          {/* Legend */}
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 space-y-3">
            {data.map((item, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-600">
                    R$ {(item.value / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const finalData = currentData[currentData.length - 1];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
            <button
              onClick={() => setActiveChart('line')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeChart === 'line'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp size={16} className="mr-2" />
              Evolução
            </button>
            <button
              onClick={() => setActiveChart('bar')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeChart === 'bar'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 size={16} className="mr-2" />
              Receita
            </button>
            <button
              onClick={() => setActiveChart('pie')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeChart === 'pie'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <PieChart size={16} className="mr-2" />
              Composição
            </button>
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '5' | '10' | '15')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              R$ {(finalData.profit / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-600">Lucro Total</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{finalData.roi}%</div>
            <div className="text-sm text-gray-600">ROI Final</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
              <Calculator className="text-purple-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              R$ {(finalData.revenue / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-600">Receita Anual</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
              <Target className="text-yellow-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((finalData.profit / finalData.investment) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Retorno Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentabilityCharts;