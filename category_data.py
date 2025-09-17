#!/usr/bin/env python3
"""Centralized category and solution data management for LeetCode solutions."""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional


@dataclass
class Category:
    """Represents a solution category with metadata."""
    slug: str
    name: str
    description: str
    solutions: List['Solution'] = field(default_factory=list)

    @property
    def count(self) -> int:
        """Return the number of solutions in this category."""
        return len(self.solutions)


@dataclass
class Solution:
    """Represents a single solution with metadata."""
    filename: str
    name: str
    number: str = ""
    slug: str = ""

    def __post_init__(self):
        """Process filename to extract metadata."""
        if not self.slug:
            self.slug = self.filename.replace('.py', '')

        if not self.number and '-' in self.slug:
            parts = self.slug.split('-', 1)
            if parts[0].isdigit():
                self.number = parts[0]
                if not self.name:
                    self.name = parts[1].replace('-', ' ').title()

        if not self.name:
            self.name = self.slug.replace('-', ' ').title()


class CategoryManager:
    """Manages all category and solution data."""

    # Category descriptions mapping
    DESCRIPTIONS = {
        'arrays-hashing': 'Fundamental data structure problems using arrays and hash tables for efficient lookups.',
        'backtracking': 'Explore all possibilities systematically to find solutions through recursive exploration.',
        'binary-search': 'Efficiently find targets in sorted data by repeatedly dividing the search space in half.',
        'bit-manipulation': 'Solve problems using bitwise operations for optimal space and time complexity.',
        'design': 'Implement complex data structures and systems with specific functional requirements.',
        'dynamic-programming': 'Break complex problems into overlapping subproblems and optimize with memoization.',
        'graphs': 'Navigate relationships and connections using graph traversal algorithms like DFS and BFS.',
        'greedy': 'Make locally optimal choices at each step to find globally optimal solutions.',
        'heap': 'Use priority queues to efficiently track minimum or maximum elements.',
        'interval': 'Handle overlapping ranges and time-based problems with interval merging techniques.',
        'linked-list': 'Manipulate node-based linear data structures with pointer operations.',
        'math': 'Apply mathematical concepts and number theory to solve algorithmic challenges.',
        'matrix': 'Navigate and transform 2D grids using various traversal patterns.',
        'monotonic-stack': 'Maintain element ordering to solve next greater/smaller element problems.',
        'prefix-sum': 'Precompute cumulative sums for efficient range query operations.',
        'queue': 'Process elements in FIFO order for level-order traversals and simulations.',
        'recursion': 'Solve problems by breaking them into smaller instances of the same problem.',
        'segment-tree': 'Perform efficient range queries and updates on array segments.',
        'simulation': 'Model real-world processes and game mechanics step by step.',
        'sliding-window': 'Optimize subarray/substring problems using a moving window technique.',
        'sorting': 'Arrange elements in order and leverage sorted properties for problem solving.',
        'stack': 'Use LIFO structure for parsing, evaluation, and tracking state.',
        'string-manipulation': 'Transform and analyze text using various string processing techniques.',
        'strings': 'Pattern matching, parsing, and character-based algorithm problems.',
        'topological-sort': 'Order directed acyclic graph nodes based on dependencies.',
        'trees': 'Traverse and manipulate hierarchical data structures including binary trees.',
        'trie': 'Efficiently store and search strings using prefix tree structures.',
        'two-pointers': 'Use two iterators to traverse data structures for optimal solutions.',
        'union-find': 'Track connected components and detect cycles in disjoint sets.'
    }

    def __init__(self, base_dir: Optional[Path] = None):
        """Initialize the category manager."""
        self.base_dir = base_dir or Path(__file__).parent
        self.solutions_dir = self.base_dir / "solutions"
        self.docs_dir = self.base_dir / "docs"
        self._categories: Optional[List[Category]] = None

    def get_categories(self, force_refresh: bool = False) -> List[Category]:
        """Get all categories with their solutions."""
        if self._categories is not None and not force_refresh:
            return self._categories

        categories = []

        for path in self.solutions_dir.iterdir():
            if path.is_dir() and not path.name.startswith('.'):
                # Get all Python files in the directory
                py_files = list(path.glob("*.py"))

                # Skip if no Python files
                if not py_files:
                    continue

                # Create category
                category = Category(
                    slug=path.name,
                    name=path.name.replace('-', ' ').title(),
                    description=self.DESCRIPTIONS.get(
                        path.name,
                        'Collection of algorithm problems and solutions.'
                    )
                )

                # Add solutions to category
                for py_file in sorted(py_files):
                    # Skip non-solution files
                    if py_file.name in ['__init__.py', 'top-50-solutions.py']:
                        continue

                    solution = Solution(filename=py_file.name, name="")
                    category.solutions.append(solution)

                categories.append(category)

        # Sort categories by name
        categories.sort(key=lambda x: x.name)

        # Cache the results
        self._categories = categories
        return categories

    def get_category(self, slug: str) -> Optional[Category]:
        """Get a specific category by slug."""
        categories = self.get_categories()
        for category in categories:
            if category.slug == slug:
                return category
        return None

    def get_solution(self, category_slug: str, filename: str) -> Optional[Solution]:
        """Get a specific solution by category and filename."""
        category = self.get_category(category_slug)
        if category:
            for solution in category.solutions:
                if solution.filename == filename:
                    return solution
        return None

    def read_solution_content(self, category_slug: str, filename: str) -> Optional[str]:
        """Read the content of a solution file."""
        file_path = self.solutions_dir / category_slug / filename
        if file_path.exists() and file_path.suffix == '.py':
            return file_path.read_text()
        return None

    def read_documentation(self, category_slug: str, doc_name: Optional[str] = None) -> Optional[str]:
        """Read documentation file for a category."""
        if doc_name:
            file_path = self.docs_dir / category_slug / f"{doc_name}.md"
        else:
            file_path = self.docs_dir / category_slug / "README.md"

        if file_path.exists():
            return file_path.read_text()
        return None

    def get_statistics(self) -> Dict[str, int]:
        """Get overall statistics."""
        categories = self.get_categories()
        total_solutions = sum(cat.count for cat in categories)

        return {
            'total_categories': len(categories),
            'total_solutions': total_solutions,
            'average_per_category': total_solutions // len(categories) if categories else 0
        }

    def refresh(self):
        """Force refresh of cached data."""
        self._categories = None
        self.get_categories(force_refresh=True)


# Singleton instance for easy import
category_manager = CategoryManager()