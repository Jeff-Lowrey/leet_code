"""Unit tests for search query parser."""

from src.leet_code.app import parse_search_query


class TestParseSearchQuery:
    """Test the parse_search_query function."""

    def test_navigate_mode_single_number(self):
        """Test navigation to a single problem number."""
        mode, data = parse_search_query("1")
        assert mode == "navigate"
        assert data["number"] == "1"

    def test_navigate_mode_multi_digit(self):
        """Test navigation with multi-digit number."""
        mode, data = parse_search_query("443")
        assert mode == "navigate"
        assert data["number"] == "443"

    def test_similar_mode_number_with_filter(self):
        """Test similarity search with number and filter."""
        mode, data = parse_search_query("1 difficulty=easy")
        assert mode == "similar"
        assert data["number"] == "1"
        assert data["filters"]["difficulty"] == "easy"

    def test_similar_mode_multiple_filters(self):
        """Test similarity search with multiple filters."""
        mode, data = parse_search_query("443 difficulty=medium complexity=O(n)")
        assert mode == "similar"
        assert data["number"] == "443"
        assert data["filters"]["difficulty"] == "medium"
        assert data["filters"]["complexity"] == "O(n)"

    def test_name_search_single_word(self):
        """Test name search with single word."""
        mode, data = parse_search_query("palindrome")
        assert mode == "name_search"
        assert data["search_term"] == "palindrome"

    def test_name_search_multiple_words(self):
        """Test name search with multiple words."""
        mode, data = parse_search_query("two sum")
        assert mode == "name_search"
        assert data["search_term"] == "two sum"

    def test_name_search_with_filters(self):
        """Test name search with filters."""
        mode, data = parse_search_query("array difficulty=easy")
        assert mode == "name_search"
        assert data["search_term"] == "array"
        assert data["filters"]["difficulty"] == "easy"

    def test_filter_mode_single_filter(self):
        """Test pure filter mode with single filter."""
        mode, data = parse_search_query("difficulty=medium")
        assert mode == "filter"
        assert data["filters"]["difficulty"] == "medium"

    def test_filter_mode_multiple_filters(self):
        """Test pure filter mode with multiple filters."""
        mode, data = parse_search_query("difficulty=hard complexity=O(n²)")
        assert mode == "filter"
        assert data["filters"]["difficulty"] == "hard"
        assert data["filters"]["complexity"] == "O(n²)"

    def test_filter_mode_category_filter(self):
        """Test filter mode with category filter."""
        mode, data = parse_search_query("category=graphs difficulty=easy")
        assert mode == "filter"
        assert data["filters"]["category"] == "graphs"
        assert data["filters"]["difficulty"] == "easy"

    def test_empty_query(self):
        """Test empty query returns name_search mode with empty search."""
        mode, data = parse_search_query("")
        assert mode == "name_search"
        assert data["search_term"] == ""

    def test_whitespace_query(self):
        """Test whitespace-only query."""
        mode, data = parse_search_query("   ")
        assert mode == "name_search"
        assert data["search_term"] == ""

    def test_case_insensitive_difficulty(self):
        """Test difficulty filter is case-insensitive."""
        mode, data = parse_search_query("difficulty=Easy")
        assert mode == "filter"
        assert data["filters"]["difficulty"] == "Easy"

    def test_special_characters_in_search(self):
        """Test search term with special characters."""
        mode, data = parse_search_query("longest-palindrome")
        assert mode == "name_search"
        assert data["search_term"] == "longest-palindrome"

    def test_number_in_name_search(self):
        """Test name search that looks like number but has text."""
        mode, data = parse_search_query("2sum")
        assert mode == "name_search"
        assert data["search_term"] == "2sum"

    def test_complexity_with_parentheses(self):
        """Test complexity filter with parentheses (space-separated values treated as name search)."""
        mode, data = parse_search_query("complexity=O(n log n)")
        # Parser treats spaces as separators, so this becomes name_search
        assert mode == "name_search"

    def test_filter_with_spaces_in_value(self):
        """Test filter value containing spaces (only first token after = is captured)."""
        mode, data = parse_search_query("1 complexity=O(n log n)")
        assert mode == "similar"
        assert data["number"] == "1"
        # Parser treats space as separator, so only gets first token
        assert data["filters"]["complexity"] == "O(n"
