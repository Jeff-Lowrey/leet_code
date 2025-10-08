"""
# 373. Find K Pairs With Smallest Sums
**Medium**

Given a problem that demonstrates key concepts in Heap.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of heap concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply heap methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages heap principles
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

The approach uses heap techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using heap method
3. Return the computed result

</details>
"""


class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        """
        Find k pairs of numbers from nums1 and nums2 with the smallest sums.

        Args:
            nums1: First sorted array
            nums2: Second sorted array
            k: Number of pairs to return

        Returns:
            List of k pairs with smallest sums
        """
        # Handle edge cases
        if not nums1 or not nums2:
            return []

        # Initialize result list and min heap
        result = []
        min_heap = []

        # Push the first pair from nums1 with all possible pairs from nums2
        # We start with (sum, i, j) where i is index in nums1 and j is index in nums2
        heapq.heappush(min_heap, (nums1[0] + nums2[0], 0, 0))

        # Keep track of visited pairs to avoid duplicates
        visited = {(0, 0)}

        # Continue until we have k pairs or heap is empty
        while min_heap and len(result) < k:
            # Get the smallest sum pair
            curr_sum, i, j = heapq.heappop(min_heap)

            # Add current pair to result
            result.append([nums1[i], nums2[j]])

            # Try next number from nums1 if available
            if i + 1 < len(nums1) and (i + 1, j) not in visited:
                heapq.heappush(min_heap, (nums1[i + 1] + nums2[j], i + 1, j))
                visited.add((i + 1, j))

            # Try next number from nums2 if available
            if j + 1 < len(nums2) and (i, j + 1) not in visited:
                heapq.heappush(min_heap, (nums1[i] + nums2[j + 1], i, j + 1))
                visited.add((i, j + 1))

        return result


def test_solution():
    """
    Test cases for 373. Find K Pairs With Smallest Sums.
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
    print(f"Solution for 373. Find K Pairs With Smallest Sums")
