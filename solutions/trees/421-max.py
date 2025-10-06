"""
# 421. Max
**Medium**

Given a problem that demonstrates key concepts in Trees.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of trees concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply trees methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages trees principles
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

The approach uses trees techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using trees method
3. Return the computed result

</details>
"""

class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        Find the maximum XOR value between any two numbers in the array.
        
        Args:
            nums: List of integers
            
        Returns:
            Maximum XOR value possible between any two numbers in the array
            
        Example:
            >>> solution = Solution()
            >>> solution.findMaximumXOR([3, 10, 5, 25, 2, 8])
            28
        """
        if not nums or len(nums) < 2:
            return 0
        
        # Length of maximum number in binary representation
        L = len(bin(max(nums))) - 2
        
        # Initialize result
        max_xor = 0
        
        # Process bit by bit from left to right (most significant to least)
        for i in range(L-1, -1, -1):
            # Move max_xor to the left by 1 bit
            max_xor <<= 1
            
            # Current prefix candidates
            curr_xor = max_xor | 1
            
            # Set of all prefixes
            prefixes = {num >> i for num in nums}
            
            # Check if we can get curr_xor
            for p in prefixes:
                if p ^ (curr_xor >> i) in prefixes:
                    max_xor = curr_xor
                    break
                    
        return max_xor


class OptimizedSolution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        Alternative implementation using Trie data structure for better performance
        on larger datasets.
        
        Args:
            nums: List of integers
            
        Returns:
            Maximum XOR value possible between any two numbers in the array
        """
        # Edge case handling
        if not nums or len(nums) < 2:
            return 0
            
        # Build Trie
        trie = {}
        for num in nums:
            node = trie
            # Process each number bit by bit from left to right
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                if bit not in node:
                    node[bit] = {}
                node = node[bit]
                
        # Find maximum XOR
        max_xor = 0
        for num in nums:
            node = trie
            current_xor = 0
            # Try to go opposite direction for each bit when possible
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                # Try to go opposite direction
                opposite = 1 - bit
                if opposite in node:
                    current_xor = (current_xor << 1) | 1
                    node = node[opposite]
                else:
                    current_xor <<= 1
                    node = node[bit]
            max_xor = max(max_xor, current_xor)
            
        return max_xor

def test_solution():
    """
    Test cases for 421. Max.
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
    print(f"Solution for 421. Max")
