from flask import Blueprint, jsonify, request, g
from app.models.user import User
from app.models.tool import Tool
from app.middleware.auth import require_auth
from app.middleware.ip_tracker import log_event
from app.utils.csmip_calculator import run_generate_fas, run_analyze, run_generate_motion

csmip_bp = Blueprint('csmip', __name__)

def log_csmip_usage(user_id, tool_id, action, input_data):
    if user_id and tool_id:
        log_event(
            user_id=user_id,
            tool_id=tool_id,
            event_type=f'csmip_{action}',
            metadata={'tool': 'csmip', 'input_size': len(str(input_data))}
        )

@csmip_bp.route('/generate_fas', methods=['POST'])
@require_auth
def generate_fas():
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    tool = Tool.query.filter_by(slug='csmip').first()
    try:
        data = request.json
        log_csmip_usage(user.id if user else None, tool.id if tool else None, 'generate_fas', data)
        result = run_generate_fas(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@csmip_bp.route('/analyze', methods=['POST'])
@require_auth
def analyze():
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    tool = Tool.query.filter_by(slug='csmip').first()
    try:
        data = request.json
        log_csmip_usage(user.id if user else None, tool.id if tool else None, 'analyze', data)
        result = run_analyze(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@csmip_bp.route('/generate_motion', methods=['POST'])
@require_auth
def generate_motion():
    user = User.query.filter_by(auth_user_id=g.auth_user_id).first()
    tool = Tool.query.filter_by(slug='csmip').first()
    try:
        data = request.json
        log_csmip_usage(user.id if user else None, tool.id if tool else None, 'generate_motion', data)
        result = run_generate_motion(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
