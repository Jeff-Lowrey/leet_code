"""Flask application factory."""

import os

from flask import Flask


def create_app() -> Flask:
    """Create and configure the Flask application.

    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__, template_folder="../../templates", static_folder="../../static")
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-key-change-in-production")

    # Register error handlers
    from .error_handlers import register_error_handlers

    register_error_handlers(app)

    # Register blueprints/views
    from .routes import register_routes

    register_routes(app)

    return app
