"""
128. Longest Consecutive Sequence
Medium

Given an unsorted array of integers nums, return the length of the longest
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a hash set for O(1) lookups, but only start counting consecutive sequences from their beginning numbers. This avoids redundant work and achieves O(n) time.

### APPROACH:
1. **Convert to set** for O(1) contains operations
2. **For each number**, check if it's the start of a sequence (num-1 not in set)
3. **If it's a start**, count consecutive numbers (num+1, num+2, ...) until break
4. **Track maximum** sequence length found

### WHY THIS WORKS:
- Each number is only visited as a sequence start once (when num-1 is not present)
- Each number is only counted in one sequence (the one that starts earliest)
- Hash set provides O(1) membership testing
- Total operations: O(n) for set creation + O(n) for traversal = O(n)

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(n)

### EXAMPLE WALKTHROUGH:
```
Input: nums = [100,4,200,1,3,2]
Set: {100,4,200,1,3,2}

Check 100: 99 not in set → start of sequence
  Count: 100 → length 1 (101 not in set)

Check 4: 3 is in set → not start of sequence, skip

Check 200: 199 not in set → start of sequence
  Count: 200 → length 1 (201 not in set)

Check 1: 0 not in set → start of sequence
  Count: 1→2→3→4 → length 4 (5 not in set)

Check 3: 2 is in set → not start of sequence, skip

Check 2: 1 is in set → not start of sequence, skip

Maximum length: 4
```

### KEY INSIGHT:
Only process each number when it's the start of a consecutive sequence. This ensures each element is examined at most twice: once to check if it's a start, and once when counting from an earlier start.

</details>

class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        """
        Approach: Hash Set with intelligent starting points
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        num_set = set(nums)
        longest = 0

        for num in num_set:
            # Only start counting from the beginning of a sequence
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                # Count consecutive numbers
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest = max(longest, current_streak)

        return longest

    def longestConsecutiveSort(self, nums: list[int]) -> int:
        """
        Approach: Sorting
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        if not nums:
            return 0

        nums.sort()
        longest = 1
        current = 1

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                continue  # Skip duplicates
            elif nums[i] == nums[i - 1] + 1:
                current += 1
            else:
                longest = max(longest, current)
                current = 1

        return max(longest, current)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [100, 4, 200, 1, 3, 2]
    print(f"Input: {nums1}")
    print(f"Output: {solution.longestConsecutive(nums1)}")  # 4

    # Test case 2
    nums2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
    print(f"Input: {nums2}")
    print(f"Output: {solution.longestConsecutive(nums2)}")  # 9
