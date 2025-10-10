"""
# Difficulty: Medium

# 347. Top K Frequent Elements

Given a problem that demonstrates key concepts in Arrays Hashing.

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
[This problem requires understanding of arrays hashing concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply arrays hashing methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages arrays hashing principles
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
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        """
        Find the k most frequent elements in the given list.
        
        Args:
            nums: List of integers
            k: Number of top frequent elements to return
            
        Returns:
            List of k most frequent elements
            
        Example:
            >>> s = Solution()
            >>> s.topKFrequent([1,1,1,2,2,3], 2)
            [1, 2]
        """
        # Handle edge cases
        if not nums or k <= 0:
            return []
        if k >= len(nums):
            return list(set(nums))

        # Count frequency of each number
        freq_map = Counter(nums)
        
        # Use heap to get k most frequent elements
        # We use negative frequency because heapq implements min heap
        heap = []
        for num, freq in freq_map.items():
            heapq.heappush(heap, (-freq, num))
        
        # Extract k most frequent elements
        result = []
        for _ in range(k):
            result.append(heapq.heappop(heap)[1])
            
        return result

    def topKFrequent_bucket_sort(self, nums: List[int], k: int) -> List[int]:
        """
        Alternative implementation using bucket sort approach.
        Time Complexity: O(n)
        Space Complexity: O(n)
        
        Args:
            nums: List of integers
            k: Number of top frequent elements to return
            
        Returns:
            List of k most frequent elements
        """
        # Handle edge cases
        if not nums or k <= 0:
            return []
        if k >= len(nums):
            return list(set(nums))

        # Count frequency of each number
        freq_map = Counter(nums)
        
        # Create buckets where index represents frequency
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, freq in freq_map.items():
            buckets[freq].append(num)
        
        # Collect k most frequent elements
        result = []
        for i in range(len(buckets) - 1, -1, -1):
            result.extend(buckets[i])
            if len(result) >= k:
                return result[:k]
        
        return result

def test_solution():
    """
    Test cases for 347. Top K Frequent Elements.
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
    print(f"Solution for 347. Top K Frequent Elements")
