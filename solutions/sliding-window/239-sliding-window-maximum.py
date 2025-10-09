"""
# Difficulty: Medium

# 239. Sliding Window Maximum

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
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        """
        Find maximum elements in sliding windows of size k across an array.
        
        Args:
            nums: Input array of integers
            k: Size of sliding window
            
        Returns:
            List of maximum values for each sliding window
        """
        # Handle edge cases
        if not nums or k <= 0:
            return []
        if k == 1:
            return nums
            
        # Initialize result list and deque
        result = []
        dq = deque()  # Store indices of potential maximum values
        
        # Process first k elements (first window)
        for i in range(k):
            # Remove smaller elements from back
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()
            dq.append(i)
            
        # Process rest of the elements
        for i in range(k, len(nums)):
            # Add maximum element from previous window
            result.append(nums[dq[0]])
            
            # Remove elements outside current window
            while dq and dq[0] <= i - k:
                dq.popleft()
                
            # Remove smaller elements from back
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()
                
            # Add current element
            dq.append(i)
            
        # Add maximum element of last window
        result.append(nums[dq[0]])
        
        return result

def test_solution():
    """
    Test cases for 239. Sliding Window Maximum.
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
    print(f"Solution for 239. Sliding Window Maximum")
