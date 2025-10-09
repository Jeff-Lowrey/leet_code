"""
# Difficulty: Medium

Given a binary array nums and an integer goal, return the number of non-empty subarrays
with a sum equal to goal.

A subarray is a contiguous part of the array.

Example:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are [1,0,1], [1,0,1,0], [0,1,0,1], [1,0,1]

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
Use prefix sum with hash map. For each position, count how many previous positions
have prefix_sum = current_prefix_sum - goal. This gives us all subarrays ending at
current position with sum equal to goal.

### APPROACH:
1. **Hash Map**: Store (prefix_sum → frequency) pairs
2. **Prefix Sum**: Calculate cumulative sum
3. **Count**: For each position, add count of (current_sum - goal) from map
4. **Update**: Add current sum to map for future positions

### WHY THIS WORKS:
If prefix[j] - prefix[i] = goal, then sum(nums[i+1:j+1]) = goal.
For each j, count all i where prefix[i] = prefix[j] - goal.

### EXAMPLE WALKTHROUGH:
```
nums = [1,0,1,0,1], goal = 2
Prefix sums: [1, 1, 2, 2, 3]

Initialize: {0: 1}  # prefix sum 0 at position -1
Index 0: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:1}
Index 1: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:2}
Index 2: sum=2, need 2-2=0 (found 1), count=1, add {0:1, 1:2, 2:1}
Index 3: sum=2, need 2-2=0 (found 1), count=2, add {0:1, 1:2, 2:2}
Index 4: sum=3, need 3-2=1 (found 2), count=4
Total: 4
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- goal = 0: Count subarrays with all zeros
- All zeros: Special handling needed if goal > array length
- No valid subarrays: Return 0

</details>
"""

class Solution:
    def numSubarraysWithSum(self, nums: list[int], goal: int) -> int:
        """
        Approach: Prefix sum with hash map
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Hash map: prefix_sum -> frequency
        prefix_count = {0: 1}  # prefix sum 0 at start
        count = 0
        prefix_sum = 0

        for num in nums:
            prefix_sum += num

            # Check how many previous prefix sums equal (current - goal)
            needed = prefix_sum - goal
            if needed in prefix_count:
                count += prefix_count[needed]

            # Update frequency of current prefix sum
            prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1

        return count

    def numSubarraysWithSumSlidingWindow(self, nums: list[int], goal: int) -> int:
        """
        Approach: Sliding window (at most technique)
        Time Complexity: O(n)
        Space Complexity: O(1)

        Key insight: exactly(goal) = atMost(goal) - atMost(goal-1)
        """

        def at_most(target: int) -> int:
            if target < 0:
                return 0

            count = 0
            left = 0
            current_sum = 0

            for right in range(len(nums)):
                current_sum += nums[right]

                # Shrink window while sum > target
                while current_sum > target:
                    current_sum -= nums[left]
                    left += 1

                # All subarrays ending at right with sum <= target
                count += right - left + 1

            return count

        return at_most(goal) - at_most(goal - 1)

    def numSubarraysWithSumBruteForce(self, nums: list[int], goal: int) -> int:
        """
        Approach: Brute force checking all subarrays
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        count = 0
        n = len(nums)

        for i in range(n):
            current_sum = 0
            for j in range(i, n):
                current_sum += nums[j]
                if current_sum == goal:
                    count += 1
                elif current_sum > goal:
                    break  # No point continuing, all binary

        return count

def test_solution() -> None:
    """Test cases for Problem 930."""
    solution = Solution()

    # Test case 1: Basic case
    assert solution.numSubarraysWithSum([1, 0, 1, 0, 1], 2) == 4
    assert solution.numSubarraysWithSumSlidingWindow([1, 0, 1, 0, 1], 2) == 4
    print("Test case 1 passed: Basic case")

    # Test case 2: Goal = 0
    assert solution.numSubarraysWithSum([0, 0, 0, 0, 0], 0) == 15  # All subarrays of zeros
    print("Test case 2 passed: Goal = 0")

    # Test case 3: Single element matches
    assert solution.numSubarraysWithSum([1], 1) == 1
    print("Test case 3 passed: Single element")

    # Test case 4: No valid subarrays
    assert solution.numSubarraysWithSum([0, 0, 0], 1) == 0
    print("Test case 4 passed: No valid subarrays")

    # Test case 5: Entire array is valid
    assert solution.numSubarraysWithSum([1, 1], 2) == 1
    print("Test case 5 passed: Entire array")

    # Test case 6: Multiple valid subarrays
    assert solution.numSubarraysWithSum([1, 0, 1, 1, 0], 2) == 4
    print("Test case 6 passed: Multiple subarrays")

    # Test case 7: All ones
    assert solution.numSubarraysWithSum([1, 1, 1], 2) == 2
    print("Test case 7 passed: All ones")

    # Test case 8: Goal larger than possible
    assert solution.numSubarraysWithSum([0, 1, 0], 5) == 0
    print("Test case 8 passed: Goal too large")

    # Test case 9: Mixed with goal=1
    assert solution.numSubarraysWithSum([1, 0, 0, 1, 0, 1], 1) == 6
    print("Test case 9 passed: Goal = 1")

    # Test case 10: Sliding window comparison
    test_cases = [
        ([1, 0, 1, 0, 1], 2),
        ([0, 0, 0], 0),
        ([1, 1, 1], 2),
    ]
    for nums, goal in test_cases:
        assert solution.numSubarraysWithSum(nums, goal) == solution.numSubarraysWithSumSlidingWindow(nums, goal)
    print("Test case 10 passed: Sliding window matches prefix sum")

    print("\nAll test cases passed!")

if __name__ == "__main__":
    test_solution()
