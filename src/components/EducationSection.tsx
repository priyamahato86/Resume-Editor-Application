import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onChange,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
    };
    onChange([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <GraduationCap className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        </div>
        
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Education {index + 1}
              </h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Date *
                </label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Honors/Awards (Optional)
                </label>
                <input
                  type="text"
                  value={edu.honors || ''}
                  onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Magna Cum Laude, Dean's List"
                />
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};