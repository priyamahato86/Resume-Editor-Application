from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json
import os
from datetime import datetime

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class AIEnhanceResponse(BaseModel):
    enhanced_content: str
    suggestions: Optional[list] = []

class ResumeData(BaseModel):
    personal_info: Dict[str, Any]
    experience: list
    education: list
    skills: list
    summary: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# In-memory storage
resumes_storage = {}

# Mock AI enhancement logic
def enhance_content(section: str, content: str) -> Dict[str, Any]:
    """Mock AI enhancement with improved content suggestions"""
    
    enhancements = {
        "summary": {
            "prefixes": [
                "Results-driven professional with",
                "Accomplished specialist in",
                "Dynamic leader with expertise in",
                "Innovative problem-solver with"
            ],
            "improvements": [
                "quantify achievements with specific metrics",
                "highlight leadership and collaboration skills",
                "emphasize industry-specific expertise",
                "showcase problem-solving capabilities"
            ]
        },
        "experience": {
            "action_verbs": ["Spearheaded", "Orchestrated", "Optimized", "Pioneered", "Streamlined"],
            "improvements": [
                "use strong action verbs to start bullet points",
                "quantify results with percentages and numbers",
                "highlight technologies and methodologies used",
                "emphasize impact on business outcomes"
            ]
        },
        "education": {
            "improvements": [
                "include relevant coursework and projects",
                "mention academic achievements and honors",
                "highlight applicable certifications",
                "showcase research or thesis work"
            ]
        },
        "skills": {
            "improvements": [
                "organize skills by category (Technical, Soft Skills, etc.)",
                "prioritize most relevant skills for target role",
                "include proficiency levels where appropriate",
                "add recently acquired or in-demand skills"
            ]
        }
    }
    
    if section.lower() == "summary":
        enhanced = f"{enhancements['summary']['prefixes'][0]} {content.lower()}"
        if "years" not in content.lower():
            enhanced += " with 5+ years of proven success"
        enhanced += ". Demonstrated expertise in driving results and leading cross-functional teams."
        
    elif section.lower() == "experience":
        lines = content.split('\n')
        enhanced_lines = []
        for line in lines:
            if line.strip() and not line.startswith('•'):
                enhanced_lines.append(f"• {enhancements['experience']['action_verbs'][0]} {line.lower()}")
            else:
                enhanced_lines.append(line)
        enhanced = '\n'.join(enhanced_lines)
        
    else:
        enhanced = f"Enhanced: {content}"
    
    return {
        "enhanced_content": enhanced,
        "suggestions": enhancements.get(section.lower(), {}).get("improvements", [])
    }

@app.get("/")
async def root():
    return {"message": "Resume Editor API is running"}

@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def ai_enhance(request: AIEnhanceRequest):
    """Enhance resume section content using mock AI"""
    try:
        result = enhance_content(request.section, request.content)
        return AIEnhanceResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Enhancement failed: {str(e)}")

@app.post("/save-resume")
async def save_resume(resume: ResumeData):
    """Save resume data to storage"""
    try:
        resume_id = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Add timestamps
        resume.created_at = datetime.now().isoformat()
        resume.updated_at = datetime.now().isoformat()
        
        # Store in memory
        resumes_storage[resume_id] = resume.dict()
        
        # Also save to file for persistence
        os.makedirs("stored_resumes", exist_ok=True)
        with open(f"stored_resumes/{resume_id}.json", "w") as f:
            json.dump(resume.dict(), f, indent=2)
        
        return {
            "message": "Resume saved successfully",
            "resume_id": resume_id,
            "saved_at": resume.created_at
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Save failed: {str(e)}")

@app.get("/resumes")
async def list_resumes():
    """List all saved resumes"""
    return {
        "resumes": list(resumes_storage.keys()),
        "count": len(resumes_storage)
    }

@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """Retrieve a specific resume"""
    if resume_id not in resumes_storage:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return resumes_storage[resume_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)