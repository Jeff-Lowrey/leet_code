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
    """Inject a single section update into code, preserving all other sections.

    This is a surgical replacement that only modifies the specified section,
    leaving all other documentation sections untouched. If the section doesn't exist,
    it's inserted in the correct template order.

    Args:
        original_code: Original source code content
        section_name: Name of section to update (e.g., "METADATA", "INTUITION")
        section_content: New content for the section
        file_extension: File extension (e.g., '.py', '.js', '.ts', '.java', '.cpp')

    Returns:
        Updated source code with only the specified section modified, or None if failed
    """
    # Extract current markdown
    from leet_code.markdown_extraction import extract_markdown_from_code

    markdown = extract_markdown_from_code(original_code, file_extension)
    if not markdown:
        return None

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

    # Find and replace the specific section in markdown
    section_header = f"### {section_name}:"

    # Find section boundaries
    section_start = markdown.find(section_header)
    if section_start == -1:
        # Section doesn't exist - insert it in template order
        try:
            target_index = SECTION_ORDER.index(section_name)
        except ValueError:
            # Unknown section - append at end
            updated_markdown = markdown.rstrip() + f"\n\n{section_header}\n{section_content}\n"
        else:
            # Find the right place to insert based on template order
            insert_before = None
            for i in range(target_index + 1, len(SECTION_ORDER)):
                next_section_header = f"### {SECTION_ORDER[i]}:"
                pos = markdown.find(next_section_header)
                if pos != -1:
                    insert_before = pos
                    break

            if insert_before is None:
                # No sections after this one - append at end
                updated_markdown = markdown.rstrip() + f"\n\n{section_header}\n{section_content}\n"
            else:
                # Insert before the next section
                updated_markdown = (
                    markdown[:insert_before] +
                    section_header + "\n" + section_content + "\n\n" +
                    markdown[insert_before:]
                )
    else:
        # Section exists - replace it
        next_section = markdown.find("\n### ", section_start + len(section_header))

        if next_section == -1:
            # This is the last section
            section_end = len(markdown)
        else:
            section_end = next_section

        # Replace this section
        updated_markdown = (
            markdown[:section_start] +
            section_header + "\n" + section_content + "\n" +
            markdown[section_end:]
        )

    # Inject the complete updated markdown back
    return inject_markdown_to_code(original_code, updated_markdown, file_extension)


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
