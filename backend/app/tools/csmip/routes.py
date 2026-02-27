from flask import Blueprint, jsonify, request, g
from app.models.user import User
from app.models.tool import Tool
from app.middleware.auth import require_auth
from app.middleware.ip_tracker import log_event

csmip_bp = Blueprint('csmip', __name__)

@csmip_bp.route('/calculate', methods=['POST'])
@require_auth
def calculate():
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    tool = Tool.query.filter_by(slug='csmip').first()
    
    if user and tool:
        log_event(
            user_id=user.id,
            tool_id=tool.id,
            event_type='calculation_run',
            metadata={'tool': 'csmip', 'input_size': len(request.data)}
        )
    
    # Original CSMIP calculation dummy response
    data = request.json
    result = {"status": "success", "message": "Dummy CSMIP response", "input_data": data}
    return jsonify(result)
