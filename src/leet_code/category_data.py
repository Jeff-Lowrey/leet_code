#!/usr/bin/env python3
"""Centralized category and solution data management for LeetCode solutions."""

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

from .language_constants import EXTENSION_TO_LANGUAGE, SUPPORTED_LANGUAGES
from .markdown_extraction import extract_markdown_from_code, parse_metadata_from_markdown


@dataclass
class Category:
    """Represents a solution category with metadata."""

    slug: str
    name: str
    description: str
    solutions: list["Solution"] = field(default_factory=list)

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
    difficulty: str = ""
    time_complexity: str = ""
    space_complexity: str = ""
    available_languages: list[str] = field(default_factory=list)
    description: str = ""

    def __post_init__(self) -> None:
        """Process filename to extract metadata."""
        # Remove file extension to get base name (support any extension)
        base_name = self.filename
        for ext in [".py", ".js", ".java", ".cpp", ".c", ".ts", ".go", ".rs", ".cs", ".swift"]:
            if base_name.endswith(ext):
                base_name = base_name[:-len(ext)]
                break

        # Extract number and slug from filename like "042-trapping-water"
        if "-" in base_name:
            parts = base_name.split("-", 1)
            if parts[0].isdigit():
                if not self.number:
                    self.number = parts[0]
                if not self.slug:
                    self.slug = parts[1]  # Just the problem name part
            else:
                if not self.slug:
                    self.slug = base_name
        else:
            if not self.slug:
                self.slug = base_name

        # Generate name from slug if not provided
        if not self.name and self.slug:
            self.name = self.slug.replace("-", " ").title()

    @property
    def url_filename(self) -> str:
        """Get filename without language extension for use in URLs."""
        base_name = self.filename
        for ext in [".py", ".js", ".java", ".cpp", ".c", ".ts", ".go", ".rs", ".cs", ".swift", ".kt", ".rb", ".php", ".scala"]:
            if base_name.endswith(ext):
                return base_name[:-len(ext)]
        return base_name


@dataclass
class ProblemTags:
    """Represents extracted tags from a solution file."""

    problem_number: str
    techniques: list[str] = field(default_factory=list)
    data_structures: list[str] = field(default_factory=list)
    patterns: list[str] = field(default_factory=list)


class CategoryManager:
    """Manages all category and solution data."""

    # Category descriptions mapping
    DESCRIPTIONS = {
        "arrays-hashing": "Fundamental data structure problems using arrays and hash tables for efficient lookups.",
        "backtracking": "Explore all possibilities systematically to find solutions through recursive exploration.",
        "binary-search": "Efficiently find targets in sorted data by repeatedly dividing the search space in half.",
        "bit-manipulation": "Solve problems using bitwise operations for optimal space and time complexity.",
        "design": "Implement complex data structures and systems with specific functional requirements.",
        "dynamic-programming": "Break complex problems into overlapping subproblems and optimize with memoization.",
        "graphs": "Navigate relationships and connections using graph traversal algorithms like DFS and BFS.",
        "greedy": "Make locally optimal choices at each step to find globally optimal solutions.",
        "heap": "Use priority queues to efficiently track minimum or maximum elements.",
        "interval": "Handle overlapping ranges and time-based problems with interval merging techniques.",
        "linked-list": "Manipulate node-based linear data structures with pointer operations.",
        "math": "Apply mathematical concepts and number theory to solve algorithmic challenges.",
        "matrix": "Navigate and transform 2D grids using various traversal patterns.",
        "monotonic-stack": "Maintain element ordering to solve next greater/smaller element problems.",
        "prefix-sum": "Precompute cumulative sums for efficient range query operations.",
        "queue": "Process elements in FIFO order for level-order traversals and simulations.",
        "recursion": "Solve problems by breaking them into smaller instances of the same problem.",
        "segment-tree": "Perform efficient range queries and updates on array segments.",
        "simulation": "Model real-world processes and game mechanics step by step.",
        "sliding-window": "Optimize subarray/substring problems using a moving window technique.",
        "sorting": "Arrange elements in order and leverage sorted properties for problem solving.",
        "stack": "Use LIFO structure for parsing, evaluation, and tracking state.",
        "string-manipulation": "Transform and analyze text using various string processing techniques.",
        "strings": "Pattern matching, parsing, and character-based algorithm problems.",
        "topological-sort": "Order directed acyclic graph nodes based on dependencies.",
        "trees": "Traverse and manipulate hierarchical data structures including binary trees.",
        "trie": "Efficiently store and search strings using prefix tree structures.",
        "two-pointers": "Use two iterators to traverse data structures for optimal solutions.",
        "union-find": "Track connected components and detect cycles in disjoint sets.",
    }

    def __init__(self, base_dir: Path | None = None):
        """Initialize the category manager."""
        self.base_dir = base_dir or Path(__file__).parent.parent.parent
        self.solutions_dir = self.base_dir / "solutions"
        self.docs_dir = self.base_dir / "docs"
        self.data_dir = self.base_dir / "data"
        self._categories: list[Category] | None = None
        self._problem_tags: dict[str, ProblemTags] | None = None

    def get_categories(self, force_refresh: bool = False) -> list[Category]:
        """Get all categories with their solutions across all languages."""
        if self._categories is not None and not force_refresh:
            return self._categories

        categories = []

        for category_path in self.solutions_dir.iterdir():
            if not category_path.is_dir() or category_path.name.startswith("."):
                continue

            # Build a dictionary of problems indexed by base name (without extension)
            # Each entry tracks: {base_name: {languages: [list], metadata_file: Path}}
            problems: dict[str, dict] = {}

            # Scan all supported language subdirectories
            for lang_name, lang_dir_name in SUPPORTED_LANGUAGES.items():
                lang_dir = category_path / lang_dir_name
                if not lang_dir.exists():
                    continue

                # Find all solution files in this language directory
                for solution_file in lang_dir.iterdir():
                    if not solution_file.is_file():
                        continue

                    # Skip non-solution files
                    if solution_file.name in ["__init__.py", "top-50-solutions.py"]:
                        continue

                    # Get base name without extension
                    base_name = solution_file.stem

                    # Track this language for this problem
                    if base_name not in problems:
                        problems[base_name] = {
                            "languages": [],
                            "metadata_file": solution_file,  # Use first found for metadata
                        }

                    problems[base_name]["languages"].append(lang_name)

            # Skip category if no problems found
            if not problems:
                continue

            # Create category
            category = Category(
                slug=category_path.name,
                name=category_path.name.replace("-", " ").title(),
                description=self.DESCRIPTIONS.get(category_path.name, "Collection of algorithm problems and solutions."),
            )

            # Create Solution objects for each problem
            for base_name, problem_data in sorted(problems.items()):
                metadata_file = problem_data["metadata_file"]

                # Parse metadata from the first available solution file
                difficulty, time_comp, space_comp, description = self._parse_solution_metadata(metadata_file)

                solution = Solution(
                    filename=metadata_file.name,
                    name="",
                    difficulty=difficulty,
                    time_complexity=time_comp,
                    space_complexity=space_comp,
                    available_languages=sorted(problem_data["languages"]),
                    description=description,
                )
                category.solutions.append(solution)

            categories.append(category)

        # Sort categories by name
        categories.sort(key=lambda x: x.name)

        # Cache the results
        self._categories = categories
        return categories

    def get_category(self, slug: str) -> Category | None:
        """Get a specific category by slug."""
        categories = self.get_categories()
        for category in categories:
            if category.slug == slug:
                return category
        return None

    def get_solution(self, category_slug: str, filename: str) -> Solution | None:
        """Get a specific solution by category and filename."""
        category = self.get_category(category_slug)
        if category:
            for solution in category.solutions:
                if solution.filename == filename:
                    return solution
        return None

    def get_problem_tags(self, force_refresh: bool = False) -> dict[str, ProblemTags]:
        """Get problem tags with disk caching.

        Returns a dictionary mapping problem numbers to their tags.
        Tags are extracted from APPROACH/INTUITION sections of solution files.
        """
        # Return cached tags if available
        if self._problem_tags is not None and not force_refresh:
            return self._problem_tags

        # Ensure data directory exists
        self.data_dir.mkdir(exist_ok=True)
        cache_file = self.data_dir / "problem_tags.json"

        # Check if disk cache exists and is valid
        needs_refresh = force_refresh
        if not needs_refresh and cache_file.exists():
            cache_mtime = cache_file.stat().st_mtime

            # Check if any solution file is newer than cache
            for category in self.get_categories():
                python_dir = self.solutions_dir / category.slug / "python"
                if python_dir.exists():
                    for sol_file in python_dir.glob("*.py"):
                        if sol_file.stat().st_mtime > cache_mtime:
                            needs_refresh = True
                            break
                if needs_refresh:
                    break

        # Load from disk cache if valid
        if not needs_refresh and cache_file.exists():
            try:
                with cache_file.open("r") as f:
                    cache_data = json.load(f)
                # Convert to ProblemTags objects
                self._problem_tags = {
                    num: ProblemTags(
                        problem_number=num,
                        techniques=data.get("techniques", []),
                        data_structures=data.get("data_structures", []),
                        patterns=data.get("patterns", []),
                    )
                    for num, data in cache_data.items()
                }
                return self._problem_tags
            except (json.JSONDecodeError, KeyError):
                # Cache corrupted, will rebuild
                needs_refresh = True

        # Extract tags from all solutions
        tags_dict: dict[str, ProblemTags] = {}
        for category in self.get_categories():
            for solution in category.solutions:
                if solution.number:
                    content = self.read_solution_content(category.slug, solution.filename)
                    if content:
                        tags = self._extract_tags_from_content(content)
                        tags_dict[solution.number] = ProblemTags(
                            problem_number=solution.number,
                            techniques=tags["techniques"],
                            data_structures=tags["data_structures"],
                            patterns=tags["patterns"],
                        )

        # Save to disk cache
        cache_data = {
            num: {
                "techniques": tags.techniques,
                "data_structures": tags.data_structures,
                "patterns": tags.patterns,
            }
            for num, tags in tags_dict.items()
        }
        with cache_file.open("w") as f:
            json.dump(cache_data, f, indent=2)

        # Cache in memory
        self._problem_tags = tags_dict
        return tags_dict

    def _extract_tags_from_content(self, content: str) -> dict[str, list[str]]:
        """Extract technique and data structure tags from solution content.

        Looks for tags in METADATA section in format:
        ### METADATA:
        **Techniques**: Two Pointers, Sliding Window
        **Data Structures**: Hash Map, Array
        **Patterns**: Complement Search
        """
        techniques = []
        data_structures = []
        patterns = []

        # Look for METADATA section
        metadata_section = re.search(r"### METADATA:.*?(?=###|$)", content, re.IGNORECASE | re.DOTALL)

        if metadata_section:
            metadata_text = metadata_section.group(0)

            # Extract techniques (with bold markers)
            tech_match = re.search(r"\*\*Techniques\*\*:\s*([^\n]+)", metadata_text, re.IGNORECASE)
            if tech_match and tech_match.group(1).strip() != "TBD":
                techniques = [t.strip() for t in tech_match.group(1).split(",") if t.strip()]

            # Extract data structures (with bold markers)
            ds_match = re.search(r"\*\*Data Structures\*\*:\s*([^\n]+)", metadata_text, re.IGNORECASE)
            if ds_match and ds_match.group(1).strip() != "TBD":
                data_structures = [ds.strip() for ds in ds_match.group(1).split(",") if ds.strip()]

            # Extract patterns (with bold markers)
            patterns_match = re.search(r"\*\*Patterns\*\*:\s*([^\n]+)", metadata_text, re.IGNORECASE)
            if patterns_match and patterns_match.group(1).strip() != "TBD":
                patterns = [p.strip() for p in patterns_match.group(1).split(",") if p.strip()]

        return {
            "techniques": techniques,
            "data_structures": data_structures,
            "patterns": patterns,
        }

    def read_solution_content(self, category_slug: str, filename: str) -> str | None:
        """Read the content of a solution file."""
        file_path = self.solutions_dir / category_slug / "python" / filename
        if file_path.exists() and file_path.suffix == ".py":
            return file_path.read_text()
        return None

    def find_by_number(self, number: str, include_tags: bool = False) -> Solution | None:
        """Find a solution by problem number.

        Args:
            number: Problem number to search for
            include_tags: If True, attach tags to the solution object

        Returns:
            Solution object if found, None otherwise
        """
        for category in self.get_categories():
            for solution in category.solutions:
                if solution.number == number:
                    if include_tags:
                        tags = self.get_problem_tags().get(number)
                        if tags:
                            # Attach tags as attributes (not in dataclass definition)
                            solution.__dict__["tags"] = tags
                    return solution
        return None

    def find_by_name(self, search_term: str, include_tags: bool = False) -> list[Solution]:
        """Find solutions matching a search term in name or slug.

        Args:
            search_term: Term to search for (case-insensitive)
            include_tags: If True, attach tags to solution objects

        Returns:
            List of matching solutions
        """
        results = []
        search_lower = search_term.lower()

        for category in self.get_categories():
            for solution in category.solutions:
                if search_lower in solution.name.lower() or search_lower in solution.slug.lower():
                    if include_tags and solution.number:
                        tags = self.get_problem_tags().get(solution.number)
                        if tags:
                            solution.__dict__["tags"] = tags
                    results.append(solution)

        return results

    def filter_solutions(self, filters: dict[str, str], include_tags: bool = False) -> list[Solution]:
        """Filter solutions by criteria.

        Args:
            filters: Dictionary of filter criteria
                - difficulty: "Easy", "Medium", or "Hard"
                - time_complexity: e.g., "O(n)", "O(log n)"
                - space_complexity: e.g., "O(1)", "O(n)"
            include_tags: If True, attach tags to solution objects

        Returns:
            List of solutions matching all filters
        """
        results = []

        for category in self.get_categories():
            for solution in category.solutions:
                # Check all filters
                matches = True
                if "difficulty" in filters and solution.difficulty != filters["difficulty"]:
                    matches = False
                if "time_complexity" in filters and solution.time_complexity != filters["time_complexity"]:
                    matches = False
                if "space_complexity" in filters and solution.space_complexity != filters["space_complexity"]:
                    matches = False

                if matches:
                    if include_tags and solution.number:
                        tags = self.get_problem_tags().get(solution.number)
                        if tags:
                            solution.__dict__["tags"] = tags
                    results.append(solution)

        return results

    def get_all_solutions(self, include_tags: bool = False) -> list[Solution]:
        """Get all solutions across all categories.

        Args:
            include_tags: If True, attach tags to solution objects

        Returns:
            List of all solutions
        """
        results = []

        for category in self.get_categories():
            for solution in category.solutions:
                if include_tags and solution.number:
                    tags = self.get_problem_tags().get(solution.number)
                    if tags:
                        solution.__dict__["tags"] = tags
                results.append(solution)

        return results

    def sort_by_number(self, solutions: list[Solution]) -> list[Solution]:
        """Sort solutions by problem number.

        Args:
            solutions: List of solutions to sort

        Returns:
            Sorted list (original list is not modified)
        """
        return sorted(solutions, key=lambda s: int(s.number) if s.number.isdigit() else 0)

    def _parse_solution_metadata(self, file_path: Path) -> tuple[str, str, str, str]:
        """Parse difficulty, complexity, and description from solution file.

        Uses language-agnostic markdown extraction to support multiple languages.

        Returns:
            Tuple of (difficulty, time_complexity, space_complexity, description)
        """
        try:
            content = file_path.read_text()
            file_extension = file_path.suffix

            # Extract markdown from language-specific comments
            markdown_content = extract_markdown_from_code(content, file_extension)

            if markdown_content:
                # Parse metadata from markdown (language-agnostic)
                return parse_metadata_from_markdown(markdown_content)
            else:
                # Fallback: try parsing raw content if no markdown found
                return parse_metadata_from_markdown(content)

        except Exception:
            return "", "", "", ""

    def read_documentation(self, category_slug: str, doc_name: str | None = None) -> str | None:
        """Read documentation file for a category."""
        if doc_name:
            file_path = self.docs_dir / category_slug / f"{doc_name}.md"
        else:
            file_path = self.docs_dir / category_slug / "README.md"

        if file_path.exists():
            return file_path.read_text()
        return None

    def get_statistics(self) -> dict[str, int]:
        """Get overall statistics."""
        categories = self.get_categories()
        total_solutions = sum(cat.count for cat in categories)

        return {
            "total_categories": len(categories),
            "total_solutions": total_solutions,
            "average_per_category": total_solutions // len(categories) if categories else 0,
        }

    def calculate_similarity(self, reference_number: str, candidate_number: str) -> float:
        """Calculate similarity score between two problems based on tags.

        Args:
            reference_number: Problem number to compare against
            candidate_number: Problem number to calculate similarity for

        Returns:
            Similarity score from 0.0 to 1.0 (higher is more similar)
        """
        tags_dict = self.get_problem_tags()

        reference_tags = tags_dict.get(reference_number)
        candidate_tags = tags_dict.get(candidate_number)

        # If either problem has no tags, return 0 similarity
        if not reference_tags or not candidate_tags:
            return 0.0

        # Calculate Jaccard similarity for each tag type with weights
        weights = {
            "techniques": 0.4,  # Most important for similarity
            "data_structures": 0.35,  # Also very important
            "patterns": 0.25,  # Helpful but less critical
        }

        total_score = 0.0

        for tag_type, weight in weights.items():
            ref_set = set(getattr(reference_tags, tag_type, []))
            cand_set = set(getattr(candidate_tags, tag_type, []))

            # Skip if both sets are empty
            if not ref_set and not cand_set:
                continue

            # Jaccard similarity: intersection / union
            if ref_set or cand_set:
                intersection = len(ref_set & cand_set)
                union = len(ref_set | cand_set)
                similarity = intersection / union if union > 0 else 0.0
                total_score += similarity * weight

        return total_score

    def find_similar_problems(
        self,
        reference_number: str,
        min_similarity: float = 0.0,
        max_results: int | None = None,
    ) -> list[tuple[Solution, float]]:
        """Find problems similar to a reference problem based on tags.

        Args:
            reference_number: Problem number to find similar problems for
            min_similarity: Minimum similarity score (0.0 to 1.0)
            max_results: Maximum number of results to return (None for all)

        Returns:
            List of (Solution, similarity_score) tuples, sorted by similarity (descending)
        """
        # Get all solutions with tags
        all_solutions = self.get_all_solutions(include_tags=True)

        # Calculate similarity for each problem
        results = []
        for solution in all_solutions:
            # Skip the reference problem itself
            if solution.number == reference_number:
                continue

            # Skip problems without numbers
            if not solution.number:
                continue

            # Calculate similarity
            similarity = self.calculate_similarity(reference_number, solution.number)

            # Only include if meets minimum threshold
            if similarity >= min_similarity:
                results.append((solution, similarity))

        # Sort by similarity (descending)
        results.sort(key=lambda x: x[1], reverse=True)

        # Limit results if requested
        if max_results is not None:
            results = results[:max_results]

        return results

    def refresh(self) -> None:
        """Force refresh of cached data."""
        self._categories = None
        self._problem_tags = None
        self.get_categories(force_refresh=True)


# Singleton instance for easy import
category_manager = CategoryManager()
