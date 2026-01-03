import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Image as ImageIcon,
  Zap,
  Calculator,
  Sparkles,
  X,
  BrainCircuit,
  Type
} from 'lucide-react';
import { solveMathProblemFromImage } from './gemini';

interface ScannerProps {
  onMenuClick: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onMenuClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isCapturing) return;

    setIsCapturing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = (event.target?.result as string)?.split(',')[1];
        if (base64Data) {
          try {
            const result = await solveMathProblemFromImage(base64Data);
            navigate('/solver', { state: { scanResult: result } });
          } catch (err: any) {
            setError(err.message);
            setIsCapturing(false);
          }
        }
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
        setIsCapturing(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError("Failed to process image.");
      setIsCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-enterprise-navy z-[50] flex flex-col overflow-hidden select-none">
      {/* Live Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Gradient Overlays - Enterprise Style */}
      <div className="absolute inset-0 bg-gradient-to-b from-enterprise-navy/80 via-transparent to-enterprise-navy/80 pointer-events-none" />

      {/* Enterprise Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-enterprise-blue/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Scanner Interface */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-[60]">

        {/* Top Actions Row */}
        <div className="flex justify-between items-center p-6 pt-12 md:pt-8">
          <button
            onClick={onMenuClick}
            className="p-3 text-white pointer-events-auto bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-xl transition-all active:scale-90 border border-white/10 flex items-center space-x-2"
          >
            <Menu size={22} strokeWidth={2.5} />
            <span className="font-semibold text-[14px] hidden sm:block">Menu</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-enterprise-blue to-enterprise-purple rounded-xl flex items-center justify-center shadow-lg shadow-enterprise-blue/30 mb-1">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            <span className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-60">Stepwise</span>
          </div>

          <button
            onClick={() => navigate('/solver')}
            className="p-3 text-white pointer-events-auto bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-xl transition-all active:scale-90 border border-white/10 flex items-center space-x-2"
          >
            <Type size={22} strokeWidth={2.5} />
            <span className="font-semibold text-[14px] hidden sm:block">Type</span>
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">

          <div className="absolute top-1/4 px-6 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
            <Sparkles size={14} className="text-enterprise-blueLight" strokeWidth={2.5} />
            <span className="text-white text-[13px] font-medium">Frame the problem clearly</span>
          </div>

          {/* Central Viewfinder - Modern Enterprise Style */}
          <div className="relative w-72 h-48 md:w-[500px] md:h-72">
            {/* Corner Brackets with Gradient */}
            <div className="absolute top-0 left-0 w-14 h-14 border-t-[3px] border-l-[3px] border-enterprise-blue rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-14 h-14 border-t-[3px] border-r-[3px] border-enterprise-blue rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-14 h-14 border-b-[3px] border-l-[3px] border-enterprise-purple rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-[3px] border-r-[3px] border-enterprise-purple rounded-br-2xl" />

            {/* Center Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-8 h-[1px] bg-white" />
              <div className="h-8 w-[1px] bg-white absolute" />
            </div>

            {/* Scanning Animation */}
            {isCapturing && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-enterprise-blue to-transparent animate-pulse"
                     style={{ animation: 'scan 1.5s ease-in-out infinite' }} />
              </div>
            )}
          </div>
        </div>

        {/* Shutter & Controls Container */}
        <div className="p-8 pb-14 md:pb-10 bg-gradient-to-t from-enterprise-navy/90 to-transparent flex flex-col items-center space-y-10">

          <div className="w-full max-w-sm flex items-end justify-between px-2">
            <button
              onClick={() => navigate('/calculator')}
              className="pointer-events-auto flex flex-col items-center space-y-2 group active:scale-95 transition-all"
            >
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                <Calculator size={24} strokeWidth={2} />
              </div>
              <span className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">Calc</span>
            </button>

            {/* Premium Shutter Button - Enterprise Gradient */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={capturePhoto}
                disabled={isCapturing}
                className="pointer-events-auto relative group active:scale-90 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-enterprise-blue to-enterprise-purple p-1 flex items-center justify-center shadow-lg shadow-enterprise-blue/30">
                  <div className={`w-full h-full rounded-full transition-all duration-500 ${isCapturing ? 'bg-enterprise-purple/80 scale-90' : 'bg-white hover:scale-95'}`} />
                </div>
                {isCapturing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
              <span className="text-white text-[11px] font-semibold uppercase tracking-widest mt-4">Capture</span>
            </div>

            <button
              onClick={() => navigate('/recall')}
              className="pointer-events-auto flex flex-col items-center space-y-2 group active:scale-95 transition-all"
            >
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                <BrainCircuit size={24} strokeWidth={2} />
              </div>
              <span className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">Recall</span>
            </button>
          </div>

          <div className="flex items-center space-x-16">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="pointer-events-auto p-3 text-white/50 hover:text-white transition-all active:scale-90 flex flex-col items-center"
            >
              <ImageIcon size={24} strokeWidth={2} />
            </button>
            <button
              onClick={() => setFlashOn(!flashOn)}
              className={`pointer-events-auto p-3 transition-all active:scale-90 rounded-xl flex flex-col items-center ${flashOn ? 'bg-enterprise-warning text-enterprise-navy' : 'text-white/50 hover:text-white'}`}
            >
              <Zap size={24} strokeWidth={2} fill={flashOn ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* Error Toast - Enterprise Style */}
      {error && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md enterprise-glass bg-white/95 border border-enterprise-border p-5 rounded-2xl shadow-enterprise-lg flex items-center justify-between z-[200] animate-in slide-in-from-bottom-8">
          <div className="flex items-center space-x-4 text-enterprise-text">
            <div className="w-10 h-10 rounded-xl bg-enterprise-danger/10 flex items-center justify-center text-enterprise-danger">
              <X size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[14px] font-medium pr-4">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="p-2 text-enterprise-textMuted hover:text-enterprise-text rounded-lg">
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
