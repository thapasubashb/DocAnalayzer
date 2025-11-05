from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from database.chroma_store import collection
import os
import textwrap

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
    # retrieve top 3 chunks relevant to question
    if doc_id:
        results = collection.query(query_texts=[question], n_results=3, where={"doc_id": doc_id})
    else:
        results = collection.query(query_texts=[question], n_results=3)
    docs = results.get("documents", [[]])[0]
    context = "\n\n".join(docs).strip()
    prompt = f"Use the context to answer the question.\n\nContext:\n{context}\n\nQuestion: {question}\nAnswer concisely:"
    # compose model input
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024)
    outputs = model.generate(**inputs, max_new_tokens=256)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return answer
