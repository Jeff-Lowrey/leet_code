"""
LeetCode Problem 551: Student Attendance Record I
Difficulty: Easy
Category: Strings

Problem Description:
You are given a string s representing an attendance record for a student where each character
signifies whether the student was absent, late, or present on that day. The record only contains
the following three characters:
- 'A': Absent
- 'L': Late
- 'P': Present

The student is eligible for an attendance award if they meet both of the following criteria:
- The student was absent ('A') for strictly fewer than 2 days total.
- The student was never late ('L') for 3 or more consecutive days.

Return true if the student is eligible for an attendance award, or false otherwise.

Example 1:
Input: s = "PPALLP"
Output: true

Example 2:
Input: s = "PPALLL"
Output: false

Constraints:
- 1 <= s.length <= 1000
- s[i] is either 'A', 'L', or 'P'.

METADATA:
Techniques:
- String traversal
- Counting
- Pattern matching

Data Structures:
- String

Patterns:
- State tracking
- Condition checking

Time Complexity: O(n)
Space Complexity: O(1)

Intuition:
We need to track two conditions: total absences and consecutive lates. A single pass
through the string can count absences and detect 3+ consecutive lates.

Approach:
1. Count total 'A' characters - must be < 2
2. Check if "LLL" appears in string - must not appear

Why This Works:
We can check both conditions independently. Python's string methods make this trivial,
but we can also do it in a single pass by tracking absence count and consecutive late count.

Example Walkthrough:
s = "PPALLP"
- Absences: 1 (< 2) ✓
- "LLL" not present ✓
- Result: true

s = "PPALLL"
- Absences: 1 (< 2) ✓
- "LLL" present ✗
- Result: false
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
        print(f"{status} checkRecord(\"{s}\") = {result}, expected = {expected}")

    print("\nTesting checkRecordSinglePass:")
    for s, expected in test_cases:
        result = checkRecordSinglePass(s)
        status = "✓" if result == expected else "✗"
        print(f"{status} checkRecordSinglePass(\"{s}\") = {result}, expected = {expected}")
