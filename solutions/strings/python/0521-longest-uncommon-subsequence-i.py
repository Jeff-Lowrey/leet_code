"""
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

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 * - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 * - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


def findLUSlength(a: str, b: str) -> int:
    """
    Find the length of the longest uncommon subsequence.

    Args:
        a: First string
        b: Second string

    Returns:
        Length of longest uncommon subsequence, or -1 if none exists
    """
    # If strings are equal, no uncommon subsequence exists
    if a == b:
        return -1

    # Otherwise, the longer string is the longest uncommon subsequence
    return max(len(a), len(b))


if __name__ == "__main__":
    test_cases = [
        ("aba", "cdc", 3),
        ("aaa", "bbb", 3),
        ("aaa", "aaa", -1),
        ("a", "aa", 2),
        ("abc", "abc", -1),
        ("abc", "def", 3)
    ]

    print("Testing findLUSlength:")
    for a, b, expected in test_cases:
        result = findLUSlength(a, b)
        status = "✓" if result == expected else "✗"
        print(f"{status} findLUSlength(\"{a}\", \"{b}\") = result, expected = expected")
