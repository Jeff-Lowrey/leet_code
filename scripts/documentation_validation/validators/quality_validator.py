#!/usr/bin/env python3
"""Quality Validator for Documentation Sections

Provides heuristic quality scoring (0-100) for documentation sections.
Each section is evaluated based on:
- Length appropriateness
- Presence of placeholders
- Section-specific requirements (metadata fields, code examples, etc.)
"""

from typing import Tuple, List


class QualityValidator:
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

        # Special handling for "..." - only flag if it's a standalone placeholder
        # Don't flag mathematical ellipsis like "n × (n-1) × ... × 1" or output like "...Q"
        # Flag patterns like standalone " ... " but not " × ... × "
        if content.startswith("...") or content.endswith("...") or "\n...\n" in content:
            score -= 30
            issues.append("Contains placeholder: ...")
        elif " ... " in content:
            # Check if it's mathematical notation (has × or * nearby)
            # Only flag if not surrounded by mathematical operators
            pos = content.find(" ... ")
            if pos > 0:
                before = content[max(0, pos-5):pos]
                after = content[pos+5:min(len(content), pos+10)]
                # Don't flag if surrounded by mathematical operators
                if "×" not in before and "×" not in after and "*" not in before and "*" not in after:
                    score -= 30
                    issues.append("Contains placeholder: ...")


        # Section-specific checks
        section_checks = {
            "METADATA": QualityValidator._check_metadata,
            "INTUITION": QualityValidator._check_intuition,
            "APPROACH": QualityValidator._check_approach,
            "WHY THIS WORKS": QualityValidator._check_why_works,
            "EXAMPLE WALKTHROUGH": QualityValidator._check_example,
            "TIME COMPLEXITY": QualityValidator._check_complexity,
            "SPACE COMPLEXITY": QualityValidator._check_complexity,
            "EDGE CASES": QualityValidator._check_edge_cases,
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
