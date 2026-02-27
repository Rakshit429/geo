from flask import Blueprint, jsonify, g
from app.models.tool import Tool
from app.middleware.auth import require_auth

tools_bp = Blueprint('tools', __name__)

@tools_bp.route('/', methods=['GET'])
def list_tools():
    tools = Tool.query.all()
    return jsonify([tool.to_dict() for tool in tools])

@tools_bp.route('/<slug>', methods=['GET'])
def get_tool(slug):
    tool = Tool.query.filter_by(slug=slug).first()
    if not tool:
        return jsonify({'error': {'code': 'NOT_FOUND', 'message': 'Tool not found'}}), 404
    return jsonify(tool.to_dict())

# Tool access logging is handled by individual tool blueprints like csmip/routes.py
