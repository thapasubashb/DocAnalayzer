import chromadb
from chromadb.config import Settings
import os

CHROMA_DIR = os.path.join(os.getcwd(), "chroma_data")

client = chromadb.PersistentClient(path=CHROMA_DIR)

collection = client.get_or_create_collection(name="document_analysis")
