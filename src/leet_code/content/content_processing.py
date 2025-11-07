"""Content extraction and processing for problem data.

This module handles extracting and processing problem descriptions, explanations,
and documentation from code files in various languages (Python, JavaScript, etc.).
"""

import re

import markdown

from ..data.language_constants import get_file_extension, get_lexer_for_language
from ..data.markdown_extraction import (
    ProblemData,
    extract_markdown_from_code,
    extract_markdown_from_python_docstring,
    parse_complete_problem_data,
)

__all__ = [
    "extract_all_problem_data",
    "parse_docstring_explanation",
    "parse_explanation_into_sections",
    "parse_explanation_sections",
    "parse_problem_markdown",
    "extract_problem_description",
    "merge_and_reorganize_content",
    "extract_documentation_sections",
    "extract_explanation_sections",
    "clean_approach_content",
    "content_too_similar",
    "parse_jsdoc_explanation",
    "extract_js_problem_description",
    "get_file_extension",
    "get_lexer_for_language",
]


def extract_all_problem_data(code: str, file_extension: str) -> tuple[str, ProblemData]:
    """Extract all problem data from code using unified language-agnostic extraction.

    Args:
        code: Source code content
        file_extension: File extension (e.g., '.py', '.js')

    Returns:
        Tuple of (clean_code_without_docstring, problem_data)
    """
    try:
        # Extract markdown from language-specific comment
        markdown_content = extract_markdown_from_code(code, file_extension)

        if not markdown_content:
            # No markdown found, return original code with empty data
            return code, ProblemData()

        # Parse all sections from markdown
        problem_data = parse_complete_problem_data(markdown_content)

        # Remove the comment block from code to get clean code
        if file_extension == ".py":
            clean_code = re.sub(r'""".*?"""', "", code, count=1, flags=re.DOTALL).strip()
        elif file_extension in [".js", ".ts"]:
            clean_code = re.sub(r"/\*\*.*?\*/", "", code, count=1, flags=re.DOTALL).strip()
        else:
            clean_code = code

        return clean_code, problem_data

    except Exception:
        return code, ProblemData()


def parse_docstring_explanation(code: str) -> tuple[str, dict[str, str] | None]:
    """Parse Python code to extract explanation sections and clean code.

    Returns:
        Tuple of (clean_code_without_explanation, explanation_sections_dict)
    """
    try:
        # Look for <details> sections anywhere in the code
        details_pattern = r"<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>(.*?)</details>"
        match = re.search(details_pattern, code, re.DOTALL)

        if match:
            explanation_content = match.group(1).strip()

            # Parse into logical sections
            sections = parse_explanation_into_sections(explanation_content)

            # Remove the entire <details> section from the code
            clean_code = re.sub(
                r"<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>.*?</details>\s*",
                "",
                code,
                flags=re.DOTALL,
            )

            return clean_code, sections

        return code, None

    except Exception:
        # If parsing fails, return original code
        return code, None


def parse_explanation_into_sections(content: str) -> dict[str, str]:
    """Parse explanation content into logical sections."""
    sections = {}

    # Define section patterns with their display names
    section_patterns = [
        (r"### METADATA:(.*?)(?=###|$)", "metadata"),
        (r"### INTUITION:(.*?)(?=###|$)", "intuition"),
        (r"### APPROACH:(.*?)(?=###|$)", "approach"),
        (r"### WHY THIS WORKS:(.*?)(?=###|$)", "why_this_works"),
        (r"### EXAMPLE WALKTHROUGH:(.*?)(?=###|$)", "example"),
        (r"### EXAMPLES?:(.*?)(?=###|$)", "example"),
        (r"### WALKTHROUGH:(.*?)(?=###|$)", "example"),
        (r"### EDGE CASES:(.*?)(?=###|$)", "edge_cases"),
        (r"### COMPLEXITY:(.*?)(?=###|$)", "complexity"),
        (r"### TIME & SPACE COMPLEXITY:(.*?)(?=###|$)", "complexity"),
        (r"### ANALYSIS:(.*?)(?=###|$)", "complexity"),
        (r"### WHY LINKED LIST\?:(.*?)(?=###|$)", "additional_notes"),
        (r"### WHY.*\?:(.*?)(?=###|$)", "additional_notes"),
        (r"### NOTES?:(.*?)(?=###|$)", "additional_notes"),
        (r"### INSIGHTS?:(.*?)(?=###|$)", "additional_notes"),
        (r"### OPTIMIZATIONS?:(.*?)(?=###|$)", "optimizations"),
        (r"### ALTERNATIVES?:(.*?)(?=###|$)", "alternatives"),
    ]

    # Extract each section
    for pattern, section_key in section_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            section_content = match.group(1).strip()
            # Convert to HTML
            sections[section_key] = markdown.markdown(section_content, extensions=["fenced_code", "tables"])

    return sections


def parse_explanation_sections(content: str) -> dict[str, str]:
    """Parse explanation content into structured sections."""
    sections = {"strategy": "", "steps": "", "analysis": "", "insights": ""}

    # Convert to markdown first
    content_html = markdown.markdown(content, extensions=["fenced_code", "tables"])

    # Look for common section patterns
    strategy_patterns = [
        r"### INTUITION:(.*?)(?=###|$)",
        r"### APPROACH:(.*?)(?=###|$)",
        r"### STRATEGY:(.*?)(?=###|$)",
    ]

    steps_patterns = [
        r"### STEPS:(.*?)(?=###|$)",
        r"### IMPLEMENTATION:(.*?)(?=###|$)",
    ]

    analysis_patterns = [
        r"### COMPLEXITY:(.*?)(?=###|$)",
        r"### ANALYSIS:(.*?)(?=###|$)",
        r"### TIME & SPACE:(.*?)(?=###|$)",
    ]

    insights_patterns = [r"### INSIGHTS:(.*?)(?=###|$)", r"### NOTES:(.*?)(?=###|$)", r"### ADDITIONAL:(.*?)(?=###|$)"]

    # Extract strategy/intuition
    for pattern in strategy_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["strategy"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract steps/algorithm
    for pattern in steps_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["steps"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract complexity analysis
    for pattern in analysis_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["analysis"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract additional insights
    for pattern in insights_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["insights"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # If no specific sections found, put everything in strategy
    if not any(sections.values()):
        sections["strategy"] = content_html

    return sections


def parse_problem_markdown(markdown_content: str) -> str | None:
    """Parse problem description from markdown content (language-agnostic).

    Args:
        markdown_content: Raw markdown extracted from language-specific comments

    Returns:
        HTML-formatted problem description
    """
    try:
        # Remove the solution explanation section if present
        if "<details>" in markdown_content:
            markdown_content = markdown_content.split("<details>")[0].strip()

        # Remove "# Difficulty:" line from problem description
        markdown_content = re.sub(r"^#?\s*Difficulty:\s*\w+\s*\n?", "", markdown_content, flags=re.MULTILINE)

        # Remove problem number from title (e.g., "# 169. Majority Element" -> "# Majority Element")
        markdown_content = re.sub(r"^#\s+\d+\.\s+", "# ", markdown_content, flags=re.MULTILINE)

        # Convert to HTML
        html: str = markdown.markdown(markdown_content, extensions=["fenced_code", "tables"])
        return html
    except Exception:
        return None


def extract_problem_description(code: str) -> str | None:
    """Extract problem description from Python docstring."""
    markdown_content = extract_markdown_from_python_docstring(code)
    if markdown_content:
        return parse_problem_markdown(markdown_content)
    return None


def merge_and_reorganize_content(documentation: str | None, explanation: str | None) -> str | None:
    """Merge documentation and explanation content, removing redundancy and creating logical flow.

    Returns:
        Reorganized HTML content with logical structure
    """
    if not documentation and not explanation:
        return None

    # Parse documentation content if available
    doc_sections = {}
    if documentation:
        # Extract sections from documentation
        doc_sections = extract_documentation_sections(documentation)

    # Parse explanation content if available
    exp_sections = {}
    if explanation:
        exp_sections = extract_explanation_sections(explanation)

    # Build reorganized content
    reorganized_parts = []

    # 1. Problem Description (prefer doc version, fallback to explanation)
    problem_desc = doc_sections.get("problem_description") or exp_sections.get("problem_description")
    if problem_desc:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📋 Problem</h3>")
        reorganized_parts.append(problem_desc)
        reorganized_parts.append("</div>")

    # 2. Solution Strategy (merge intuition and approach, include algorithm if brief)
    strategy_content = []
    if exp_sections.get("intuition"):
        strategy_content.append("<h4>Key Insight</h4>")
        strategy_content.append(exp_sections["intuition"])

    # Choose the best approach content (prefer concise explanation over detailed docs when both exist)
    approach_content = None
    if exp_sections.get("approach") and doc_sections.get("approach"):
        # If explanation approach is brief (< 500 chars) and doc approach is long, use explanation
        exp_approach_length = len(exp_sections["approach"])
        doc_approach_length = len(doc_sections["approach"])
        if exp_approach_length < 500 and doc_approach_length > 1000:
            approach_content = exp_sections["approach"]
        else:
            approach_content = doc_sections["approach"]
    else:
        approach_content = doc_sections.get("approach") or exp_sections.get("approach")

    if approach_content:
        # Clean up the approach content to remove redundant headings
        cleaned_approach = clean_approach_content(approach_content)
        strategy_content.append("<h4>Approach</h4>")
        strategy_content.append(cleaned_approach)

    if strategy_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>🔍 Solution Strategy</h3>")
        reorganized_parts.extend(strategy_content)
        reorganized_parts.append("</div>")

    # 3. Algorithm Steps (only if significantly different from approach)
    algorithm = doc_sections.get("algorithm")
    if algorithm and not content_too_similar(approach_content or "", algorithm):
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>⚙️ Algorithm Steps</h3>")
        reorganized_parts.append(algorithm)
        reorganized_parts.append("</div>")

    # 4. Example Walkthrough (merge examples, prefer more detailed)
    example = doc_sections.get("example") or exp_sections.get("example")
    if example:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📝 Example</h3>")
        reorganized_parts.append(example)
        reorganized_parts.append("</div>")

    # 5. Analysis (complexity, why it works)
    analysis_content = []
    if exp_sections.get("why_works"):
        analysis_content.append("<h4>Why This Works</h4>")
        analysis_content.append(exp_sections["why_works"])

    complexity = doc_sections.get("complexity")
    if complexity:
        analysis_content.append("<h4>Complexity Analysis</h4>")
        analysis_content.append(complexity)

    if analysis_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📈 Analysis</h3>")
        reorganized_parts.extend(analysis_content)
        reorganized_parts.append("</div>")

    # 6. Additional Information (alternatives, tips, variations)
    additional_content = []
    if doc_sections.get("alternatives"):
        additional_content.append("<h4>Alternative Approaches</h4>")
        additional_content.append(doc_sections["alternatives"])

    if doc_sections.get("tips"):
        additional_content.append("<h4>Key Takeaways</h4>")
        additional_content.append(doc_sections["tips"])

    if doc_sections.get("variations"):
        additional_content.append("<h4>Common Variations</h4>")
        additional_content.append(doc_sections["variations"])

    if additional_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>💡 Additional Insights</h3>")
        reorganized_parts.extend(additional_content)
        reorganized_parts.append("</div>")

    return "\n".join(reorganized_parts) if reorganized_parts else None


def extract_documentation_sections(html_content: str) -> dict[str, str]:
    """Extract sections from documentation HTML content."""
    sections = {}

    # Remove the title (h1) as it's redundant with page title
    content = re.sub(r"<h1>.*?</h1>", "", html_content, flags=re.DOTALL)

    # Extract problem description (everything before "Solution Explanation" or "Approach")
    prob_match = re.search(r"<h2>Problem Description</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if prob_match:
        sections["problem_description"] = prob_match.group(1).strip()

    # Extract approach/solution explanation
    approach_match = re.search(r"<h2>Solution Explanation</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if approach_match:
        sections["approach"] = approach_match.group(1).strip()

    # Extract algorithm steps
    algo_match = re.search(r"<h3>Algorithm Steps</h3>(.*?)(?=<h[1-6]>|$)", content, re.DOTALL)
    if algo_match:
        sections["algorithm"] = algo_match.group(1).strip()

    # Extract visual example
    example_match = re.search(r"<h3>Visual Example</h3>(.*?)(?=<h[1-6]>|$)", content, re.DOTALL)
    if example_match:
        sections["example"] = example_match.group(1).strip()

    # Extract complexity analysis
    complexity_match = re.search(r"<h2>Complexity Analysis</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if complexity_match:
        sections["complexity"] = complexity_match.group(1).strip()

    # Extract alternative approaches
    alt_match = re.search(r"<h2>Alternative Approaches</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if alt_match:
        sections["alternatives"] = alt_match.group(1).strip()

    # Extract key takeaways
    tips_match = re.search(r"<h2>Key Takeaways</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if tips_match:
        sections["tips"] = tips_match.group(1).strip()

    # Extract variations
    var_match = re.search(r"<h2>Common Variations</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if var_match:
        sections["variations"] = var_match.group(1).strip()

    return sections


def extract_explanation_sections(html_content: str) -> dict[str, str]:
    """Extract sections from explanation HTML content."""
    sections = {}

    # Extract intuition
    intuition_match = re.search(r"<h3>INTUITION:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if intuition_match:
        sections["intuition"] = intuition_match.group(1).strip()

    # Extract approach
    approach_match = re.search(r"<h3>APPROACH:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if approach_match:
        sections["approach"] = approach_match.group(1).strip()

    # Extract why this works
    why_match = re.search(r"<h3>WHY THIS WORKS:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if why_match:
        sections["why_works"] = why_match.group(1).strip()

    # Extract example walkthrough
    example_match = re.search(r"<h3>EXAMPLE WALKTHROUGH:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if example_match:
        sections["example"] = example_match.group(1).strip()

    return sections


def clean_approach_content(content: str) -> str:
    """Clean approach content by removing redundant headings and formatting."""
    # Remove redundant h3 headings like "Approach:" or "Algorithm Steps"
    content = re.sub(r"<h3>\s*(?:Approach[:\s]*|Algorithm Steps?[:\s]*).*?</h3>", "", content, flags=re.IGNORECASE)

    # Remove redundant h4 headings that repeat the same information
    content = re.sub(r"<h4>\s*(?:Approach[:\s]*|Algorithm[:\s]*).*?</h4>", "", content, flags=re.IGNORECASE)

    # Clean up excessive whitespace
    content = re.sub(r"\n\s*\n\s*\n", "\n\n", content)

    return content.strip()


def content_too_similar(content1: str, content2: str) -> bool:
    """Check if two content sections are too similar to warrant separate sections."""
    if not content1 or not content2:
        return False

    # Remove HTML tags and normalize whitespace for comparison
    text1 = re.sub(r"<[^>]+>", " ", content1).lower()
    text1 = re.sub(r"\s+", " ", text1).strip()

    text2 = re.sub(r"<[^>]+>", " ", content2).lower()
    text2 = re.sub(r"\s+", " ", text2).strip()

    # If one is much shorter, they're probably different
    if len(text1) < 100 or len(text2) < 100:
        return False

    # Simple similarity check - if 70% of words overlap, consider too similar
    words1 = set(text1.split())
    words2 = set(text2.split())

    if not words1 or not words2:
        return False

    overlap = len(words1.intersection(words2))
    similarity = overlap / max(len(words1), len(words2))

    return similarity > 0.7


def parse_jsdoc_explanation(code: str) -> tuple[str, dict[str, str] | None]:
    """Parse JavaScript code to extract clean code and explanation sections from JSDoc comments."""
    try:
        # Look for the first JSDoc comment block
        jsdoc_pattern = r"/\*\*(.*?)\*/"
        match = re.search(jsdoc_pattern, code, re.DOTALL)

        if not match:
            # No JSDoc found, return code as-is
            return code, None

        jsdoc_content = match.group(1)

        # Clean up JSDoc formatting - preserve blank lines for markdown paragraph breaks
        lines = []
        for line in jsdoc_content.split("\n"):
            # Remove leading whitespace and asterisk
            cleaned = re.sub(r"^\s*\*\s?", "", line)
            lines.append(cleaned)
        jsdoc_content = "\n".join(lines)

        # Extract explanation content (content between <details> tags, like Python does)
        details_pattern = r"<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>(.*?)</details>"
        details_match = re.search(details_pattern, jsdoc_content, re.DOTALL | re.IGNORECASE)
        explanation_content = details_match.group(1).strip() if details_match else ""

        # Remove the JSDoc comment from code
        clean_code = re.sub(jsdoc_pattern, "", code, flags=re.DOTALL).strip()

        # Parse explanation sections if present
        explanation_sections = None
        if explanation_content:
            explanation_sections = parse_explanation_into_sections(explanation_content)

        return clean_code, explanation_sections

    except Exception:
        # If parsing fails, return original code
        return code, None


def extract_js_problem_description(code: str) -> str | None:
    """Extract problem description from JSDoc comment."""
    try:
        # Look for the first JSDoc comment
        jsdoc_pattern = r"/\*\*(.*?)\*/"
        match = re.search(jsdoc_pattern, code, re.DOTALL)

        if match:
            jsdoc_content = match.group(1)

            # Clean up JSDoc formatting - preserve blank lines for markdown paragraph breaks
            lines = []
            for line in jsdoc_content.split("\n"):
                # Remove leading whitespace and asterisk
                cleaned = re.sub(r"^\s*\*\s?", "", line)
                lines.append(cleaned)
            jsdoc_content = "\n".join(lines)

            # Extract everything before <details> or the whole thing if no details
            details_match = re.search(r"<details>", jsdoc_content, re.IGNORECASE)
            if details_match:
                problem_description = jsdoc_content[: details_match.start()].strip()
            else:
                problem_description = jsdoc_content.strip()

            # Remove "Difficulty:" line from problem description
            # This metadata is shown as a badge, not in the problem text
            problem_description = re.sub(r"^Difficulty:\s*\w+\s*\n?", "", problem_description, flags=re.MULTILINE)

            # Remove problem number from title (e.g., "# 169. Majority Element" -> "# Majority Element")
            problem_description = re.sub(r"^#\s+\d+\.\s+", "# ", problem_description, flags=re.MULTILINE)

            # Convert to HTML
            problem_html: str = markdown.markdown(problem_description, extensions=["fenced_code", "tables"])
            return problem_html

    except Exception:  # nosec B110 - Intentional: return None on parsing failure
        pass

    return None
