"""
# Difficulty: Medium

# 239. Sliding Window Maximum

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,3,-1,-3,5,3,6,7], k = 3</dd>
<dt>Output:</dt>
<dd>[3,3,5,5,6,7]</dd>
<dt>Explanation:</dt>
<dd>The maximum value in each sliding window of size 3 is [3,3,5,5,6,7]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use deque to maintain indices of useful elements (potential maximums). Remove indices outside window. Remove indices with smaller values than current (they're never max). Front of deque is window maximum.

### APPROACH:
1. **Initialize deque**: Create deque to store indices of useful elements
2. **Process first window**: For first k elements, maintain decreasing order in deque
3. **Remove smaller elements**: Before adding nums[i], remove indices with smaller values from back
4. **Add current index**: Append i to deque
5. **Slide window**: For i from k to n, add deque front to result
6. **Remove out-of-window**: If deque front < i-k+1, remove it
7. **Maintain deque property**: Remove smaller elements from back, add current index
8. **Add last maximum**: Append last deque front to result, return result

### WHY THIS WORKS:
- Monotonic decreasing deque stores indices of potential maximums
- Front always contains current window's maximum
- Remove indices outside window from front, remove smaller values from back
- When adding element, pop back while deque[-1] < current
- O(n) time: each element added/removed once, O(k) space for deque

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Step 1: Use deque to track indices
  Window [1,3,-1]: max=3
  Window [3,-1,-3]: max=3
  Window [-1,-3,5]: max=5
  Window [-3,5,3]: max=5
  Window [5,3,6]: max=6
  Window [3,6,7]: max=7

Output: [3,3,5,5,6,7]
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

from typing import List, Optional, Dict, Tuple

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
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)
    expected = [3,3,5,5,6,7]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.maxSlidingWindow([], 0)
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 239. Sliding Window Maximum")
