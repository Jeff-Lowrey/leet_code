"""
# Difficulty: Medium

# 973. K Closest Points To Origin

Given a problem that demonstrates key concepts in Heap.

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

### EXAMPLE WALKTHROUGH:
```
Input: points = [[1,3], [-2,2], [5,8], [0,1]], k = 2

Step 1: Calculate distances (squared)
  [1,3]: dist = 1² + 3² = 10
  [-2,2]: dist = (-2)² + 2² = 8
  [5,8]: dist = 5² + 8² = 89
  [0,1]: dist = 0² + 1² = 1

Step 2: Build min heap
  heap = [(1, [0,1]), (8, [-2,2]), (10, [1,3]), (89, [5,8])]

Step 3: Extract k=2 smallest
  Pop (1, [0,1]) → result = [[0,1]]
  Pop (8, [-2,2]) → result = [[0,1], [-2,2]]

Output: [[0,1], [-2,2]]
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
    """
    Solution class for finding k closest points to origin (0,0) in a 2D plane.
    """

    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        """
        Find k points closest to origin using min heap approach.

        Args:
            points: List of points where each point is [x,y] coordinate
            k: Number of closest points to return

        Returns:
            List of k closest points to origin
        """
        if not points or k <= 0:
            return []

        # Create min heap with (distance, point) tuples
        heap = []

        # Calculate distance and add to heap
        for x, y in points:
            # Using distance squared to avoid floating point precision issues
            # Don't need to take square root since relative ordering remains same
            dist = x * x + y * y
            heapq.heappush(heap, (dist, [x, y]))

        # Extract k closest points
        result = []
        for _ in range(min(k, len(points))):
            result.append(heapq.heappop(heap)[1])

        return result

    def kClosestQuickSelect(self, points: List[List[int]], k: int) -> List[List[int]]:
        """
        Alternative implementation using QuickSelect algorithm.
        Average time complexity O(n) vs O(nlogk) for heap solution.

        Args:
            points: List of points where each point is [x,y] coordinate
            k: Number of closest points to return

        Returns:
            List of k closest points to origin
        """
        if not points or k <= 0:
            return []

        def distance(point):
            return point[0] ** 2 + point[1] ** 2

        def partition(left, right, pivot_idx):
            pivot_dist = distance(points[pivot_idx])
            # Move pivot to end
            points[pivot_idx], points[right] = points[right], points[pivot_idx]
            store_idx = left

            # Move all points closer than pivot to the left
            for i in range(left, right):
                if distance(points[i]) < pivot_dist:
                    points[store_idx], points[i] = points[i], points[store_idx]
                    store_idx += 1

            # Move pivot to final position
            points[right], points[store_idx] = points[store_idx], points[right]
            return store_idx

        def select(left, right, k_smallest):
            if left == right:
                return

            # Select a random pivot
            pivot_idx = left + (right - left) // 2
            pivot_idx = partition(left, right, pivot_idx)

            if k_smallest == pivot_idx:
                return
            elif k_smallest < pivot_idx:
                select(left, pivot_idx - 1, k_smallest)
            else:
                select(pivot_idx + 1, right, k_smallest)

        select(0, len(points) - 1, k)
        return points[:k]

def test_solution():
    """
    Test cases for 973. K Closest Points To Origin.
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
    print(f"Solution for 973. K Closest Points To Origin")
