from app import create_app, db
from app.models.user import User
from app.models.tool import Tool
from app.models.event import UsageEvent, AuthEvent

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Tool': Tool, 'UsageEvent': UsageEvent, 'AuthEvent': AuthEvent}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
