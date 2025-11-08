from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from database.chroma_store import collection
import os
import textwrap
import requests

MODEL_NAME = os.getenv("FLAN_MODEL", "google/flan-t5-small")

# load small seq2seq model for answers (may download ~200MB).
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

def ingest_document(doc_id: str, text: str, meta: dict | None = None, chunk_size: int = 800):
    # split into chunks and add to chroma
    text = text.strip()
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i : i + chunk_size])
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"doc_id": doc_id, "chunk_index": i, **(meta or {})} for i in range(len(chunks))]
    collection.add(documents=chunks, metadatas=metadatas, ids=ids)

def ask_question(question: str, doc_id: str | None = None):
    # if a document exists, use its context
    if doc_id:
        results = collection.query(query_texts=[question], n_results=3, where={"doc_id": doc_id})
        docs = results.get("documents", [[]])[0]
        context = "\n\n".join(docs).strip()
        prompt = f"Use the context below to answer the question.\n\nContext:\n{context}\n\nQuestion: {question}\nAnswer concisely:"
    else:
        # no document, just normal chat
        prompt = f"Question: {question}\nAnswer naturally and helpfully:"

    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post("http://localhost:11434/api/generate", json=payload)

    if response.status_code == 200:
        return response.json().get("response", "")
    else:
        return f"Error: {response.text}"

