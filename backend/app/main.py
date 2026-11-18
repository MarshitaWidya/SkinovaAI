from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analysis import router as analysis_router

app = FastAPI(title="Skinova AI API", version="0.1.0", description="AI-powered Skin Analysis System")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(analysis_router)

@app.get("/health")
def health():
    return {"status": "ok", "service": "skinova-ai-api", "stage": 1}
