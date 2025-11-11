"""Configuration settings for the Leet Code Learning Tool."""

from pathlib import Path

# Base directory is the repository root
# This file is at: src/leet_code/config.py
# Repository root is 2 levels up: config.py -> leet_code/ -> src/ -> repo_root/
BASE_DIR = Path(__file__).parent.parent.parent.resolve()

# Key directories
SOLUTIONS_DIR = BASE_DIR / "solutions"
DOCS_DIR = BASE_DIR / "docs"
DATA_DIR = BASE_DIR / "data"
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"
