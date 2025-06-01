
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
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Alice Johnson', 
        email: 'alice.johnson@school.edu',
        grade: '10th Grade',
        image: '/placeholder.svg',
        lastSeen: '2024-06-01 09:15:00'
      },
      { 
        id: 2, 
        name: 'Bob Smith', 
        email: 'bob.smith@school.edu',
        grade: '10th Grade',
        image: '/placeholder.svg',
        lastSeen: '2024-06-01 09:12:00'
      },
      { 
        id: 3, 
        name: 'Carol Davis', 
        email: 'carol.davis@school.edu',
        grade: '10th Grade',
        image: '/placeholder.svg',
        lastSeen: '2024-05-31 14:30:00'
      },
      { 
        id: 4, 
        name: 'David Wilson', 
        email: 'david.wilson@school.edu',
        grade: '10th Grade',
        image: '/placeholder.svg',
        lastSeen: '2024-06-01 08:45:00'
      },
      { 
        id: 5, 
        name: 'Emma Brown', 
        email: 'emma.brown@school.edu',
        grade: '10th Grade',
        image: '/placeholder.svg',
        lastSeen: 'Never'
      },
    ];
  });

  const addAttendanceRecord = (record) => {
    setAttendanceRecords(prev => [record, ...prev]);
  };

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now(),
      lastSeen: 'Never'
    };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const updateStudentLastSeen = (studentId) => {
    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, lastSeen: new Date().toLocaleString() }
        : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            👓 Smart Glass Monitor
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Advanced face recognition for intelligent attendance tracking
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
            <FaceRecognition 
              onAttendanceRecord={addAttendanceRecord} 
              students={students}
              onUpdateStudentLastSeen={updateStudentLastSeen}
            />
          )}
          {activeTab === 'dashboard' && (
            <AttendanceDashboard records={attendanceRecords} />
          )}
          {activeTab === 'students' && (
            <StudentDatabase 
              students={students}
              onAddStudent={addStudent}
              onDeleteStudent={deleteStudent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;
