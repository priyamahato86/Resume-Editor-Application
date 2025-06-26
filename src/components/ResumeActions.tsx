import React, { useState } from 'react';
import { Save, Download, CheckCircle, Loader } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { ApiService } from '../services/api';

interface ResumeActionsProps {
  resumeData: ResumeData;
}

export const ResumeActions: React.FC<ResumeActionsProps> = ({ resumeData }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await ApiService.saveResume(resumeData);
      setLastSaved(new Date().toLocaleTimeString());
      console.log('Resume saved:', response);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `resume_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume Actions</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {isSaving ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Resume'}</span>
        </button>
        
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 transform hover:scale-105"
        >
          <Download className="h-5 w-5" />
          <span>Download JSON</span>
        </button>
      </div>

      {lastSaved && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span>Last saved at {lastSaved}</span>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>• Save: Stores your resume data in the backend</p>
        <p>• Download: Exports your resume as a JSON file</p>
      </div>
    </div>
  );
};