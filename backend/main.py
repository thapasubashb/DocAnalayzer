import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.file_utils import extract_text_from_upload, save_upload_file
from services.summarizer import summarize_text
from services.clause_detector import detect_clauses
from services.chatbot import ask_question, ingest_document
from dotenv import load_dotenv
from uuid import uuid4
from pathlib import Path

load_dotenv()
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8000))

app = FastAPI(title="CaseFile AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def root():
    return {"message": "CaseFile backend running"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Save uploaded file
    saved_path = save_upload_file(file, UPLOAD_DIR)
    try:
        text = await extract_text_from_upload(saved_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text: {e}")

    # Summarize
    summary = summarize_text(text)

    # Clause detection
    clauses = detect_clauses(text)

    # Index into Chroma for chat retrieval
    doc_id = str(uuid4())
    ingest_document(doc_id=doc_id, text=text, meta={"filename": file.filename})

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "summary": summary,
        "clauses": clauses,
    }

@app.post("/ask/")
async def ask(question: str = Form(...), doc_id: str | None = Form(None)):
    answer = ask_question(question=question, doc_id=doc_id)
    return {"answer": answer}
