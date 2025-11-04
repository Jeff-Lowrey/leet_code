"""
Template-based validation for documentation.

Loads language-specific templates and validates documentation structure against them.
"""

from pathlib import Path
from typing import Dict, List, Optional
import re


class TemplateValidator:
    """Validates documentation against language-specific templates."""

    def __init__(self, repo_root: Path):
        """Initialize with repository root to find templates."""
        self.repo_root = repo_root
        self.templates_dir = repo_root / "docs" / "developer-guide" / "templates"
        self._template_cache: Dict[str, str] = {}

    def load_template(self, language: str) -> Optional[str]:
        """Load template for given language.

        Args:
            language: Programming language (python, javascript, typescript, etc.)

        Returns:
            Template content or None if not found
        """
        if language in self._template_cache:
            return self._template_cache[language]

        # Map language to template file
        lang_to_file = {
            'python': 'SOLUTION_TEMPLATE.py',
            'javascript': 'SOLUTION_TEMPLATE.js',
            'typescript': 'SOLUTION_TEMPLATE.ts',
            'java': 'SOLUTION_TEMPLATE.java',
            'cpp': 'SOLUTION_TEMPLATE.cpp',
            'c': 'SOLUTION_TEMPLATE.c',
            'go': 'SOLUTION_TEMPLATE.go',
            'rust': 'SOLUTION_TEMPLATE.rs'
        }

        template_file = lang_to_file.get(language)
        if not template_file:
            return None

        template_path = self.templates_dir / template_file
        if not template_path.exists():
            return None

        content = template_path.read_text()
        self._template_cache[language] = content
        return content

    def extract_required_sections(self, template: str) -> List[str]:
        """Extract required section names from template.

        Args:
            template: Template content

        Returns:
            List of required section names
        """
        # Find all ### SECTION: patterns
        sections = re.findall(r'###\s+([A-Z\s]+):', template)
        return [s.strip() for s in sections if s.strip()]

    def deduplicate_sections(self, markdown: str) -> tuple[str, List[str]]:
        """Remove duplicate sections from markdown, keeping first occurrence.

        Args:
            markdown: Markdown content with potential duplicate sections

        Returns:
            Tuple of (cleaned_markdown, list of removed duplicates)
        """
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

        seen_sections = set()
        removed_duplicates = []
        result_lines = []
        current_section = None
        section_content = []

        for line in markdown.split('\n'):
            # Check if this line starts a section
            is_section_header = False
            for header in section_headers:
                if line.strip().startswith(header):
                    # Found a section header
                    if current_section is not None:
                        # Save previous section if it wasn't a duplicate
                        if current_section not in seen_sections:
                            result_lines.extend(section_content)
                            seen_sections.add(current_section)
                        else:
                            removed_duplicates.append(current_section)

                    # Start new section
                    current_section = header
                    section_content = [line]
                    is_section_header = True
                    break

            if not is_section_header:
                # Add to current section content
                section_content.append(line)

        # Don't forget the last section
        if current_section is not None:
            if current_section not in seen_sections:
                result_lines.extend(section_content)
            else:
                removed_duplicates.append(current_section)

        return '\n'.join(result_lines), removed_duplicates

    def extract_section_order(self, template: str) -> List[str]:
        """Extract expected section order from template.

        Args:
            template: Template content

        Returns:
            List of section markers in expected order
        """
        markers = []

        # Find key markers in order they appear
        marker_patterns = [
            (r'Difficulty:', 'Difficulty:'),
            (r'\*\*Example:\*\*', '**Example:**'),
            (r'###\s+METADATA:', '### METADATA:'),
            (r'\*\*Techniques\*\*:', '**Techniques**:'),
            (r'\*\*Data Structures\*\*:', '**Data Structures**:'),
            (r'\*\*Patterns\*\*:', '**Patterns**:'),
            (r'\*\*Time Complexity\*\*:', '**Time Complexity**:'),
            (r'\*\*Space Complexity\*\*:', '**Space Complexity**:'),
            (r'###\s+INTUITION:', '### INTUITION:'),
            (r'###\s+APPROACH:', '### APPROACH:'),
            (r'###\s+WHY THIS WORKS:', '### WHY THIS WORKS:'),
            (r'###\s+EXAMPLE WALKTHROUGH:', '### EXAMPLE WALKTHROUGH:'),
            (r'###\s+TIME COMPLEXITY:', '### TIME COMPLEXITY:'),
            (r'###\s+SPACE COMPLEXITY:', '### SPACE COMPLEXITY:'),
            (r'###\s+EDGE CASES:', '### EDGE CASES:')
        ]

        for pattern, marker in marker_patterns:
            if re.search(pattern, template):
                markers.append(marker)

        return markers

    def extract_example_walkthrough_format(self, template: str, language: str) -> Dict[str, str]:
        """Extract expected EXAMPLE WALKTHROUGH format from template.

        Args:
            template: Template content
            language: Programming language

        Returns:
            Dict with 'input_pattern' and 'output_pattern' extracted from template
        """
        # Find EXAMPLE WALKTHROUGH section in template
        example_match = re.search(
            r'###\s+EXAMPLE WALKTHROUGH:.*?(?=###|\Z)',
            template,
            re.DOTALL
        )

        if not example_match:
            return {}

        example_section = example_match.group(0)

        # Extract Input format pattern
        # Python: "Input:\n```\n"
        # JS/TS: " * Input:\n * ```\n"
        if language == 'python':
            input_pattern = r'Input:\s*\n\s*```'
            output_pattern = r'Output:\s*\n\s*```'
        else:  # JS/TS and other comment-based languages
            input_pattern = r'\*\s+Input:\s*\n\s*\*\s+```'
            output_pattern = r'\*\s+Output:\s*\n\s*\*\s+```'

        return {
            'input_pattern': input_pattern,
            'output_pattern': output_pattern
        }

    def validate_example_walkthrough_format(self, content: str, language: str) -> List[str]:
        """Validate EXAMPLE WALKTHROUGH format against template.

        Args:
            content: File content
            language: Programming language

        Returns:
            List of validation issues
        """
        issues = []

        # Load template to get expected format
        template = self.load_template(language)
        if not template:
            return issues

        # Get expected patterns from template
        patterns = self.extract_example_walkthrough_format(template, language)
        if not patterns:
            return issues

        # Find EXAMPLE WALKTHROUGH section in content
        example_match = re.search(
            r'###\s+EXAMPLE WALKTHROUGH:.*?(?=###|\Z)',
            content,
            re.DOTALL
        )

        if not example_match:
            return issues  # Section doesn't exist, will be caught by required sections check

        example_content = example_match.group(0)

        # Check for Input section with proper format
        if not re.search(patterns['input_pattern'], example_content):
            issues.append(
                '[TEMPLATE] EXAMPLE WALKTHROUGH should have "Input:" followed by code block '
                f'matching template format for {language}'
            )

        # Check for Output/Result section with proper format
        if not re.search(patterns['output_pattern'], example_content):
            # Also check for "Result:" as alternative
            alt_pattern = patterns['output_pattern'].replace('Output', 'Result')
            if not re.search(alt_pattern, example_content):
                issues.append(
                    '[TEMPLATE] EXAMPLE WALKTHROUGH should end with "Output:" (or "Result:") '
                    f'followed by code block matching template format for {language}'
                )

        return issues

    def validate_problem_data(self, problem_data, language: str) -> List[str]:
        """Validate ProblemData object against template requirements.

        Args:
            problem_data: ProblemData object from src/leet_code/markdown_extraction
            language: Programming language

        Returns:
            List of validation issues
        """
        issues = []

        # Map template section names to ProblemData fields
        required_fields = {
            "METADATA": lambda pd: bool(pd.techniques or pd.data_structures or pd.patterns),
            "INTUITION": lambda pd: bool(pd.intuition),
            "APPROACH": lambda pd: bool(pd.approach),
            "WHY THIS WORKS": lambda pd: bool(pd.why_works),
            "EXAMPLE WALKTHROUGH": lambda pd: bool(pd.example_walkthrough),
            "TIME COMPLEXITY": lambda pd: bool(pd.time_complexity_explanation),
            "SPACE COMPLEXITY": lambda pd: bool(pd.space_complexity_explanation),
            "EDGE CASES": lambda pd: bool(pd.edge_cases),
        }

        # Check each required section
        for section_name, check_func in required_fields.items():
            if not check_func(problem_data):
                issues.append(f"[TEMPLATE] Missing required section: {section_name}")

        return issues

    def validate_against_template(self, content: str, language: str) -> List[str]:
        """Legacy method - redirects to validate_problem_data.

        Extracts ProblemData from content and validates it.
        """
        from leet_code.markdown_extraction import extract_markdown_from_code, parse_complete_problem_data

        # Determine file extension from language
        lang_to_ext = {
            'python': '.py',
            'javascript': '.js',
            'typescript': '.ts',
            'java': '.java',
            'cpp': '.cpp',
        }
        file_ext = lang_to_ext.get(language, '.py')

        # Extract and parse
        markdown = extract_markdown_from_code(content, file_ext)
        if not markdown:
            return ["[TEMPLATE] No documentation found"]

        problem_data = parse_complete_problem_data(markdown)
        return self.validate_problem_data(problem_data, language)

        # OLD CODE BELOW - keeping for reference during migration
        # Check section order
        found_positions = []
        for marker in expected_order:
            # Escape special regex characters
            escaped = re.escape(marker)
            match = re.search(escaped, content)
            if match:
                found_positions.append((match.start(), marker))

        # Verify found sections are in correct order
        if len(found_positions) > 1:
            for i in range(len(found_positions) - 1):
                current_pos, current_marker = found_positions[i]
                next_pos, next_marker = found_positions[i + 1]

                # Get expected indices
                try:
                    current_idx = expected_order.index(current_marker)
                    next_idx = expected_order.index(next_marker)

                    if current_idx > next_idx:
                        issues.append(
                            f"[TEMPLATE] Section order violation: '{next_marker}' "
                            f"should come before '{current_marker}'"
                        )
                except ValueError:
                    pass  # Marker not in expected order, skip

        # Validate EXAMPLE WALKTHROUGH format against template
        issues.extend(self.validate_example_walkthrough_format(content, language))

        # Check language-specific comment formatting
        if language in ['javascript', 'typescript', 'java', 'cpp', 'c', 'go', 'rust']:
            # Check METADATA section has proper comment prefixes
            metadata_match = re.search(r'###\s+METADATA:.*?###', content, re.DOTALL)
            if metadata_match:
                metadata_block = metadata_match.group(0)
                lines = metadata_block.split('\n')[1:-1]  # Skip first and last line

                for i, line in enumerate(lines, 1):
                    if line.strip() and not line.strip().startswith('*'):
                        if any(field in line for field in ['**Techniques**', '**Data Structures**', '**Patterns**', '**Time', '**Space']):
                            if not line.lstrip().startswith('* '):
                                issues.append(
                                    f"[TEMPLATE] METADATA line {i} missing ' * ' comment prefix "
                                    f"(required for {language})"
                                )
                                break  # Report once to avoid spam

        return issues


def validate_with_template(content: str, language: str, repo_root: Path) -> List[str]:
    """Convenience function to validate content against template.

    Args:
        content: File content to validate
        language: Programming language
        repo_root: Repository root directory

    Returns:
        List of validation issues
    """
    validator = TemplateValidator(repo_root)
    return validator.validate_against_template(content, language)
