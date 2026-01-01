import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, all } from 'mathjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Calculator as CalcIcon,
  RotateCcw,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { evaluateExpression, generateGraphData } from './mathHelpers';

const math = create(all);

const CalculatorPage: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [graphFn, setGraphFn] = useState<string>('x^2');
  const [history, setHistory] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setResult(null);
      setError(null);
      return;
    }

    const timeout = setTimeout(() => {
      const res = evaluateExpression(input);
      if (res.success) {
        setResult(res.formatted);
        setError(null);
        if (input.includes('x')) {
          setGraphFn(input);
        }
      } else {
        setError(res.error);
        setResult(null);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  const graphData = useMemo(() => {
    return generateGraphData(graphFn, -10, 10);
  }, [graphFn]);

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', 'x'],
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-apple-bg overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-2xl border-b border-black/[0.05] sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-apple-blue hover:bg-apple-blue/5 rounded-full transition-all flex items-center space-x-1 group"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
            <span className="font-bold text-[17px] hidden sm:inline">Back</span>
          </button>

          <div className="h-6 w-px bg-black/[0.08] mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-apple-darkGray hover:bg-black/5 rounded-full md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>

          <div className="hidden md:flex items-center space-x-2 ml-2">
            <CalcIcon size={18} className="text-apple-success" strokeWidth={2.5} />
            <span className="font-bold text-apple-darkGray tracking-tight text-[17px]">Scientific Engine</span>
          </div>
        </div>
        <button
          onClick={() => setInput('')}
          className="p-2.5 text-apple-gray hover:text-apple-darkGray transition-all"
        >
          <RotateCcw size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Keypad & Input */}
        <div className="w-full md:w-1/2 lg:w-[500px] flex flex-col bg-white border-r border-black/[0.05] p-8 space-y-8 overflow-y-auto">

          <div className="apple-card p-8 min-h-[200px] flex flex-col justify-between shadow-apple-soft border-apple-success/10 bg-apple-bg/50">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter expression..."
              className="bg-transparent border-none outline-none w-full text-2xl font-bold resize-none placeholder-apple-gray/30 text-apple-darkGray leading-relaxed"
              rows={3}
            />
            <div className="flex justify-between items-end pt-4">
              <div className="text-[12px] text-apple-danger font-bold uppercase tracking-wider">{error && 'Syntax Error'}</div>
              <div className="text-5xl font-extrabold text-apple-success tracking-tighter mono overflow-x-auto">{result || '0'}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {buttons.flat().map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') setInput('');
                  else if (btn === '=') {
                    if (result) setHistory(prev => [input + ' = ' + result, ...prev.slice(0, 4)]);
                  } else setInput(prev => prev + btn);
                }}
                className={`py-6 rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-sm ${btn === '='
                  ? 'bg-apple-success text-white shadow-lg shadow-apple-success/20'
                  : ['/', '*', '-', '+', 'C'].includes(btn)
                    ? 'bg-apple-success/10 text-apple-success hover:bg-apple-success/20'
                    : 'bg-apple-bg border border-black/[0.03] text-apple-darkGray hover:bg-black/[0.02]'
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>

          <div className="apple-card p-6 bg-apple-bg/30 border-black/[0.02]">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="w-full flex items-center justify-between text-sm font-bold text-apple-darkGray"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-apple-blue/10 flex items-center justify-center">
                  <Info size={16} className="text-apple-blue" strokeWidth={2.5} />
                </div>
                <span>Calculation Breakdown</span>
              </div>
              {showSteps ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
            </button>
            {showSteps && (
              <div className="mt-6 text-[13px] text-apple-gray leading-relaxed mono p-5 bg-white rounded-2xl border border-black/[0.03] shadow-inner font-bold">
                {input ? (
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-widest text-[10px]">Input</span> <span>{input}</span></p>
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-widest text-[10px]">Parser</span> <span>Math.JS Kernel v15</span></p>
                    <p className="flex justify-between"><span className="opacity-50 uppercase tracking-widest text-[10px]">Precision</span> <span>14 Digits</span></p>
                    <div className="h-px bg-black/[0.03] my-2" />
                    <p className="flex justify-between text-apple-success font-extrabold tracking-tight"><span>Result</span> <span>{result}</span></p>
                  </div>
                ) : "Computation path is empty."}
              </div>
            )}
          </div>
        </div>

        {/* Right: Graphing */}
        <div className="flex-1 flex flex-col p-8 md:p-12 space-y-10 overflow-y-auto">
          <div className="apple-card p-10 flex-1 flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-apple-success uppercase tracking-[0.2em] flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-apple-success" />
                  <span>Geometric Plot</span>
                </div>
                <h3 className="text-2xl font-bold text-apple-darkGray tracking-tight">Function Visualization</h3>
              </div>

              <div className="flex items-center space-x-3 bg-apple-bg border border-black/[0.04] px-5 py-2.5 rounded-2xl shadow-inner">
                <span className="text-[12px] font-bold text-apple-gray uppercase tracking-widest">f(x) = </span>
                <input
                  value={graphFn}
                  onChange={(e) => setGraphFn(e.target.value)}
                  className="bg-transparent border-none outline-none text-[15px] font-extrabold text-apple-darkGray w-40"
                />
              </div>
            </div>

            <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000008" vertical={false} />
                  <XAxis dataKey="x" stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} fontStyle="bold" />
                  <YAxis stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} fontStyle="bold" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: '16px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}
                    itemStyle={{ color: '#34C759', fontWeight: '800', fontSize: '13px' }}
                  />
                  <Line type="monotone" dataKey="y" stroke="#34C759" strokeWidth={4} dot={false} animationDuration={1000} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;