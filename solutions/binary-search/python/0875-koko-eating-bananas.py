"""
# Difficulty: Medium

# 0875. Koko Eating Bananas

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>piles = [3,6,7,11], h = 8</dd>
<dt>Output:</dt>
<dd>4 (minimum eating speed)</dd>
<dt>Explanation:</dt>
<dd>Minimum eating speed k=4 allows finishing all banana piles within h hours</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Binary search on the eating speed k, not the array. The minimum k is 1, maximum is max(piles). For each mid speed, calculate total hours needed. If hours <= h, try smaller k; otherwise try larger k. Find the minimum valid k.

### APPROACH:
1. **Define search range**: Set left = 1 (minimum speed), right = max(piles) (maximum speed)
2. **Binary search on speed**: While left < right, calculate mid = (left + right) // 2
3. **Calculate hours needed**: For speed mid, compute hours = sum(ceil(pile / mid) for pile in piles)
4. **Check feasibility**: Compare hours with h to determine if speed mid works
5. **Speed too slow**: If hours > h, increase speed: left = mid + 1
6. **Speed works**: If hours <= h, try slower speed: right = mid
7. **Find minimum speed**: Continue until left == right
8. **Return result**: Return left as the minimum eating speed

### WHY THIS WORKS:
- Binary search on eating speed: min=1, max=max(piles)
- For each speed k, calculate hours needed: ceil(pile / k) for each pile
- If total hours <= h, try smaller speed (right = mid - 1)
- If total hours > h, need faster speed (left = mid + 1)
- O(n log m) time: log m binary search, O(n) to verify, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
piles = [3,6,7,11], h = 8
```

Step 1: Initialize search space
left = 1 (min speed), right = 11 (max pile size)
Step 2: Binary search for minimum speed
mid = 6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8

Steps:
Step 1: Try lower speed, right = 6
Step 2: mid = 3: hours = ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8
Step 3: Need higher speed, left = 4
Step 4: mid = 5: hours = ceil(3/5)+ceil(6/5)+ceil(7/5)+ceil(11/5) = 1+2+2+3 = 8 ≤ 8
Step 5: Try lower speed, right = 5
Step 6: mid = 4: hours = ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ≤ 8
Step 7: Try lower speed, right = 4
Step 8: left = right = 4

Output:
```
4 (minimum eating speed)
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
import math


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        """
        Find the minimum eating speed required to consume all bananas within h hours.

        Args:
            piles: List of banana piles where piles[i] represents bananas in ith pile
            h: Number of hours available to eat all bananas

        Returns:
            Minimum eating speed (bananas per hour) required
        """
        # Initialize binary search boundaries
        left = 1  # Minimum possible eating speed
        right = max(piles)  # Maximum possible eating speed

        # Binary search for the minimum valid eating speed
        while left < right:
            mid = (left + right) // 2
            hours_needed = sum(math.ceil(pile / mid) for pile in piles)

            if hours_needed <= h:
                # If we can eat all bananas within h hours,
                # try a lower speed
                right = mid
            else:
                # If we can't eat all bananas within h hours,
                # need a higher speed
                left = mid + 1

        return left

    def calculate_hours_needed(self, piles: List[int], speed: int) -> int:
        """
        Calculate total hours needed to eat all bananas at given speed.

        Args:
            piles: List of banana piles
            speed: Eating speed (bananas per hour)

        Returns:
            Total hours needed
        """
        return sum(math.ceil(pile / speed) for pile in piles)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.minEatingSpeed([3, 6, 7, 11], h=8)
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single pile
    result = solution.minEatingSpeed([30], 10)
    expected = 3
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 875. Koko Eating Bananas")
