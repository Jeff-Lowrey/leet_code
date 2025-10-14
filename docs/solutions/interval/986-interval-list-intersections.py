"""
# Difficulty: Medium

# 986. Interval List Intersections

You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]</dd>
<dt>Output:</dt>
<dd>[[1,2],[5,5],[8,10]]</dd>
<dt>Explanation:</dt>
<dd>Intersection of [[0,2],[5,10],[13,23],[24,25]] and [[1,5],[8,12],[15,24],[25,26]] is [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use two pointers, one for each sorted list. At each step, if intervals intersect, add intersection. Move pointer of interval with smaller end forward. Continue until either list is exhausted.

### APPROACH:
1. **Initialize pointers**: Set i = 0, j = 0, result = []
2. **While both valid**: While i < len(firstList) and j < len(secondList)
3. **Find intersection**: start = max(firstList[i][0], secondList[j][0]), end = min(firstList[i][1], secondList[j][1])
4. **Check validity**: If start <= end, append [start, end] to result
5. **Advance pointer**: If firstList[i][1] < secondList[j][1], increment i; else increment j
6. **Continue processing**: Handle all intervals
7. **Return result**: Return list of intersections

### WHY THIS WORKS:
- Two pointers on sorted interval lists
- Intersection exists if max(start1, start2) <= min(end1, end2)
- Move pointer with earlier end time forward
- Collect all valid intersections as we scan
- O(m + n) time: scan both lists once, O(k) space for k intersections

### EXAMPLE WALKTHROUGH:
```
Input: firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]
Step 1: Two pointers
  i=0, j=0: [0,2] ∩ [1,5] = [1,2]
  i=1, j=0: [5,10] ∩ [1,5] = [5,5]
  i=1, j=1: [5,10] ∩ [8,12] = [8,10]

Output: [[1,2],[5,5],[8,10]]
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
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        """
        Find all intersections between two lists of intervals.
        
        Args:
            firstList: First list of intervals where each interval is [start, end]
            secondList: Second list of intervals where each interval is [start, end]
            
        Returns:
            List of intervals representing all intersections between the input lists
        """
        # Initialize result list and pointers
        result = []
        i = j = 0
        
        # Process intervals while we have elements in both lists
        while i < len(firstList) and j < len(secondList):
            # Get current intervals from both lists
            interval1 = firstList[i]
            interval2 = secondList[j]
            
            # Find the intersection points
            start = max(interval1[0], interval2[0])
            end = min(interval1[1], interval2[1])
            
            # If there is a valid intersection, add it to result
            if start <= end:
                result.append([start, end])
            
            # Move the pointer of the interval that ends earlier
            if interval1[1] < interval2[1]:
                i += 1
            else:
                j += 1
                
        return result

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.intervalIntersection([[0,2],[5,10]], [[1,5],[8,12]])
    expected = [[1,2],[5,5],[8,10]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: No intersections
    result = solution.intervalIntersection([[1,3],[5,9]], [[4,4],[10,12]])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Complete overlap
    result = solution.intervalIntersection([[1,7]], [[3,10]])
    expected = [[3,7]]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty first list
    result = solution.intervalIntersection([], [[1,5]])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Empty second list
    result = solution.intervalIntersection([[1,5]], [])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 986. Interval List Intersections")
