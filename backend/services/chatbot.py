from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from database.chroma_store import collection
import os
import requests

MODEL_NAME = os.getenv("FLAN_MODEL", "google/flan-t5-small")

# Load FLAN model (optional lightweight local QA fallback)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

def ingest_document(doc_id: str, text: str, meta: dict | None = None, chunk_size: int = 800):
    """Split text into chunks and store in Chroma for retrieval."""
    text = text.strip()
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"doc_id": doc_id, "chunk_index": i, **(meta or {})} for i in range(len(chunks))]
    collection.add(documents=chunks, metadatas=metadatas, ids=ids)

def ask_question(question: str, doc_id: str | None = None):
    """Retrieve relevant context and query the Ollama model (Mistral)."""
    context = ""
    if doc_id:
        try:
            results = collection.query(query_texts=[question], n_results=3, where={"doc_id": doc_id})
            docs = results.get("documents", [[]])[0]
            context = "\n\n".join(docs).strip()
        except Exception as e:
            return f"Error retrieving context: {e}"

    if not context:
        prompt = f"Question: {question}\nAnswer clearly and helpfully:"
    else:
        prompt = f"""You are an intelligent legal assistant.
Use the context below to answer accurately and concisely.

Context:
{context}

Question: {question}
Answer:"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "mistral:7b-instruct-q4_K_M", "prompt": prompt},
            timeout=120
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("response", "").strip()
        else:
            return f"Ollama error: {response.text}"
    
    except Exception as e:
        return f"Error querying Ollama: {e}"
