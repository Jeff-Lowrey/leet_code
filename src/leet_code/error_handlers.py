"""Error handlers for the Flask application."""

from typing import Any

from flask import Flask, render_template


def register_error_handlers(app: Flask) -> None:
    """Register error handlers with the Flask application.

    Args:
        app: Flask application instance
    """

    @app.errorhandler(404)
    def not_found(error: Any) -> tuple[str, int]:
        """Handle 404 errors."""
        return render_template("404.html"), 404
