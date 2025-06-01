
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Plus, Trash2, Eye, Mail, Calendar } from 'lucide-react';
import AddStudentDialog from './AddStudentDialog';
import StudentDetailDialog from './StudentDetailDialog';

const StudentDatabase = ({ students, onAddStudent, onDeleteStudent, onEditStudent }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDeleteStudent = (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName} from the database?`)) {
      onDeleteStudent(studentId);
    }
  };

  const handleEditStudent = (studentId, editData) => {
    onEditStudent(studentId, editData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Student Database</h3>
                <p className="text-gray-600">Manage registered students for face recognition</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <div className="p-6">
          {students.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No Students Added</h3>
              <p className="text-gray-400 mb-6">Add your first student to start using face recognition</p>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Student
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student.id} className="aspect-square">
                  <Card className="h-full border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative group">
                    <div className="p-4 h-full flex flex-col">
                      {/* Student Avatar */}
                      <div className="flex-1 flex items-center justify-center mb-3">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                          {student.image && student.image !== '/placeholder.svg' ? (
                            <img 
                              src={student.image} 
                              alt={student.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            student.name.charAt(0)
                          )}
                        </div>
                      </div>
                      
                      {/* Student Info */}
                      <div className="text-center space-y-1">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">{student.name}</h4>
                        <p className="text-xs text-gray-600 truncate">{student.email}</p>
                        <p className="text-xs text-gray-500">{student.grade}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <Button
                          onClick={() => setSelectedStudent(student)}
                          size="sm"
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeleteStudent(student.id, student.name)}
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Add Student Dialog */}
      <AddStudentDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAddStudent={onAddStudent}
      />

      {/* Student Detail Dialog */}
      <StudentDetailDialog
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onEdit={handleEditStudent}
        onDelete={(studentId, studentName) => {
          handleDeleteStudent(studentId, studentName);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
};

export default StudentDatabase;
