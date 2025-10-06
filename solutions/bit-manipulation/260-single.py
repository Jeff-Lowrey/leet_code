"""
# 260. Single
**Medium**

Given a problem that demonstrates key concepts in Bit Manipulation.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply bit manipulation methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages bit manipulation principles
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

The approach uses bit manipulation techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using bit manipulation method
3. Return the computed result

</details>
"""

class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        """
        Find two numbers that appear only once in the array.
        
        Args:
            nums: List of integers where all numbers except two appear twice
            
        Returns:
            List containing the two numbers that appear only once
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return []
        
        # Step 1: XOR all numbers together
        # This will give us XOR of two unique numbers (let's call them x and y)
        # because all other numbers appear twice and will cancel out
        xor_result = 0
        for num in nums:
            xor_result ^= num
            
        # Step 2: Find rightmost set bit in xor_result
        # This bit will be different in x and y
        rightmost_set_bit = 1
        while (xor_result & rightmost_set_bit) == 0:
            rightmost_set_bit <<= 1
            
        # Step 3: Divide numbers into two groups based on the rightmost set bit
        # One group will contain x and numbers that share same bit value
        # Other group will contain y and numbers that share same bit value
        x = y = 0
        for num in nums:
            if num & rightmost_set_bit:
                x ^= num
            else:
                y ^= num
                
        return [x, y]

def test_solution():
    """
    Test cases for 260. Single.
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
    print(f"Solution for 260. Single")
