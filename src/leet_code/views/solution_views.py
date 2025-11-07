"""Solution-related views (solution, leetcode, download, upload)."""

import io
import zipfile
from typing import cast

import markdown
from flask import Response, abort, flash, redirect, render_template, request, url_for
from pygments import highlight
from pygments.lexers import PythonLexer

from ..category_data import category_manager
from ..language_constants import get_file_extension, get_lexer_for_language
from ..leetcode_converter import convert_to_leetcode_format, extract_solution_class
from .base import BaseView


class SolutionView(BaseView):
    """View a specific solution."""

    def get(self, category: str, filename: str) -> str:
        """Handle GET request for solution view.

        Args:
            category: Category slug
            filename: Solution filename (without .py extension in URL)

        Returns:
            Rendered template for solution page
        """
        from ..app import extract_all_problem_data, parse_problem_markdown
        from ..skeleton_generator import generate_js_skeleton, generate_skeleton
        from ..solution_utils import ensure_py_extension, get_solution_path

        # Add .py extension if not present to normalize the filename
        filename = ensure_py_extension(filename)

        # Get solution metadata
        solution = category_manager.get_solution(category, filename)
        if not solution:
            abort(404)

        # Check if any solutions exist for this problem
        if not solution.available_languages:
            # No solutions available - show helpful message
            cat_data = category_manager.get_category(category)
            display_filename = filename.replace(".py", "")
            return render_template(
                "no_solution.html",
                category=category,
                category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
                filename=display_filename,
                problem_number=solution.number,
                problem_name=solution.name,
            )

        # Get language from query parameter, or default to Python, then first available
        requested_language = request.args.get("lang")
        if requested_language and requested_language in solution.available_languages:
            display_language = requested_language
        elif "Python" in solution.available_languages:
            display_language = "Python"
        else:
            display_language = solution.available_languages[0]

        # Get solution code in the display language
        solution_path = get_solution_path(category, filename, display_language)
        if not solution_path.exists():
            abort(404)

        with open(solution_path) as f:
            solution_code = f.read()

        # Parse content using unified language-agnostic extraction
        file_extension = solution_path.suffix
        clean_code, problem_data = extract_all_problem_data(solution_code, file_extension)

        # Convert problem statement to HTML
        problem_description = None
        if problem_data.problem_statement:
            problem_description = parse_problem_markdown(problem_data.problem_statement)

        # Convert explanation sections to dict format for template
        explanation_sections = None
        if any(
            [problem_data.intuition, problem_data.approach, problem_data.why_works, problem_data.example_walkthrough]
        ):
            # Convert to markdown HTML for each section
            explanation_sections = {}
            if problem_data.intuition:
                explanation_sections["intuition"] = markdown.markdown(
                    problem_data.intuition, extensions=["fenced_code", "tables"]
                )
            if problem_data.approach:
                explanation_sections["approach"] = markdown.markdown(
                    problem_data.approach, extensions=["fenced_code", "tables"]
                )
            if problem_data.why_works:
                explanation_sections["why_works"] = markdown.markdown(
                    problem_data.why_works, extensions=["fenced_code", "tables"]
                )
            if problem_data.example_walkthrough:
                explanation_sections["example"] = markdown.markdown(
                    problem_data.example_walkthrough, extensions=["fenced_code", "tables"]
                )

        # Generate skeleton and get lexer based on language
        if display_language == "Python":
            skeleton = generate_skeleton(clean_code, solution, is_leetcode=False)
            lexer = PythonLexer()
        elif display_language == "JavaScript":
            skeleton = generate_js_skeleton(clean_code, solution)
            lexer = get_lexer_for_language("JavaScript")
        else:
            skeleton = None
            lexer = get_lexer_for_language(display_language)

        # Syntax highlighting
        formatter = self.create_code_formatter()
        highlighted_code = highlight(clean_code, lexer, formatter)
        highlighted_skeleton = highlight(skeleton, lexer, formatter) if skeleton else None

        # Get category name
        cat_data = category_manager.get_category(category)

        # Remove .py from filename for URL display
        display_filename = filename.replace(".py", "")

        return render_template(
            "solution.html",
            category=category,
            category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
            filename=display_filename,
            problem_number=solution.number,
            problem_name=solution.name,
            problem_description=problem_description,
            skeleton_code=highlighted_skeleton,
            code=highlighted_code,
            explanation=explanation_sections,
            style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
            is_leetcode_format=False,
            available_languages=solution.available_languages,
            current_language=display_language,
            difficulty=solution.difficulty,
            time_complexity=solution.time_complexity,
            space_complexity=solution.space_complexity,
        )


class SolutionLeetCodeView(BaseView):
    """View solution in LeetCode format (camelCase)."""

    def get(self, category: str, filename: str) -> str:
        """Handle GET request for LeetCode format view.

        Args:
            category: Category slug
            filename: Solution filename (without .py extension in URL)

        Returns:
            Rendered template for LeetCode solution page
        """
        from ..solution_utils import ensure_py_extension

        # Add .py extension if not present
        filename = ensure_py_extension(filename)
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
        formatter = self.create_code_formatter()
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
            difficulty=solution.difficulty,
            time_complexity=solution.time_complexity,
            space_complexity=solution.space_complexity,
        )


class DownloadSolutionView(BaseView):
    """Download solution in specified format and language."""

    def get(self, category: str, filename: str, format: str, language: str = "Python") -> Response:
        """Handle GET request for solution download.

        Args:
            category: Category slug
            filename: Solution filename (without .py extension in URL)
            format: Download format (skeleton, solution, leetcode, both)
            language: Programming language (default: Python)

        Returns:
            Response with downloadable file content
        """
        from ..skeleton_generator import generate_skeleton
        from ..solution_utils import ensure_py_extension, get_solution_path

        # Handle .py extension if present
        filename = ensure_py_extension(filename)

        # Get the appropriate solution code based on language
        if language == "Python":
            solution_code = category_manager.read_solution_content(category, filename)
        else:
            # Get solution in other language
            solution_path = get_solution_path(category, filename, language)

            if solution_path.exists():
                with open(solution_path) as f:
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


class UploadSolutionView(BaseView):
    """Upload solution in a different programming language."""

    def get(self, category: str, filename: str) -> str:
        """Handle GET request to show upload form.

        Args:
            category: Category slug
            filename: Solution filename (without .py extension in URL)

        Returns:
            Rendered template for upload form
        """
        from ..solution_utils import ensure_py_extension, remove_py_extension

        # Handle .py extension if present
        filename = ensure_py_extension(filename)

        solution = category_manager.get_solution(category, filename)
        if not solution:
            abort(404)

        # Remove .py from filename for URL display
        display_filename = remove_py_extension(filename)
        return render_template("upload_solution.html", category=category, filename=display_filename, solution=solution)

    def post(self, category: str, filename: str) -> str | Response:
        """Handle POST request to upload solution file.

        Args:
            category: Category slug
            filename: Solution filename (without .py extension in URL)

        Returns:
            Redirect to solution view or upload form with error
        """
        from ..solution_utils import ensure_py_extension, remove_py_extension

        # Handle .py extension if present
        filename = ensure_py_extension(filename)

        solution = category_manager.get_solution(category, filename)
        if not solution:
            abort(404)

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
                display_filename = remove_py_extension(filename)
                return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

        # GET request fallback - this shouldn't happen but return form
        display_filename = remove_py_extension(filename)
        return render_template("upload_solution.html", category=category, filename=display_filename, solution=solution)
