import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { PersonalInfo } from '../types/resume';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  onChange,
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="City, State, Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="url"
              value={personalInfo.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};