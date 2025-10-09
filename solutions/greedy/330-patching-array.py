"""
# 330. Patching Array
# Difficulty: Hard
You are given a sorted positive integer array nums and an integer n. You need to
make it so that any integer in the range [1, n] can be formed by the sum of some
elements from nums.

Return the minimum number of patches (additions to the array) required.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The key insight is tracking what range [1, covered] we can currently form. If we
can form [1, covered], and we have a number x where x <= covered + 1, then adding
x extends our range to [1, covered + x]. If x > covered + 1, we have a gap and
need to patch with (covered + 1).

### APPROACH:
1. **Track coverage**: Maintain the maximum number we can currently build
2. **Use available numbers**: If nums[i] <= covered + 1, use it to extend coverage
3. **Patch when needed**: If nums[i] > covered + 1, patch with (covered + 1)
4. **Greedy choice**: Always patch with (covered + 1) as it doubles our coverage

### WHY GREEDY WORKS:
- **Optimal patching**: Patching with (covered + 1) is always optimal because:
  - We can already form [1, covered]
  - Adding (covered + 1) extends range to [1, 2*covered + 1]
  - No other patch value gives better extension
- **No backtracking needed**: Each decision is locally and globally optimal

### PROOF OF GREEDY CHOICE:
If we can form [1, covered], adding value v:
- If v = covered + 1: New range is [1, 2*covered + 1]
- If v > covered + 1: New range is [1, covered] ∪ [v, covered + v] (has gap)
- If v < covered + 1: New range is [1, covered + v] (less than optimal)
Therefore, v = covered + 1 is optimal for patching.

### TIME COMPLEXITY: O(m + log n)
Where m is length of nums. In worst case, we need log(n) patches.

### SPACE COMPLEXITY: O(1)
Only using constant extra space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,3], n = 6

covered = 0, patches = 0

Step 1: 1 <= 0+1? Yes → covered = 0+1 = 1
        Can now form: [1,1]

Step 2: 3 <= 1+1? No (3 > 2) → Need patch!
        Patch with 2, patches = 1
        covered = 1 + 2 = 3
        Can now form: [1,3]

Step 3: 3 <= 3+1? Yes → covered = 3+3 = 6
        Can now form: [1,6]

Step 4: covered >= 6, done!

Output: 1 (patched with 2)
```

### DETAILED EXAMPLE:
```
Input: nums = [1,5,10], n = 20

Initial: covered = 0, patches = 0

i=0: 1 <= 0+1? Yes → covered = 0+1 = 1, can form [1,1]
i=1: 5 <= 1+1? No → patch with 2, patches=1, covered = 1+2 = 3
     5 <= 3+1? No → patch with 4, patches=2, covered = 3+4 = 7
     5 <= 7+1? Yes → covered = 7+5 = 12, can form [1,12]
i=2: 10 <= 12+1? Yes → covered = 12+10 = 22 >= 20, done!

Output: 2 (patched with 2 and 4)
```

### EDGE CASES:
- Empty array: Need to patch from 1 up to n
- Array already covers [1,n]: No patches needed
- Large n with small array: Multiple patches required
- Array starts with value > 1: Need to patch 1 first

### KEY INSIGHTS:
- Coverage doubling: Adding (covered + 1) doubles the range
- Greedy is optimal: No need to consider other patch values
- Use before patch: Always try to use existing numbers first

</details>
"""

class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        """
        Calculate the minimum number of patches needed to cover range [1, n].

        Args:
            nums: A sorted list of positive integers
            n: Target number up to which we need coverage

        Returns:
            int: Minimum number of patches needed

        Time Complexity: O(m + logn) where m is length of nums
        Space Complexity: O(1)
        """
        patches = 0  # Count of patches needed
        covered = 0  # Numbers we can currently build up to
        index = 0    # Current position in nums array
        
        while covered < n:
            # If we have numbers left and current number <= covered + 1
            if index < len(nums) and nums[index] <= covered + 1:
                covered += nums[index]  # Extend our coverage
                index += 1
            else:
                # Need to patch with (covered + 1)
                patches += 1
                # Adding this number doubles our coverage range
                covered = covered + (covered + 1)
                
            # Handle potential integer overflow
            if covered > n:
                break
                
        return patches

def test_solution():
    """
    Test cases for 330. Patching Array.
    """
    from typing import List

    class Solution:
        def minPatches(self, nums: List[int], n: int) -> int:
            patches = 0
            covered = 0
            index = 0

            while covered < n:
                if index < len(nums) and nums[index] <= covered + 1:
                    covered += nums[index]
                    index += 1
                else:
                    patches += 1
                    covered = covered + (covered + 1)

                if covered > n:
                    break

            return patches

    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.minPatches([1,3], 6)
    expected1 = 1
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: More patches needed
    result2 = solution.minPatches([1,5,10], 20)
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty array
    result3 = solution.minPatches([], 7)
    expected3 = 3  # Need to patch with 1, 2, 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Already complete
    result4 = solution.minPatches([1,2,2], 5)
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Large n
    result5 = solution.minPatches([1,2,31,33], 2147483647)
    expected5 = 28
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single element
    result6 = solution.minPatches([1], 1)
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Gap at start
    result7 = solution.minPatches([2], 5)
    expected7 = 2  # Need 1 and 4
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    from typing import List

    class Solution:
        def minPatches(self, nums: List[int], n: int) -> int:
            patches = 0
            covered = 0
            index = 0

            while covered < n:
                if index < len(nums) and nums[index] <= covered + 1:
                    covered += nums[index]
                    index += 1
                else:
                    patches += 1
                    covered = covered + (covered + 1)

                if covered > n:
                    break

            return patches

    solution = Solution()
    print("=== 330. Patching Array ===")
    print(f"minPatches([1,3], 6) -> {solution.minPatches([1,3], 6)}")
    print(f"minPatches([1,5,10], 20) -> {solution.minPatches([1,5,10], 20)}")
    print(f"minPatches([], 7) -> {solution.minPatches([], 7)}")
