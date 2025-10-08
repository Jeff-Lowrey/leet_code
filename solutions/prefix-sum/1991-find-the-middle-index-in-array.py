"""
# 1991. Find The Middle Index In Array
**Easy**

Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all the possible ones).

A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1].

If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0.

Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic prefix sum problem. For any index to be the middle index, the sum of all elements to its left must equal the sum of all elements to its right. We can calculate the total sum first, then iterate through the array tracking the left sum. At each position, we can calculate the right sum as (total - left_sum - current_element).

### APPROACH:
1. **Calculate total sum**: Get sum of entire array
2. **Initialize left sum**: Start with 0 (no elements to the left initially)
3. **Iterate through array**: For each index i:
   - Calculate right sum = total - left_sum - nums[i]
   - If left_sum == right_sum, return i
   - Add nums[i] to left_sum for next iteration
4. **Return -1**: If no middle index found

### WHY THIS WORKS:
- At any index i: total_sum = left_sum + nums[i] + right_sum
- We want: left_sum = right_sum
- Therefore: right_sum = total_sum - left_sum - nums[i]
- By maintaining running left_sum, we can check each position in O(1)
- Single pass solution after calculating total sum

### TIME COMPLEXITY: O(n)
Two passes: one to calculate total sum, one to find middle index

### SPACE COMPLEXITY: O(1)
Only using constant extra space for variables

### EXAMPLE WALKTHROUGH:
```
Input: nums = [2,3,-1,8,4]
Total sum = 16

Index 0: left=0, right=16-0-2=14, not equal
Index 1: left=2, right=16-2-3=11, not equal
Index 2: left=5, right=16-5-(-1)=12, not equal
Index 3: left=4, right=16-4-8=4, equal! Return 3
```

### KEY INSIGHTS:
- No need to store prefix sum array - just track left_sum
- Right sum can be calculated from total - left_sum - current
- Handle edge cases: index 0 (left=0) and last index (right=0)
- Return leftmost (first) index that satisfies condition

### EDGE CASES:
- Single element array (always middle index)
- All zeros
- No valid middle index exists
- Negative numbers in array
- Middle index at start or end

</details>
"""

class Solution:
    def findMiddleIndex(self, nums: list[int]) -> int:
        """
        Find the leftmost middle index where left sum equals right sum.

        Args:
            nums: Array of integers

        Returns:
            Leftmost middle index, or -1 if none exists

        Time Complexity: O(n) - two passes through array
        Space Complexity: O(1) - constant extra space
        """
        total_sum = sum(nums)
        left_sum = 0

        for i, num in enumerate(nums):
            # Calculate right sum: total - left_sum - current element
            right_sum = total_sum - left_sum - num

            # Check if this is a middle index
            if left_sum == right_sum:
                return i

            # Update left sum for next iteration
            left_sum += num

        # No middle index found
        return -1

    def findMiddleIndexVerbose(self, nums: list[int]) -> int:
        """
        More verbose implementation with explicit right sum calculation.

        Args:
            nums: Array of integers

        Returns:
            Leftmost middle index, or -1 if none exists
        """
        n = len(nums)
        total = sum(nums)
        left = 0

        for i in range(n):
            # Right side sum = everything except left side and current element
            right = total - left - nums[i]

            if left == right:
                return i

            # Move current element to left side for next iteration
            left += nums[i]

        return -1

    def findMiddleIndexBruteForce(self, nums: list[int]) -> int:
        """
        Brute force solution calculating sums for each index.

        Args:
            nums: Array of integers

        Returns:
            Leftmost middle index, or -1 if none exists

        Time Complexity: O(n²) - for each index, sum left and right sides
        Space Complexity: O(1) - constant extra space
        """
        n = len(nums)

        for i in range(n):
            # Calculate left sum
            left_sum = sum(nums[:i])

            # Calculate right sum
            right_sum = sum(nums[i+1:])

            if left_sum == right_sum:
                return i

        return -1

    def findMiddleIndexWithPrefixArray(self, nums: list[int]) -> int:
        """
        Solution using explicit prefix sum array.

        Args:
            nums: Array of integers

        Returns:
            Leftmost middle index, or -1 if none exists

        Time Complexity: O(n) - build prefix array and search
        Space Complexity: O(n) - prefix array storage
        """
        n = len(nums)
        if n == 0:
            return -1

        # Build prefix sum array
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        # Check each index
        for i in range(n):
            left_sum = prefix[i]  # Sum of elements before i
            right_sum = prefix[n] - prefix[i + 1]  # Sum of elements after i

            if left_sum == right_sum:
                return i

        return -1


def test_solution():
    """Test cases for Problem 1991."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.findMiddleIndex([2,3,-1,8,4])
    expected1 = 3  # left=[2,3,-1] sum=4, right=[4] sum=4
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Middle at start
    result2 = solution.findMiddleIndex([1,-1,4])
    expected2 = 2  # left=[1,-1] sum=0, right=[] sum=0
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: No middle index
    result3 = solution.findMiddleIndex([2,5])
    expected3 = -1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element
    result4 = solution.findMiddleIndex([1])
    expected4 = 0  # left=[] sum=0, right=[] sum=0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Middle at index 0
    result5 = solution.findMiddleIndex([0,0,0])
    expected5 = 0  # left=[] sum=0, right=[0,0] sum=0
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: All same values
    result6 = solution.findMiddleIndex([1,2,1])
    expected6 = 1  # left=[1] sum=1, right=[1] sum=1
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Negative numbers
    result7 = solution.findMiddleIndex([-1,-1,-1,-1,-1,0])
    expected7 = 2  # left=[-1,-1] sum=-2, right=[-1,-1,0] sum=-2
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test brute force solution
    result8 = solution.findMiddleIndexBruteForce([2,3,-1,8,4])
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.findMiddleIndexVerbose([1,2,1])
    expected9 = 1
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test with prefix array solution
    result10 = solution.findMiddleIndexWithPrefixArray([2,3,-1,8,4])
    expected10 = 3
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1991. Find The Middle Index In Array ===")

    # Demonstrate with examples
    test_cases = [
        [2,3,-1,8,4],
        [1,-1,4],
        [2,5],
        [1],
        [1,2,1]
    ]

    for nums in test_cases:
        result = solution.findMiddleIndex(nums)
        print(f"findMiddleIndex({nums}) -> {result}")

    # Show detailed walkthrough
    print(f"\nDetailed example: nums=[2,3,-1,8,4]")
    nums = [2,3,-1,8,4]
    total = sum(nums)
    print(f"Array: {nums}")
    print(f"Total sum: {total}")
    print("\nChecking each index:")

    left_sum = 0
    for i, num in enumerate(nums):
        right_sum = total - left_sum - num
        status = "FOUND!" if left_sum == right_sum else "not equal"
        print(f"Index {i}: value={num}, left_sum={left_sum}, right_sum={right_sum} -> {status}")

        if left_sum == right_sum:
            print(f"\nMiddle index found at position {i}")
            print(f"Left side: {nums[:i]} = {left_sum}")
            print(f"Middle: {num}")
            print(f"Right side: {nums[i+1:]} = {right_sum}")
            break

        left_sum += num
