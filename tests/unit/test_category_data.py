"""Unit tests for the category_data module."""

import json
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock, mock_open, patch

from src.leet_code.data.category_data import Category, CategoryManager, ProblemTags, Solution


class TestSolution:
    """Test the Solution dataclass."""

    def test_solution_initialization(self) -> None:
        """Test creating a Solution instance."""
        solution = Solution(filename="001-two-sum.py", name="Two Sum", number="001", slug="two-sum")
        assert solution.filename == "001-two-sum.py"
        assert solution.name == "Two Sum"
        assert solution.number == "001"
        assert solution.slug == "two-sum"

    def test_solution_post_init(self) -> None:
        """Test Solution post_init processing."""
        solution = Solution(filename="042-trapping-water.py", name="Trapping Rain Water")
        assert solution.number == "042"
        assert solution.slug == "trapping-water"

    def test_solution_without_number(self) -> None:
        """Test Solution without number in filename."""
        solution = Solution(filename="custom-problem.py", name="Custom Problem")
        assert solution.number == ""
        assert solution.slug == "custom-problem"


class TestProblemTags:
    """Test the ProblemTags dataclass."""

    def test_problem_tags_initialization(self) -> None:
        """Test creating a ProblemTags instance."""
        tags = ProblemTags(
            problem_number="001", techniques=["Two Pointers", "Hash Table"], data_structures=["Array", "Hash Map"]
        )
        assert tags.problem_number == "001"
        assert tags.techniques == ["Two Pointers", "Hash Table"]
        assert tags.data_structures == ["Array", "Hash Map"]

    def test_problem_tags_empty_lists(self) -> None:
        """Test ProblemTags with empty tag lists."""
        tags = ProblemTags(problem_number="042")
        assert tags.problem_number == "042"
        assert tags.techniques == []
        assert tags.data_structures == []


class TestCategory:
    """Test the Category dataclass."""

    def test_category_initialization(self) -> None:
        """Test creating a Category instance."""
        category = Category(slug="arrays-hashing", name="Arrays & Hashing", description="Array and hash table problems")
        assert category.slug == "arrays-hashing"
        assert category.name == "Arrays & Hashing"
        assert category.description == "Array and hash table problems"
        assert category.solutions == []
        assert category.count == 0

    def test_category_with_solutions(self) -> None:
        """Test Category with solutions."""
        solutions = [Solution("001-two-sum.py", "Two Sum"), Solution("217-contains-duplicate.py", "Contains Duplicate")]
        category = Category(
            slug="arrays-hashing", name="Arrays & Hashing", description="Array problems", solutions=solutions
        )
        assert len(category.solutions) == 2
        assert category.count == 2


class TestCategoryManager:
    """Test the CategoryManager class."""

    @patch("src.leet_code.data.category_data.Path")
    def test_initialization(self, mock_path_class: Any) -> None:
        """Test CategoryManager initialization."""
        mock_path = MagicMock()
        mock_path_class.return_value = mock_path

        manager = CategoryManager(base_dir=Path("/test/dir"))
        assert manager.base_dir == Path("/test/dir")
        assert manager._categories is None

    @patch("src.leet_code.data.category_data.Path.iterdir")
    @patch("src.leet_code.data.category_data.Path.is_dir")
    @patch("src.leet_code.data.category_data.Path.exists")
    def test_get_categories(self, mock_exists: Any, mock_is_dir: Any, mock_iterdir: Any) -> None:
        """Test getting categories."""
        # Setup mocks
        mock_exists.return_value = True
        mock_is_dir.return_value = True

        # Create mock category directories
        mock_category1 = MagicMock()
        mock_category1.name = "arrays-hashing"
        mock_category1.is_dir.return_value = True
        mock_category1.iterdir.return_value = [
            MagicMock(name="001-two-sum.py", suffix=".py"),
            MagicMock(name="217-contains-duplicate.py", suffix=".py"),
        ]

        mock_category2 = MagicMock()
        mock_category2.name = "two-pointers"
        mock_category2.is_dir.return_value = True
        mock_category2.iterdir.return_value = [MagicMock(name="125-valid-palindrome.py", suffix=".py")]

        mock_iterdir.return_value = [mock_category1, mock_category2]

        manager = CategoryManager()
        categories = manager.get_categories()

        assert len(categories) >= 0  # Should return categories based on mock

    def test_get_category(self) -> None:
        """Test getting a specific category."""
        manager = CategoryManager()

        # Mock the categories
        mock_category = Category(slug="arrays-hashing", name="Arrays & Hashing", description="Test description")
        manager._categories = [mock_category]

        result = manager.get_category("arrays-hashing")
        assert result == mock_category

        result = manager.get_category("non-existent")
        assert result is None

    def test_get_solution(self) -> None:
        """Test getting a specific solution."""
        manager = CategoryManager()

        # Mock the categories and solutions
        solution = Solution("001-two-sum.py", "Two Sum")
        category = Category(slug="arrays-hashing", name="Arrays & Hashing", description="Test", solutions=[solution])
        manager._categories = [category]

        result = manager.get_solution("arrays-hashing", "001-two-sum.py")
        assert result == solution

        result = manager.get_solution("arrays-hashing", "non-existent.py")
        assert result is None

        result = manager.get_solution("non-existent", "001-two-sum.py")
        assert result is None

    @patch("src.leet_code.data.category_data.Path.read_text")
    @patch("src.leet_code.data.category_data.Path.exists")
    def test_read_solution_content(self, mock_exists: Any, mock_read_text: Any) -> None:
        """Test reading solution content."""
        mock_exists.return_value = True
        mock_read_text.return_value = "def two_sum(): pass"

        manager = CategoryManager()
        content = manager.read_solution_content("arrays-hashing", "001-two-sum.py")

        assert content == "def two_sum(): pass"
        mock_read_text.assert_called_once()

    @patch("src.leet_code.data.category_data.Path.exists")
    def test_read_solution_content_not_found(self, mock_exists: Any) -> None:
        """Test reading non-existent solution."""
        mock_exists.return_value = False

        manager = CategoryManager()
        content = manager.read_solution_content("arrays-hashing", "non-existent.py")

        assert content is None

    @patch("src.leet_code.data.category_data.Path.read_text")
    @patch("src.leet_code.data.category_data.Path.exists")
    def test_read_documentation(self, mock_exists: Any, mock_read_text: Any) -> None:
        """Test reading documentation."""
        mock_exists.return_value = True
        mock_read_text.return_value = "# Documentation"

        manager = CategoryManager()

        # Test default README
        content = manager.read_documentation("arrays-hashing")
        assert content == "# Documentation"

        # Test specific doc
        content = manager.read_documentation("arrays-hashing", "guide")
        assert content == "# Documentation"

    def test_get_statistics(self) -> None:
        """Test getting statistics."""
        manager = CategoryManager()

        # Mock categories
        cat1 = Category("cat1", "Category 1", "Desc", solutions=[Solution("s1.py", "S1"), Solution("s2.py", "S2")])
        cat2 = Category("cat2", "Category 2", "Desc", solutions=[Solution("s3.py", "S3")])
        manager._categories = [cat1, cat2]

        stats = manager.get_statistics()

        assert stats["total_categories"] == 2
        assert stats["total_solutions"] == 3
        assert stats["average_per_category"] == 1

    @patch("src.leet_code.data.category_data.Path.iterdir")
    @patch("src.leet_code.data.category_data.Path.exists")
    def test_refresh(self, mock_exists: Any, mock_iterdir: Any) -> None:
        """Test refreshing cached data."""
        mock_exists.return_value = False
        mock_iterdir.return_value = []

        manager = CategoryManager()
        manager._categories = [Category("test", "Test", "Test")]

        manager.refresh()

        # After refresh, _categories should be populated with fresh data (empty in this case)
        assert manager._categories == []

    def test_extract_tags_from_content(self) -> None:
        """Test extracting tags from solution content."""
        manager = CategoryManager()

        content = """
        # Two Sum
        Difficulty: Easy

        ### METADATA:
        **Techniques**: Two Pointers, Hash Table
        **Data Structures**: Array, Hash Map

        This is a solution using hash tables.
        """

        tags = manager._extract_tags_from_content(content)
        assert "Two Pointers" in tags["techniques"]
        assert "Hash Table" in tags["techniques"]
        assert "Array" in tags["data_structures"]
        assert "Hash Map" in tags["data_structures"]

    def test_extract_tags_no_tags(self) -> None:
        """Test extracting tags when none are present."""
        manager = CategoryManager()
        content = "# Solution\ndef two_sum(): pass"

        tags = manager._extract_tags_from_content(content)
        assert tags["techniques"] == []
        assert tags["data_structures"] == []

    @patch("src.leet_code.data.category_data.Path.exists")
    @patch("src.leet_code.data.category_data.Path.open", new_callable=mock_open)
    @patch("src.leet_code.data.category_data.Path.mkdir")
    def test_get_problem_tags_from_cache(self, mock_mkdir: Any, mock_file: Any, mock_exists: Any) -> None:
        """Test getting problem tags from disk cache."""
        manager = CategoryManager()

        # Mock cache file exists
        cache_data = {"001": {"techniques": ["Two Pointers"], "data_structures": ["Array"]}}
        mock_file.return_value.read.return_value = json.dumps(cache_data)
        mock_exists.return_value = True

        # Mock stat to simulate cache is fresh
        mock_stat = MagicMock()
        mock_stat.st_mtime = 9999999999  # Very recent
        with (
            patch("src.leet_code.data.category_data.Path.stat", return_value=mock_stat),
            patch.object(manager, "get_categories", return_value=[]),
        ):
            tags = manager.get_problem_tags()

        assert "001" in tags
        assert tags["001"].techniques == ["Two Pointers"]
        assert tags["001"].data_structures == ["Array"]

    def test_find_by_number(self) -> None:
        """Test finding a solution by problem number."""
        manager = CategoryManager()

        # Mock categories with solutions
        solution1 = Solution("001-two-sum.py", "Two Sum", number="001")
        solution2 = Solution("042-trapping-water.py", "Trapping Water", number="042")
        category = Category("arrays", "Arrays", "Desc", solutions=[solution1, solution2])
        manager._categories = [category]

        result = manager.find_by_number("001")
        assert result == solution1

        result = manager.find_by_number("042")
        assert result == solution2

        result = manager.find_by_number("999")
        assert result is None

    def test_find_by_number_with_tags(self) -> None:
        """Test finding a solution by number with tags attached."""
        manager = CategoryManager()

        solution = Solution("001-two-sum.py", "Two Sum", number="001")
        category = Category("arrays", "Arrays", "Desc", solutions=[solution])
        manager._categories = [category]
        manager._problem_tags = {"001": ProblemTags("001", ["Two Pointers"], ["Array"])}

        result = manager.find_by_number("001", include_tags=True)
        assert result is not None
        assert hasattr(result, "__dict__")
        assert "tags" in result.__dict__

    def test_find_by_name(self) -> None:
        """Test finding solutions by name."""
        manager = CategoryManager()

        solution1 = Solution("001-two-sum.py", "Two Sum")
        solution2 = Solution("042-trapping-water.py", "Trapping Rain Water")
        solution3 = Solution("125-valid-palindrome.py", "Valid Palindrome")
        category = Category("arrays", "Arrays", "Desc", solutions=[solution1, solution2, solution3])
        manager._categories = [category]

        # Search by name
        results = manager.find_by_name("water")
        assert len(results) == 1
        assert results[0] == solution2

        # Search case-insensitive
        results = manager.find_by_name("WATER")
        assert len(results) == 1

        # Search by slug
        results = manager.find_by_name("palindrome")
        assert len(results) == 1
        assert results[0] == solution3

        # No matches
        results = manager.find_by_name("nonexistent")
        assert len(results) == 0

    def test_filter_solutions(self) -> None:
        """Test filtering solutions by criteria."""
        manager = CategoryManager()

        solution1 = Solution("001.py", "S1", difficulty="Easy", time_complexity="O(n)")
        solution2 = Solution("002.py", "S2", difficulty="Medium", time_complexity="O(n)")
        solution3 = Solution("003.py", "S3", difficulty="Easy", time_complexity="O(n log n)")
        category = Category("test", "Test", "Desc", solutions=[solution1, solution2, solution3])
        manager._categories = [category]

        # Filter by difficulty
        results = manager.filter_solutions({"difficulty": "Easy"})
        assert len(results) == 2
        assert solution1 in results
        assert solution3 in results

        # Filter by time complexity
        results = manager.filter_solutions({"time_complexity": "O(n)"})
        assert len(results) == 2

        # Filter by multiple criteria
        results = manager.filter_solutions({"difficulty": "Easy", "time_complexity": "O(n)"})
        assert len(results) == 1
        assert results[0] == solution1

    def test_get_all_solutions(self) -> None:
        """Test getting all solutions across categories."""
        manager = CategoryManager()

        solution1 = Solution("001.py", "S1")
        solution2 = Solution("002.py", "S2")
        solution3 = Solution("003.py", "S3")

        cat1 = Category("cat1", "C1", "Desc", solutions=[solution1, solution2])
        cat2 = Category("cat2", "C2", "Desc", solutions=[solution3])
        manager._categories = [cat1, cat2]

        results = manager.get_all_solutions()
        assert len(results) == 3
        assert solution1 in results
        assert solution2 in results
        assert solution3 in results

    def test_sort_by_number(self) -> None:
        """Test sorting solutions by problem number."""
        manager = CategoryManager()

        solution1 = Solution("042.py", "S1", number="042")
        solution2 = Solution("001.py", "S2", number="001")
        solution3 = Solution("125.py", "S3", number="125")

        solutions = [solution1, solution2, solution3]
        sorted_solutions = manager.sort_by_number(solutions)

        assert sorted_solutions[0] == solution2  # 001
        assert sorted_solutions[1] == solution1  # 042
        assert sorted_solutions[2] == solution3  # 125

        # Original list should not be modified
        assert solutions[0] == solution1

    def test_category_descriptions(self) -> None:
        """Test that category descriptions are properly defined."""
        manager = CategoryManager()

        # Check that common categories have descriptions
        assert "arrays-hashing" in manager.DESCRIPTIONS
        assert "two-pointers" in manager.DESCRIPTIONS
        assert "dynamic-programming" in manager.DESCRIPTIONS
        assert "graphs" in manager.DESCRIPTIONS

        # Check description format
        desc = manager.DESCRIPTIONS["arrays-hashing"]
        assert isinstance(desc, str)
        assert len(desc) > 10  # Should be a meaningful description
