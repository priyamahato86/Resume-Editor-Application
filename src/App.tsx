import React, { useState } from 'react';
import { FileText, Users, Upload } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { SummarySection } from './components/SummarySection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ResumeActions } from './components/ResumeActions';
import { ResumeData, PersonalInfo, Experience, Education, Skill } from './types/resume';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
};

const mockResumeData: ResumeData = {
  personal_info: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev',
  },
  summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Led development of scalable web applications serving 100K+ users. Mentored junior developers and improved deployment efficiency by 40%.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8/4.0',
      honors: 'Magna Cum Laude',
    },
  ],
  skills: [
    {
      id: '1',
      name: 'JavaScript',
      category: 'technical',
      proficiency: 'expert',
    },
    {
      id: '2',
      name: 'React',
      category: 'technical',
      proficiency: 'expert',
    },
    {
      id: '3',
      name: 'Leadership',
      category: 'soft',
      proficiency: 'advanced',
    },
  ],
};

function App() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'edit'>('upload');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal_info: initialPersonalInfo,
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });

  const handleFileUpload = (file: File) => {
    // Mock file parsing - in real implementation, you'd parse PDF/DOCX
    console.log('File uploaded:', file.name);
    
    // Simulate parsing by loading mock data
    setResumeData(mockResumeData);
    setCurrentStep('edit');
  };

  const handleSkipUpload = () => {
    setCurrentStep('edit');
  };

  if (currentStep === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Resume Editor
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your existing resume or start from scratch to create a professional, 
              AI-enhanced resume that stands out.
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-800">Upload Your Resume</h2>
              </div>
              
              <FileUpload onFileUpload={handleFileUpload} />
              
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="text-gray-500 text-sm font-medium">OR</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                
                <button
                  onClick={handleSkipUpload}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Start from Scratch
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Smart Parsing</h3>
                <p className="text-sm text-gray-600">
                  Automatically extract information from your PDF or DOCX resume
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Enhancement</h3>
                <p className="text-sm text-gray-600">
                  Improve your content with AI-powered suggestions and enhancements
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Export Ready</h3>
                <p className="text-sm text-gray-600">
                  Download your polished resume in multiple formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Resume Editor</h1>
              <p className="text-gray-600">Build your professional resume</p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentStep('upload')}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            Upload New Resume
          </button>
        </div>

        {/* Resume Sections */}
        <div className="space-y-8">
          <PersonalInfoSection
            personalInfo={resumeData.personal_info}
            onChange={(info) => setResumeData(prev => ({ ...prev, personal_info: info }))}
          />
          
          <SummarySection
            summary={resumeData.summary}
            onChange={(summary) => setResumeData(prev => ({ ...prev, summary }))}
          />
          
          <ExperienceSection
            experience={resumeData.experience}
            onChange={(experience) => setResumeData(prev => ({ ...prev, experience }))}
          />
          
          <EducationSection
            education={resumeData.education}
            onChange={(education) => setResumeData(prev => ({ ...prev, education }))}
          />
          
          <SkillsSection
            skills={resumeData.skills}
            onChange={(skills) => setResumeData(prev => ({ ...prev, skills }))}
          />
          
          <ResumeActions resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default App;