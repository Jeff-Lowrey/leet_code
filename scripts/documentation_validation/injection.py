#!/usr/bin/env python3
"""Markdown injection utilities - complementary to src/leet_code/markdown_extraction.py

This module provides utilities for injecting updated markdown content back into
language-specific comment formats (Python docstrings, JavaScript JSDoc, etc.).

This is the WRITE counterpart to the READ operations in src/leet_code/markdown_extraction.py.
"""

import re
import sys
from pathlib import Path

# Add src to path for imports
src_path = Path(__file__).resolve().parents[2] / "src"
sys.path.insert(0, str(src_path))

from leet_code.markdown_extraction import (
    COMMENT_PATTERNS,
    DOCSTRING_LANGUAGES,
    JSDOC_LANGUAGES,
)


def inject_section_to_code(
    original_code: str, section_name: str, section_content: str, file_extension: str
) -> str | None:
    """Inject a single section update into code via in-place string replacement.

    This performs TRUE surgical replacement by directly editing the docstring/comment
    in the source code, without extracting and rebuilding the entire markdown block.
    This preserves ALL formatting, spacing, and structure (including <details> tags).

    Args:
        original_code: Original source code content
        section_name: Name of section to update (e.g., "METADATA", "INTUITION")
        section_content: New content for the section
        file_extension: File extension (e.g., '.py', '.js', '.ts', '.java', '.cpp')

    Returns:
        Updated source code with only the specified section modified, or None if failed
    """
    # Normalize literal \n to actual newlines in section content
    section_content = section_content.replace('\\n', '\n')

    # Determine comment pattern based on language
    if file_extension in DOCSTRING_LANGUAGES:
        pattern = COMMENT_PATTERNS["docstring"]
        comment_prefix = ""  # Python has no per-line prefix inside docstrings
    elif file_extension in JSDOC_LANGUAGES:
        pattern = COMMENT_PATTERNS["jsdoc"]
        comment_prefix = " * "  # JSDoc has " * " prefix on each line
    else:
        return None

    # Find the comment block in the original code
    match = pattern.search(original_code)
    if not match:
        return None

    comment_start = match.start()
    comment_end = match.end()
    comment_block = original_code[comment_start:comment_end]

    # Template section order
    SECTION_ORDER = [
        "METADATA",
        "INTUITION",
        "APPROACH",
        "WHY THIS WORKS",
        "EXAMPLE WALKTHROUGH",
        "TIME COMPLEXITY",
        "SPACE COMPLEXITY",
        "EDGE CASES",
    ]

    # Build the section header pattern (accounting for comment prefixes)
    if file_extension in DOCSTRING_LANGUAGES:
        section_pattern = f"### {section_name}:"
    else:  # JSDOC_LANGUAGES
        # In JSDoc, headers appear as " * ### SECTION:"
        section_pattern = f" \\* ### {section_name}:"

    # Find section in comment block - regex stops at next ###, </details>, or closing delimiter
    section_regex = re.compile(
        re.escape(section_pattern) + r'(.*?)(?=\n[ \*]*### |\n[ \*]*</details>|"""|$|\*/)',
        re.DOTALL
    )

    section_match = section_regex.search(comment_block)

    if section_match:
        # Section exists - replace it in place
        section_start_in_comment = section_match.start()
        section_end_in_comment = section_match.end()

        # Format new content with proper comment prefixes
        if file_extension in DOCSTRING_LANGUAGES:
            formatted_content = f"### {section_name}:\n{section_content}\n"
        else:  # JSDOC_LANGUAGES
            # Add " * " prefix to each line
            content_lines = section_content.split('\n')
            formatted_lines = [f" * {line}" if line.strip() else " *" for line in content_lines]
            formatted_content = f" * ### {section_name}:\n" + "\n".join(formatted_lines) + "\n"

        # Replace section in comment block
        updated_comment = (
            comment_block[:section_start_in_comment] +
            formatted_content +
            comment_block[section_end_in_comment:]
        )

    else:
        # Section doesn't exist - insert it in template order
        try:
            target_index = SECTION_ORDER.index(section_name)
        except ValueError:
            # Unknown section - append before closing tag
            target_index = len(SECTION_ORDER)

        # Find insertion point
        insert_position = None
        for i in range(target_index + 1, len(SECTION_ORDER)):
            next_section = SECTION_ORDER[i]
            if file_extension in DOCSTRING_LANGUAGES:
                next_pattern = f"### {next_section}:"
            else:
                next_pattern = f" \\* ### {next_section}:"

            next_match = re.search(re.escape(next_pattern), comment_block)
            if next_match:
                insert_position = next_match.start()
                break

        # Format new section with proper comment prefixes
        if file_extension in DOCSTRING_LANGUAGES:
            formatted_content = f"\n### {section_name}:\n{section_content}\n"
        else:  # JSDOC_LANGUAGES
            content_lines = section_content.split('\n')
            formatted_lines = [f" * {line}" if line.strip() else " *" for line in content_lines]
            formatted_content = "\n * ### {section_name}:\n" + "\n".join(formatted_lines) + "\n"

        if insert_position is not None:
            # Insert before next section
            updated_comment = (
                comment_block[:insert_position] +
                formatted_content +
                comment_block[insert_position:]
            )
        else:
            # Append before closing delimiter
            if file_extension in DOCSTRING_LANGUAGES:
                close_pos = comment_block.rfind('"""')
                if close_pos == -1:
                    return None
                updated_comment = (
                    comment_block[:close_pos] +
                    formatted_content +
                    comment_block[close_pos:]
                )
            else:  # JSDOC_LANGUAGES
                close_pos = comment_block.rfind(' */')
                if close_pos == -1:
                    return None
                updated_comment = (
                    comment_block[:close_pos] +
                    formatted_content +
                    comment_block[close_pos:]
                )

    # Replace comment block in original code
    return (
        original_code[:comment_start] +
        updated_comment +
        original_code[comment_end:]
    )


def inject_markdown_to_code(
    original_code: str, updated_markdown: str, file_extension: str
) -> str | None:
    """Inject updated markdown back into code, replacing the original comment block.

    This is the complementary function to extract_markdown_from_code() in
    src/leet_code/markdown_extraction.py.

    Args:
        original_code: Original source code content
        updated_markdown: Updated markdown content to inject
        file_extension: File extension (e.g., '.py', '.js', '.ts', '.java', '.cpp')

    Returns:
        Updated source code with new markdown, or None if injection failed
    """
    # Normalize literal \n to actual newlines
    # This fixes issues where markdown has literal backslash-n instead of newlines
    updated_markdown = updated_markdown.replace('\\n', '\n')

    # Check if language is supported and determine pattern
    if file_extension in DOCSTRING_LANGUAGES:
        pattern = COMMENT_PATTERNS["docstring"]
        formatter = _format_python_docstring
    elif file_extension in JSDOC_LANGUAGES:
        pattern = COMMENT_PATTERNS["jsdoc"]
        formatter = _format_jsdoc_comment
    else:
        return None

    try:
        # Find the existing comment block
        match = pattern.search(original_code)
        if not match:
            return None

        # Format the updated markdown for the specific language
        formatted_comment = formatter(updated_markdown)

        # Replace the old comment block with the new one
        updated_code = (
            original_code[: match.start()]
            + formatted_comment
            + original_code[match.end() :]
        )

        return updated_code

    except Exception:
        return None


def _format_python_docstring(markdown: str) -> str:
    """Format markdown as a Python docstring (triple-quoted string)."""
    return f'"""{markdown}"""'


def _format_jsdoc_comment(markdown: str) -> str:
    """Format markdown as a JSDoc comment (/** ... */)."""
    lines = markdown.split("\n")
    formatted_lines = ["/**"]

    for line in lines:
        if line.strip():
            formatted_lines.append(f" * {line}")
        else:
            formatted_lines.append(" *")

    formatted_lines.append(" */")

    return "\n".join(formatted_lines)


def update_file_with_markdown(
    file_path: Path, updated_markdown: str
) -> tuple[bool, str]:
    """Update a solution file with new markdown content.

    Args:
        file_path: Path to the solution file
        updated_markdown: Updated markdown content

    Returns:
        Tuple of (success: bool, message: str)
    """
    try:
        # Read original file
        original_code = file_path.read_text()
        file_extension = file_path.suffix

        # Inject updated markdown
        updated_code = inject_markdown_to_code(
            original_code, updated_markdown, file_extension
        )

        if updated_code is None:
            return False, f"Failed to inject markdown into {file_path}"

        # Write updated code back to file
        file_path.write_text(updated_code)

        return True, f"Successfully updated {file_path}"

    except Exception as e:
        return False, f"Error updating {file_path}: {e}"
