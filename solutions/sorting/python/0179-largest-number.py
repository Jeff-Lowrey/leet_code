"""
### INTUITION:
The key insight is that to form the largest number, we need a custom comparison: for two numbers a and b, compare the strings formed by concatenating them in different orders (ab vs ba). If ab > ba lexicographically, then a should come before b in the final arrangement.

### APPROACH:
1. We convert all numbers to strings to simplify concatenation and comparison.
2. The key insight is that we need a custom sort comparator that decides which of two numbers should come first.
3. For any two number strings a and b, we compare a+b with b+a (string concatenation).
4. If a+b is lexicographically greater than b+a, then a should come before b in our final result.
5. This comparison ensures that the locally optimal choice (best ordering of any two elements) produces the globally optimal result.
6. After sorting with this custom comparator, we concatenate all strings.
7. We handle the special edge case where all numbers are zeros, which should return "0" instead of "000.
8. ".

### WHY THIS WORKS:
- Custom comparator ensures optimal local ordering between any two elements
- Transitive property holds for concatenation comparison (if a should precede b, and b should precede c, then a should precede c)
- Greedy choice (best local order) produces best global result due to transitivity
- String comparison naturally handles different lengths correctly

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3, 30, 34, 5, 9]
```

**Step 1:** Convert to strings: ["3", "30", "34", "5", "9"]

**Step 2:** Compare pairs: "3"+"30"="330" vs "30"+"3"="303" → "3" before "30"

**Step 3:** Compare pairs: "3"+"34"="334" vs "34"+"3"="343" → "34" before "3"

**Step 4:** Sort using custom comparator: ["9", "5", "34", "3", "30"]

**Step 5:** Concatenate: "9534330"

Output:
```
"9534330"
```

### TIME COMPLEXITY:
**O(n log n)** - The sorting operation dominates, where n is the number of elements. Each comparison takes **O(k)** where k is the average length of the numbers, but this is typically constant for practical inputs.

### SPACE COMPLEXITY:
**O(n)** - We create a list of n string representations plus the final concatenated result string. The sorting may use **O(log n)** additional space for the call stack.

### EDGE CASES:
- **All zeros:** [0, 0, 0] → "0" (not "000")
- **Single element:** [1] → "1"
- **Same digits different lengths:** [3, 30, 300] → "330300"
- **Large numbers:** Works correctly due to string comparison
- **Mixed sizes:** [121, 12] → "12121" (12+121="12121" > 121+12="12112")

</details>

"""

from typing import List
from functools import cmp_to_key


class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        """
        Approach: Custom sort comparator with string concatenation
        Time Complexity: O(n log n)
        Space Complexity: O(n)

        Args:
            nums: List of non-negative integers

        Returns:
            Largest number as a string
        """
        # Convert all numbers to strings
        num_strs = [str(num) for num in nums]

        # Custom comparator: compare concatenations
        def compare(a: str, b: str) -> int:
            # Compare a+b vs b+a
            if a + b > b + a:
                return -1  # a should come before b
            elif a + b < b + a:
                return 1  # b should come before a
            else:
                return 0  # equal

        # Sort using custom comparator
        num_strs.sort(key=cmp_to_key(compare))

        # Handle edge case: all zeros
        if num_strs[0] == "0":
            return "0"

        # Concatenate sorted strings
        return "".join(num_strs)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Example from problem
    nums1 = [10, 2]
    expected1 = "210"
    result1 = solution.largestNumber(nums1)
    print(f"Input: {nums1}")
    print(f"Output: {result1}")
    print(f"Expected: {expected1}")
    print(f"Pass: {result1 == expected1}")
    print()

    # Test case 2: More complex example
    nums2 = [3, 30, 34, 5, 9]
    expected2 = "9534330"
    result2 = solution.largestNumber(nums2)
    print(f"Input: {nums2}")
    print(f"Output: {result2}")
    print(f"Expected: {expected2}")
    print(f"Pass: {result2 == expected2}")
    print()

    # Test case 3: All zeros edge case
    nums3 = [0, 0, 0]
    expected3 = "0"
    result3 = solution.largestNumber(nums3)
    print(f"Input: {nums3}")
    print(f"Output: {result3}")
    print(f"Expected: {expected3}")
    print(f"Pass: {result3 == expected3}")
    print()

    # Test case 4: Single element
    nums4 = [1]
    expected4 = "1"
    result4 = solution.largestNumber(nums4)
    print(f"Input: {nums4}")
    print(f"Output: {result4}")
    print(f"Expected: {expected4}")
    print(f"Pass: {result4 == expected4}")
    print()
