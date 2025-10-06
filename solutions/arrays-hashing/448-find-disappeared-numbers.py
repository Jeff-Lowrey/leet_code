"""
448. Find All Numbers Disappeared in an Array
Easy

Given an array `nums` of `n` integers where `nums`[i] is in the range [1, n], return
an array of all the integers in the range [1, n] that do not appear in `nums`.

Example:
Input: `nums` = [4,3,2,7,8,2,3,1]
Output: [5,6]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use the array itself as a hash map by marking visited numbers as negative. Since all numbers are in range [1,n], we can use each number as an index to mark presence.

### APPROACH:
1. **Mark phase**: For each number, mark the value at index (number-1) as negative
2. **Scan phase**: Indices with positive values represent missing numbers
3. **Convert**: Add 1 to each positive index to get the missing number

### WHY THIS WORKS:
- Array indices 0 to n-1 correspond to numbers 1 to n
- Making a value negative doesn't lose information (we use abs() to get original)
- Only numbers that exist can mark their corresponding index
- Remaining positive values indicate numbers that never marked their index

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1) excluding output

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4,3,2,7,8,2,3,1]  (length 8, expect numbers 1-8)

Mark phase:
nums[0] = 4 → mark index 3: [4,3,2,-7,8,2,3,1]
nums[1] = 3 → mark index 2: [4,3,-2,-7,8,2,3,1]
nums[2] = -2 → abs(-2)=2, mark index 1: [4,-3,-2,-7,8,2,3,1]
nums[3] = -7 → abs(-7)=7, mark index 6: [4,-3,-2,-7,8,2,-3,1]
nums[4] = 8 → mark index 7: [4,-3,-2,-7,8,2,-3,-1]
nums[5] = 2 → mark index 1: already negative
nums[6] = -3 → abs(-3)=3, mark index 2: already negative
nums[7] = -1 → abs(-1)=1, mark index 0: [-4,-3,-2,-7,8,2,-3,-1]

Scan phase:
Index 4 (nums[4]=8) is positive → number 5 is missing
Index 5 (nums[5]=2) is positive → number 6 is missing

Result: [5,6]
```

### KEY INSIGHT:
Transform the array into a marking system where the sign of each element indicates whether the corresponding number (index+1) exists in the original array.

</details>

class Solution:
    def findDisappearedNumbers(self, nums: list[int]) -> list[int]:
        """
        Approach: Mark visited with negative values
        Time Complexity: O(n)
        Space Complexity: O(1) excluding output
        """
        # Mark existing numbers by making values at their indices negative
        for num in nums:
            index = abs(num) - 1
            if nums[index] > 0:
                nums[index] = -nums[index]

        # Indices with positive values are missing numbers
        result = []
        for i in range(len(nums)):
            if nums[i] > 0:
                result.append(i + 1)

        return result

    def findDisappearedNumbersSet(self, nums: list[int]) -> list[int]:
        """
        Approach: Using set difference
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return list(set(range(1, len(nums) + 1)) - set(nums))


# Test cases
if __name__ == "__main__":
    solution = Solution()

    test_cases = [
        [4, 3, 2, 7, 8, 2, 3, 1],
        [1, 1],
        [1, 2, 3, 4, 5]
    ]

    for nums in test_cases:
        result = solution.findDisappearedNumbers(nums.copy())
        print(f"Input: {nums}")
        print(f"Missing: {result}\n")
