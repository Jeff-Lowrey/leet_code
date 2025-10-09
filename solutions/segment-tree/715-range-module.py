"""
# Difficulty: Hard

# 715. Range Module

A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.

A half-open interval [left, right) denotes all the real numbers x where left <= x < right.

Implement the RangeModule class:

- RangeModule() Initializes the object.
- void addRange(int left, int right) Adds the half-open interval [left, right), tracking every real number in that interval.
- boolean queryRange(int left, int right) Returns true if every real number in the interval [left, right) is currently being tracked, and false otherwise.
- void removeRange(int left, int right) Stops tracking every real number currently being tracked in the half-open interval [left, right).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This problem requires efficient range updates and queries. We can use segment trees with lazy propagation, or maintain a sorted list of disjoint intervals and merge/split them as needed.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
```
addRange(10, 20): ranges = [(10, 20)]
removeRange(14, 16): ranges = [(10, 14), (16, 20)]
queryRange(10, 14): true (fully covered)
queryRange(13, 15): false (15 not covered)
queryRange(16, 17): true (fully covered)
```

### TIME COMPLEXITY:
- Segment Tree: O(log n) per operation
- Sorted Intervals: O(n) worst case, O(log n) average

### SPACE COMPLEXITY:
O(n)
For tree or interval list

### EDGE CASES:
- Empty ranges
- Overlapping add operations
- Removing non-existent ranges
- Query on empty module
- Adjacent intervals (should merge)

</details>
"""


