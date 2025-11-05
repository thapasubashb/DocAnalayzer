from transformers import pipeline
import os

# Use a small model to keep memory requirements modest.
MODEL_NAME = os.getenv("SUMMARIZER_MODEL", "t5-small")

# Create the pipeline once.
summarizer = pipeline("summarization", model=MODEL_NAME, tokenizer=MODEL_NAME)

def summarize_text(text: str, max_input_chars: int = 4000) -> str:
    # Trim and chunk if too long for the model input.
    text = text.strip()
    if len(text) > max_input_chars:
        text = text[:max_input_chars]
    try:
        out = summarizer(text, max_length=180, min_length=60, do_sample=False)
        return out[0]["summary_text"]
    except Exception as e:
        return f"Failed to summarize: {e}"
