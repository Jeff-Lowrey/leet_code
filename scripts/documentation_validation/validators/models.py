"""
Data models for documentation verification.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional

# Global cache for cross-language example sharing
# Key: problem_number, Value: {'input': str, 'output': str, 'source_language': str}
EXECUTION_CACHE: Dict[str, Dict[str, str]] = {}


@dataclass
class DocumentationSection:
    """Represents a documentation section."""
    name: str
    content: str
    line_start: int
    line_end: int
    is_complete: bool
    issues: List[str] = field(default_factory=list)

    @property
    def is_present(self) -> bool:
        """Check if section has content (for backward compatibility)."""
        return bool(self.content)


@dataclass
class SolutionMetadata:
    """Metadata extracted from solution documentation."""
    problem_number: str
    problem_title: str
    difficulty: str
    techniques: List[str]
    data_structures: List[str]
    time_complexity: str
    space_complexity: str
    has_examples: bool
    example_inputs: List[str]
    example_outputs: List[str]


@dataclass
class AccuracyCheck:
    """Results of accuracy validation."""
    check_name: str
    passed: bool
    issues: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)


@dataclass
class ExampleValidation:
    """Results from validating example values."""
    input_found: bool
    output_found: bool
    explanation_found: bool
    input_value: str
    output_value: str
    explanation_text: str
    consistency_issues: List[str] = field(default_factory=list)
    sanity_issues: List[str] = field(default_factory=list)


@dataclass
class ProblemMetadataValidation:
    """Results from validating problem metadata."""
    number_correct: bool
    title_consistent: bool
    difficulty_valid: bool
    issues: List[str] = field(default_factory=list)


@dataclass
class ExecutionValidation:
    """Results from executing solution code to validate examples."""
    executed: bool
    execution_error: Optional[str] = None
    documented_input: str = ""
    documented_output: str = ""
    actual_output: Optional[str] = None
    outputs_match: bool = False
    mismatch_details: str = ""


@dataclass
class DocumentationLossValidation:
    """Results from detecting documentation loss compared to git history."""
    checked: bool
    has_history: bool
    sections_lost: List[str] = field(default_factory=list)
    sections_reduced: List[str] = field(default_factory=list)  # Sections that got significantly shorter
    content_loss_percentage: float = 0.0  # Overall markdown content reduction
    historical_commit: str = ""  # Commit hash where content was better
    loss_details: List[str] = field(default_factory=list)  # Detailed loss descriptions


@dataclass
class EnhancedAnalysis:
    """Complete enhanced analysis including example validation."""
    file_path: str
    problem_number: str
    problem_title: str
    language: str
    category: str

    # Existing scores
    format_score: float
    completeness_score: float
    accuracy_score: float
    overall_score: float

    # New validations
    example_validation: Optional[ExampleValidation] = None
    metadata_validation: Optional[ProblemMetadataValidation] = None
    execution_validation: Optional[ExecutionValidation] = None
    loss_validation: Optional[DocumentationLossValidation] = None
    cross_validation_issues: List[str] = field(default_factory=list)
    template_structure_issues: List[str] = field(default_factory=list)

    # Deep validation issues (from deep_validators.py)
    deep_validation_issues: Dict[str, List[str]] = field(default_factory=dict)  # section_name -> issue messages
    line_ending_issues: List[str] = field(default_factory=list)

    # Content quality issues (from markdown_content_validators.py)
    content_quality_issues: List[str] = field(default_factory=list)  # Semantic content quality issues

    # Existing fields
    format_issues: List[str] = field(default_factory=list)
    missing_sections: List[str] = field(default_factory=list)
    accuracy_checks: List[AccuracyCheck] = field(default_factory=list)
