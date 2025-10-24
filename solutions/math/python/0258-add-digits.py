"""
# 258. Add Digits

# Difficulty: Easy

Solve the Add Digits problem as described.

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
**Techniques**: - Digital root formula
**Data Structures**: - Integer operations
**Patterns**: - Digital root
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

def addDigits(num: int) -> int:
    """
    Calculate the digital root of a number using the mathematical formula.

    Args:
        num: Non-negative integer

    Returns:
        Single digit result after repeatedly adding digits
    """
    # Handle zero case
    if num == 0:
        return 0

    # Digital root formula
    return 1 + (num - 1) % 9


def addDigitsNaive(num: int) -> int:
    """
    Alternative solution using iteration (not O(1) time).

    Args:
        num: Non-negative integer

    Returns:
        Single digit result after repeatedly adding digits
    """
    while num >= 10:
        digit_sum = 0
        while num > 0:
            digit_sum += num % 10
            num //= 10
        num = digit_sum

    return num


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (38, 2),
        (0, 0),
        (9, 9),
        (10, 1),
        (99, 9),
        (100, 1),
        (1234, 1),
        (199, 1)
    ]

    print("Testing addDigits (O(1) solution):")
    for num, expected in test_cases:
        result = addDigits(num)
        status = "✓" if result == expected else "✗"
        print(f"{status} addDigits({num}) = result, expected = expected")

    print("\nTesting addDigitsNaive (iterative solution):")
    for num, expected in test_cases:
        result = addDigitsNaive(num)
        status = "✓" if result == expected else "✗"
        print(f"{status} addDigitsNaive({num}) = result, expected = expected")
