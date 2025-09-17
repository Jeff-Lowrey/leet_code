#!/usr/bin/env python3
"""LeetCode Solutions Web Interface"""

import os
from pathlib import Path
from typing import Dict, List, Optional

import markdown
from flask import Flask, render_template, abort
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import PythonLexer

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-key-change-in-production'

BASE_DIR = Path(__file__).parent
SOLUTIONS_DIR = BASE_DIR / "solutions"
DOCS_DIR = BASE_DIR / "docs"


def get_categories() -> List[Dict[str, str]]:
    """Get all solution categories."""
    category_descriptions = {
        'arrays-hashing': 'Fundamental data structure problems using arrays and hash tables for efficient lookups.',
        'backtracking': 'Explore all possibilities systematically to find solutions through recursive exploration.',
        'binary-search': 'Efficiently find targets in sorted data by repeatedly dividing the search space in half.',
        'bit-manipulation': 'Solve problems using bitwise operations for optimal space and time complexity.',
        'design': 'Implement complex data structures and systems with specific functional requirements.',
        'dynamic-programming': 'Break complex problems into overlapping subproblems and optimize with memoization.',
        'graphs': 'Navigate relationships and connections using graph traversal algorithms like DFS and BFS.',
        'greedy': 'Make locally optimal choices at each step to find globally optimal solutions.',
        'heap': 'Use priority queues to efficiently track minimum or maximum elements.',
        'interval': 'Handle overlapping ranges and time-based problems with interval merging techniques.',
        'linked-list': 'Manipulate node-based linear data structures with pointer operations.',
        'math': 'Apply mathematical concepts and number theory to solve algorithmic challenges.',
        'matrix': 'Navigate and transform 2D grids using various traversal patterns.',
        'monotonic-stack': 'Maintain element ordering to solve next greater/smaller element problems.',
        'prefix-sum': 'Precompute cumulative sums for efficient range query operations.',
        'queue': 'Process elements in FIFO order for level-order traversals and simulations.',
        'recursion': 'Solve problems by breaking them into smaller instances of the same problem.',
        'segment-tree': 'Perform efficient range queries and updates on array segments.',
        'simulation': 'Model real-world processes and game mechanics step by step.',
        'sliding-window': 'Optimize subarray/substring problems using a moving window technique.',
        'sorting': 'Arrange elements in order and leverage sorted properties for problem solving.',
        'stack': 'Use LIFO structure for parsing, evaluation, and tracking state.',
        'string-manipulation': 'Transform and analyze text using various string processing techniques.',
        'strings': 'Pattern matching, parsing, and character-based algorithm problems.',
        'topological-sort': 'Order directed acyclic graph nodes based on dependencies.',
        'trees': 'Traverse and manipulate hierarchical data structures including binary trees.',
        'trie': 'Efficiently store and search strings using prefix tree structures.',
        'two-pointers': 'Use two iterators to traverse data structures for optimal solutions.',
        'union-find': 'Track connected components and detect cycles in disjoint sets.'
    }

    categories = []
    for path in SOLUTIONS_DIR.iterdir():
        if path.is_dir() and not path.name.startswith('.'):
            # Count Python files in the directory
            py_files = list(path.glob("*.py"))
            if py_files:
                categories.append({
                    'name': path.name.replace('-', ' ').title(),
                    'slug': path.name,
                    'count': len(py_files),
                    'description': category_descriptions.get(path.name, 'Collection of algorithm problems and solutions.')
                })
    return sorted(categories, key=lambda x: x['name'])


def get_solutions(category: str) -> List[Dict[str, str]]:
    """Get all solutions in a category."""
    solutions = []
    category_path = SOLUTIONS_DIR / category

    if not category_path.exists():
        return solutions

    for py_file in sorted(category_path.glob("*.py")):
        # Extract problem number and name from filename
        name = py_file.stem
        parts = name.split('-', 1)
        problem_num = parts[0] if parts[0].isdigit() else ''
        problem_name = parts[1] if len(parts) > 1 else name

        solutions.append({
            'filename': py_file.name,
            'name': problem_name.replace('-', ' ').title(),
            'number': problem_num,
            'slug': name
        })

    return solutions


def read_solution(category: str, filename: str) -> Optional[str]:
    """Read a solution file."""
    file_path = SOLUTIONS_DIR / category / filename
    if file_path.exists() and file_path.suffix == '.py':
        return file_path.read_text()
    return None


def read_documentation(category: str, doc_name: Optional[str] = None) -> Optional[str]:
    """Read documentation file."""
    if doc_name:
        file_path = DOCS_DIR / category / f"{doc_name}.md"
    else:
        file_path = DOCS_DIR / category / "README.md"

    if file_path.exists():
        return file_path.read_text()
    return None


@app.route('/')
def index():
    """Home page showing all categories."""
    categories = get_categories()

    # Calculate statistics
    total_solutions = sum(cat['count'] for cat in categories)

    return render_template('index.html',
                         categories=categories,
                         total_solutions=total_solutions,
                         total_categories=len(categories))


@app.route('/category/<category>')
def category_view(category):
    """View all solutions in a category."""
    solutions = get_solutions(category)
    if not solutions:
        abort(404)

    # Read category documentation
    doc_content = read_documentation(category)
    if doc_content:
        doc_html = markdown.markdown(doc_content, extensions=['fenced_code', 'tables'])
    else:
        doc_html = None

    category_name = category.replace('-', ' ').title()

    return render_template('category.html',
                         category=category,
                         category_name=category_name,
                         solutions=solutions,
                         documentation=doc_html)


@app.route('/solution/<category>/<filename>')
def solution_view(category, filename):
    """View a specific solution."""
    solution_code = read_solution(category, filename)
    if not solution_code:
        abort(404)

    # Syntax highlighting for Python code
    formatter = HtmlFormatter(style='monokai', linenos=True)
    highlighted_code = highlight(solution_code, PythonLexer(), formatter)

    # Try to find corresponding documentation
    doc_name = filename.replace('.py', '')
    doc_content = read_documentation(category, doc_name)
    if doc_content:
        doc_html = markdown.markdown(doc_content, extensions=['fenced_code', 'tables'])
    else:
        doc_html = None

    # Extract problem info
    parts = filename.replace('.py', '').split('-', 1)
    problem_num = parts[0] if parts[0].isdigit() else ''
    problem_name = parts[1] if len(parts) > 1 else filename.replace('.py', '')

    return render_template('solution.html',
                         category=category,
                         category_name=category.replace('-', ' ').title(),
                         filename=filename,
                         problem_number=problem_num,
                         problem_name=problem_name.replace('-', ' ').title(),
                         code=highlighted_code,
                         documentation=doc_html,
                         style=formatter.get_style_defs('.highlight'))


@app.route('/docs')
def docs_index():
    """Documentation index."""
    docs = []
    for path in DOCS_DIR.iterdir():
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
    doc_content = read_documentation(category)
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
    categories = get_categories()
    return [{'name': cat['name'], 'slug': cat['slug'], 'count': cat['count']}
            for cat in categories]


@app.route('/api/category/<category>/solutions')
def api_category_solutions(category):
    """API endpoint to get solutions for a category."""
    solutions = get_solutions(category)
    if not solutions:
        abort(404)
    return [{'filename': sol['filename'], 'name': sol['name'], 'number': sol['number']}
            for sol in solutions]


if __name__ == '__main__':
    app.run(debug=True, port=5000)