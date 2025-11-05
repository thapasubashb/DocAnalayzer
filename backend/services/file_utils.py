import pdfplumber
import docx
from pathlib import Path
from fastapi import UploadFile
import aiofiles

async def extract_text_from_upload(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".pdf":
        return extract_text_pdf(path)
    elif ext == ".docx":
        return extract_text_docx(path)
    elif ext == ".txt":
        return extract_text_txt(path)
    else:
        raise ValueError("Unsupported file type")

def extract_text_pdf(path: Path) -> str:
    texts = []
    with pdfplumber.open(str(path)) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                texts.append(t)
    return "\n".join(texts)

def extract_text_docx(path: Path) -> str:
    doc = docx.Document(str(path))
    return "\n".join(p.text for p in doc.paragraphs if p.text)

def extract_text_txt(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")

def save_upload_file(upload_file: UploadFile, upload_dir: Path) -> Path:
    dest = upload_dir / upload_file.filename
    # write file synchronously to ensure subsequent reading works
    with open(dest, "wb") as f:
        f.write(upload_file.file.read())
    return dest

# For FastAPI UploadFile path-based async read variant
async def extract_text_from_upload(uploaded_path: Path) -> str:
    return extract_text_from_upload_sync(uploaded_path)

def extract_text_from_upload_sync(path: Path) -> str:
    return extract_text_from_upload_helper(path)

def extract_text_from_upload_helper(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".pdf":
        return extract_text_pdf(path)
    elif ext == ".docx":
        return extract_text_docx(path)
    elif ext == ".txt":
        return extract_text_txt(path)
    else:
        raise ValueError("Unsupported file type")
