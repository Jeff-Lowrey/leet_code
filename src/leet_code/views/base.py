"""Base view class with common functionality."""

from flask import request
from flask.views import MethodView
from pygments.formatters import HtmlFormatter

# Pygments syntax highlighting styles
STYLE_DARK = "monokai"
STYLE_LIGHT = "default"


class BaseView(MethodView):
    """Base class for all views with common functionality."""

    def get_syntax_highlighting_style(self) -> str:
        """Get the appropriate syntax highlighting style based on theme preference.

        Returns:
            Style name for Pygments highlighting
        """
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

    def create_code_formatter(self) -> HtmlFormatter[str]:
        """Create a code formatter with appropriate theme.

        Returns:
            Configured HtmlFormatter instance
        """
        style = self.get_syntax_highlighting_style()
        return HtmlFormatter(style=style, linenos=True)
