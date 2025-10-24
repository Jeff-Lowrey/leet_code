"""
# Difficulty: Medium

# 0278. First Bad Version

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 5, first bad version = 4</dd>
<dt>Output:</dt>
<dd>4 (first bad version)</dd>
<dt>Explanation:</dt>
<dd>First bad version is found using binary search to minimize API calls</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Two Pointers, Binary Search
**Data Structures**: Hash Set, Tree
**Patterns**: Two Pointers Pattern, Binary Search Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The versions form a sorted sequence: [good...good, bad...bad]. Use binary search to find the boundary. If mid is bad, the first bad version is at mid or earlier; if good, it's after mid. Converge to the first bad version.

### APPROACH:
1. **Initialize search range**: Set left = 1, right = n
2. **Binary search loop**: While left < right, calculate mid = (left + right) // 2
3. **Check if bad**: Call isBadVersion(mid) to check if mid version is bad
4. **Search left half**: If isBadVersion(mid) is True, first bad is in left half including mid, set right = mid
5. **Search right half**: If isBadVersion(mid) is False, first bad is in right half, set left = mid + 1
6. **Converge to first bad**: Continue until left == right
7. **Return result**: Return left as the first bad version

### WHY THIS WORKS:
- Binary search for first occurrence of bad version
- If isBadVersion(mid) true, search left for earlier bad version (right = mid)
- If false, search right (left = mid + 1)
- Minimize API calls by halving search space each iteration
- O(log n) time, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5, first bad version = 4
```

Step 1: Initialize search space
left = 1, right = 5
Step 2: Binary search for first bad version
mid = 3: isBadVersion(3) = false

Steps:
Step 1: Bad version is on right, left = 4
Step 2: mid = 4: isBadVersion(4) = true
Step 3: This or earlier could be first bad, right = 4
Step 4: left = right = 4
Step 5: Verify result
Step 6: isBadVersion(4) = true
Step 7: isBadVersion(3) = false

Output:
```
4 (first bad version)
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""


class Solution:
    def firstBadVersion(self, n: int) -> int:
        """
        Finds the first bad version using binary search.

        Args:
            n (int): The total number of versions

        Returns:
            int: The first bad version number
        """
        left = 1  # Starting version
        right = n  # Ending version

        # Binary search to find the first bad version
        while left < right:
            # Calculate mid point without overflow
            mid = left + (right - left) // 2

            # If current version is bad, look in left half
            if isBadVersion(mid):
                right = mid
            # If current version is good, look in right half
            else:
                left = mid + 1

        # At this point, left == right and points to the first bad version
        return left


# Mock isBadVersion API for testing
_bad_version = 4


def isBadVersion(version: int) -> bool:
    """Mock API that returns True if version is bad."""
    return version >= _bad_version


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    global _bad_version
    solution = Solution()

    # Test case 1: n = 5, first bad version = 4
    _bad_version = 4
    result = solution.firstBadVersion(5)
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 2: n = 1, first bad version = 1
    _bad_version = 1
    result = solution.firstBadVersion(1)
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: n = 10, first bad version = 7
    _bad_version = 7
    result = solution.firstBadVersion(10)
    expected = 7
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 278. First Bad Version")
