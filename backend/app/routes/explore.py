from fastapi import APIRouter, Request
from app.services.matching import select_next_profile
import json
import logging

router = APIRouter(prefix="/api/explore")

# Load Users
with open("app/users.json", "r", encoding="utf-8") as f:
    users = json.load(f)

seen_profiles = set()
interactions = []

CURRENT_USER = {
    "id": 1,
    "name": "Advaith Sharma",
    "demographics": {
        "age": 22,
        "gender": "Male",
        "city": "Chennai",
        "university": "IIT Madras",
        "degree": "BTech",
        "year_in_college": 1,
        "graduation_year": 2028
    },
    "interests": ["Movies", "Gaming", "Coding", "Fitness"],
    "behavioral_data": {
        "previous_ratings": [60, 42, 76, 87, 35, 63, 33, 41, 90, 96],
        "response_patterns": ["Likes shared interests"]
    },
    "bio": "Love Movies, Gaming, and can’t survive without chai.",
    "uploaded_media": [
        "https://randomuser.me/api/portraits/men/59.jpg"
    ],
    "personality_prompts": [
        {"prompt": "Most spontaneous thing I’ve done", "answer": "attended a Movies meetup without telling anyone"},
        {"prompt": "My weekends are usually for", "answer": "some Movies and a bit of Gaming"}
    ]
}

@router.get("/next")
def get_next_profile():
    try:
        next_profile = select_next_profile(users, seen_profiles, CURRENT_USER, interactions)
        if not next_profile:
            return {"message": "No more profiles to show."}
        seen_profiles.add(next_profile['id'])
        return next_profile
    except Exception as e:
        logging.error(f"Error in /next: {e}")
        return {"error": str(e)}

@router.post("/interact")
async def handle_interaction(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    action = data.get("action")  # 'like', 'dislike', 'skip'

    if not user_id or action not in ['like', 'dislike', 'skip']:
        return {"status": "invalid"}

    interactions.append({
        "source_id": CURRENT_USER["id"],
        "target_id": user_id,
        "action": action
    })
    seen_profiles.add(user_id)
    return {"status": "recorded"}
