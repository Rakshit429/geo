from datetime import datetime
import uuid
from app import db
from sqlalchemy.dialects.postgresql import UUID, JSONB

class UsageEvent(db.Model):
    __tablename__ = 'usage_events'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    tool_id = db.Column(UUID(as_uuid=True), db.ForeignKey('tools.id', ondelete='SET NULL'), nullable=True)
    event_type = db.Column(db.String(50), nullable=False)
    ip_address = db.Column(db.String(45)) # INET equivalent for simplicity 
    user_agent = db.Column(db.Text)
    metadata_col = db.Column(JSONB)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

class AuthEvent(db.Model):
    __tablename__ = 'auth_events'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    event_type = db.Column(db.String(50), nullable=False)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    success = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
