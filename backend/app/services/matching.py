import random

def jaccard_similarity(set1, set2):
    if not set1 or not set2:
        return 0
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union

def extract_keywords(profile):
    interests = set(profile.get("interests", []))
    prompts = profile.get("personality_prompts", [])
    prompt_words = set()
    for p in prompts:
        prompt_words.update(p['answer'].lower().split())
    return interests.union(prompt_words)

def score_profile(user, current_user, interactions, all_users):
    score = 0.0
    weights = {
        "same_college": 2.0,
        "common_interests": 1.5,
        "age_similarity": 1.0,
        "common_response_patterns": 1.0,
        "personality_similarity": 1.0,
        "feedback_bonus": 1.5,
        "feedback_similarity": 2.0
    }

    # Same college
    if user['demographics']['university'] == current_user['demographics']['university']:
        score += weights['same_college']

    # Common interests
    interests1 = set(user.get('interests', []))
    interests2 = set(current_user.get('interests', []))
    score += weights['common_interests'] * len(interests1.intersection(interests2))

    # Age similarity
    age_diff = abs(user['demographics']['age'] - current_user['demographics']['age'])
    score += weights['age_similarity'] * max(0, 1 - (age_diff / 10))

    # Response pattern similarity
    rp1 = set(user.get('behavioral_data', {}).get('response_patterns', []))
    rp2 = set(current_user.get('behavioral_data', {}).get('response_patterns', []))
    score += weights['common_response_patterns'] * jaccard_similarity(rp1, rp2)

    # Personality similarity
    p1 = extract_keywords(user)
    p2 = extract_keywords(current_user)
    score += weights['personality_similarity'] * jaccard_similarity(p1, p2)

    # Feedback bonus (static)
    prev_ratings = user.get('behavioral_data', {}).get('previous_ratings', [])
    if prev_ratings:
        score += (sum(prev_ratings) / len(prev_ratings)) / 100 * weights['feedback_bonus']

    # Learn from user’s past likes/dislikes
    liked_ids = {i['target_id'] for i in interactions if i['source_id'] == current_user['id'] and i['action'] == 'like'}
    disliked_ids = {i['target_id'] for i in interactions if i['source_id'] == current_user['id'] and i['action'] == 'dislike'}

    liked_features = set().union(*[extract_keywords(p) for p in all_users if p['id'] in liked_ids]) if liked_ids else set()
    disliked_features = set().union(*[extract_keywords(p) for p in all_users if p['id'] in disliked_ids]) if disliked_ids else set()

    current_features = extract_keywords(user)
    liked_overlap = len(current_features & liked_features)
    disliked_overlap = len(current_features & disliked_features)
    score += weights['feedback_similarity'] * (liked_overlap - disliked_overlap)

    score += random.uniform(0, 0.3)  # small noise
    return score

def select_next_profile(profiles, seen_ids, current_user, interactions, epsilon=0.3, iteration=1, decay_rate=0.95):
    epsilon = epsilon * (decay_rate ** iteration)
    unseen_profiles = [p for p in profiles if p['id'] not in seen_ids]
    if not unseen_profiles:
        return None

    scored_profiles = [
        {'profile': p, 'score': score_profile(p, current_user, interactions, profiles)}
        for p in unseen_profiles
    ]
    scored_profiles.sort(key=lambda x: x['score'], reverse=True)

    if random.random() < epsilon:
        return random.choice(unseen_profiles)
    return scored_profiles[0]['profile']
