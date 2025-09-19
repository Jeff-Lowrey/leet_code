"""
Script to generate documentation for all LeetCode categories and problems
"""

from pathlib import Path
from typing import Any

# Category information and descriptions
CATEGORIES = {
    "arrays-hashing": {
        "name": "Arrays & Hashing",
        "overview": "Arrays and Hashing problems form the foundation of algorithmic problem-solving.",
        "patterns": ["Two-Pass Algorithms", "Frequency Counting", "Array Manipulation", "Set Operations"],
        "complexity": "Usually O(n) time with O(n) space for hash maps",
    },
    "two-pointers": {
        "name": "Two Pointers",
        "overview": "Two pointer technique for efficient array/string traversal.",
        "patterns": ["Opposite Direction", "Same Direction (Fast/Slow)", "Sliding Window Variation", "Merge Technique"],
        "complexity": "O(n) time with O(1) space",
    },
    "sliding-window": {
        "name": "Sliding Window",
        "overview": "Optimize subarray/substring problems using a dynamic window.",
        "patterns": ["Fixed Window Size", "Variable Window Size", "Window with Conditions", "Multiple Windows"],
        "complexity": "O(n) time instead of O(n²) for subarray problems",
    },
    "stack": {
        "name": "Stack",
        "overview": "LIFO data structure for parsing, matching, and tracking problems.",
        "patterns": ["Matching Brackets", "Monotonic Stack", "Expression Evaluation", "Backtracking Simulation"],
        "complexity": "O(n) time with O(n) space for the stack",
    },
    "binary-search": {
        "name": "Binary Search",
        "overview": "Divide and conquer approach for sorted data and optimization problems.",
        "patterns": [
            "Classic Binary Search",
            "Search in Rotated Array",
            "Binary Search on Answer",
            "Search in 2D Matrix",
        ],
        "complexity": "O(log n) time with O(1) space",
    },
    "linked-list": {
        "name": "Linked List",
        "overview": "Pointer manipulation and list traversal problems.",
        "patterns": ["Reversal", "Fast/Slow Pointers", "Merge Operations", "Cycle Detection"],
        "complexity": "O(n) time with O(1) or O(n) space",
    },
    "trees": {
        "name": "Trees",
        "overview": "Binary tree traversal, manipulation, and property verification.",
        "patterns": ["DFS Traversal", "BFS Traversal", "Tree Construction", "Path Problems"],
        "complexity": "O(n) time with O(h) space for recursion",
    },
    "dynamic-programming": {
        "name": "Dynamic Programming",
        "overview": "Optimization problems using memoization and tabulation.",
        "patterns": ["1D DP", "2D DP", "State Machine", "DP on Trees"],
        "complexity": "Varies from O(n) to O(n³) depending on states",
    },
    "graphs": {
        "name": "Graphs",
        "overview": "Graph traversal, shortest paths, and connectivity problems.",
        "patterns": ["DFS", "BFS", "Union Find", "Topological Sort"],
        "complexity": "O(V + E) for traversal algorithms",
    },
    "backtracking": {
        "name": "Backtracking",
        "overview": "Systematic exploration of all possible solutions.",
        "patterns": ["Subsets", "Permutations", "Combinations", "N-Queens Style"],
        "complexity": "Often exponential, like O(2ⁿ) or O(n!)",
    },
    "greedy": {
        "name": "Greedy",
        "overview": "Local optimal choices leading to global optimum.",
        "patterns": ["Activity Selection", "Huffman Coding", "Interval Problems", "Jump Games"],
        "complexity": "Usually O(n) or O(n log n) with sorting",
    },
    "heap": {
        "name": "Heap / Priority Queue",
        "overview": "Efficient access to min/max elements and k-th element problems.",
        "patterns": ["Top K Elements", "Merge K Lists", "Median Finding", "Event Scheduling"],
        "complexity": "O(log n) for insertion/deletion",
    },
    "trie": {
        "name": "Trie",
        "overview": "Prefix tree for efficient string operations.",
        "patterns": ["Word Search", "Autocomplete", "Prefix Matching", "Word Breaking"],
        "complexity": "O(m) for operations where m is key length",
    },
    "union-find": {
        "name": "Union Find",
        "overview": "Disjoint set data structure for connectivity problems.",
        "patterns": ["Connected Components", "Cycle Detection", "MST Algorithms", "Account Merging"],
        "complexity": "Nearly O(1) with path compression and union by rank",
    },
    "math": {
        "name": "Math",
        "overview": "Mathematical algorithms and number theory problems.",
        "patterns": ["Prime Numbers", "GCD/LCM", "Modular Arithmetic", "Bit Manipulation"],
        "complexity": "Varies widely based on problem",
    },
    "bit-manipulation": {
        "name": "Bit Manipulation",
        "overview": "Bitwise operations for efficient computation.",
        "patterns": ["XOR Properties", "Bit Counting", "Bit Masking", "Power of Two"],
        "complexity": "O(1) or O(32) for integer operations",
    },
    "design": {
        "name": "Design",
        "overview": "Data structure and system design problems.",
        "patterns": ["LRU/LFU Cache", "Iterator Design", "Data Stream", "Snapshot Array"],
        "complexity": "Depends on operations required",
    },
    "matrix": {
        "name": "Matrix",
        "overview": "2D array traversal and manipulation.",
        "patterns": ["Spiral Traversal", "Matrix Rotation", "Search in Matrix", "Path Finding"],
        "complexity": "O(m×n) for most traversals",
    },
    "sorting": {
        "name": "Sorting",
        "overview": "Various sorting algorithms and applications.",
        "patterns": ["Quick Sort", "Merge Sort", "Counting Sort", "Custom Comparators"],
        "complexity": "O(n log n) for comparison sorts",
    },
    "simulation": {
        "name": "Simulation",
        "overview": "Step-by-step simulation of processes.",
        "patterns": ["Game Simulation", "Robot Movement", "State Machines", "Conway's Game"],
        "complexity": "Depends on simulation steps",
    },
    "recursion": {
        "name": "Recursion",
        "overview": "Problems solved by breaking into smaller subproblems.",
        "patterns": ["Tree Recursion", "Tail Recursion", "Divide and Conquer", "Mathematical Recursion"],
        "complexity": "Often O(2ⁿ) without memoization",
    },
    "interval": {
        "name": "Intervals",
        "overview": "Problems involving time intervals and ranges.",
        "patterns": ["Merge Intervals", "Insert Interval", "Interval Scheduling", "Sweep Line"],
        "complexity": "O(n log n) with sorting",
    },
    "monotonic-stack": {
        "name": "Monotonic Stack",
        "overview": "Stack maintaining monotonic order for next greater/smaller problems.",
        "patterns": ["Next Greater Element", "Largest Rectangle", "Stock Span", "Trapping Water"],
        "complexity": "O(n) time with O(n) space",
    },
    "segment-tree": {
        "name": "Segment Tree / BIT",
        "overview": "Advanced data structures for range queries.",
        "patterns": ["Range Sum Query", "Range Update", "Count Inversions", "Skyline Problem"],
        "complexity": "O(log n) for queries and updates",
    },
    "queue": {
        "name": "Queue",
        "overview": "FIFO data structure and circular buffer problems.",
        "patterns": ["BFS Implementation", "Circular Queue", "Priority Queue", "Sliding Window Maximum"],
        "complexity": "O(1) for basic operations",
    },
    "topological-sort": {
        "name": "Topological Sort",
        "overview": "Ordering of directed acyclic graphs.",
        "patterns": ["Course Schedule", "Build Order", "Alien Dictionary", "Kahn's Algorithm"],
        "complexity": "O(V + E) time",
    },
    "prefix-sum": {
        "name": "Prefix Sum",
        "overview": "Precomputation for efficient range queries.",
        "patterns": ["Range Sum", "Subarray Sum", "2D Prefix Sum", "Difference Array"],
        "complexity": "O(n) preprocessing, O(1) queries",
    },
    "string-manipulation": {
        "name": "String Manipulation",
        "overview": "String processing and pattern matching.",
        "patterns": ["KMP Algorithm", "Rabin-Karp", "String Matching", "String Transformation"],
        "complexity": "O(n + m) for pattern matching",
    },
    "strings": {
        "name": "String Problems",
        "overview": "Advanced string algorithms and palindrome problems.",
        "patterns": ["Palindrome Partitioning", "Edit Distance", "Longest Common Subsequence", "String Compression"],
        "complexity": "Often O(n²) for DP solutions",
    },
}


def create_category_readme(category_key: str, category_info: dict[str, Any]) -> str:
    """Generate README content for a category"""
    return f"""# {category_info['name']}

## Category Overview

{category_info['overview']}

## Common Patterns

{chr(10).join(f"- **{pattern}**" for pattern in category_info['patterns'])}

## Complexity Analysis

{category_info['complexity']}

## Key Techniques

Understanding these patterns will help you recognize and solve similar problems efficiently.

## Tips for Success

1. Practice recognizing the pattern in the problem statement
2. Start with a brute force approach, then optimize
3. Consider edge cases and constraints
4. Think about time and space tradeoffs
5. Review similar problems to reinforce patterns

## Common Mistakes to Avoid

1. Not considering all edge cases
2. Off-by-one errors in indices
3. Forgetting to handle empty inputs
4. Inefficient nested loops that can be optimized
5. Not utilizing the specific properties of the data structure

## Related Categories

Check out related problem categories to broaden your understanding.
"""


def create_problem_doc(problem_num: int, problem_name: str, category: str) -> str:
    """Generate problem documentation template"""
    return f"""# {problem_num} - {problem_name}

## Problem Description

[Detailed problem statement goes here]

## Solution Explanation

### Approach

[Explain the key insight and approach]

### Algorithm Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]
...

### Visual Example

```
[Visual representation of the algorithm]
```

### Why This Works

[Explain the intuition behind the solution]

## Complexity Analysis

- **Time Complexity:** O(?)
- **Space Complexity:** O(?)

## Key Insights

1. [Important insight 1]
2. [Important insight 2]
3. [Important insight 3]

## Common Variations

- [Related problem 1]
- [Related problem 2]

## Interview Tips

1. Start with clarifying questions
2. Discuss the brute force approach first
3. Optimize step by step
4. Write clean, readable code
5. Test with examples

## Category: {category}
"""


def main() -> None:
    """Generate documentation structure"""
    docs_dir = Path("/Users/jeff/git/claude-knowledge/projects/leet_code/docs")

    # Create category directories and READMEs
    for category_key, category_info in CATEGORIES.items():
        category_dir = docs_dir / category_key
        category_dir.mkdir(parents=True, exist_ok=True)

        # Create category README
        readme_path = category_dir / "README.md"
        with open(readme_path, "w") as f:
            f.write(create_category_readme(category_key, category_info))

        print(f"Created {category_key}/README.md")

    print("\nDocumentation structure created successfully!")
    print("Note: Individual problem documentation files should be added based on actual solutions.")


if __name__ == "__main__":
    main()
