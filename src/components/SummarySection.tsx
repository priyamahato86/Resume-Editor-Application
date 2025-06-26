import React, { useState } from 'react';
import { FileText, Sparkles, Loader } from 'lucide-react';
import { ApiService } from '../services/api';

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  onChange,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleEnhance = async () => {
    if (!summary.trim()) return;

    setIsEnhancing(true);
    try {
      const response = await ApiService.enhanceContent('summary', summary);
      onChange(response.enhanced_content);
      setSuggestions(response.suggestions || []);
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
        </div>
        
        <button
          onClick={handleEnhance}
          disabled={isEnhancing || !summary.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {isEnhancing ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>{isEnhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives..."
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 AI Suggestions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};