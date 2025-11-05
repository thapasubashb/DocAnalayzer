import spacy

# small English model
nlp = spacy.load("en_core_web_sm")

CLAUSE_KEYWORDS = ["termination", "payment", "liability", "confidentiality", "arbitration", "warranty", "indemnity"]

def detect_clauses(text: str):
    doc = nlp(text)
    results = []
    for sent in doc.sents:
        lower = sent.text.lower()
        for kw in CLAUSE_KEYWORDS:
            if kw in lower:
                results.append({"keyword": kw, "sentence": sent.text.strip()})
                break
    return results
