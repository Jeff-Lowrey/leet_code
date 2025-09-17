#!/usr/bin/env python3
"""LeetCode Solutions Web Interface"""

from pathlib import Path
from typing import Optional

import markdown
from flask import Flask, render_template, abort
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import PythonLexer

from category_data import category_manager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-key-change-in-production'


@app.route('/')
def index():
    """Home page showing all categories."""
    categories = category_manager.get_categories()
    stats = category_manager.get_statistics()

    return render_template('index.html',
                         categories=categories,
                         total_solutions=stats['total_solutions'],
                         total_categories=stats['total_categories'])


@app.route('/category/<category>')
def category_view(category):
    """View all solutions in a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)

    # Read category documentation
    doc_content = category_manager.read_documentation(category)
    if doc_content:
        doc_html = markdown.markdown(doc_content, extensions=['fenced_code', 'tables'])
    else:
        doc_html = None

    return render_template('category.html',
                         category=category,
                         category_name=cat_data.name,
                         solutions=cat_data.solutions,
                         documentation=doc_html)


@app.route('/solution/<category>/<filename>')
def solution_view(category, filename):
    """View a specific solution."""
    solution_code = category_manager.read_solution_content(category, filename)
    if not solution_code:
        abort(404)

    # Get solution metadata
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Syntax highlighting for Python code
    formatter = HtmlFormatter(style='monokai', linenos=True)
    highlighted_code = highlight(solution_code, PythonLexer(), formatter)

    # Try to find corresponding documentation
    doc_name = filename.replace('.py', '')
    doc_content = category_manager.read_documentation(category, doc_name)
    if doc_content:
        doc_html = markdown.markdown(doc_content, extensions=['fenced_code', 'tables'])
    else:
        doc_html = None

    # Get category name
    cat_data = category_manager.get_category(category)

    return render_template('solution.html',
                         category=category,
                         category_name=cat_data.name if cat_data else category.replace('-', ' ').title(),
                         filename=filename,
                         problem_number=solution.number,
                         problem_name=solution.name,
                         code=highlighted_code,
                         documentation=doc_html,
                         style=formatter.get_style_defs('.highlight'))


@app.route('/docs')
def docs_index():
    """Documentation index."""
    docs = []
    docs_dir = Path(__file__).parent / "docs"

    for path in docs_dir.iterdir():
        if path.is_dir() and not path.name.startswith('.'):
            readme = path / "README.md"
            if readme.exists():
                docs.append({
                    'name': path.name.replace('-', ' ').title(),
                    'slug': path.name
                })

    return render_template('docs.html', docs=sorted(docs, key=lambda x: x['name']))


@app.route('/docs/<category>')
def docs_view(category):
    """View category documentation."""
    doc_content = category_manager.read_documentation(category)
    if not doc_content:
        abort(404)

    doc_html = markdown.markdown(doc_content, extensions=['fenced_code', 'tables', 'toc'])

    return render_template('doc_view.html',
                         category=category,
                         category_name=category.replace('-', ' ').title(),
                         content=doc_html)


@app.errorhandler(404)
def not_found(error):
    """404 error handler."""
    return render_template('404.html'), 404


# API endpoints for sidebar navigation
@app.route('/api/categories')
def api_categories():
    """API endpoint to get all categories."""
    categories = category_manager.get_categories()
    return [{'name': cat.name, 'slug': cat.slug, 'count': cat.count}
            for cat in categories]


@app.route('/api/category/<category>/solutions')
def api_category_solutions(category):
    """API endpoint to get solutions for a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)
    return [{'filename': sol.filename, 'name': sol.name, 'number': sol.number}
            for sol in cat_data.solutions]


if __name__ == '__main__':
    app.run(debug=True, port=5000)