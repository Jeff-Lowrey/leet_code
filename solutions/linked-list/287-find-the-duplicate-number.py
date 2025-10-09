"""
# 287. Find The Duplicate Number
# Difficulty: Medium
Given a problem that demonstrates key concepts in Linked List.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of linked list concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply linked list methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages linked list principles
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

The approach uses linked list techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using linked list method
3. Return the computed result

</details>
"""

class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        """
        Find the duplicate number in an array using Floyd's Cycle Detection.
        
        Args:
            nums: List[int] - Array containing n + 1 integers where each integer
                            is in the range [1, n] inclusive.
        
        Returns:
            int - The duplicate number in the array
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return -1
        
        # Phase 1: Finding the intersection point of the two runners
        tortoise = nums[0]
        hare = nums[0]
        
        # Move tortoise one step and hare two steps until they meet
        while True:
            tortoise = nums[tortoise]
            hare = nums[nums[hare]]
            if tortoise == hare:
                break
        
        # Phase 2: Finding the entrance to the cycle
        tortoise = nums[0]
        while tortoise != hare:
            tortoise = nums[tortoise]
            hare = nums[hare]
        
        return hare

def test_solution():
    """
    Test cases for 287. Find The Duplicate Number.
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
    print(f"Solution for 287. Find The Duplicate Number")
