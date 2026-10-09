from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import httpx
import os

app = FastAPI(title="HG // AI_OPS Inference Gateway")

# Configure CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment configs
OMNIROUTE_URL = os.getenv("OMNIROUTE_BASE_URL", "http://localhost:20128/v1")
OMNIROUTE_KEY = os.getenv("OMNIROUTE_API_KEY", "sk_local_dev")
OLLAMA_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# Data Models
class Message(BaseModel):
    role: str
    content: str

class ChatPayload(BaseModel):
    messages: List[Message]
    session_id: str

def sliding_window_context(messages: List[Message], max_messages: int = 6) -> List[dict]:
    """Applies an N=6 sliding window to prevent token overflow on the proxy engines."""
    window = messages[-max_messages:]
    return [{"role": msg.role, "content": msg.content} for msg in window]

@app.post("/api/route-visitor")
async def edge_ui_router(payload: ChatPayload):
    """
    O(1) Edge Engine (Ollama gemma2:2b).
    Classifies user intent (e.g., 'show experience', 'view projects') to trigger 3D canvas node transitions.
    """
    system_prompt = "You are a routing classifier. Map the user intent to one of: [HERO, CAPABILITIES, WORKLOADS, TELEMETRY, CONTACT]."

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": "gemma2:2b",
                    "prompt": f"{system_prompt}\nUser: {payload.messages[-1].content}\nIntent:",
                    "stream": False
                },
                timeout=5.0
            )
            response.raise_for_status()
            return {"routing_node": response.json().get("response", "HERO").strip()}
        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Ollama Edge Engine unavailable: {str(e)}")

@app.post("/api/kie-chat")
async def heavy_workload_chat(payload: ChatPayload):
    """
    Multimodal/Heavy Chat via OmniRoute Gateway.
    Leverages token compression and free-tier pooling for robust Q&A.
    """
    context = sliding_window_context(payload.messages)

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{OMNIROUTE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OMNIROUTE_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "auto/best-free",
                    "messages": context
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"OmniRoute Gateway failed: {str(e)}")
