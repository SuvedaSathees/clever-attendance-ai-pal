
import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Users, Calendar } from 'lucide-react';
import FaceRecognition from './FaceRecognition';
import AttendanceDashboard from './AttendanceDashboard';
import StudentDatabase from './StudentDatabase';

const AttendanceSystem = () => {
  const [activeTab, setActiveTab] = useState('recognition');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const addAttendanceRecord = (record) => {
    setAttendanceRecords(prev => [record, ...prev]);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🤖 Smart Attendance AI
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Friendly face recognition for student attendance
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex gap-2">
            <Button
              onClick={() => setActiveTab('recognition')}
              className={`rounded-full px-6 py-3 font-semibold transition-all ${
                activeTab === 'recognition'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
            >
              <Camera className="w-5 h-5 mr-2" />
              Face Recognition
            </Button>
            <Button
              onClick={() => setActiveTab('dashboard')}
              className={`rounded-full px-6 py-3 font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
            <Button
              onClick={() => setActiveTab('students')}
              className={`rounded-full px-6 py-3 font-semibold transition-all ${
                activeTab === 'students'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Students
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500">
          {activeTab === 'recognition' && (
            <FaceRecognition onAttendanceRecord={addAttendanceRecord} />
          )}
          {activeTab === 'dashboard' && (
            <AttendanceDashboard records={attendanceRecords} />
          )}
          {activeTab === 'students' && (
            <StudentDatabase />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;
