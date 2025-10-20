"""Unit tests for search routes."""

from unittest.mock import patch

from src.leet_code.app import app
from src.leet_code.category_data import Solution


class TestSearchRoutes:
    """Test search route endpoints."""

    def test_api_search_empty_query(self):
        """Test API search with empty query."""
        with app.test_client() as client:
            response = client.get("/api/search?q=")
            assert response.status_code == 400
            data = response.get_json()
            assert "error" in data

    def test_api_search_navigate_found(self):
        """Test API search navigate mode with valid problem."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solution = Solution(
                number="1",
                name="Two Sum",
                filename="001-two-sum.py",
                difficulty="Easy",
                time_complexity="O(n)",
                space_complexity="O(n)",
            )
            mock_cm.find_by_number.return_value = mock_solution

            with patch("src.leet_code.app.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                response = client.get("/api/search?q=1")
                assert response.status_code == 200
                data = response.get_json()
                assert data["mode"] == "navigate"
                assert data["solution"]["number"] == "1"

    def test_api_search_navigate_not_found(self):
        """Test API search navigate mode with invalid problem."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_cm.find_by_number.return_value = None

            response = client.get("/api/search?q=99999")
            assert response.status_code == 404
            data = response.get_json()
            assert "error" in data
            assert "99999" in data["error"]

    def test_api_search_name_search(self):
        """Test API search name search mode."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solutions = [
                Solution(
                    number="1",
                    name="Two Sum",
                    filename="001-two-sum.py",
                    difficulty="Easy",
                    time_complexity="O(n)",
                    space_complexity="O(n)",
                )
            ]
            mock_cm.find_by_name.return_value = mock_solutions

            with patch("src.leet_code.app.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                response = client.get("/api/search?q=sum")
                assert response.status_code == 200
                data = response.get_json()
                assert data["mode"] == "name_search"
                assert "results" in data

    def test_api_search_filter_mode(self):
        """Test API search filter mode."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solutions = []
            mock_cm.get_all_solutions.return_value = mock_solutions

            response = client.get("/api/search?q=difficulty=easy")
            assert response.status_code == 200
            data = response.get_json()
            assert data["mode"] == "filter"

    def test_search_route_navigate_redirects(self):
        """Test HTML search route redirects for navigate mode."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solution = Solution(
                number="1",
                name="Two Sum",
                filename="001-two-sum.py",
                difficulty="Easy",
                time_complexity="O(n)",
                space_complexity="O(n)",
            )
            mock_cm.find_by_number.return_value = mock_solution

            with patch("src.leet_code.app.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                response = client.get("/search?q=1", follow_redirects=False)
                assert response.status_code == 302
                assert "/solution/arrays-hashing/001-two-sum" in response.location

    def test_search_route_error_handling(self):
        """Test HTML search route error handling."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_cm.find_by_number.return_value = None

            response = client.get("/search?q=99999")
            assert response.status_code == 200
            # Should render search results page (may show error or empty results)
            assert b"Search Results" in response.data or b"search" in response.data.lower()

    def test_search_route_name_search_renders(self):
        """Test HTML search route renders name search results."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solutions = [
                Solution(
                    number="1",
                    name="Two Sum",
                    filename="001-two-sum.py",
                    difficulty="Easy",
                    time_complexity="O(n)",
                    space_complexity="O(n)",
                )
            ]
            mock_cm.find_by_name.return_value = mock_solutions

            with patch("src.leet_code.app.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                response = client.get("/search?q=sum")
                assert response.status_code == 200
                assert b"Search Results" in response.data

    def test_search_route_filter_renders(self):
        """Test HTML search route renders filter results."""
        with app.test_client() as client, patch("src.leet_code.app.category_manager") as mock_cm:
            mock_solutions = []
            mock_cm.get_all_solutions.return_value = mock_solutions

            response = client.get("/search?q=difficulty=easy")
            assert response.status_code == 200
            assert b"Search Results" in response.data

    def test_search_route_empty_query(self):
        """Test HTML search route with empty query."""
        with app.test_client() as client:
            response = client.get("/search?q=")
            assert response.status_code == 200
            # Should show error or empty results
            assert b"Search Results" in response.data or b"error" in response.data.lower()
