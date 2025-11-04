#!/usr/bin/env python3
"""Claude-Assisted Documentation Fixer

Hybrid approach: Script does maximum automated analysis (90%), Claude provides semantic fixes (10%).

Workflow:
1. Script: Template validation + heuristic quality analysis
2. Script: Score sections 0-100%, filter problematic ones (< 80%)
3. Script: Present issues to Claude in structured format
4. Claude: Analyze and provide improved content (in conversation)
5. Script: Apply improvements, re-validate, iterate until 100%

This script is meant to be run interactively with Claude in the conversation.
"""

import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json
import os

# Get repository root and add paths
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(REPO_ROOT / "src"))
sys.path.insert(0, str(SCRIPT_DIR))

from leet_code.markdown_extraction import extract_markdown_from_code, parse_complete_problem_data
from validators.template_validator import TemplateValidator
from validators.extractors import extract_problem_data
from injection import inject_section_to_code
from injection import inject_markdown_to_code, update_file_with_markdown


class QualityScorer:
    """Heuristic quality scoring for documentation sections."""

    @staticmethod
    def score_section(section_name: str, content: str) -> Tuple[int, List[str]]:
        """Score a section 0-100 based on heuristic quality checks.

        Args:
            section_name: Name of the section
            content: Content string of the section

        Returns:
            Tuple of (score, list of issues)
        """
        if not content:
            return 0, ["Section is empty or missing"]

        issues = []
        score = 100

        # Length checks
        if len(content) < 20:
            score -= 40
            issues.append("Section is too short (< 20 chars)")
        elif len(content) < 50:
            score -= 20
            issues.append("Section is quite short (< 50 chars)")

        if len(content) > 2000:
            score -= 10
            issues.append("Section may be too verbose (> 2000 chars)")

        # Placeholder detection (simple string search)
        # Check for placeholders that should always be flagged
        simple_placeholders = ["TODO", "TBD", "[PLACEHOLDER]", "???", "FIXME"]
        for placeholder in simple_placeholders:
            if placeholder in content:
                score -= 30
                issues.append(f"Contains placeholder: {placeholder}")
                break

        # Special handling for "..." - only flag if it's standalone (not part of output like "...Q")
        # Check for "..." that's surrounded by whitespace or at line boundaries
        if " ... " in content or "\n...\n" in content or content.startswith("...") or content.endswith("..."):
            score -= 30
            issues.append("Contains placeholder: ...")


        # Section-specific checks
        section_checks = {
            "METADATA": QualityScorer._check_metadata,
            "INTUITION": QualityScorer._check_intuition,
            "APPROACH": QualityScorer._check_approach,
            "WHY THIS WORKS": QualityScorer._check_why_works,
            "EXAMPLE WALKTHROUGH": QualityScorer._check_example,
            "TIME COMPLEXITY": QualityScorer._check_complexity,
            "SPACE COMPLEXITY": QualityScorer._check_complexity,
            "EDGE CASES": QualityScorer._check_edge_cases,
        }

        if section_name in section_checks:
            section_score_delta, section_issues = section_checks[section_name](content)
            score += section_score_delta
            issues.extend(section_issues)

        # Ensure score stays in 0-100 range
        score = max(0, min(100, score))

        return score, issues

    @staticmethod
    def _check_metadata(content: str) -> Tuple[int, List[str]]:
        """Check metadata section quality."""
        issues = []
        score_delta = 0

        required_fields = ["Techniques", "Data Structures", "Time Complexity", "Space Complexity"]
        for field in required_fields:
            if f"**{field}**" not in content:
                score_delta -= 15
                issues.append(f"Missing field: {field}")

        return score_delta, issues

    @staticmethod
    def _check_intuition(content: str) -> Tuple[int, List[str]]:
        """Check intuition section quality."""
        issues = []
        score_delta = 0

        # Should explain the "why" not the "how"
        if "step" in content.lower() and content.lower().count("step") > 2:
            score_delta -= 10
            issues.append("Intuition should explain 'why', not detailed steps")

        # Should be conceptual
        if len(content.split()) < 15:
            score_delta -= 15
            issues.append("Intuition explanation is too brief")

        return score_delta, issues

    @staticmethod
    def _check_approach(content: str) -> Tuple[int, List[str]]:
        """Check approach section quality."""
        issues = []
        score_delta = 0

        # Should have some structure (steps, bullets, or paragraphs)
        has_numbered_steps = any(f"{i}." in content or f"{i})" in content for i in range(1, 10))
        has_bullets = content.count("- ") > 2 or content.count("* ") > 2
        has_paragraphs = content.count("\n\n") > 1

        if not (has_numbered_steps or has_bullets or has_paragraphs):
            score_delta -= 15
            issues.append("Approach lacks clear structure (steps, bullets, or paragraphs)")

        return score_delta, issues

    @staticmethod
    def _check_why_works(content: str) -> Tuple[int, List[str]]:
        """Check 'why this works' section quality."""
        issues = []
        score_delta = 0

        # Should explain correctness/reasoning
        if len(content.split()) < 20:
            score_delta -= 15
            issues.append("'Why This Works' explanation is too brief")

        return score_delta, issues

    @staticmethod
    def _check_example(content: str) -> Tuple[int, List[str]]:
        """Check example walkthrough quality."""
        issues = []
        score_delta = 0

        # Should have input/output
        if "input" not in content.lower():
            score_delta -= 20
            issues.append("Example walkthrough missing input")

        if "output" not in content.lower() and "result" not in content.lower():
            score_delta -= 20
            issues.append("Example walkthrough missing output/result")

        # Should have some explanation steps
        if len(content.split("\n")) < 3:
            score_delta -= 10
            issues.append("Example walkthrough lacks detailed steps")

        return score_delta, issues

    @staticmethod
    def _check_complexity(content: str) -> Tuple[int, List[str]]:
        """Check complexity section quality."""
        issues = []
        score_delta = 0

        # Should have O() notation
        if "O(" not in content:
            score_delta -= 30
            issues.append("Missing Big-O notation")

        # Should have explanation
        if len(content.split()) < 5:
            score_delta -= 15
            issues.append("Complexity explanation is too brief")

        return score_delta, issues

    @staticmethod
    def _check_edge_cases(content: str) -> Tuple[int, List[str]]:
        """Check edge cases section quality."""
        issues = []
        score_delta = 0

        # Should list multiple cases
        has_bullets = content.count("- ") > 1 or content.count("* ") > 1
        has_numbers = any(f"{i}." in content for i in range(1, 5))

        if not (has_bullets or has_numbers):
            score_delta -= 10
            issues.append("Edge cases should be listed (bullets or numbered)")

        return score_delta, issues


class ClaudeAssistedFixer:
    """Main fixer class that orchestrates the workflow."""

    def __init__(self, repo_root: Path, category: str | None = None):
        self.repo_root = repo_root
        self.template_validator = TemplateValidator(repo_root)
        self.solutions_dir = repo_root / "solutions"
        self.category = category  # Category scope for safety

    def _format_metadata(self, problem_data) -> str:
        """Format ProblemData metadata fields into a string for validation."""
        if not problem_data:
            return ""

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

        return '\n'.join(parts)

    def _get_language(self, file_ext: str) -> str:
        """Map file extension to language name."""
        ext_to_lang = {
            '.py': 'python',
            '.js': 'javascript',
            '.ts': 'typescript',
            '.java': 'java',
            '.cpp': 'cpp',
        }
        return ext_to_lang.get(file_ext, 'python')

    def _validate_file_in_category(self, file_path: Path) -> bool:
        """Validate that file is within the category scope.

        Args:
            file_path: File path to validate

        Returns:
            True if file is in category or no category set, False otherwise
        """
        if self.category is None:
            return True  # No category restriction

        category_dir = self.repo_root / "solutions" / self.category
        try:
            file_path.resolve().relative_to(category_dir.resolve())
            return True
        except ValueError:
            return False

    def analyze_file(self, file_path: Path) -> Dict:
        """Analyze a single file and return all issues.

        Args:
            file_path: Path to solution file

        Returns:
            Dict with analysis results

        Raises:
            ValueError: If file is outside category scope
        """
        # Validate file is in category
        if not self._validate_file_in_category(file_path):
            raise ValueError(
                f"File {file_path} is outside category scope '{self.category}'. "
                f"Expected files in {self.repo_root / 'solutions' / self.category}"
            )

        # Read file
        content = file_path.read_text()
        file_ext = file_path.suffix
        language = self._get_language(file_ext)

        # Extract ProblemData using src/ parser
        problem_data = extract_problem_data(content, language)

        # Template validation using ProblemData directly from src/ parser
        if problem_data:
            template_issues = self.template_validator.validate_problem_data(problem_data, language)
        else:
            template_issues = ["[TEMPLATE] Failed to extract documentation"]

        # Score each section from ProblemData
        section_scores = {}
        section_issues = {}

        # Map ProblemData fields to section names
        section_mapping = {
            "METADATA": self._format_metadata(problem_data) if problem_data else "",
            "INTUITION": problem_data.intuition if problem_data else "",
            "APPROACH": problem_data.approach if problem_data else "",
            "WHY THIS WORKS": problem_data.why_works if problem_data else "",
            "EXAMPLE WALKTHROUGH": problem_data.example_walkthrough if problem_data else "",
            "TIME COMPLEXITY": problem_data.time_complexity_explanation if problem_data else "",
            "SPACE COMPLEXITY": problem_data.space_complexity_explanation if problem_data else "",
            "EDGE CASES": problem_data.edge_cases if problem_data else "",
        }

        for name, section_content in section_mapping.items():
            score, issues = QualityScorer.score_section(name, section_content)
            section_scores[name] = score
            section_issues[name] = issues

        # Calculate overall score
        if section_scores:
            overall_score = sum(section_scores.values()) / len(section_scores)
        else:
            overall_score = 0

        return {
            "file_path": str(file_path),
            "language": language,
            "overall_score": round(overall_score, 1),
            "template_issues": template_issues,
            "sections": {
                name: {
                    "score": section_scores.get(name, 0),
                    "issues": section_issues.get(name, []),
                    "content": content,
                    "present": bool(content),
                }
                for name, content in section_mapping.items()
            },
        }

    def find_problematic_files(self, quality_threshold: int = 80, max_files: int = 10) -> List[Dict]:
        """Find files with quality issues.

        Args:
            quality_threshold: Score threshold (files below this are problematic)
            max_files: Maximum number of files to return

        Returns:
            List of file analysis results, sorted by score (lowest first)
        """
        results = []

        # Scan all solution files
        for file_path in self.solutions_dir.rglob("*"):
            if file_path.is_file() and file_path.suffix in [".py", ".js", ".ts", ".java", ".cpp"]:
                analysis = self.analyze_file(file_path)
                if analysis["overall_score"] < quality_threshold:
                    results.append(analysis)

        # Sort by score (lowest first)
        results.sort(key=lambda x: x["overall_score"])

        return results[:max_files]

    def present_issues_for_claude(self, analysis: Dict) -> str:
        """Format issues for presentation to Claude.

        Args:
            analysis: File analysis results

        Returns:
            Formatted string for Claude
        """
        output = []
        output.append(f"\n{'='*80}")
        output.append(f"FILE: {analysis['file_path']}")
        output.append(f"Language: {analysis['language']}")
        output.append(f"Overall Score: {analysis['overall_score']}/100")
        output.append(f"{'='*80}\n")

        # Template issues
        if analysis["template_issues"]:
            output.append("TEMPLATE ISSUES:")
            for issue in analysis["template_issues"]:
                output.append(f"  - {issue}")
            output.append("")

        # Section issues (only sections < 80% score)
        problematic_sections = [
            (name, data)
            for name, data in analysis["sections"].items()
            if data["score"] < 80
        ]

        if problematic_sections:
            output.append("SECTIONS NEEDING IMPROVEMENT:")
            output.append("")

            for name, data in problematic_sections:
                output.append(f"### {name} (Score: {data['score']}/100)")
                output.append("")

                if data["issues"]:
                    output.append("Issues:")
                    for issue in data["issues"]:
                        output.append(f"  - {issue}")
                    output.append("")

                if data["present"]:
                    output.append("Current Content:")
                    output.append("```")
                    output.append(data["content"])
                    output.append("```")
                else:
                    output.append("Current Content: [MISSING]")

                output.append("")
                output.append("---")
                output.append("")

        return "\n".join(output)

    def apply_section_fix(self, file_path: Path, section_name: str, new_content: str) -> bool:
        """Apply a fix to a specific section.

        Args:
            file_path: Path to file to update
            section_name: Name of section to update
            new_content: New content for the section

        Returns:
            True if successful, False otherwise

        Raises:
            ValueError: If file is outside category scope
        """
        # Validate file is in category
        if not self._validate_file_in_category(file_path):
            raise ValueError(
                f"Cannot apply fix: File {file_path} is outside category scope '{self.category}'. "
                f"Expected files in {self.repo_root / 'solutions' / self.category}"
            )

        try:
            # Read original file
            original_code = file_path.read_text()
            file_ext = file_path.suffix

            # Use surgical section replacement (preserves all other sections)
            updated_code = inject_section_to_code(original_code, section_name, new_content, file_ext)
            if not updated_code:
                print(f"Failed to inject section {section_name}")
                return False

            # Write back
            file_path.write_text(updated_code)
            return True

        except Exception as e:
            print(f"Error applying fix: {e}")
            return False

    def _remove_duplicate_sections(self, markdown: str) -> str:
        """Remove duplicate documentation sections from markdown.

        Keeps the first occurrence of each section and removes all subsequent
        duplicates. This preserves unique sections while removing only true duplicates.

        Example:
            Input:  METADATA(1) → INTUITION → METADATA(2) → APPROACH
            Output: METADATA(1) → INTUITION → APPROACH
            (METADATA(2) removed, APPROACH kept)

        Args:
            markdown: Original markdown with potential duplicates

        Returns:
            Cleaned markdown with only first occurrence of each section
        """
        import re

        # Section headers in expected order
        section_headers = [
            "### METADATA:",
            "### INTUITION:",
            "### APPROACH:",
            "### WHY THIS WORKS:",
            "### EXAMPLE WALKTHROUGH:",
            "### TIME COMPLEXITY:",
            "### SPACE COMPLEXITY:",
            "### EDGE CASES:",
        ]

        # Pattern to find next section boundary
        section_pattern = r'\n### [A-Z][A-Z\s]+:'

        # Find all section positions with their content boundaries
        all_sections = []
        for header in section_headers:
            pos = 0
            while True:
                pos = markdown.find(header, pos)
                if pos == -1:
                    break

                # Find where this section ends (next section or end of markdown)
                search_from = pos + len(header)
                next_section_match = re.search(section_pattern, markdown[search_from:])
                if next_section_match:
                    section_end = search_from + next_section_match.start()
                else:
                    section_end = len(markdown)

                all_sections.append({
                    'header': header,
                    'start': pos,
                    'end': section_end,
                    'content': markdown[pos:section_end]
                })
                pos += len(header)

        # Sort by position
        all_sections.sort(key=lambda x: x['start'])

        # Track which headers we've seen and which sections to keep
        seen_headers = set()
        sections_to_keep = []

        for section in all_sections:
            if section['header'] not in seen_headers:
                # First occurrence - keep it
                sections_to_keep.append(section)
                seen_headers.add(section['header'])
            # else: duplicate occurrence - skip it

        # Reconstruct markdown from kept sections
        if not sections_to_keep:
            return markdown

        # Build new markdown maintaining original order
        result_parts = []
        last_end = 0

        for section in sections_to_keep:
            # Add any content before this section (if at start of doc)
            if last_end == 0 and section['start'] > 0:
                result_parts.append(markdown[:section['start']])

            # Add the section content
            result_parts.append(section['content'])
            last_end = section['end']

        return ''.join(result_parts).rstrip()

    def _update_section_in_place(self, markdown: str, section_name: str, new_content: str) -> str:
        """Update a specific section in markdown without rebuilding entire document.

        Args:
            markdown: Original markdown content
            section_name: Section to update (e.g., "METADATA", "INTUITION")
            new_content: New content for the section

        Returns:
            Updated markdown with section replaced
        """
        import re

        # Map section names to their markdown headers
        section_header = f"### {section_name}:"

        # Find the section start
        section_start = markdown.find(section_header)
        if section_start == -1:
            # Section doesn't exist - append at appropriate location
            return self._append_new_section(markdown, section_name, new_content)

        # Find the next section header (or end of markdown)
        next_section_pattern = r'\n### [A-Z][A-Z\s]+:'
        search_from = section_start + len(section_header)
        next_section_match = re.search(next_section_pattern, markdown[search_from:])

        if next_section_match:
            section_end = search_from + next_section_match.start()
        else:
            section_end = len(markdown)

        # Replace the section content
        before_section = markdown[:section_start]
        after_section = markdown[section_end:]

        # Build new section
        new_section = f"{section_header}\n{new_content.strip()}\n"

        return before_section + new_section + after_section

    def _append_new_section(self, markdown: str, section_name: str, new_content: str) -> str:
        """Append a new section to markdown in the correct position.

        Args:
            markdown: Original markdown content
            section_name: Section name to add
            new_content: Content for the new section

        Returns:
            Markdown with new section appended
        """
        # Section order for documentation
        section_order = [
            "METADATA",
            "INTUITION",
            "APPROACH",
            "WHY THIS WORKS",
            "EXAMPLE WALKTHROUGH",
            "TIME COMPLEXITY",
            "SPACE COMPLEXITY",
            "EDGE CASES",
        ]

        # Find where to insert this section
        if section_name not in section_order:
            # Unknown section - append at end
            return markdown.rstrip() + f"\n\n### {section_name}:\n{new_content.strip()}\n"

        section_index = section_order.index(section_name)

        # Find the last section that comes before this one
        insert_pos = 0
        for i in range(section_index - 1, -1, -1):
            prev_section = f"### {section_order[i]}:"
            pos = markdown.find(prev_section)
            if pos != -1:
                # Found previous section - find its end
                search_from = pos + len(prev_section)
                next_section_pattern = r'\n### [A-Z][A-Z\s]+:'
                import re
                next_match = re.search(next_section_pattern, markdown[search_from:])
                if next_match:
                    insert_pos = search_from + next_match.start()
                else:
                    insert_pos = len(markdown)
                break

        # Insert the new section
        before = markdown[:insert_pos].rstrip()
        after = markdown[insert_pos:].lstrip()
        new_section = f"\n\n### {section_name}:\n{new_content.strip()}\n"

        if after:
            return before + new_section + "\n" + after
        else:
            return before + new_section

    def _rebuild_markdown(self, problem_data, original_markdown: str) -> str:
        """Rebuild markdown from ProblemData.

        Properly serializes ProblemData back to markdown format.
        NO <details> blocks - flat documentation structure.
        """
        parts = []

        # Title and difficulty
        if problem_data.number and problem_data.title:
            parts.append(f"# {problem_data.number}. {problem_data.title}")
            parts.append("")

        if problem_data.difficulty:
            parts.append(problem_data.difficulty)
            parts.append("")

        # Problem statement (if present)
        if problem_data.problem_statement:
            parts.append(problem_data.problem_statement.strip())
            parts.append("")

        # METADATA section (NO <details> wrapper)
        if problem_data.techniques or problem_data.data_structures or problem_data.time_complexity or problem_data.space_complexity:
            parts.append("### METADATA:")
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
            parts.append("")

        # INTUITION
        if problem_data.intuition:
            parts.append("### INTUITION:")
            parts.append(problem_data.intuition)
            parts.append("")

        # APPROACH
        if problem_data.approach:
            parts.append("### APPROACH:")
            parts.append(problem_data.approach)
            parts.append("")

        # WHY THIS WORKS
        if problem_data.why_works:
            parts.append("### WHY THIS WORKS:")
            parts.append(problem_data.why_works)
            parts.append("")

        # EXAMPLE WALKTHROUGH
        if problem_data.example_walkthrough:
            parts.append("### EXAMPLE WALKTHROUGH:")
            parts.append(problem_data.example_walkthrough)
            parts.append("")

        # TIME COMPLEXITY (full explanation)
        if problem_data.time_complexity_explanation:
            parts.append("### TIME COMPLEXITY:")
            parts.append(problem_data.time_complexity_explanation)
            parts.append("")

        # SPACE COMPLEXITY (full explanation)
        if problem_data.space_complexity_explanation:
            parts.append("### SPACE COMPLEXITY:")
            parts.append(problem_data.space_complexity_explanation)
            parts.append("")

        # EDGE CASES
        if problem_data.edge_cases:
            parts.append("### EDGE CASES:")
            parts.append(problem_data.edge_cases)
            parts.append("")

        return "\n".join(parts)

    def _get_language(self, file_ext: str) -> str:
        """Map file extension to language name."""
        ext_to_lang = {
            ".py": "python",
            ".js": "javascript",
            ".ts": "typescript",
            ".java": "java",
            ".cpp": "cpp",
            ".c": "c",
            ".go": "go",
            ".rs": "rust",
        }
        return ext_to_lang.get(file_ext, "python")


def main():
    """Main entry point for interactive use."""
    fixer = ClaudeAssistedFixer(REPO_ROOT)

    print("Claude-Assisted Documentation Fixer")
    print("=" * 80)
    print()
    print("Finding files with quality issues (< 80% score)...")
    print()

    # Find problematic files
    problematic_files = fixer.find_problematic_files(quality_threshold=80, max_files=10)

    if not problematic_files:
        print("No files found with quality issues!")
        return

    print(f"Found {len(problematic_files)} files needing improvement:")
    print()

    for i, analysis in enumerate(problematic_files, 1):
        print(f"{i}. {analysis['file_path']} (Score: {analysis['overall_score']}/100)")

    print()
    print("=" * 80)
    print()
    print("Presenting first file for Claude review:")

    # Present first file
    first_file = problematic_files[0]
    presentation = fixer.present_issues_for_claude(first_file)
    print(presentation)

    print()
    print("=" * 80)
    print()
    print("Next steps:")
    print("1. Claude analyzes the issues and provides improved content")
    print("2. Script applies improvements")
    print("3. Re-validate and iterate until 100%")


if __name__ == "__main__":
    main()
