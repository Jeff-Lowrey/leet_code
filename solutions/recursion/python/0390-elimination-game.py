"""
# 0390. Elimination Game

# Difficulty: Medium

Solve the Elimination Game problem as described.

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>```</dd>
<dt>Output:</dt>
<dd>```</dd>
<dt>Explanation:</dt>
<dd>Processing input produces the expected output</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: - Recursion
**Data Structures**: - None (pure mathematical solution)
**Patterns**: - Elimination pattern
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(1)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
</details>
"""


def lastRemaining(n: int) -> int:
    """
    Find the last remaining number after elimination process.

    Args:
        n: Upper bound of the range [1, n]

    Returns:
        The last remaining number
    """
    head = 1  # Current head of the sequence
    step = 1  # Distance between consecutive remaining numbers
    left_to_right = True  # Direction of elimination
    remaining = n  # Count of remaining numbers

    while remaining > 1:
        # Update head if:
        # 1. Going left to right (always update)
        # 2. Going right to left AND odd count (head would be eliminated)
        if left_to_right or remaining % 2 == 1:
            head += step

        # After each round:
        remaining //= 2  # Half the numbers remain
        step *= 2  # Numbers are twice as far apart
        left_to_right = not left_to_right  # Alternate direction

    return head


def lastRemainingRecursive(n: int) -> int:
    """
    Recursive solution for the elimination game.

    Args:
        n: Upper bound of the range [1, n]

    Returns:
        The last remaining number
    """
    def helper(n: int, left_to_right: bool) -> int:
        # Base case
        if n == 1:
            return 1

        # If going left to right, result is 2 * helper for right to left
        # with n//2 elements
        if left_to_right:
            return 2 * helper(n // 2, False)
        else:
            # If going right to left:
            # - If n is odd, same as left to right
            # - If n is even, result is 2 * helper - 1
            if n % 2 == 1:
                return 2 * helper(n // 2, True)
            else:
                return 2 * helper(n // 2, True) - 1

    return helper(n, True)


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (1, 1),
        (2, 2),
        (3, 2),
        (4, 2),
        (5, 2),
        (6, 4),
        (7, 4),
        (8, 6),
        (9, 6),
        (10, 8),
        (100, 54),
        (1000, 510)
    ]

    print("Testing lastRemaining (iterative):")
    for n, expected in test_cases:
        result = lastRemaining(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} lastRemaining(n) = result, expected = expected")

    print("\nTesting lastRemainingRecursive:")
    for n, expected in test_cases:
        result = lastRemainingRecursive(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} lastRemainingRecursive(n) = result, expected = expected")
