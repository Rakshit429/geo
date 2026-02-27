from flask import Blueprint, jsonify, request, g
from app import db
from app.models.user import User
from app.middleware.auth import require_auth
from app.middleware.ip_tracker import log_auth_event

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile', methods=['GET'])
@require_auth
def get_profile():
    # Fetch user by Clerk ID
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    
    # If user doesn't exist in our DB yet, return 404 
    # (The frontend will see this and trigger the "Create Profile" flow)
    if not user:
        return jsonify({'error': {'code': 'USER_NOT_FOUND', 'message': 'User profile not found.'}}), 404
        
    return jsonify(user.to_dict())

@user_bp.route('/profile', methods=['PUT'])
@require_auth
def update_profile():
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    data = request.json
    
    if not user:
        # 1. Register: Create new user if they don't exist
        user = User(
            auth_user_id=g.auth_user_id,
            email=data.get('email'),
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            profession=data.get('profession'),
            organization=data.get('organization'), # Company or College
            country=data.get('country', 'India'),  # Default if missing
        )
        db.session.add(user)
        log_auth_event(user.id, 'register')
    else:
        # 2. Update: Modify existing user
        if 'full_name' in data: user.full_name = data['full_name']
        if 'phone' in data: user.phone = data['phone']
        if 'profession' in data: user.profession = data['profession']
        if 'organization' in data: user.organization = data['organization']
        if 'country' in data: user.country = data['country']
        if 'address' in data: user.address = data['address']
        
        log_auth_event(user.id, 'profile_update')
        
    db.session.commit()
    return jsonify(user.to_dict())