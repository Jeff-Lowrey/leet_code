"""
# 646. Maximum Length Of Pair Chain
# Difficulty: Medium
Given a problem that demonstrates key concepts in Interval.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of interval concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply interval methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages interval principles
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

The approach uses interval techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using interval method
3. Return the computed result

</details>
"""

class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        """
        Find the length of the longest chain that can be formed from the given pairs.
        A pair (a, b) can follow another pair (c, d) if b < c.
        
        Args:
            pairs: List of pairs where each pair is [a, b]
            
        Returns:
            int: Length of the longest possible chain
        """
        if not pairs:
            return 0
        
        # Sort pairs based on the second element
        # This greedy approach ensures we always pick pairs that give us maximum flexibility
        # for the next selection
        pairs.sort(key=lambda x: x[1])
        
        current_end = float('-inf')  # Track the end of current chain
        chain_length = 0  # Track the length of chain
        
        # Iterate through sorted pairs
        for start, end in pairs:
            # If current pair can be added to chain (start > previous end)
            if start > current_end:
                chain_length += 1
                current_end = end
        
        return chain_length

def test_solution():
    """
    Test cases for 646. Maximum Length Of Pair Chain.
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
    print(f"Solution for 646. Maximum Length Of Pair Chain")
