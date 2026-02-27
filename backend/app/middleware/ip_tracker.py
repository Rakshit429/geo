from functools import wraps
from flask import request, g
from app.models.event import UsageEvent, AuthEvent
from app import db

def get_client_ip():
    """Capture real IP even behind nginx reserve proxy."""
    forwarded_for = request.headers.get('X-Forwarded-For')
    if forwarded_for:
        return forwarded_for.split(',')[0].strip()
    return request.remote_addr

def log_event(user_id, event_type, tool_id=None, metadata=None):
    event = UsageEvent(
        user_id=user_id,
        tool_id=tool_id,
        event_type=event_type,
        ip_address=get_client_ip(),
        user_agent=request.headers.get('User-Agent'),
        metadata_col=metadata or {}
    )
    db.session.add(event)
    db.session.commit()

def log_auth_event(user_id, event_type, success=True):
    event = AuthEvent(
        user_id=user_id,
        event_type=event_type,
        ip_address=get_client_ip(),
        user_agent=request.headers.get('User-Agent'),
        success=success
    )
    db.session.add(event)
    db.session.commit()

def track_usage(event_type, tool_slug=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user_id = g.get('current_user_id')
            log_event(user_id=user_id, event_type=event_type)
            return f(*args, **kwargs)
        return decorated
    return decorator
