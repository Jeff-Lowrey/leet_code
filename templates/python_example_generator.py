#!/usr/bin/env python3
"""
Python Example Generator for LeetCode Solutions

This script generates comprehensive test examples for LeetCode problems based on problem type.
"""

import random
import string
from typing import List, Dict, Any, Tuple
from dataclasses import dataclass
import json


@dataclass
class ProblemConfig:
    """Configuration for problem-specific example generation."""
    problem_type: str  # array, string, tree, graph, dp, etc.
    input_types: List[str]  # List of parameter types
    constraints: Dict[str, Any]  # Constraint specifications
    special_cases: List[str]  # Special cases to include


class ExampleGenerator:
    """Generates comprehensive test examples for different problem types."""

    def __init__(self):
        self.generators = {
            'array': self.generate_array_examples,
            'string': self.generate_string_examples,
            'tree': self.generate_tree_examples,
            'linked_list': self.generate_linked_list_examples,
            'graph': self.generate_graph_examples,
            'matrix': self.generate_matrix_examples,
            'interval': self.generate_interval_examples,
            'number': self.generate_number_examples,
            'dynamic_programming': self.generate_dp_examples,
            'stack_queue': self.generate_stack_queue_examples
        }

    def generate_examples(self, config: ProblemConfig, count: int = 10) -> List[Dict[str, Any]]:
        """Generate comprehensive examples based on problem configuration."""
        generator = self.generators.get(config.problem_type, self.generate_generic_examples)
        return generator(config, count)

    def generate_array_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate examples for array-based problems."""
        examples = []

        # Basic examples
        examples.extend([
            {
                'name': 'Basic Example - Small Array',
                'input': [1, 2, 3, 4, 5],
                'description': 'Standard case with small array'
            },
            {
                'name': 'Basic Example - Mixed Numbers',
                'input': [-1, 0, 1, 2, -3],
                'description': 'Array with positive and negative numbers'
            }
        ])

        # Edge cases
        examples.extend([
            {
                'name': 'Edge Case - Empty Array',
                'input': [],
                'description': 'Empty array test'
            },
            {
                'name': 'Edge Case - Single Element',
                'input': [42],
                'description': 'Array with single element'
            },
            {
                'name': 'Edge Case - Two Elements',
                'input': [1, 2],
                'description': 'Minimum array for most algorithms'
            }
        ])

        # Boundary cases
        examples.extend([
            {
                'name': 'Boundary Case - All Same Elements',
                'input': [5] * 10,
                'description': 'Array with identical elements'
            },
            {
                'name': 'Boundary Case - Sorted Array',
                'input': list(range(1, 11)),
                'description': 'Already sorted array'
            },
            {
                'name': 'Boundary Case - Reverse Sorted',
                'input': list(range(10, 0, -1)),
                'description': 'Reverse sorted array'
            }
        ])

        # Large/stress cases
        max_size = config.constraints.get('max_size', 1000)
        examples.extend([
            {
                'name': 'Large Case - Random Array',
                'input': [random.randint(-100, 100) for _ in range(min(100, max_size))],
                'description': 'Large random array for performance testing'
            },
            {
                'name': 'Stress Case - Maximum Size',
                'input': [random.randint(1, 10) for _ in range(min(max_size, 1000))],
                'description': 'Maximum constraint size test'
            }
        ])

        return examples[:count]

    def generate_string_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate examples for string-based problems."""
        examples = []

        # Basic examples
        examples.extend([
            {
                'name': 'Basic Example - Simple String',
                'input': "hello",
                'description': 'Basic string case'
            },
            {
                'name': 'Basic Example - Mixed Case',
                'input': "Hello World",
                'description': 'String with spaces and mixed case'
            }
        ])

        # Edge cases
        examples.extend([
            {
                'name': 'Edge Case - Empty String',
                'input': "",
                'description': 'Empty string test'
            },
            {
                'name': 'Edge Case - Single Character',
                'input': "a",
                'description': 'Single character string'
            },
            {
                'name': 'Edge Case - Special Characters',
                'input': "!@#$%^&*()",
                'description': 'String with special characters'
            }
        ])

        # Pattern cases
        examples.extend([
            {
                'name': 'Pattern Case - Palindrome',
                'input': "racecar",
                'description': 'Palindromic string'
            },
            {
                'name': 'Pattern Case - Repeating Characters',
                'input': "aabbccddee",
                'description': 'String with repeating patterns'
            },
            {
                'name': 'Pattern Case - All Same Character',
                'input': "aaaaaaaa",
                'description': 'String with identical characters'
            }
        ])

        # Large cases
        max_length = config.constraints.get('max_length', 1000)
        examples.extend([
            {
                'name': 'Large Case - Random String',
                'input': ''.join(random.choices(string.ascii_lowercase, k=min(100, max_length))),
                'description': 'Large random string'
            },
            {
                'name': 'Stress Case - Maximum Length',
                'input': 'a' * min(max_length, 1000),
                'description': 'Maximum constraint length test'
            }
        ])

        return examples[:count]

    def generate_tree_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate examples for tree-based problems."""
        examples = []

        examples.extend([
            {
                'name': 'Basic Tree - Balanced',
                'input': [1, 2, 3, 4, 5, 6, 7],
                'description': 'Complete balanced binary tree'
            },
            {
                'name': 'Basic Tree - Simple',
                'input': [1, 2, 3],
                'description': 'Simple three-node tree'
            },
            {
                'name': 'Edge Case - Single Node',
                'input': [1],
                'description': 'Tree with only root node'
            },
            {
                'name': 'Edge Case - Empty Tree',
                'input': None,
                'description': 'Empty tree (null root)'
            },
            {
                'name': 'Skewed Tree - Left Heavy',
                'input': [1, 2, None, 3, None, None, None, 4],
                'description': 'Left-skewed tree'
            },
            {
                'name': 'Skewed Tree - Right Heavy',
                'input': [1, None, 2, None, None, None, 3, None, None, None, None, None, None, None, 4],
                'description': 'Right-skewed tree'
            }
        ])

        return examples[:count]

    def generate_linked_list_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate examples for linked list problems."""
        examples = []

        examples.extend([
            {
                'name': 'Basic List - Sequential',
                'input': [1, 2, 3, 4, 5],
                'description': 'Standard sequential linked list'
            },
            {
                'name': 'Basic List - Small',
                'input': [1, 2],
                'description': 'Small two-node list'
            },
            {
                'name': 'Edge Case - Single Node',
                'input': [1],
                'description': 'Single node list'
            },
            {
                'name': 'Edge Case - Empty List',
                'input': None,
                'description': 'Empty linked list'
            },
            {
                'name': 'Pattern Case - Duplicates',
                'input': [1, 1, 2, 3, 3],
                'description': 'List with duplicate values'
            }
        ])

        return examples[:count]

    def generate_number_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate examples for number-based problems."""
        examples = []

        examples.extend([
            {
                'name': 'Basic Number - Positive',
                'input': 42,
                'description': 'Standard positive number'
            },
            {
                'name': 'Basic Number - Negative',
                'input': -17,
                'description': 'Negative number test'
            },
            {
                'name': 'Edge Case - Zero',
                'input': 0,
                'description': 'Zero value test'
            },
            {
                'name': 'Edge Case - One',
                'input': 1,
                'description': 'Unity value test'
            },
            {
                'name': 'Boundary Case - Large Positive',
                'input': 2**31 - 1,
                'description': 'Maximum 32-bit integer'
            },
            {
                'name': 'Boundary Case - Large Negative',
                'input': -2**31,
                'description': 'Minimum 32-bit integer'
            }
        ])

        return examples[:count]

    def generate_generic_examples(self, config: ProblemConfig, count: int) -> List[Dict[str, Any]]:
        """Generate generic examples for unknown problem types."""
        examples = []

        for i in range(count):
            examples.append({
                'name': f'Test Case {i + 1}',
                'input': f'test_input_{i + 1}',
                'description': f'Generic test case {i + 1}'
            })

        return examples


def generate_test_cases_for_problem(problem_type: str, constraints: Dict[str, Any] = None, count: int = 10) -> List[Dict[str, Any]]:
    """
    Main function to generate test cases for a specific problem type.

    Args:
        problem_type: Type of problem (array, string, tree, etc.)
        constraints: Problem constraints dictionary
        count: Number of test cases to generate

    Returns:
        List of test case dictionaries
    """
    generator = ExampleGenerator()
    config = ProblemConfig(
        problem_type=problem_type,
        input_types=['auto'],
        constraints=constraints or {},
        special_cases=[]
    )

    return generator.generate_examples(config, count)


def save_examples_to_file(examples: List[Dict[str, Any]], filename: str) -> None:
    """Save generated examples to a JSON file."""
    with open(filename, 'w') as f:
        json.dump(examples, f, indent=2)
    print(f"✅ Saved {len(examples)} examples to {filename}")


if __name__ == "__main__":
    # Example usage
    print("🔧 Python Example Generator for LeetCode Solutions")
    print("=" * 50)

    # Generate examples for different problem types
    problem_types = ['array', 'string', 'tree', 'number']

    for prob_type in problem_types:
        print(f"\nGenerating examples for {prob_type} problems:")
        examples = generate_test_cases_for_problem(prob_type, count=10)

        for i, example in enumerate(examples, 1):
            print(f"  {i:2d}. {example['name']}: {example['description']}")

    # Save array examples as demonstration
    array_examples = generate_test_cases_for_problem('array', {'max_size': 100}, 10)
    save_examples_to_file(array_examples, 'sample_array_examples.json')
