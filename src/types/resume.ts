export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ResumeData {
  personal_info: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface AIEnhanceRequest {
  section: string;
  content: string;
}

export interface AIEnhanceResponse {
  enhanced_content: string;
  suggestions?: string[];
}