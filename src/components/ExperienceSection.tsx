import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Sparkles, Loader } from 'lucide-react';
import { Experience } from '../types/resume';
import { ApiService } from '../services/api';

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  onChange,
}) => {
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const enhanceExperience = async (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp || !exp.description.trim()) return;

    setEnhancingId(id);
    try {
      const response = await ApiService.enhanceContent('experience', exp.description);
      updateExperience(id, 'description', response.enhanced_content);
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setEnhancingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Briefcase className="h-5 w-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        </div>
        
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Experience {index + 1}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => enhanceExperience(exp.id)}
                  disabled={enhancingId === exp.id || !exp.description.trim()}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {enhancingId === exp.id ? (
                    <Loader className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  <span>{enhancingId === exp.id ? 'Enhancing...' : 'Enhance'}</span>
                </button>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your key responsibilities, achievements, and impact in this role..."
              />
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};