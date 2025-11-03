"""
### INTUITION:
The key insight is that ANDing all numbers in a range is equivalent to finding the common binary prefix of the left and right boundaries. Any bit position where left and right differ will become 0 in the final result because there will be at least one number in the range with a 0 at that position.

### APPROACH:
1. When we AND consecutive numbers, any bit that changes value within the range will become 0 in the final result.
2. The only bits that remain 1 are those that form the common prefix of left and right when viewed in binary.
3. We can find this common prefix by repeatedly right-shifting both numbers until they become equal.
4. This effectively removes the differing suffix bits.
5. Once left equals right, we've found the common prefix.
6. We then left-shift this prefix back by the same number of positions to restore it to its original bit positions.
7. The number of shifts needed represents how many rightmost bits differ between left and right.
8. All these differing bits, plus any bits to their right, will be 0 in the final AND result.

### WHY THIS WORKS:
- Any complete range contains numbers with different bit patterns in the variable suffix
- When numbers differ at a bit position, ANDing them produces 0 at that position
- The common prefix bits never change within the range, so they survive the AND operation
- Right-shifting until equality finds exactly where the common prefix ends

### EXAMPLE WALKTHROUGH:
Input:
```
left = 5, right = 7
```

**Step 1:** Convert to binary: left = 101, right = 111

**Step 2:** First shift: left = 10, right = 11, shifts = 1

**Step 3:** Second shift: left = 1, right = 1, shifts = 2 (now equal!)

**Step 4:** Common prefix found: 1

**Step 5:** Shift back left by 2: 1 << 2 = 100 (binary) = 4 (decimal)

Output:
```
4
```

### TIME COMPLEXITY:
**O(log n)** - Where n is the maximum value in the range. We perform at most 32 right shifts for 32-bit integers, which is **O(log n)** where n is the maximum representable value.

### SPACE COMPLEXITY:
**O(1)** - We only use a constant amount of extra space for the shift counter variable, regardless of input size.

### EDGE CASES:
- **Same numbers (left == right):** Returns left (or right), common prefix is the entire number
- **Powers of 2 range:** Correctly finds the highest common power of 2
- **Zero in range:** If range includes 0, result is 0 (but problem constraints ensure left >= 0)
- **Adjacent numbers:** Returns their AND, which zeros out any differing bits

"""

from typing import Any


class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        """
        Approach: Find common binary prefix by right-shifting until equal
        Time Complexity: O(log n)
        Space Complexity: O(1)

        Args:
            left: Start of range (inclusive)
            right: End of range (inclusive)

        Returns:
            Bitwise AND of all numbers in range [left, right]
        """
        # Count how many bits differ between left and right
        shifts = 0

        # Keep shifting right until the numbers are equal
        # This finds their common binary prefix
        while left < right:
            left >>= 1
            right >>= 1
            shifts += 1

        # Shift the common prefix back to original position
        return left << shifts

    def rangeBitwiseAndBrute(self, left: int, right: int) -> int:
        """
        Brute Force Approach: AND all numbers in range
        Time Complexity: O(n) where n = right - left + 1
        Space Complexity: O(1)

        Args:
            left: Start of range (inclusive)
            right: End of range (inclusive)

        Returns:
            Bitwise AND of all numbers in range [left, right]

        Note: This approach is too slow for large ranges but demonstrates
        the problem definition clearly.
        """
        result = left
        for num in range(left + 1, right + 1):
            result &= num
            # Optimization: if result becomes 0, it stays 0
            if result == 0:
                break
        return result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Example from problem
    left1 = 5
    right1 = 7
    expected1 = 4
    result1 = solution.rangeBitwiseAnd(left1, right1)
    print(f"Input: left={left1}, right={right1}")
    print(f"Output: {result1}")
    print(f"Expected: {expected1}")
    print(f"Binary: {left1:b} to {right1:b} = {result1:b}")
    print()

    # Test case 2: Larger range
    left2 = 1
    right2 = 2147483647
    expected2 = 0
    result2 = solution.rangeBitwiseAnd(left2, right2)
    print(f"Input: left={left2}, right={right2}")
    print(f"Output: {result2}")
    print(f"Expected: {expected2}")
    print()

    # Test case 3: Same numbers
    left3 = 10
    right3 = 10
    expected3 = 10
    result3 = solution.rangeBitwiseAnd(left3, right3)
    print(f"Input: left={left3}, right={right3}")
    print(f"Output: {result3}")
    print(f"Expected: {expected3}")
    print()

    # Test case 4: Powers of 2
    left4 = 4
    right4 = 8
    expected4 = 0
    result4 = solution.rangeBitwiseAnd(left4, right4)
    print(f"Input: left={left4}, right={right4}")
    print(f"Output: {result4}")
    print(f"Expected: {expected4}")
    print()
