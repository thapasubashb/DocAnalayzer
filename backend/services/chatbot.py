from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from database.chroma_store import collection
import os
import requests
import json

MODEL_NAME = os.getenv("FLAN_MODEL", "google/flan-t5-small")

# Load FLAN model (fallback)
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
    """Retrieve relevant context and query the Ollama model."""
    
    # Step 1: Retrieve context from vector DB
    context = ""
    if doc_id:
        try:
            results = collection.query(
                query_texts=[question], 
                n_results=3, 
                where={"doc_id": doc_id}
            )
            docs = results.get("documents", [[]])[0]
            context = "\n\n".join(docs).strip()
        except Exception as e:
            return f"Error retrieving context: {e}"

    # Step 2: Build prompt
    if context:
        prompt = f"""You are an intelligent legal assistant.
Use the context to answer accurately.

Context:
{context}

Question: {question}
Answer:"""
    else:
        prompt = f"Question: {question}\nAnswer clearly:"

    # Step 3: Call Ollama with streaming fix
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "phi3:mini", "prompt": prompt, "stream": True},
            stream=True,
            timeout=120
        )

        if response.status_code != 200:
            return f"Ollama error: {response.text}"

        full_answer = ""

        # The API returns multiple JSON objects line-by-line
        for line in response.iter_lines():
            if not line:
                continue
            try:
                data = json.loads(line.decode("utf-8"))
                full_answer += data.get("response", "")
            except:
                continue

        return full_answer.strip()

    except Exception as e:
        return f"Error querying Ollama: {e}"
