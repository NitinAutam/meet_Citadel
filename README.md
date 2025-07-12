# meet_Citadel – Profile Matching MVP

A minimal proof-of-concept (PoC) profile exploration app for campus students, built with a FastAPI backend and React Native frontend. Users can explore other profiles, like/dislike them, and the system records interactions. Designed for quick validation and prototype testing of the core explore mechanism.

---

## Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: FastAPI
- **API Communication**: Axios
- **Data**: Predefined JSON dataset (100 profiles)
- **State**: Local in-memory state for interactions

---

## Features

- Fetch and display user profiles with name, education, interests, and image
- Like / Dislike interactions with animated transitions
- Backend records user interactions via a POST API
- Profiles update in real time on interaction
- Smooth fade-in/out transition between profiles
- Mobile-first UI styled for dark mode

---

## File Structure

### Backend (`/backend`)
- `main.py` – FastAPI app entry point  
- `app/users.json` – Dataset of users  
- `app/services/matching.py` – Logic to select the next profile  
- `app/api/explore.py` – Endpoints to serve next profile and receive interactions  

### Frontend (`/frontend`)
- `app/explore.tsx` – Main explore screen that fetches and renders profiles  
- `components/ProfileCard.tsx` – Renders the user profile card  
- `components/ActionButtons.tsx` – Like and Dislike buttons  

---

## API Endpoints

### `GET /api/explore/next`
Returns the next available profile for exploration.

### `POST /api/explore/interact`
Records a like/dislike/skip interaction.

### Matching Logic (Overview)

The current matching logic is rule-based and minimal, suitable for MVP testing:

- Filters out already seen users  
- Ranks candidates based on shared interests  
- Falls back to random selection if no strong match is found  

> Full scoring system and implementation notes available in the [Technical Design Doc](https://docs.google.com/document/d/1lSZqp9miXq-nTKOQmpvqzVawyrZnAMe-QtjziaZLDhs/edit?usp=sharing).

---

**Request Body:**
```json
{
  "user_id": 12,
  "action": "like"
}

## How to Run

### Backend
To start the FastAPI backend server:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

To start the React Native frontend using Expo:

cd frontend
npx expo start

