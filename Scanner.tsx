import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  HelpCircle,
  Image as ImageIcon,
  Zap,
  Calculator,
  Sparkles,
  X,
  BrainCircuit
} from 'lucide-react';
import { solveMathProblemFromImage } from './gemini';

interface ScannerProps {
  onMenuClick: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onMenuClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access denied. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    setIsCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

      try {
        const result = await solveMathProblemFromImage(base64Data);
        navigate('/solver', { state: { scanResult: result } });
      } catch (err: any) {
        setError(err.message);
        setIsCapturing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[50] flex flex-col overflow-hidden select-none">
      {/* Live Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

      {/* Main Scanner Interface */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-[60]">

        {/* Top Actions Row */}
        <div className="flex justify-between items-center p-8 pt-12 md:pt-10">
          <button
            onClick={onMenuClick}
            className="p-3.5 text-white pointer-events-auto bg-black/20 backdrop-blur-xl hover:bg-white/10 rounded-2xl transition-all active:scale-90 border border-white/10 flex items-center space-x-2"
          >
            <Menu size={24} strokeWidth={2.5} />
            <span className="font-bold text-[15px] hidden sm:block">Menu</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-apple-blue rounded-[10px] flex items-center justify-center shadow-lg border border-white/20 mb-1">
              <span className="font-extrabold text-white text-sm tracking-tight">S</span>
            </div>
            <span className="text-white text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-60">Stepwise</span>
          </div>

          <button
            className="p-3.5 text-white pointer-events-auto bg-black/20 backdrop-blur-xl hover:bg-white/10 rounded-2xl transition-all border border-white/10"
          >
            <HelpCircle size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">

          <div className="absolute top-1/4 px-8 py-3 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
            <Sparkles size={14} className="text-apple-blue" strokeWidth={3} />
            <span className="text-white text-[13px] font-bold tracking-tight">Frame the problem clearly</span>
          </div>

          {/* Central Brackets */}
          <div className="relative w-72 h-48 md:w-[500px] md:h-72">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-[4px] border-l-[4px] border-white rounded-tl-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-[4px] border-r-[4px] border-white rounded-tr-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[4px] border-l-[4px] border-white rounded-bl-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[4px] border-r-[4px] border-white rounded-br-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />

            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-10 h-[1px] bg-white" />
              <div className="h-10 w-[1px] bg-white absolute" />
            </div>
          </div>
        </div>

        {/* Shutter & Controls Container */}
        <div className="p-10 pb-16 md:pb-12 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center space-y-12">

          <div className="w-full max-w-sm flex items-end justify-between px-2">
            <button
              onClick={() => navigate('/calculator')}
              className="pointer-events-auto flex flex-col items-center space-y-3 group active:scale-95 transition-all"
            >
              <div className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                <Calculator size={26} strokeWidth={2.5} />
              </div>
              <span className="text-white/60 text-[10px] font-extrabold uppercase tracking-[0.25em]">Calc</span>
            </button>

            {/* Premium Shutter Button */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={capturePhoto}
                disabled={isCapturing}
                className="pointer-events-auto relative group active:scale-90 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full border-[5px] border-white p-2 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <div className={`w-full h-full rounded-full transition-all duration-500 shadow-inner ${isCapturing ? 'bg-apple-gray scale-75' : 'bg-white hover:scale-95'}`} />
                </div>
                {isCapturing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-[5px] border-apple-blue/30 border-t-apple-blue rounded-full animate-spin" />
                  </div>
                )}
              </button>
              <span className="text-white text-[11px] font-extrabold uppercase tracking-[0.4em] mt-5">Analyze</span>
            </div>

            <button
              onClick={() => navigate('/recall')}
              className="pointer-events-auto flex flex-col items-center space-y-3 group active:scale-95 transition-all"
            >
              <div className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                <BrainCircuit size={26} strokeWidth={2.5} />
              </div>
              <span className="text-white/60 text-[10px] font-extrabold uppercase tracking-[0.25em]">Recall</span>
            </button>
          </div>

          <div className="flex items-center space-x-20">
            <button className="pointer-events-auto p-4 text-white/50 hover:text-white transition-all active:scale-90 flex flex-col items-center">
              <ImageIcon size={28} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setFlashOn(!flashOn)}
              className={`pointer-events-auto p-4 transition-all active:scale-90 rounded-2xl flex flex-col items-center ${flashOn ? 'bg-apple-warning text-black shadow-[0_0_20px_rgba(255,149,0,0.4)]' : 'text-white/50 hover:text-white'}`}
            >
              <Zap size={28} strokeWidth={2.5} fill={flashOn ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md apple-blur bg-white/95 dark:bg-gray-900/95 border border-black/5 dark:border-white/10 p-5 rounded-[24px] shadow-2xl flex items-center justify-between z-[200] animate-in slide-in-from-bottom-8">
          <div className="flex items-center space-x-4 text-apple-darkGray dark:text-white">
            <div className="w-10 h-10 rounded-full bg-apple-danger/10 flex items-center justify-center text-apple-danger">
              <X size={20} strokeWidth={3} />
            </div>
            <span className="text-[15px] font-bold pr-6">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="p-2 text-apple-gray hover:text-apple-darkGray dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;