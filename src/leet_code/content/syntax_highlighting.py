"""Syntax highlighting utilities for code display.

This module provides Pygments-based syntax highlighting with theme support.
"""

from flask import request
from pygments.formatters import HtmlFormatter

__all__ = ["get_syntax_highlighting_style", "create_code_formatter"]

# Pygments syntax highlighting styles
STYLE_DARK = "monokai"
STYLE_LIGHT = "default"


def get_syntax_highlighting_style() -> str:
    """Get the appropriate syntax highlighting style based on theme preference."""
    # Check for theme preference from cookies or headers
    theme = request.cookies.get("theme", "light")

    # You can also check from localStorage via a query parameter if needed
    theme_param = request.args.get("theme")
    if theme_param in ["light", "dark"]:
        theme = theme_param

    # Return appropriate Pygments style
    if theme == "dark":
        return STYLE_DARK
    else:
        return STYLE_LIGHT


def create_code_formatter() -> HtmlFormatter[str]:
    """Create a code formatter with appropriate theme."""
    style = get_syntax_highlighting_style()
    return HtmlFormatter(style=style, linenos=True)
