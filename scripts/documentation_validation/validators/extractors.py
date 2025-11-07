"""
Extractors functions for documentation verification.

Uses src/leet_code/markdown_extraction.py for section parsing to avoid duplication.
"""

from pathlib import Path
from typing import List, Dict, Optional, Tuple, Set
import re
import sys
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / 'src'))
from leet_code.markdown_extraction import parse_complete_problem_data, ProblemData, extract_markdown_from_code
from .models import DocumentationSection, SolutionMetadata


def validate_extraction(markdown: str, language: str) -> List[str]:
    """Validate that extracted markdown doesn't contain code (extraction boundary check).

    Detects common code patterns that indicate the extraction regex captured
    code instead of just documentation. This happens when closing delimiters
    are missing (e.g., missing closing triple quotes in Python).

    Args:
        markdown: Extracted markdown content
        language: Programming language

    Returns:
        List of extraction issues found
    """
    issues = []

    # Code patterns that should never appear in documentation
    code_patterns = [
        (r'\bfrom\s+\w+\s+import\b', 'Python import statement'),
        (r'\bimport\s+[\w{]', 'Import statement'),
        (r'\bclass\s+\w+\s*[:{(]', 'Class definition'),
        (r'\bdef\s+\w+\s*\(', 'Python function definition'),
        (r'\bfunction\s+\w+\s*\(', 'JavaScript function definition'),
        (r'\bconst\s+\w+\s*[:=]', 'Variable declaration'),
        (r'\blet\s+\w+\s*[:=]', 'Variable declaration'),
        (r'\bvar\s+\w+\s*[:=]', 'Variable declaration'),
    ]

    for pattern, description in code_patterns:
        if re.search(pattern, markdown):
            issues.append(f'[EXTRACTION ERROR] Code leaked into documentation: {description}')

    # Check for nested docstring markers (indicates missing closing delimiter)
    if language == 'python':
        # Count triple quotes in extracted markdown
        triple_quote_count = markdown.count('"""')
        if triple_quote_count > 0:
            issues.append('[EXTRACTION ERROR] Found nested triple quotes (likely missing closing """)')

    elif language in ['javascript', 'typescript', 'java', 'cpp', 'c', 'go', 'rust']:
        # Check for nested comment blocks
        if '/*' in markdown or '*/' in markdown:
            issues.append('[EXTRACTION ERROR] Found nested comment delimiters')

    return issues


def extract_problem_data(content: str, language: str):
    """Extract ProblemData from file content using src/ parser.

    Args:
        content: Full file content
        language: Programming language (python, javascript, typescript, etc.)

    Returns:
        ProblemData object from src/leet_code/markdown_extraction, or None if extraction failed
    """
    # Map language to file extension
    lang_to_ext = {
        'python': '.py',
        'javascript': '.js',
        'typescript': '.ts',
        'java': '.java',
        'cpp': '.cpp',
        'c': '.c',
        'go': '.go',
        'rust': '.rs'
    }

    file_ext = lang_to_ext.get(language, '.py')

    # Extract markdown from code using src/ code
    markdown = extract_markdown_from_code(content, file_ext)
    if not markdown:
        return None

    # Validate extraction didn't capture code
    extraction_issues = validate_extraction(markdown, language)
    if extraction_issues:
        # Return None if extraction failed
        return None

    # Parse using src/ code and return ProblemData directly
    problem_data = parse_complete_problem_data(markdown)
    return problem_data


def _format_metadata(problem_data: ProblemData) -> str:
    """Format metadata fields back into a section string for validation.

    This is needed because ProblemData parses metadata into individual fields,
    but validation needs to see the metadata section as text.
    """
    parts = []

    if problem_data.techniques:
        parts.append(f"**Techniques**: {', '.join(problem_data.techniques)}")
    if problem_data.data_structures:
        parts.append(f"**Data Structures**: {', '.join(problem_data.data_structures)}")
    if problem_data.patterns:
        parts.append(f"**Patterns**: {', '.join(problem_data.patterns)}")
    if problem_data.time_complexity:
        parts.append(f"**Time Complexity**: {problem_data.time_complexity}")
    if problem_data.space_complexity:
        parts.append(f"**Space Complexity**: {problem_data.space_complexity}")

    return '\n'.join(parts) if parts else ""




