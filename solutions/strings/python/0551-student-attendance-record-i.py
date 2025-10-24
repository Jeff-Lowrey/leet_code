"""
# 551. Student Attendance Record I

# Difficulty: Easy

Solve the Student Attendance Record I problem as described.

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
**Techniques**: - String traversal
**Data Structures**: - String
**Patterns**: - State tracking
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


def checkRecord(s: str) -> bool:
    """
    Check if student is eligible for attendance award.

    Args:
        s: Attendance record string

    Returns:
        True if eligible, False otherwise
    """
    # Method 1: Simple and concise
    return s.count('A') < 2 and 'LLL' not in s


def checkRecordSinglePass(s: str) -> bool:
    """
    Alternative solution with single pass.

    Args:
        s: Attendance record string

    Returns:
        True if eligible, False otherwise
    """
    absent_count = 0
    consecutive_late = 0

    for char in s:
        if char == 'A':
            absent_count += 1
            if absent_count >= 2:
                return False
            consecutive_late = 0
        elif char == 'L':
            consecutive_late += 1
            if consecutive_late >= 3:
                return False
        else:  # 'P'
            consecutive_late = 0

    return True


if __name__ == "__main__":
    test_cases = [
        ("PPALLP", True),
        ("PPALLL", False),
        ("ALLAPPL", False),
        ("LALL", True),
        ("PPPPPP", True),
        ("AAAA", False),
        ("LLLLLL", False),
        ("LPALPLAP", True)
    ]

    print("Testing checkRecord:")
    for s, expected in test_cases:
        result = checkRecord(s)
        status = "✓" if result == expected else "✗"
        print(f"{status} checkRecord(\"{s}\") = result, expected = expected")

    print("\nTesting checkRecordSinglePass:")
    for s, expected in test_cases:
        result = checkRecordSinglePass(s)
        status = "✓" if result == expected else "✗"
        print(f"{status} checkRecordSinglePass(\"{s}\") = result, expected = expected")
