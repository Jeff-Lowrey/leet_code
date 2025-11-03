"""
### INTUITION:
The key insight is that for each number, count set bits. Pattern: dp[i] = dp[i >> 1] + (i & 1). The count for i equals count for i/2 plus the last bit of i.

### APPROACH:
1. **Initialize result array**: Create result = [0] * (n + 1) to store counts for 0 to n
2. **Iterate from 1 to n**: Loop with index i from 1 to n
3. **Use recurrence relation**: Set result[i] = result[i >> 1] + (i & 1)
4. **Understand i >> 1**: Right shift removes the rightmost bit, giving count for i//2
5. **Add rightmost bit**: (i & 1) adds 1 if rightmost bit is set, 0 otherwise
6. **Build incrementally**: Each result[i] uses previously computed result[i//2]
7. **Return result**: Return complete result array with counts for all numbers 0 to n

### WHY THIS WORKS:
- This ensures that dP: count[i] = count[i >> 1] + (i & 1)
- This ensures that bit shift right removes last bit, i & 1 checks if last bit is 1
- This ensures that reuse previous results: i >> 1 is already computed
- This ensures that alternatively: count[i] = count[i & (i-1)] + 1 (remove rightmost 1)
- This ensures that o(n) time: each number processed once, O(1) space excluding output

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5
```

Step 1: Count bits for each number from 0 to 5

Steps:
Step 1: 0 = 000 → 0 bits
Step 2: 1 = 001 → 1 bit
Step 3: 2 = 010 → 1 bit
Step 4: 3 = 011 → 2 bits
Step 5: 4 = 100 → 1 bit
Step 6: 5 = 101 → 2 bits
Step 7: DP relation: count[i] = count[i>>1] + (i&1)
Step 8: count[0] = 0
Step 9: count[1] = count[0] + 1 = 1
Step 10: count[2] = count[1] + 0 = 1
Step 11: count[3] = count[1] + 1 = 2
Step 12: count[4] = count[2] + 0 = 1
Step 13: count[5] = count[2] + 1 = 2

Output:
```
[0,1,1,2,1,2]
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

</details>

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def countBits(self, n: int) -> List[int]:
        """
        Returns an array where ans[i] is the number of 1's in the binary
        representation of i.

        The solution uses dynamic programming with the observation that:
        For any number x, countBits(x) = countBits(x/2) + (x % 2)

        Args:
            n (int): The upper bound number (inclusive)

        Returns:
            List[int]: Array containing count of 1's for each number from 0 to n

        Example:
            >>> solution = Solution()
            >>> solution.countBits(5)
            [0, 1, 1, 2, 1, 2]
        """
        # Initialize result array with 0s
        result = [0] * (n + 1)

        # Iterate from 1 to n
        for i in range(1, n + 1):
            # A number's bit count can be calculated using its half value
            # plus checking if the number is odd (has a 1 in its least significant bit)
            result[i] = result[i >> 1] + (i & 1)

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.countBits(5)
    expected = [0, 1, 1, 2, 1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Base case n=0
    result = solution.countBits(0)
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Small power of 2
    result = solution.countBits(2)
    expected = [0, 1, 1]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 338. Counting")
