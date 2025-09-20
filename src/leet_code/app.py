#!/usr/bin/env python3
"""LeetCode Solutions Web Interface"""

import argparse
from pathlib import Path
from typing import Any, cast

import markdown
from flask import Flask, Response, abort, flash, jsonify, redirect, render_template, request, url_for
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import (
    CLexer,
    CppLexer,
    CSharpLexer,
    GoLexer,
    JavaLexer,
    JavascriptLexer,
    PythonLexer,
    RustLexer,
    SwiftLexer,
    TypeScriptLexer,
    get_lexer_by_name,
)

from .category_data import category_manager
from .leetcode_converter import convert_to_leetcode_format, extract_solution_class
import re
import ast

app = Flask(__name__, template_folder="../../templates", static_folder="../../static")
app.config["SECRET_KEY"] = "dev-key-change-in-production"


def parse_docstring_explanation(code: str) -> tuple[str, str | None]:
    """Parse Python code to extract explanation and clean code.

    Returns:
        Tuple of (clean_code_without_explanation, explanation_html)
    """
    try:
        # Look for <details> sections anywhere in the code
        details_pattern = r'<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>(.*?)</details>'
        match = re.search(details_pattern, code, re.DOTALL)

        if match:
            explanation_content = match.group(1).strip()

            # Convert markdown-style content to HTML
            explanation_html = markdown.markdown(
                explanation_content,
                extensions=["fenced_code", "tables"]
            )

            # Remove the entire <details> section from the code
            clean_code = re.sub(
                r'<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>.*?</details>\s*',
                '',
                code,
                flags=re.DOTALL
            )

            return clean_code, explanation_html

        return code, None

    except Exception:
        # If parsing fails, return original code
        return code, None


def get_syntax_highlighting_style() -> str:
    """Get the appropriate syntax highlighting style based on theme preference."""
    # Check for theme preference from cookies or headers
    theme = request.cookies.get('theme', 'light')

    # You can also check from localStorage via a query parameter if needed
    theme_param = request.args.get('theme')
    if theme_param in ['light', 'dark']:
        theme = theme_param

    # Return appropriate Pygments style
    if theme == 'dark':
        return "monokai"  # Dark theme
    else:
        return "default"  # Light theme


def create_code_formatter() -> HtmlFormatter:
    """Create a code formatter with appropriate theme."""
    style = get_syntax_highlighting_style()
    return HtmlFormatter(style=style, linenos=True)


@app.route("/")
def index() -> str:
    """Home page showing all categories."""
    categories = category_manager.get_categories()
    stats = category_manager.get_statistics()

    return render_template(
        "index.html",
        categories=categories,
        total_solutions=stats["total_solutions"],
        total_categories=stats["total_categories"],
    )


@app.route("/category/<category>")
def category_view(category: str) -> str:
    """View all solutions in a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)

    # Read category documentation
    doc_content = category_manager.read_documentation(category)
    doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables"]) if doc_content else None

    return render_template(
        "category.html",
        category=category,
        category_name=cat_data.name,
        solutions=cat_data.solutions,
        documentation=doc_html,
    )


@app.route("/solution/<category>/<filename>")
def solution_view(category: str, filename: str) -> str:
    """View a specific solution."""
    # Add .py extension if not present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution_code = category_manager.read_solution_content(category, filename)
    if not solution_code:
        abort(404)

    # Get solution metadata
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Parse docstring to extract explanation
    clean_code, explanation_html = parse_docstring_explanation(solution_code)

    # Syntax highlighting for Python code
    formatter = create_code_formatter()
    highlighted_code = highlight(clean_code, PythonLexer(), formatter)

    # Try to find corresponding documentation
    doc_name = filename.replace(".py", "")
    doc_content = category_manager.read_documentation(category, doc_name)
    doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables"]) if doc_content else None

    # Get category name
    cat_data = category_manager.get_category(category)

    # Get all available languages for this problem
    available_languages = get_available_languages(category, filename)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=solution.name,
        code=highlighted_code,
        documentation=doc_html,
        explanation=explanation_html,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=False,
        available_languages=available_languages,
    )


@app.route("/solution/<category>/<filename>/leetcode")
def solution_leetcode_view(category: str, filename: str) -> str:
    """View solution in LeetCode format (camelCase)."""
    # Add .py extension if not present
    if not filename.endswith(".py"):
        filename = filename + ".py"
    solution_code = category_manager.read_solution_content(category, filename)
    if not solution_code:
        abort(404)

    # Convert to LeetCode format
    leetcode_code = convert_to_leetcode_format(solution_code)
    solution_class = extract_solution_class(leetcode_code)

    # Get solution metadata
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Syntax highlighting
    formatter = create_code_formatter()
    highlighted_code = highlight(solution_class, PythonLexer(), formatter)

    cat_data = category_manager.get_category(category)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=solution.name + " (LeetCode Format)",
        code=highlighted_code,
        documentation=None,
        explanation=None,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=True,
        available_languages=[],
    )


@app.route("/solution/<category>/<filename>/download/<format>")
@app.route("/solution/<category>/<filename>/download/<format>/<language>")
def download_solution(category: str, filename: str, format: str, language: str = "Python") -> Response:
    """Download solution in specified format and language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    # Get the appropriate solution code based on language
    if language == "Python":
        solution_code = category_manager.read_solution_content(category, filename)
    else:
        # Get alternative language solution
        base_name = filename.replace(".py", "")
        lang_extension = get_file_extension(language)
        alt_filename = f"{base_name}.{language.lower()}{lang_extension}"
        alt_path = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives" / alt_filename

        if alt_path.exists():
            with open(alt_path) as f:
                solution_code = f.read()
        else:
            abort(404)

    if not solution_code:
        abort(404)

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    base_name = f"{solution.number}_{solution.name.lower().replace(' ', '_')}_{language.lower()}"

    # Handle 'both' format - return a zip file with skeleton and solution for the specific language
    if format == "both":
        import io
        import zipfile

        # Create in-memory zip file
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            # Get the appropriate file extension
            file_ext = get_file_extension(language) if language != "Python" else ".py"

            # Add skeleton
            skeleton_content = generate_skeleton(solution_code, solution)
            zip_file.writestr(f"{base_name}_skeleton{file_ext}", skeleton_content)

            # Add full solution
            zip_file.writestr(f"{base_name}_solution{file_ext}", solution_code)

            # Only add LeetCode format for Python
            if language == "Python":
                # Add LeetCode format solution (camelCase)
                leetcode_code = convert_to_leetcode_format(solution_code)
                leetcode_content = extract_solution_class(leetcode_code)
                zip_file.writestr(f"{base_name}_leetcode.py", leetcode_content)

                # Add LeetCode skeleton (camelCase, hidden from UI)
                leetcode_skeleton = generate_skeleton(leetcode_code, solution, is_leetcode=True)
                zip_file.writestr(f"{base_name}_leetcode_skeleton.py", leetcode_skeleton)

        zip_buffer.seek(0)
        return Response(
            zip_buffer.getvalue(),
            mimetype="application/zip",
            headers={"Content-Disposition": f"attachment; filename={base_name}.zip"},
        )

    # Generate appropriate content based on format
    elif format == "skeleton":
        # Extract just the method signatures without implementation
        content = generate_skeleton(solution_code, solution)
        file_ext = get_file_extension(language) if language != "Python" else ".py"
        download_name = f"{base_name}_skeleton{file_ext}"
    elif format == "solution":
        # Full solution in original format
        content = solution_code
        file_ext = get_file_extension(language) if language != "Python" else ".py"
        download_name = f"{base_name}_solution{file_ext}"
    elif format == "leetcode":
        # Solution in LeetCode camelCase format (only for Python)
        if language != "Python":
            # For non-Python languages, just return the solution
            content = solution_code
            file_ext = get_file_extension(language)
            download_name = f"{base_name}_solution{file_ext}"
        else:
            leetcode_code = convert_to_leetcode_format(solution_code)
            content = extract_solution_class(leetcode_code)
            download_name = f"{base_name}_leetcode.py"
    else:
        abort(400)  # Bad request for invalid format

    # Return as downloadable file
    return Response(
        content, mimetype="text/x-python", headers={"Content-Disposition": f"attachment; filename={download_name}"}
    )


def generate_skeleton(code: str, solution: Any, is_leetcode: bool = False) -> str:
    """Generate a skeleton template from solution code.

    Args:
        code: The source code to extract skeleton from
        solution: Solution metadata object
        is_leetcode: If True, generates LeetCode-ready skeleton (for hidden file)
    """
    import ast
    import re

    header_text = "LeetCode Submission Skeleton" if is_leetcode else "Problem Skeleton"

    skeleton_lines = [
        '"""',
        f"{solution.number}. {solution.name}",
        "",
        f"{header_text}",
        "TODO: Add problem description here",
        '"""',
        "",
        "",
    ]

    try:
        tree = ast.parse(code)
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef) and node.name == "Solution":
                skeleton_lines.append("class Solution:")
                for method in node.body:
                    if isinstance(method, ast.FunctionDef):
                        # Get method signature
                        args = []
                        for arg in method.args.args:
                            arg_str = arg.arg
                            if arg.annotation:
                                # Get annotation as string
                                ann_str = (
                                    ast.unparse(arg.annotation) if hasattr(ast, "unparse") else str(arg.annotation)
                                )
                                arg_str += f": {ann_str}"
                            args.append(arg_str)

                        args_str = ", ".join(args)
                        returns = ""
                        if method.returns:
                            returns = (
                                f' -> {ast.unparse(method.returns) if hasattr(ast, "unparse") else str(method.returns)}'
                            )

                        skeleton_lines.append(f"    def {method.name}({args_str}){returns}:")

                        # Add docstring if present
                        if (
                            method.body
                            and isinstance(method.body[0], ast.Expr)
                            and isinstance(method.body[0].value, ast.Constant)
                        ):
                            docstring = method.body[0].value.value
                            skeleton_lines.append(f'        """{docstring}"""')  # type: ignore[str-bytes-safe]

                        skeleton_lines.append("        # TODO: Implement solution")
                        skeleton_lines.append("        pass")
                        skeleton_lines.append("")
    except Exception:
        # Fallback to regex-based extraction
        pattern = r"def\s+(\w+)\s*\([^)]*\)[^:]*:"
        matches = re.findall(pattern, code)
        if matches:
            skeleton_lines.append("class Solution:")
            for method_name in matches:
                skeleton_lines.append(f"    def {method_name}(self, *args, **kwargs):")
                skeleton_lines.append("        # TODO: Implement solution")
                skeleton_lines.append("        pass")
                skeleton_lines.append("")

    return "\n".join(skeleton_lines)


@app.route("/solution/<category>/<filename>/upload", methods=["GET", "POST"])
def upload_alternative_solution(category: str, filename: str) -> str | Response:
    """Upload solution in a different programming language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    if request.method == "POST":
        # Check if file was uploaded (support both 'file' and 'solution_file')
        file_field = "file" if "file" in request.files else "solution_file"
        if file_field not in request.files:
            flash("No file selected", "error")
            # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

        file = request.files[file_field]
        language = request.form.get("language")

        if file.filename == "":
            flash("No file selected", "error")
            # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

        if file and language:
            # Validate file extension matches language
            expected_ext = get_file_extension(language)
            if file.filename and not file.filename.endswith(expected_ext):
                flash("Invalid file extension for selected language", "error")
                # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))
            # Create language-specific filename
            base_name = filename.replace(".py", "")
            lang_extension = get_file_extension(language)
            new_filename = f"{base_name}.{language.lower()}{lang_extension}"

            # Create alternative solutions directory if it doesn't exist
            alt_dir = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives"
            alt_dir.mkdir(parents=True, exist_ok=True)

            # Save the file
            file_path = alt_dir / new_filename
            file.save(str(file_path))

            flash(f"Successfully uploaded {language} solution", "success")
            # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

    # GET request - show upload form
    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")
    return render_template("upload_solution.html", category=category, filename=display_filename, solution=solution)


@app.route("/solution/<category>/<filename>/view/<language>")
def view_alternative_solution(category: str, filename: str, language: str) -> str:
    """View solution in a specific programming language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Get the alternative solution file
    base_name = filename.replace(".py", "")
    lang_extension = get_file_extension(language)
    alt_filename = f"{base_name}.{language.lower()}{lang_extension}"
    alt_path = Path(__file__).parent / "solutions" / category / "alternatives" / alt_filename

    if not alt_path.exists():
        abort(404)

    # Read the alternative solution
    with open(alt_path) as f:
        code_content = f.read()

    # Get appropriate lexer for syntax highlighting
    lexer = get_lexer_for_language(language)
    formatter = create_code_formatter()
    highlighted_code = highlight(code_content, lexer, formatter)

    # Get all available languages for this problem
    available_languages = get_available_languages(category, filename)

    cat_data = category_manager.get_category(category)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=f"{solution.name} ({language})",
        code=highlighted_code,
        documentation=None,
        explanation=None,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=False,
        current_language=language,
        available_languages=available_languages,
    )


def get_file_extension(language: str) -> str:
    """Get file extension for a programming language."""
    extensions = {
        "Python": ".py",
        "Java": ".java",
        "C++": ".cpp",
        "C": ".c",
        "JavaScript": ".js",
        "TypeScript": ".ts",
        "Go": ".go",
        "Rust": ".rs",
        "C#": ".cs",
        "Swift": ".swift",
        "Kotlin": ".kt",
        "Ruby": ".rb",
        "PHP": ".php",
        "Scala": ".scala",
    }
    return extensions.get(language, ".txt")


def get_lexer_for_language(language: str) -> Any:
    """Get Pygments lexer for a programming language."""
    lexers = {
        "Python": PythonLexer(),
        "Java": JavaLexer(),
        "C++": CppLexer(),
        "C": CLexer(),
        "JavaScript": JavascriptLexer(),
        "TypeScript": TypeScriptLexer(),
        "Go": GoLexer(),
        "Rust": RustLexer(),
        "C#": CSharpLexer(),
        "Swift": SwiftLexer(),
    }
    return lexers.get(language, get_lexer_by_name(language.lower()))


def get_available_languages(category: str, filename: str) -> list[str]:
    """Get list of available programming languages for a solution."""
    languages = ["Python"]  # Always have Python

    # Check alternatives directory
    alt_dir = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives"
    if alt_dir.exists():
        base_name = filename.replace(".py", "")
        for file_path in alt_dir.iterdir():
            if file_path.name.startswith(base_name):
                # Extract language from filename
                for lang in [
                    "java",
                    "cpp",
                    "c",
                    "javascript",
                    "typescript",
                    "go",
                    "rust",
                    "cs",
                    "swift",
                    "kotlin",
                    "ruby",
                    "php",
                    "scala",
                ]:
                    if f".{lang}." in file_path.name.lower():
                        language_map = {
                            "cpp": "C++",
                            "c": "C",
                            "javascript": "JavaScript",
                            "typescript": "TypeScript",
                            "go": "Go",
                            "rust": "Rust",
                            "cs": "C#",
                            "swift": "Swift",
                            "java": "Java",
                            "kotlin": "Kotlin",
                            "ruby": "Ruby",
                            "php": "PHP",
                            "scala": "Scala",
                        }
                        languages.append(language_map.get(lang, lang.title()))
                        break

    return sorted(set(languages))


@app.route("/docs")
def docs_index() -> Response:
    """Documentation index - redirect to README."""
    return cast(Response, redirect(url_for("docs_readme")))


@app.route("/docs/README")
def docs_readme() -> str:
    """View main documentation README."""
    docs_path = Path(__file__).parent.parent.parent / "docs" / "README.md"
    if docs_path.exists():
        doc_content = docs_path.read_text()
        doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])
        return render_template("doc_view.html", category="README", category_name="README", content=doc_html)
    abort(404)


@app.route("/docs/<category>")
def docs_view(category: str) -> str:
    """View category documentation."""
    doc_content = category_manager.read_documentation(category)
    if not doc_content:
        abort(404)

    doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])

    return render_template(
        "doc_view.html", category=category, category_name=category.replace("-", " ").title(), content=doc_html
    )


@app.errorhandler(404)
def not_found(error: Any) -> tuple[str, int]:
    """404 error handler."""
    return render_template("404.html"), 404


# API endpoints for sidebar navigation
@app.route("/api/categories")
def api_categories() -> Response:
    """API endpoint to get all categories."""
    categories = category_manager.get_categories()
    return jsonify([{"name": cat.name, "slug": cat.slug, "count": cat.count} for cat in categories])


@app.route("/api/category/<category>/solutions")
def api_category_solutions(category: str) -> Response:
    """API endpoint to get solutions for a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)
    return jsonify([{"filename": sol.filename, "name": sol.name, "number": sol.number} for sol in cat_data.solutions])


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="LeetCode Solutions Web Interface")
    parser.add_argument("--host", default="127.0.0.1", help="Hostname to bind to (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=9501, help="Port to bind to (default: 9501)")
    parser.add_argument("--debug", action="store_true", default=True, help="Enable debug mode (default: True)")

    args = parser.parse_args()

    app.run(debug=args.debug, host=args.host, port=args.port)
