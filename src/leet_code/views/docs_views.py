"""Documentation-related views."""

import re
from pathlib import Path

import markdown
from flask import abort, render_template

from .base import BaseView


class DocsIndexView(BaseView):
    """Documentation index - show available documentation categories."""

    def get(self) -> str:
        """Handle GET request for documentation index.

        Returns:
            Rendered template for docs index page
        """
        docs = []
        docs_path = Path(__file__).parent.parent.parent.parent / "docs"

        if docs_path.exists():
            for category_dir in sorted(docs_path.iterdir()):
                if category_dir.is_dir() and not category_dir.name.startswith("."):
                    readme_path = category_dir / "README.md"
                    if readme_path.exists():
                        # Convert directory name to display name
                        # Default: replace hyphens with spaces and title case
                        display_name = category_dir.name.replace("-", " ").title()
                        description = "View documentation"
                        category_slug = category_dir.name  # For theme coloring

                        # Special cases for guides with descriptions and theme colors
                        if category_dir.name == "user-guide":
                            display_name = "User Guide"
                            description = "Complete guide to using the Leet Code Learning Tool"
                            category_slug = "user-guide-doc"  # Use steel-blue theme
                        elif category_dir.name == "developer-guide":
                            display_name = "Developer Guide"
                            description = "Technical documentation for developers and contributors"
                            category_slug = "developer-guide-doc"  # Use plum theme
                        elif category_dir.name == "upload-guide":
                            display_name = "Upload Guide"
                            description = "Learn how to add new solutions to the collection"
                            category_slug = "upload-guide-doc"  # Use amber theme
                        # Special cases for problem categories with ampersands
                        elif category_dir.name == "arrays-hashing":
                            display_name = "Arrays & Hashing"
                        elif category_dir.name == "two-pointers":
                            display_name = "Two Pointers"
                        elif category_dir.name == "dynamic-programming":
                            display_name = "Dynamic Programming"
                        elif category_dir.name == "binary-search":
                            display_name = "Binary Search"
                        elif category_dir.name == "bit-manipulation":
                            display_name = "Bit Manipulation"
                        elif category_dir.name == "topological-sort":
                            display_name = "Topological Sort"
                        elif category_dir.name == "string-manipulation":
                            display_name = "String Manipulation"
                        elif category_dir.name == "monotonic-stack":
                            display_name = "Monotonic Stack"
                        elif category_dir.name == "segment-tree":
                            display_name = "Segment Tree"
                        elif category_dir.name == "prefix-sum":
                            display_name = "Prefix Sum"
                        elif category_dir.name == "sliding-window":
                            display_name = "Sliding Window"
                        elif category_dir.name == "union-find":
                            display_name = "Union Find"

                        docs.append(
                            {
                                "slug": category_dir.name,
                                "name": display_name,
                                "description": description,
                                "category_slug": category_slug,
                            }
                        )

        return render_template("docs.html", docs=docs)


class DocsReadmeView(BaseView):
    """View main documentation README."""

    def get(self) -> str:
        """Handle GET request for main docs README.

        Returns:
            Rendered template for README page
        """
        docs_path = Path(__file__).parent.parent.parent.parent / "docs" / "README.md"
        if docs_path.exists():
            doc_content = docs_path.read_text()
            doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])
            return render_template("doc_view.html", category="README", category_name="README", content=doc_html)
        abort(404)


class DocsView(BaseView):
    """View category documentation or specific sub-page."""

    def get(self, category: str, page: str | None = None) -> str:
        """Handle GET request for documentation page.

        Args:
            category: Documentation category slug
            page: Optional sub-page within the category

        Returns:
            Rendered template for docs page
        """
        docs_base = Path(__file__).parent.parent.parent.parent / "docs"

        # Determine which file to load
        if page:
            # Sub-page requested (e.g., /docs/user-guide/01-overview.md or /docs/user-guide/01-overview)
            page_name = page if page.endswith(".md") else f"{page}.md"
            docs_path = docs_base / category / page_name
            # Extract display name from page (remove number prefix and extension)
            page_display = page.replace(".md", "").split("-", 1)[-1].replace("-", " ").title()
            category_display = category.replace("-", " ").title()
        else:
            # Main category page (README.md)
            docs_path = docs_base / category / "README.md"
            category_display = category.replace("-", " ").title()
            page_display = None

        # Check if file exists
        if not docs_path.exists():
            abort(404)

        # Read and render markdown
        doc_content = docs_path.read_text()
        doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])

        # Fix relative links to include the category path
        # Replace links like href="01-overview.md" with href="/docs/category/01-overview.md"
        doc_html = re.sub(r'href="([^/"#][^"]*\.md)"', rf'href="/docs/{category}/\1"', doc_html)
        # Also handle links without .md extension that reference other docs
        doc_html = re.sub(r'href="((?:\.\./)+([\w-]+)/README\.md)"', r'href="/docs/\2"', doc_html)

        # Determine the display name
        full_display_name = f"{category_display}: {page_display}" if page_display else category_display

        return render_template("doc_view.html", category=category, category_name=full_display_name, content=doc_html)
