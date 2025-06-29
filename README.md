# Resume Editor

A comprehensive web-based resume editor that allows users to upload, edit, enhance, and download professional resumes with AI-powered improvements.

## Features

### Frontend (React + TypeScript)
- **Modern Upload Interface**: Drag-and-drop file upload supporting PDF and DOCX files
- **Comprehensive Resume Editor**: Editable sections for personal information, summary, experience, education, and skills
- **AI Enhancement**: AI-powered content improvement for each resume section
- **Real-time Editing**: Live editing with smooth animations and transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Export Functionality**: Download resume data as JSON
- **Beautiful UI**: Modern design with Tailwind CSS and smooth micro-interactions

### Backend (FastAPI + Python)
- **AI Enhancement API**: Mock AI service for improving resume content
- **Resume Storage**: Save and retrieve resume data
- **CORS Support**: Proper cross-origin resource sharing for frontend integration
- **RESTful API**: Clean API design with proper error handling

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- React Dropzone for file uploads
- Vite for development and building

### Backend
- FastAPI (Python)
- Pydantic for data validation
- Uvicorn ASGI server
- CORS middleware for frontend integration

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Python 3.8 or higher
- npm or yarn package manager

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

   The backend API will be available at `http://localhost:8000`

   You can view the interactive API documentation at `http://localhost:8000/docs`

### Running Both Services

You can run both frontend and backend simultaneously:

1. **Terminal 1 - Frontend**:
   ```bash
   npm run dev
   ```

2. **Terminal 2 - Backend**:
   ```bash
   npm run backend
   ```

## API Endpoints

### POST `/ai-enhance`
Enhance resume section content using mock AI.

**Request Body**:
```json
{
  "section": "summary",
  "content": "Experienced developer with 5 years of experience..."
}
```

**Response**:
```json
{
  "enhanced_content": "Results-driven professional with experienced developer with 5 years of experience...",
  "suggestions": [
    "quantify achievements with specific metrics",
    "highlight leadership and collaboration skills"
  ]
}
```

### POST `/save-resume`
Save complete resume data to backend storage.

**Request Body**:
```json
{
  "personal_info": {
    "fullName": "John Doe",
    "email": "john@example.com",
    // ... other fields
  },
  "summary": "Professional summary...",
  "experience": [...],
  "education": [...],
  "skills": [...]
}
```

**Response**:
```json
{
  "message": "Resume saved successfully",
  "resume_id": "resume_20241201_143022",
  "saved_at": "2024-12-01T14:30:22.123456"
}
```

### GET `/resumes`
List all saved resumes.

### GET `/resume/{resume_id}`
Retrieve a specific resume by ID.

## Project Structure

```
resume-editor/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── FileUpload.tsx
│   │   │   ├── PersonalInfoSection.tsx
│   │   │   ├── SummarySection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── ResumeActions.tsx
│   │   ├── services/            # API services
│   │   │   └── api.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── resume.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   └── stored_resumes/          # Resume storage directory
└── README.md
```

## Usage

1. **Upload Resume**: Start by uploading an existing PDF or DOCX resume, or choose to start from scratch
2. **Edit Sections**: Fill in or modify your personal information, summary, experience, education, and skills
3. **Enhance with AI**: Use the "Enhance with AI" buttons to improve your content with AI suggestions
4. **Save Progress**: Save your resume data to the backend for persistence
5. **Download**: Export your completed resume as a JSON file

## Development

### Adding New Features

1. **Frontend Components**: Add new components in `src/components/`
2. **API Endpoints**: Add new endpoints in `backend/main.py`
3. **Types**: Update TypeScript types in `src/types/resume.ts`

### Customization

- **Styling**: Modify Tailwind classes or extend the configuration
- **AI Enhancement**: Improve the mock AI logic in `backend/main.py`
- **File Parsing**: Add real PDF/DOCX parsing functionality
- **Export Formats**: Add PDF or Word export capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## Future Enhancements

- Real PDF/DOCX parsing implementation
- Multiple resume templates
- PDF export functionality
- User authentication and profiles
- Resume analytics and insights
- Integration with job boards
- Real AI enhancement using OpenAI or similar services
