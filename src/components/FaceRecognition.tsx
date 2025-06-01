
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';
import AnimatedResponse from './AnimatedResponse';

const FaceRecognition = ({ onAttendanceRecord }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Sample student database
  const students = [
    { id: 1, name: 'Alice Johnson', image: '/placeholder.svg' },
    { id: 2, name: 'Bob Smith', image: '/placeholder.svg' },
    { id: 3, name: 'Carol Davis', image: '/placeholder.svg' },
    { id: 4, name: 'David Wilson', image: '/placeholder.svg' },
    { id: 5, name: 'Emma Brown', image: '/placeholder.svg' },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const simulateFaceRecognition = () => {
    setIsScanning(true);
    
    // Simulate recognition process
    setTimeout(() => {
      // 70% chance of recognition for demo purposes
      const isRecognized = Math.random() > 0.3;
      const recognizedStudent = isRecognized 
        ? students[Math.floor(Math.random() * students.length)]
        : null;

      const result = {
        recognized: isRecognized,
        student: recognizedStudent,
        timestamp: new Date().toISOString(),
        status: isRecognized ? 'Present' : 'Absent'
      };

      setScanResult(result);
      setShowResponse(true);
      setIsScanning(false);

      // Add to attendance records
      onAttendanceRecord({
        ...result,
        id: Date.now()
      });

      // Hide response after 3 seconds
      setTimeout(() => {
        setShowResponse(false);
        setScanResult(null);
      }, 3000);
    }, 2000);
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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Face Recognition Scanner
            </h2>
            <p className="text-gray-600">
              Position your face in the camera frame and click scan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera Section */}
            <div className="space-y-6">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-80 bg-gray-900 rounded-2xl object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
                
                {isScanning && (
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={simulateFaceRecognition}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                <Camera className="w-6 h-6 mr-2" />
                {isScanning ? 'Scanning...' : 'Scan for Attendance'}
              </Button>
            </div>

            {/* Response Section */}
            <div className="flex items-center justify-center">
              {showResponse && scanResult ? (
                <AnimatedResponse result={scanResult} />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <p>Scan result will appear here</p>
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
