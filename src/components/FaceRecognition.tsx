
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Scan } from 'lucide-react';
import AnimatedResponse from './AnimatedResponse';

const FaceRecognition = ({ onAttendanceRecord, students, onUpdateStudentLastSeen }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureAndAnalyzeFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return { isImageClear: false, capturedImage: null };

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Get captured image as data URL
    const capturedImage = canvas.toDataURL('image/jpeg', 0.8);

    // Enhanced blur detection using edge detection
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let sum = 0;
    const width = canvas.width;
    const height = canvas.height;
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = data[idx];
        const right = data[idx + 4];
        const down = data[(y + 1) * width * 4 + x * 4];
        
        const laplacian = Math.abs(4 * current - right - down - data[idx - 4] - data[(y - 1) * width * 4 + x * 4]);
        sum += laplacian;
      }
    }
    
    const variance = sum / ((width - 2) * (height - 2));
    console.log('Image clarity variance:', variance);
    
    return {
      isImageClear: variance > 15,
      capturedImage: capturedImage
    };
  };

  const simulateFaceRecognition = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      // Capture and analyze the frame
      const { isImageClear, capturedImage } = captureAndAnalyzeFrame();
      
      if (!isImageClear) {
        const result = {
          recognized: false,
          student: null,
          timestamp: new Date().toISOString(),
          status: 'Image Not Clear',
          message: 'Image is blurred or not clear. Please ensure good lighting and hold still.'
        };
        
        setScanResult(result);
        setShowResponse(true);
        setIsScanning(false);
        
        setTimeout(() => {
          setShowResponse(false);
          setScanResult(null);
        }, 3000);
        return;
      }

      // Filter students with actual uploaded images
      const studentsWithImages = students.filter(student => 
        student.image && student.image !== '/placeholder.svg'
      );

      let recognizedStudent = null;
      let isRecognized = false;

      if (studentsWithImages.length > 0) {
        // 85% chance to recognize if there are students with uploaded images
        isRecognized = Math.random() > 0.15;
        if (isRecognized) {
          recognizedStudent = studentsWithImages[Math.floor(Math.random() * studentsWithImages.length)];
        }
      } else {
        // 60% chance to recognize from placeholder students
        isRecognized = Math.random() > 0.4;
        if (isRecognized) {
          recognizedStudent = students[Math.floor(Math.random() * students.length)];
        }
      }

      const result = {
        recognized: isRecognized,
        student: recognizedStudent,
        timestamp: new Date().toISOString(),
        status: isRecognized ? 'Present' : 'Not Found',
        message: isRecognized 
          ? `${recognizedStudent.name}, you are present!`
          : 'Face not recognized in student database. Please try again.'
      };

      setScanResult(result);
      setShowResponse(true);
      setIsScanning(false);

      // Add to attendance records
      onAttendanceRecord({
        ...result,
        id: Date.now()
      });

      // Update student's last seen time if recognized
      if (isRecognized && recognizedStudent) {
        onUpdateStudentLastSeen(recognizedStudent.id);
      }

      // Hide response after 4 seconds
      setTimeout(() => {
        setShowResponse(false);
        setScanResult(null);
      }, 4000);
    }, 2500);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <Scan className="w-8 h-8 text-purple-600" />
              Face Recognition Scanner
            </h2>
            <p className="text-gray-600">
              Position your face in the camera frame for full face recognition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera Section */}
            <div className="space-y-6">
              <div className="relative">
                {cameraError ? (
                  <div className="w-full h-80 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
                    <div className="text-center p-6">
                      <Camera className="w-16 h-16 text-red-400 mx-auto mb-4" />
                      <p className="text-red-600 font-medium">{cameraError}</p>
                      <Button 
                        onClick={startCamera}
                        className="mt-4 bg-red-500 hover:bg-red-600"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-80 bg-gray-900 rounded-2xl object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    
                    {/* Face detection frame overlay */}
                    <div className="absolute inset-0 border-2 border-purple-400 rounded-2xl pointer-events-none">
                      {/* Full face detection frame */}
                      <div className="absolute top-1/6 left-1/4 w-1/2 h-2/3 border-4 border-green-400 rounded-xl animate-pulse">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-2 py-1 rounded text-xs font-semibold">
                          Face Detection Zone
                        </div>
                      </div>
                    </div>
                    
                    {isScanning && (
                      <div className="absolute inset-0 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4">
                          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Button
                onClick={simulateFaceRecognition}
                disabled={isScanning || cameraError}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Scan className="w-6 h-6 mr-2" />
                {isScanning ? 'Scanning Face...' : 'Scan Face for Attendance'}
              </Button>
            </div>

            {/* Response Section */}
            <div className="flex items-center justify-center">
              {showResponse && scanResult ? (
                <AnimatedResponse result={scanResult} />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Scan className="w-16 h-16 text-gray-400" />
                  </div>
                  <p>Face scan result will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Ensure good lighting and clear image</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaceRecognition;
