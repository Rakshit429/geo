from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Allow CORS from React frontend
    CORS(app, resources={r"/*": {"origins": ["https://geo-neon-theta.vercel.app/"]}}, supports_credentials=True)
    db.init_app(app)    
    migrate.init_app(app, db)

    from app.routes.user import user_bp
    from app.routes.tools import tools_bp
    from app.tools.csmip.routes import csmip_bp

    app.register_blueprint(user_bp, url_prefix='/tools/api/v1/user')
    app.register_blueprint(tools_bp, url_prefix='/tools/api/v1/tools')
    app.register_blueprint(csmip_bp, url_prefix='/tools/api/v1/tools/csmip')

    return app
