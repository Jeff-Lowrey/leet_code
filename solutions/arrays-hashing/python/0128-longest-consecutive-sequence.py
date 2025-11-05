"""# Difficulty: Medium

# 0128. Longest Consecutive Sequence

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[100, 4, 200, 1, 3, 2]</dd>
<dt>Output:</dt>
<dd>4 (sequence [1,2,3,4])</dd>
<dt>Explanation:</dt>
<dd>The longest consecutive sequence [1,2,3,4] has length 4</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Graph Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Convert array to a set for O(1) lookups. Only start counting consecutive sequences from numbers where num-1 doesn't exist (the start of a sequence). This avoids redundant counting and achieves O(n) time since each number is visited at most twice.

### APPROACH:
1. **Convert to set**: Create num_set from nums array for O(1) lookup time
2. **Initialize longest streak**: Set longest_streak = 0 to track maximum consecutive sequence length
3. **Iterate through set**: Loop through each number in num_set
4. **Check sequence start**: For each num, verify if (num - 1) exists in set; skip if it does (not a sequence start)
5. **Count consecutive numbers**: When num is a sequence start, initialize current_num = num and current_streak = 1
6. **Extend sequence**: Use while loop to check if (current_num + 1) exists in set, incrementing current_num and current_streak
7. **Update maximum**: Compare current_streak with longest_streak and update longest_streak if current is larger
8. **Return result**: After processing all numbers, return longest_streak

### WHY THIS WORKS:
- Set conversion enables O(1) lookups, crucial for checking num-1 and num+1 efficiently
- Only starting from sequence beginnings (where num-1 doesn't exist) prevents redundant counting
- Each number visited at most twice: once in outer loop, once in inner while loop
- This achieves O(n) time despite apparent nested loops - the key insight
- Set takes O(n) space but enables the linear time solution

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [100, 4, 200, 1, 3, 2]
```

Step 1: Convert to set
num_set = {100, 4, 200, 1, 3, 2}
Step 2: Check num=1 (no num-1=0 in set, so it's a sequence start)
current_num = 1, current_streak = 1

Steps:
Step 1: 1+1=2 in set → current_streak = 2
Step 2: 2+1=3 in set → current_streak = 3
Step 3: 3+1=4 in set → current_streak = 4
Step 4: 4+1=5 not in set → stop
Step 5: longest_streak = 4
Step 6: Check num=2 (num-1=1 exists, skip)
Step 7: Check num=3 (num-1=2 exists, skip)
Step 8: Check num=4 (num-1=3 exists, skip)
Step 9: Check num=100 (no num-1=99, sequence start)
Step 10: current_streak = 1, no 101 in set
Step 11: Check num=200 (no num-1=199, sequence start)
Step 12: current_streak = 1, no 201 in set

Output:
```
4 (sequence [1,2,3,4])
```

### TIME COMPLEXITY:
**O(n)** where n is the length of the input array

- **Set conversion**: O(n) to create num_set from the input array
- **Main loop**: O(n) to iterate through all numbers in the set
- **Inner while loop**: Although nested, each number is visited at most twice - once in the outer loop and once in the inner while loop when extending a sequence
- **Key insight**: We only start counting from sequence beginnings (where num-1 doesn't exist), preventing redundant work
- **Amortized analysis**: Total operations across all elements is O(n) because each element participates in at most one sequence extension
- **Overall**: O(n) + O(n) = O(n) linear time complexity

### SPACE COMPLEXITY:
**O(n)** where n is the length of the input array

- **Set storage**: O(n) space to store all unique numbers from the input array in num_set
- **Variables**: O(1) for tracking longest_streak, current_num, and current_streak
- **No additional collections**: Only the set is needed besides a few integer variables
- **Trade-off**: We sacrifice O(n) space for the set to achieve O(1) lookup time, which is essential for the linear time solution

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        """
        Find the length of the longest consecutive sequence in an unsorted array.

        Args:
            nums: List of integers (can be unsorted and contain duplicates)

        Returns:
            int: Length of the longest consecutive sequence

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        # Convert list to set for O(1) lookup
        num_set = set(nums)
        longest_streak = 0

        # Iterate through each number in the set
        for num in num_set:
            # Only start counting sequences from the smallest number in the sequence
            # If num-1 exists, this isn't the start of a sequence
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                # Count consecutive numbers
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                # Update longest streak if current streak is longer
                longest_streak = max(longest_streak, current_streak)

        return longest_streak


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.longestConsecutive([100, 4, 200, 1, 3, 2])
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.longestConsecutive([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.longestConsecutive([1])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 128. Longest Consecutive Sequence")
