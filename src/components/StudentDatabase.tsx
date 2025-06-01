
import React from 'react';
import { Card } from "@/components/ui/card";
import { User, Users } from 'lucide-react';

const StudentDatabase = () => {
  const students = [
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice.johnson@school.edu',
      grade: '10th Grade',
      lastSeen: '2024-06-01 09:15:00'
    },
    { 
      id: 2, 
      name: 'Bob Smith', 
      email: 'bob.smith@school.edu',
      grade: '10th Grade',
      lastSeen: '2024-06-01 09:12:00'
    },
    { 
      id: 3, 
      name: 'Carol Davis', 
      email: 'carol.davis@school.edu',
      grade: '10th Grade',
      lastSeen: '2024-05-31 14:30:00'
    },
    { 
      id: 4, 
      name: 'David Wilson', 
      email: 'david.wilson@school.edu',
      grade: '10th Grade',
      lastSeen: '2024-06-01 08:45:00'
    },
    { 
      id: 5, 
      name: 'Emma Brown', 
      email: 'emma.brown@school.edu',
      grade: '10th Grade',
      lastSeen: 'Never'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Student Database</h3>
              <p className="text-gray-600">Registered students for face recognition</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <Card key={student.id} className="border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.grade}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{student.email}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Last seen:</p>
                      <p className="text-sm font-medium text-gray-700">{student.lastSeen}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Face model training progress</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDatabase;
