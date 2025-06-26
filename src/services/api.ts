import { ResumeData, AIEnhanceRequest, AIEnhanceResponse } from '../types/resume';

const API_BASE_URL = 'http://localhost:8000';

export class ApiService {
  static async enhanceContent(section: string, content: string): Promise<AIEnhanceResponse> {
    const response = await fetch(`${API_BASE_URL}/ai-enhance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ section, content } as AIEnhanceRequest),
    });

    if (!response.ok) {
      throw new Error(`AI enhancement failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async saveResume(resumeData: ResumeData): Promise<{ message: string; resume_id: string; saved_at: string }> {
    const response = await fetch(`${API_BASE_URL}/save-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      throw new Error(`Resume save failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async getResumes(): Promise<{ resumes: string[]; count: number }> {
    const response = await fetch(`${API_BASE_URL}/resumes`);

    if (!response.ok) {
      throw new Error(`Failed to fetch resumes: ${response.statusText}`);
    }

    return response.json();
  }

  static async getResume(resumeId: string): Promise<ResumeData> {
    const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    return response.json();
  }
}