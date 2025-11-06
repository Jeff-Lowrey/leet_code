"""
Documentation Validation Library

Core components for documentation validation using src/ parser.
"""

import sys
from pathlib import Path

# Setup sys.path to find leet_code module
_validators_dir = Path(__file__).parent
_repo_root = _validators_dir.parent.parent
sys.path.insert(0, str(_repo_root / 'src'))

# Core models
from .models import SolutionMetadata

# Extractors (uses src/ code)
from .extractors import extract_problem_data

# Template validation
from .template_validator import TemplateValidator

# Quality validation
from .quality_validator import QualityValidator

# HTML validation
from .html_validator import HTMLValidator

__all__ = [
    'SolutionMetadata',
    'extract_problem_data',
    'TemplateValidator',
    'QualityValidator',
    'HTMLValidator',
]
