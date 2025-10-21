"""Unit tests for app helper functions."""

import pytest
from pygments.util import ClassNotFound

from src.leet_code.language_constants import get_file_extension, get_lexer_for_language


class TestHelperFunctions:
    """Test helper functions in the app module."""

    def test_get_file_extension_known_languages(self) -> None:
        """Test file extension mapping for known languages."""
        assert get_file_extension("Python") == ".py"
        assert get_file_extension("Java") == ".java"
        assert get_file_extension("C++") == ".cpp"
        assert get_file_extension("JavaScript") == ".js"

    def test_get_file_extension_unknown_language(self) -> None:
        """Test file extension for unknown language."""
        assert get_file_extension("Unknown") == ".txt"
        assert get_file_extension("SomeNewLang") == ".txt"

    def test_get_lexer_for_language_known_languages(self) -> None:
        """Test lexer retrieval for known languages."""
        lexer = get_lexer_for_language("Python")
        assert lexer.__class__.__name__ == "PythonLexer"

        lexer = get_lexer_for_language("Java")
        assert lexer.__class__.__name__ == "JavaLexer"

    def test_get_lexer_for_language_unknown_language(self) -> None:
        """Test lexer retrieval for unknown language raises ClassNotFound."""
        # Unknown languages should raise ClassNotFound exception
        with pytest.raises(ClassNotFound):
            get_lexer_for_language("UnknownLang")
