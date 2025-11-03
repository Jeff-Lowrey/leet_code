"""
### INTUITION:
The key insight is that calculate distance for each point. Use max heap (negate distances) of size k. Maintain k closest points. Alternatively, use quickselect for O(n) average time.

### APPROACH:
1. **Calculate distances**: For each point, compute squared distance = x^2 + y^2
2. **Build min heap**: Push (distance, point) tuples to heap
3. **Use heapify**: Or push one by one using heappush
4. **Extract k smallest**: Pop from heap k times
5. **Build result**: For each popped element, add point to result
6. **Return result**: Return list of k closest points

### WHY THIS WORKS:
- This ensures that max heap of size k: stores (negative distance, point) to get k smallest
- This ensures that for each point, calculate distance squared (avoid sqrt for efficiency)
- This ensures that if heap size < k, push; else if distance < heap[0], pop and push
- This ensures that negative distance converts min heap to max heap behavior
- This ensures that o(n log k) time: n points, log k heap operations, O(k) space

### EXAMPLE WALKTHROUGH:
Input:
```
points = [[1,3], [-2,2], [5,8], [0,1]], k = 2
```

Step 1: Calculate distances (squared)
[1,3]: dist = 1² + 3² = 10
[-2,2]: dist = (-2)² + 2² = 8
[5,8]: dist = 5² + 8² = 89
[0,1]: dist = 0² + 1² = 1
Step 2: Build min heap
heap = [(1, [0,1]), (8, [-2,2]), (10, [1,3]), (89, [5,8])]
Step 3: Extract k=2 smallest

Steps:
Step 1: Pop (1, [0,1]) → result = [[0,1]]
Step 2: Pop (8, [-2,2]) → result = [[0,1], [-2,2]]

Output:
```
[[0,1], [-2,2]]
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

import heapq

from typing import Any, List, Optional, Dict, Tuple


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
        heap: list[Any] = []

        # Calculate distance and add to heap
        for x, y in points:
            # Using distance squared to avoid floating point precision issues
            # Don't need to take square root since relative ordering remains same
            dist = x * x + y * y
            heapq.heappush(heap, (dist, [x, y]))

        # Extract k closest points
        result: list[Any] = []
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

        def distance(point: Any) -> Any:
            return point[0] ** 2 + point[1] ** 2

        def partition(left: Any, right: Any, pivot_idx: Any) -> Any:
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

        def select(left: Any, right: Any, k_smallest: Any) -> Any:
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


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.kClosest([[1, 3], [-2, 2], [5, 8], [0, 1]], k=2)
    expected = [[0, 1], [-2, 2]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.kClosest([], 0)
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 973. K Closest Points To Origin")
