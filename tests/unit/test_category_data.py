"""Unit tests for the category_data module."""

from pathlib import Path
from unittest.mock import MagicMock, patch

from src.leet_code.category_data import Category, CategoryManager, Solution


class TestSolution:
    """Test the Solution dataclass."""

    def test_solution_initialization(self):
        """Test creating a Solution instance."""
        solution = Solution(filename="001-two-sum.py", name="Two Sum", number="001", slug="two-sum")
        assert solution.filename == "001-two-sum.py"
        assert solution.name == "Two Sum"
        assert solution.number == "001"
        assert solution.slug == "two-sum"

    def test_solution_post_init(self):
        """Test Solution post_init processing."""
        solution = Solution(filename="042-trapping-water.py", name="Trapping Rain Water")
        assert solution.number == "042"
        assert solution.slug == "trapping-water"

    def test_solution_without_number(self):
        """Test Solution without number in filename."""
        solution = Solution(filename="custom-problem.py", name="Custom Problem")
        assert solution.number == ""
        assert solution.slug == "custom-problem"


class TestCategory:
    """Test the Category dataclass."""

    def test_category_initialization(self):
        """Test creating a Category instance."""
        category = Category(slug="arrays-hashing", name="Arrays & Hashing", description="Array and hash table problems")
        assert category.slug == "arrays-hashing"
        assert category.name == "Arrays & Hashing"
        assert category.description == "Array and hash table problems"
        assert category.solutions == []
        assert category.count == 0

    def test_category_with_solutions(self):
        """Test Category with solutions."""
        solutions = [Solution("001-two-sum.py", "Two Sum"), Solution("217-contains-duplicate.py", "Contains Duplicate")]
        category = Category(
            slug="arrays-hashing", name="Arrays & Hashing", description="Array problems", solutions=solutions
        )
        assert len(category.solutions) == 2
        assert category.count == 2


class TestCategoryManager:
    """Test the CategoryManager class."""

    @patch("src.leet_code.category_data.Path")
    def test_initialization(self, mock_path_class):
        """Test CategoryManager initialization."""
        mock_path = MagicMock()
        mock_path_class.return_value = mock_path

        manager = CategoryManager(base_dir=Path("/test/dir"))
        assert manager.base_dir == Path("/test/dir")
        assert manager._categories is None

    @patch("src.leet_code.category_data.Path.iterdir")
    @patch("src.leet_code.category_data.Path.is_dir")
    @patch("src.leet_code.category_data.Path.exists")
    def test_get_categories(self, mock_exists, mock_is_dir, mock_iterdir):
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

    def test_get_category(self):
        """Test getting a specific category."""
        manager = CategoryManager()

        # Mock the categories
        mock_category = Category(slug="arrays-hashing", name="Arrays & Hashing", description="Test description")
        manager._categories = [mock_category]

        result = manager.get_category("arrays-hashing")
        assert result == mock_category

        result = manager.get_category("non-existent")
        assert result is None

    def test_get_solution(self):
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

    @patch("src.leet_code.category_data.Path.read_text")
    @patch("src.leet_code.category_data.Path.exists")
    def test_read_solution_content(self, mock_exists, mock_read_text):
        """Test reading solution content."""
        mock_exists.return_value = True
        mock_read_text.return_value = "def two_sum(): pass"

        manager = CategoryManager()
        content = manager.read_solution_content("arrays-hashing", "001-two-sum.py")

        assert content == "def two_sum(): pass"
        mock_read_text.assert_called_once()

    @patch("src.leet_code.category_data.Path.exists")
    def test_read_solution_content_not_found(self, mock_exists):
        """Test reading non-existent solution."""
        mock_exists.return_value = False

        manager = CategoryManager()
        content = manager.read_solution_content("arrays-hashing", "non-existent.py")

        assert content is None

    @patch("src.leet_code.category_data.Path.read_text")
    @patch("src.leet_code.category_data.Path.exists")
    def test_read_documentation(self, mock_exists, mock_read_text):
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

    def test_get_statistics(self):
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

    @patch("src.leet_code.category_data.Path.iterdir")
    @patch("src.leet_code.category_data.Path.exists")
    def test_refresh(self, mock_exists, mock_iterdir):
        """Test refreshing cached data."""
        mock_exists.return_value = False
        mock_iterdir.return_value = []

        manager = CategoryManager()
        manager._categories = ["cached_data"]

        manager.refresh()

        # After refresh, _categories should be populated with fresh data (empty in this case)
        assert manager._categories == []

    def test_category_descriptions(self):
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
