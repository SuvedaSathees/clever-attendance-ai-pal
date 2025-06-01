
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Upload, User } from 'lucide-react';

const AddStudentDialog = ({ isOpen, onClose, onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '10th Grade',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    onAddStudent(formData);
    setFormData({ name: '', email: '', grade: '10th Grade', image: '' });
    setImagePreview('');
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', grade: '10th Grade', image: '' });
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Add New Student</h3>
            <Button
              onClick={handleClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600">Upload passport size photo</p>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter student name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl"
              >
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddStudentDialog;
