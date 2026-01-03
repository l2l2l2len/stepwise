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
  Type,
  Camera,
  AlertCircle
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
  const [showFlash, setShowFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [hasCameraSupport, setHasCameraSupport] = useState(true);

  useEffect(() => {
    // Check if camera is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasCameraSupport(false);
      return;
    }
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
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
        };
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === 'NotAllowedError') {
        setError("Camera access denied. Please allow camera permissions and refresh.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera found on this device.");
        setHasCameraSupport(false);
      } else {
        setError("Unable to access camera. Try uploading an image instead.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const triggerFlashEffect = () => {
    if (flashOn) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 150);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    setIsCapturing(true);
    triggerFlashEffect();

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

    // Reset file input to allow re-selecting the same file
    e.target.value = '';
  };

  // Render fallback UI when camera is not available
  const renderNoCameraFallback = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-6">
        <Camera size={48} className="text-white/60" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Camera Not Available</h2>
      <p className="text-white/60 mb-8 max-w-xs">
        {error || "Your device doesn't have a camera or camera access is restricted."}
      </p>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="pointer-events-auto px-8 py-4 bg-apple-blue text-white rounded-2xl font-bold flex items-center space-x-3 hover:bg-blue-600 transition-colors"
      >
        <ImageIcon size={22} />
        <span>Upload an Image</span>
      </button>
      <button
        onClick={() => navigate('/solver')}
        className="pointer-events-auto mt-4 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold flex items-center space-x-3 hover:bg-white/20 transition-colors"
      >
        <Type size={22} />
        <span>Type Problem Instead</span>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black z-[50] flex flex-col overflow-hidden select-none">
      {/* Flash overlay effect */}
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[1000] pointer-events-none animate-pulse" />
      )}

      {/* Live Video Feed */}
      {hasCameraSupport && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

      {/* Main Scanner Interface */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-[60]">

        {/* Top Actions Row */}
        <div className="flex justify-between items-center p-6 sm:p-8 pt-12 md:pt-10">
          <button
            onClick={onMenuClick}
            className="p-3 sm:p-3.5 text-white pointer-events-auto bg-black/20 backdrop-blur-xl hover:bg-white/10 rounded-2xl transition-all active:scale-90 border border-white/10 flex items-center space-x-2"
          >
            <Menu size={22} strokeWidth={2.5} />
            <span className="font-bold text-[15px] hidden sm:block">Menu</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-apple-blue rounded-[10px] flex items-center justify-center shadow-lg border border-white/20 mb-1">
              <span className="font-extrabold text-white text-sm tracking-tight">S</span>
            </div>
            <span className="text-white text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-60">Stepwise</span>
          </div>

          <button
            onClick={() => navigate('/solver')}
            className="p-3 sm:p-3.5 text-white pointer-events-auto bg-black/20 backdrop-blur-xl hover:bg-white/10 rounded-2xl transition-all active:scale-90 border border-white/10 flex items-center space-x-2"
          >
            <Type size={22} strokeWidth={2.5} />
            <span className="font-bold text-[15px] hidden sm:block">Type</span>
          </button>
        </div>

        {/* Camera content or fallback */}
        {!hasCameraSupport || !cameraReady ? (
          renderNoCameraFallback()
        ) : (
          <>
            {/* Viewfinder Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="absolute top-1/4 px-6 sm:px-8 py-2.5 sm:py-3 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
                <Sparkles size={14} className="text-apple-blue" strokeWidth={3} />
                <span className="text-white text-[12px] sm:text-[13px] font-bold tracking-tight">Frame the problem clearly</span>
              </div>

              {/* Central Brackets */}
              <div className="relative w-64 h-40 sm:w-72 sm:h-48 md:w-[500px] md:h-72">
                <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t-[3px] sm:border-t-[4px] border-l-[3px] sm:border-l-[4px] border-white rounded-tl-2xl sm:rounded-tl-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-t-[3px] sm:border-t-[4px] border-r-[3px] sm:border-r-[4px] border-white rounded-tr-2xl sm:rounded-tr-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-b-[3px] sm:border-b-[4px] border-l-[3px] sm:border-l-[4px] border-white rounded-bl-2xl sm:rounded-bl-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b-[3px] sm:border-b-[4px] border-r-[3px] sm:border-r-[4px] border-white rounded-br-2xl sm:rounded-br-3xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" />

                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-8 sm:w-10 h-[1px] bg-white" />
                  <div className="h-8 sm:h-10 w-[1px] bg-white absolute" />
                </div>
              </div>
            </div>

            {/* Shutter & Controls Container */}
            <div className="p-6 sm:p-10 pb-12 sm:pb-16 md:pb-12 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center space-y-8 sm:space-y-12">
              <div className="w-full max-w-sm flex items-end justify-between px-2">
                <button
                  onClick={() => navigate('/calculator')}
                  className="pointer-events-auto flex flex-col items-center space-y-2 sm:space-y-3 group active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                    <Calculator size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-white/60 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Calc</span>
                </button>

                {/* Premium Shutter Button */}
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={capturePhoto}
                    disabled={isCapturing}
                    aria-label="Capture photo"
                    className="pointer-events-auto relative group active:scale-90 transition-all duration-300"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[4px] sm:border-[5px] border-white p-1.5 sm:p-2 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                      <div className={`w-full h-full rounded-full transition-all duration-500 shadow-inner ${isCapturing ? 'bg-apple-gray scale-75' : 'bg-white hover:scale-95'}`} />
                    </div>
                    {isCapturing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-[4px] sm:border-[5px] border-apple-blue/30 border-t-apple-blue rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                  <span className="text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-4 sm:mt-5">Analyze</span>
                </div>

                <button
                  onClick={() => navigate('/recall')}
                  className="pointer-events-auto flex flex-col items-center space-y-2 sm:space-y-3 group active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
                    <BrainCircuit size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-white/60 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Recall</span>
                </button>
              </div>

              <div className="flex items-center space-x-16 sm:space-x-20">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload image"
                  className="pointer-events-auto p-3 sm:p-4 text-white/50 hover:text-white transition-all active:scale-90 flex flex-col items-center"
                >
                  <ImageIcon size={26} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setFlashOn(!flashOn)}
                  aria-label={flashOn ? "Turn flash off" : "Turn flash on"}
                  className={`pointer-events-auto p-3 sm:p-4 transition-all active:scale-90 rounded-xl sm:rounded-2xl flex flex-col items-center ${flashOn ? 'bg-apple-warning text-black shadow-[0_0_20px_rgba(255,149,0,0.4)]' : 'text-white/50 hover:text-white'}`}
                >
                  <Zap size={26} strokeWidth={2.5} fill={flashOn ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Error Toast */}
      {error && hasCameraSupport && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md apple-blur bg-white/95 dark:bg-gray-900/95 border border-black/5 dark:border-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-2xl flex items-center justify-between z-[200] animate-in slide-in-from-bottom-8">
          <div className="flex items-center space-x-3 sm:space-x-4 text-apple-darkGray dark:text-white">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-apple-danger/10 flex items-center justify-center text-apple-danger flex-shrink-0">
              <AlertCircle size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[14px] sm:text-[15px] font-bold pr-2">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            className="p-2 text-apple-gray hover:text-apple-darkGray dark:hover:text-white flex-shrink-0"
          >
            <X size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
