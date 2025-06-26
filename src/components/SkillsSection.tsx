import React, { useState } from 'react';
import { Zap, Plus, Trash2, Sparkles, Loader } from 'lucide-react';
import { Skill } from '../types/resume';
import { ApiService } from '../services/api';

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onChange,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'technical',
      proficiency: 'intermediate',
    };
    onChange([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const enhanceSkills = async () => {
    if (skills.length === 0) return;

    setIsEnhancing(true);
    try {
      const skillsText = skills.map(s => s.name).join(', ');
      const response = await ApiService.enhanceContent('skills', skillsText);
      // In a real implementation, you'd parse the enhanced content and update skills
      console.log('Enhanced skills suggestions:', response.suggestions);
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'soft': return 'bg-green-100 text-green-800';
      case 'language': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return 'bg-red-500';
      case 'advanced': return 'bg-orange-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Zap className="h-5 w-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={enhanceSkills}
            disabled={isEnhancing || skills.length === 0}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isEnhancing ? (
              <Loader className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            <span>{isEnhancing ? 'Enhancing...' : 'Enhance'}</span>
          </button>
          
          <button
            onClick={addSkill}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(skill.category)}`}>
                {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
              </span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="JavaScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="language">Language</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={skill.proficiency}
                    onChange={(e) => updateSkill(skill.id, 'proficiency', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <div className={`w-3 h-3 rounded-full ${getProficiencyColor(skill.proficiency)}`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm">Click "Add Skill" to get started.</p>
        </div>
      )}
    </div>
  );
};