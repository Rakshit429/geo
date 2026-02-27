from datetime import datetime
import uuid
from app import db
from sqlalchemy.dialects.postgresql import UUID

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    auth_user_id = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    
    # Personal Info
    full_name = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(50), nullable=True)  # Increased length for flexibility
    
    # Professional Info
    profession = db.Column(db.String(100), nullable=True) # Changed to True to allow initial signup
    organization = db.Column(db.String(255), nullable=True) # Stores "Company / College"
    
    # Location
    country = db.Column(db.String(100), nullable=True) # Changed to True
    address = db.Column(db.Text, nullable=True)
    
    email_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    usage_events = db.relationship('UsageEvent', backref='user', lazy=True)
    auth_events = db.relationship('AuthEvent', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'full_name': self.full_name,
            'phone': self.phone,
            'profession': self.profession,
            'organization': self.organization,
            'country': self.country,
            'address': self.address,
            'email_verified': self.email_verified,
            'is_profile_complete': bool(self.profession and self.organization) # Helper for frontend
        }