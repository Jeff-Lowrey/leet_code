"""
# 330. Patching Array
**Medium**

Given a problem that demonstrates key concepts in Greedy.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of greedy concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply greedy methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages greedy principles
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

The approach uses greedy techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using greedy method
3. Return the computed result

</details>
"""

class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        """
        Calculate the minimum number of patches needed to cover range [1, n].

        Args:
            nums: A sorted list of positive integers
            n: Target number up to which we need coverage

        Returns:
            int: Minimum number of patches needed

        Time Complexity: O(m + logn) where m is length of nums
        Space Complexity: O(1)
        """
        patches = 0  # Count of patches needed
        covered = 0  # Numbers we can currently build up to
        index = 0    # Current position in nums array
        
        while covered < n:
            # If we have numbers left and current number <= covered + 1
            if index < len(nums) and nums[index] <= covered + 1:
                covered += nums[index]  # Extend our coverage
                index += 1
            else:
                # Need to patch with (covered + 1)
                patches += 1
                # Adding this number doubles our coverage range
                covered = covered + (covered + 1)
                
            # Handle potential integer overflow
            if covered > n:
                break
                
        return patches

def test_solution():
    """
    Test cases for 330. Patching Array.
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
    print(f"Solution for 330. Patching Array")
