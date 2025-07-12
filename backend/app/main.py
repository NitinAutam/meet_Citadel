from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import explore  # Modular route

app = FastAPI()

# ✅ CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include Explore Route
app.include_router(explore.router)
