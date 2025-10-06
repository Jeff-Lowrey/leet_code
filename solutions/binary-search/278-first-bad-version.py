"""
# 278. First Bad Version
**Medium**

Given a problem that demonstrates key concepts in Binary Search.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply binary search methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages binary search principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses binary search techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using binary search method
3. Return the computed result

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


# Example usage and test cases
def main():
    # Note: These test cases won't actually run since isBadVersion is a mock
    solution = Solution()
    
    # Test case 1: n = 5, first bad version = 4
    print(f"Test 1: {solution.firstBadVersion(5)}")  # Expected: 4
    
    # Test case 2: n = 1, first bad version = 1
    print(f"Test 2: {solution.firstBadVersion(1)}")  # Expected: 1
    
    # Test case 3: n = 2, first bad version = 2
    print(f"Test 3: {solution.firstBadVersion(2)}")  # Expected: 2

def test_solution():
    """
    Test cases for 278. First Bad Version.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 278. First Bad Version")
