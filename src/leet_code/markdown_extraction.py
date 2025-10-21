#!/usr/bin/env python3
"""Language-agnostic markdown extraction utilities.

This module provides utilities for extracting markdown content from
language-specific comment formats (Python docstrings, JavaScript JSDoc, etc.)
and parsing all sections from that markdown content.
"""

import re
from dataclasses import dataclass, field


# Precompiled regex patterns for comment extraction
COMMENT_PATTERNS: dict[str, re.Pattern] = {
    'docstring': re.compile(r'"""(.*?)"""', re.DOTALL),
    'jsdoc': re.compile(r'/\*\*(.*?)\*/', re.DOTALL),
}

# Language classification by comment style
DOCSTRING_LANGUAGES = {'.py'}
JSDOC_LANGUAGES = {'.js', '.ts', '.java', '.cpp', '.c', '.cs', '.swift', '.kt', '.scala', '.go', '.rs'}

# All supported languages
SUPPORTED_LANGUAGES = DOCSTRING_LANGUAGES | JSDOC_LANGUAGES


@dataclass
class ProblemData:
    """Complete structured data extracted from a solution file."""

    # Problem identification
    number: str = ""
    title: str = ""

    # Metadata
    difficulty: str = ""
    time_complexity: str = ""
    space_complexity: str = ""

    # Problem description
    description: str = ""  # First sentence for cards
    problem_statement: str = ""  # Full problem description (HTML)

    # Solution explanation sections
    intuition: str = ""
    approach: str = ""
    why_works: str = ""
    example_walkthrough: str = ""
    edge_cases: str = ""

    # Additional metadata
    techniques: list[str] = field(default_factory=list)
    data_structures: list[str] = field(default_factory=list)
    patterns: list[str] = field(default_factory=list)


def extract_markdown_from_code(code: str, file_extension: str) -> str | None:
    """Extract markdown from code based on file extension.

    Uses precompiled regex patterns for optimal performance.
    Supports Python (docstrings) and C-style languages (JSDoc comments).

    Args:
        code: Source code content
        file_extension: File extension (e.g., '.py', '.js', '.ts', '.java', '.cpp')

    Returns:
        Extracted and cleaned markdown content or None if not found
    """
    # Check if language is supported and determine pattern
    if file_extension in DOCSTRING_LANGUAGES:
        pattern = COMMENT_PATTERNS['docstring']
        needs_cleanup = False
    elif file_extension in JSDOC_LANGUAGES:
        pattern = COMMENT_PATTERNS['jsdoc']
        needs_cleanup = True
    else:
        return None

    try:
        # Extract content using precompiled pattern
        match = pattern.search(code)
        if not match:
            return None

        content = match.group(1)

        # Clean JSDoc-style asterisks if needed
        if needs_cleanup:
            content = '\n'.join(
                re.sub(r'^\s*\*\s?', '', line)
                for line in content.split('\n')
            )

        return content.strip()

    except Exception:
        return None


# Backward compatibility functions - DEPRECATED
def extract_markdown_from_python_docstring(code: str) -> str | None:
    """DEPRECATED: Use extract_markdown_from_code(code, '.py') instead."""
    return extract_markdown_from_code(code, '.py')


def extract_markdown_from_js_comment(code: str) -> str | None:
    """DEPRECATED: Use extract_markdown_from_code(code, '.js') instead."""
    return extract_markdown_from_code(code, '.js')


def parse_complete_problem_data(markdown_content: str) -> ProblemData:
    """Parse all sections from markdown content into structured data.

    Args:
        markdown_content: Raw markdown content from language-specific comments

    Returns:
        ProblemData object with all extracted sections
    """
    data = ProblemData()

    try:
        # Split into main content and explanation sections
        explanation_content = ""
        main_content = markdown_content

        if "<details>" in markdown_content:
            parts = markdown_content.split("<details>", 1)
            main_content = parts[0].strip()
            if len(parts) > 1:
                # Extract content between <details> and </details>
                details_match = re.search(r"<details>(.*?)</details>", markdown_content, re.DOTALL)
                if details_match:
                    explanation_content = details_match.group(1).strip()

        # Parse main content (problem statement area)
        _parse_main_content(main_content, data)

        # Parse explanation sections
        if explanation_content:
            _parse_explanation_sections(explanation_content, data)

        return data

    except Exception:
        return data


def _parse_main_content(content: str, data: ProblemData) -> None:
    """Parse the main content area (before <details> section)."""
    lines = content.split('\n')

    # Extract difficulty (Easy/Medium/Hard)
    difficulty_patterns = [
        r"(?:Difficulty:|#)\s*(Easy|Medium|Hard)",
        r"^(Easy|Medium|Hard)\s*$"
    ]
    for pattern in difficulty_patterns:
        match = re.search(pattern, content[:500], re.MULTILINE | re.IGNORECASE)
        if match:
            data.difficulty = match.group(1).capitalize()
            break

    # Extract problem number and title from header like "# 169. Majority Element"
    title_match = re.search(r'^#\s+(\d+)\.\s+(.+)$', content, re.MULTILINE)
    if title_match:
        data.number = title_match.group(1)
        data.title = title_match.group(2).strip()

    # Extract description - first sentence after problem title
    title_found = False
    for line in lines:
        line_stripped = line.strip()

        # Skip until we find the problem title
        if not title_found and re.match(r'^#\s+\d+\.', line_stripped):
            title_found = True
            continue

        # After title, find first descriptive line
        if title_found and line_stripped and not line_stripped.startswith('#'):
            # Get first sentence
            match = re.match(r'^([^.!?]+[.!?])', line_stripped)
            if match:
                data.description = match.group(1).strip()
            else:
                data.description = line_stripped
            break

    # Store full problem statement (will be converted to HTML by caller)
    # Remove <details> section for problem statement
    data.problem_statement = content


def _parse_explanation_sections(content: str, data: ProblemData) -> None:
    """Parse the explanation section (inside <details>)."""

    # Extract metadata fields
    _parse_metadata_section(content, data)

    # Extract INTUITION section
    intuition_match = re.search(
        r'###\s*INTUITION:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if intuition_match:
        data.intuition = intuition_match.group(1).strip()

    # Extract APPROACH section
    approach_match = re.search(
        r'###\s*APPROACH:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if approach_match:
        data.approach = approach_match.group(1).strip()

    # Extract WHY THIS WORKS section
    why_match = re.search(
        r'###\s*WHY THIS WORKS:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if why_match:
        data.why_works = why_match.group(1).strip()

    # Extract EXAMPLE WALKTHROUGH section
    example_match = re.search(
        r'###\s*EXAMPLE WALKTHROUGH:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if example_match:
        data.example_walkthrough = example_match.group(1).strip()

    # Extract TIME COMPLEXITY section
    time_match = re.search(
        r'###\s*TIME COMPLEXITY:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if time_match:
        time_content = time_match.group(1).strip()
        # Extract O(...) notation
        o_match = re.search(r'O\([^)]+\)', time_content)
        if o_match:
            data.time_complexity = o_match.group(0)

    # Extract SPACE COMPLEXITY section
    space_match = re.search(
        r'###\s*SPACE COMPLEXITY:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if space_match:
        space_content = space_match.group(1).strip()
        # Extract O(...) notation
        o_match = re.search(r'O\([^)]+\)', space_content)
        if o_match:
            data.space_complexity = o_match.group(0)

    # Extract EDGE CASES section
    edge_match = re.search(
        r'###\s*EDGE CASES:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )
    if edge_match:
        data.edge_cases = edge_match.group(1).strip()


def _parse_metadata_section(content: str, data: ProblemData) -> None:
    """Parse the METADATA section for techniques, data structures, patterns, and complexities."""

    # Look for METADATA section
    metadata_match = re.search(
        r'###\s*METADATA:\s*(.*?)(?=###|\Z)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    if metadata_match:
        metadata_content = metadata_match.group(1)

        # Extract Time Complexity from metadata
        time_patterns = [
            r'\*\*Time Complexity\*\*:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
            r'Time Complexity:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
            r'Time:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
        ]
        for pattern in time_patterns:
            match = re.search(pattern, metadata_content, re.IGNORECASE)
            if match:
                o_match = re.search(r'O\([^)]+\)', match.group(0))
                if o_match and not data.time_complexity:
                    data.time_complexity = o_match.group(0)
                break

        # Extract Space Complexity from metadata
        space_patterns = [
            r'\*\*Space Complexity\*\*:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
            r'Space Complexity:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
            r'Space:\s*(\*\s*)?[-\*]?\s*O\([^)]+\)',
        ]
        for pattern in space_patterns:
            match = re.search(pattern, metadata_content, re.IGNORECASE)
            if match:
                o_match = re.search(r'O\([^)]+\)', match.group(0))
                if o_match and not data.space_complexity:
                    data.space_complexity = o_match.group(0)
                break

        # Extract Techniques
        tech_match = re.search(
            r'\*\*Techniques\*\*:\s*(.+?)(?:\n|$)',
            metadata_content,
            re.IGNORECASE
        )
        if tech_match:
            tech_str = tech_match.group(1).strip()
            if tech_str.lower() != 'tbd':
                data.techniques = [t.strip() for t in tech_str.split(',') if t.strip()]

        # Extract Data Structures
        ds_match = re.search(
            r'\*\*Data Structures\*\*:\s*(.+?)(?:\n|$)',
            metadata_content,
            re.IGNORECASE
        )
        if ds_match:
            ds_str = ds_match.group(1).strip()
            if ds_str.lower() != 'tbd':
                data.data_structures = [d.strip() for d in ds_str.split(',') if d.strip()]

        # Extract Patterns
        pat_match = re.search(
            r'\*\*Patterns\*\*:\s*(.+?)(?:\n|$)',
            metadata_content,
            re.IGNORECASE
        )
        if pat_match:
            pat_str = pat_match.group(1).strip()
            if pat_str.lower() != 'tbd':
                data.patterns = [p.strip() for p in pat_str.split(',') if p.strip()]


# Legacy compatibility functions for metadata-only extraction
def parse_metadata_from_markdown(markdown_content: str) -> tuple[str, str, str, str]:
    """Parse metadata (difficulty, complexities, description) from markdown.

    DEPRECATED: Use parse_complete_problem_data() for comprehensive extraction.

    Args:
        markdown_content: Raw markdown content

    Returns:
        Tuple of (difficulty, time_complexity, space_complexity, description)
    """
    data = parse_complete_problem_data(markdown_content)
    return (data.difficulty, data.time_complexity, data.space_complexity, data.description)
