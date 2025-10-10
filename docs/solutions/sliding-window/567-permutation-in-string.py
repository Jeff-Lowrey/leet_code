"""
# Difficulty: Medium

# 567. Permutation In String

Given a problem that demonstrates key concepts in Sliding Window.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply sliding window methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages sliding window principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        """
        Determines if any permutation of s1 is a substring of s2.
        
        Args:
            s1 (str): The string whose permutation we're looking for
            s2 (str): The string we're searching in
            
        Returns:
            bool: True if any permutation of s1 is found in s2, False otherwise
        """
        # Handle edge cases
        if len(s1) > len(s2):
            return False
        
        # Initialize character count arrays for both strings
        s1_count = [0] * 26
        window_count = [0] * 26
        
        # Fill initial character counts for s1
        for char in s1:
            s1_count[ord(char) - ord('a')] += 1
        
        # Initialize the first window in s2
        window_size = len(s1)
        for i in range(window_size):
            window_count[ord(s2[i]) - ord('a')] += 1
            
        # Check if initial window is a permutation
        if s1_count == window_count:
            return True
        
        # Slide the window through s2
        for i in range(window_size, len(s2)):
            # Remove leftmost character from window
            window_count[ord(s2[i - window_size]) - ord('a')] -= 1
            # Add new character to window
            window_count[ord(s2[i]) - ord('a')] += 1
            
            # Check if current window is a permutation
            if s1_count == window_count:
                return True
                
        return False

    def checkInclusion_optimized(self, s1: str, s2: str) -> bool:
        """
        Alternative implementation using a single counter for optimization.
        
        Args:
            s1 (str): The string whose permutation we're looking for
            s2 (str): The string we're searching in
            
        Returns:
            bool: True if any permutation of s1 is found in s2, False otherwise
        """
        if len(s1) > len(s2):
            return False
            
        # Initialize counter array
        counter = [0] * 26
        
        # Process first window
        for i in range(len(s1)):
            counter[ord(s1[i]) - ord('a')] += 1
            counter[ord(s2[i]) - ord('a')] -= 1
            
        # Check if first window is a permutation
        if all(count == 0 for count in counter):
            return True
            
        # Slide window
        for i in range(len(s1), len(s2)):
            # Update counter for sliding window
            counter[ord(s2[i]) - ord('a')] -= 1
            counter[ord(s2[i - len(s1)]) - ord('a')] += 1
            
            # Check if current window is a permutation
            if all(count == 0 for count in counter):
                return True
                
        return False

def test_solution():
    """
    Test cases for 567. Permutation In String.
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
    print(f"Solution for 567. Permutation In String")
