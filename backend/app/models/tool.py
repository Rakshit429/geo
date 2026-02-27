from datetime import datetime
import uuid
from app import db
from sqlalchemy.dialects.postgresql import UUID

class Tool(db.Model):
    __tablename__ = 'tools'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    usage_events = db.relationship('UsageEvent', backref='tool', lazy=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'slug': self.slug,
            'name': self.name,
            'description': self.description,
            'is_active': self.is_active,
        }
