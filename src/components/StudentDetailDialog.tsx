
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, User, Mail, Calendar, Trash2, Clock, Edit } from 'lucide-react';

const StudentDetailDialog = ({ student, isOpen, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    grade: ''
  });

  React.useEffect(() => {
    if (student && isOpen) {
      setEditData({
        name: student.name,
        email: student.email,
        grade: student.grade
      });
    }
  }, [student, isOpen]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editData.name || !editData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    onEdit(student.id, editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      name: student.name,
      email: student.email,
      grade: student.grade
    });
    setIsEditing(false);
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Student Details</h3>
            <Button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Passport Size Photo */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                {student.image && student.image !== '/placeholder.svg' ? (
                  <img 
                    src={student.image} 
                    alt={student.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-purple-200 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                    {student.name.charAt(0)}
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold text-gray-800">{student.name}</h4>
              <p className="text-gray-600">{student.grade}</p>
            </div>

            {/* Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Student Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="font-semibold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{student.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email Address</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="font-semibold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{student.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Grade</p>
                  {isEditing ? (
                    <select
                      value={editData.grade}
                      onChange={(e) => setEditData(prev => ({ ...prev, grade: e.target.value }))}
                      className="font-semibold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 w-full"
                    >
                      <option value="9th Grade">9th Grade</option>
                      <option value="10th Grade">10th Grade</option>
                      <option value="11th Grade">11th Grade</option>
                      <option value="12th Grade">12th Grade</option>
                    </select>
                  ) : (
                    <p className="font-semibold text-gray-800">{student.grade}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Seen</p>
                  <p className="font-semibold text-gray-800">{student.lastSeen}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(student.id, student.name)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDetailDialog;
