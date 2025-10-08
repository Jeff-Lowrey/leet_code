"""
496. Next Greater Element I
Easy

The next greater element of some element x in an array is the first greater
element that is to the right of x in the same array.

You are given two distinct `0-indexed` integer arrays nums1 and nums2, where nums1
is a subset of nums2.

For each `0 <= i` < nums1.length, find the index `j` such that nums1[i] == nums2[j]
and determine the next greater element of nums2[j] in nums2.

Return an array ans of length nums1.length such that ans[i] is the next greater
element as described above.

Example:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a monotonic decreasing stack to efficiently find the next greater element for each number in nums2. The stack maintains elements in decreasing order, so when we find a larger element, we can pop and match all smaller elements with their next greater element.

### APPROACH:
1. Traverse nums2 with a stack
2. For each element, pop all smaller elements from stack and map them to current element
3. Push current element to stack
4. Build result array by looking up each nums1 element in the mapping

### WHY THIS WORKS:
The monotonic stack ensures we process elements in the correct order. When we encounter a larger element, all smaller elements in the stack have found their next greater element. Elements remaining in the stack have no next greater element.

### TIME COMPLEXITY: O(n + m)
### SPACE COMPLEXITY: O(n)

### EXAMPLE WALKTHROUGH:
nums2 = [1,3,4,2], nums1 = [4,1,2]
- Process 1: stack=[1]
- Process 3: 3>1, map[1]=3, stack=[3]
- Process 4: 4>3, map[3]=4, stack=[4]
- Process 2: 2<4, stack=[4,2]
- Final mapping: {1:3, 3:4, 4:-1, 2:-1}
- Result for [4,1,2]: [-1,3,-1]

</details>
"""

class Solution:
    def nextGreaterElement(self, nums1: list[int], nums2: list[int]) -> list[int]:
        """
        Approach: Monotonic stack
        Time Complexity: O(n + m)
        Space Complexity: O(n)
        """
        stack = []
        next_greater = {}

        # Build next greater mapping for nums2
        for num in nums2:
            while stack and stack[-1] < num:
                next_greater[stack.pop()] = num
            stack.append(num)

        # Remaining elements have no next greater
        while stack:
            next_greater[stack.pop()] = -1

        # Build result for nums1
        return [next_greater[num] for num in nums1]


"""
503. Next Greater Element II
Medium

Given a circular integer array nums, return the next greater number for every
element in nums.

The next greater number of a number x is the first greater number to its
traversing-order next in the array, which means you could search circularly.

Example:
Input: nums = [1,2,1]
Output: [2,-1,2]
"""

class SolutionCircular:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        """
        Approach: Monotonic stack with circular array
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(nums)
        result = [-1] * n
        stack = []

        # Process array twice for circular behavior
        for i in range(2 * n):
            idx = i % n
            while stack and nums[stack[-1]] < nums[idx]:
                result[stack.pop()] = nums[idx]

            # Only push index in first pass
            if i < n:
                stack.append(idx)

        return result


"""
901. Online Stock Span
Medium

Design an algorithm that collects daily price quotes for some stock and returns
the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive
days (starting from that day and going backward) for which the stock price was
less than or equal to the price of that day.

Example:
Input: ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
       [[], [100], [80], [60], [70], [60], [75], [85]]
Output: [null, 1, 1, 1, 2, 1, 4, 6]
"""

class StockSpanner:
    """
    Approach: Monotonic stack
    Time Complexity: O(1) amortized
    Space Complexity: O(n)
    """

    def __init__(self):
        self.stack = []  # (price, span)

    def next(self, price: int) -> int:
        span = 1

        # Pop all smaller or equal prices
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]

        self.stack.append((price, span))
        return span


"""
402. Remove K Digits
Medium

Given string num representing a non-negative integer num, and an integer k,
return the smallest possible integer after removing k digits from num.

Example:
Input: num = "1432219", k = 3
Output: "1219"
"""

class SolutionRemoveDigits:
    def removeKdigits(self, num: str, k: int) -> str:
        """
        Approach: Monotonic stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []

        for digit in num:
            # Remove larger digits while we can
            while k > 0 and stack and stack[-1] > digit:
                stack.pop()
                k -= 1
            stack.append(digit)

        # Remove remaining k digits from end
        stack = stack[:-k] if k else stack

        # Remove leading zeros and handle empty result
        result = ''.join(stack).lstrip('0')
        return result if result else '0'


"""
316. Remove Duplicate Letters
Medium

Given a string s, remove duplicate letters so that every letter appears once and
only once. You must make sure your result is the smallest in lexicographical
order among all possible results.

Example:
Input: s = "bcabc"
Output: "abc"
"""

class SolutionRemoveDuplicates:
    def removeDuplicateLetters(self, s: str) -> str:
        """
        Approach: Monotonic stack with frequency count
        Time Complexity: O(n)
        Space Complexity: O(1) - at most 26 letters
        """
        # Count frequency of each character
        freq = {}
        for char in s:
            freq[char] = freq.get(char, 0) + 1

        stack = []
        in_stack = set()

        for char in s:
            freq[char] -= 1

            if char in in_stack:
                continue

            # Remove larger characters if they appear later
            while stack and stack[-1] > char and freq[stack[-1]] > 0:
                removed = stack.pop()
                in_stack.remove(removed)

            stack.append(char)
            in_stack.add(char)

        return ''.join(stack)


# Test cases
if __name__ == "__main__":
    # Test Next Greater Element I
    solution = Solution()

    print("Next Greater Element I:")
    test_cases = [
        ([4, 1, 2], [1, 3, 4, 2]),
        ([2, 4], [1, 2, 3, 4])
    ]

    for nums1, nums2 in test_cases:
        result = solution.nextGreaterElement(nums1, nums2)
        print(f"nums1: {nums1}, nums2: {nums2}")
        print(f"Result: {result}\n")

    # Test Next Greater Element II (Circular)
    solution_circular = SolutionCircular()

    print("Next Greater Element II (Circular):")
    circular_cases = [[1, 2, 1], [1, 2, 3, 4, 3], [5, 4, 3, 2, 1]]

    for nums in circular_cases:
        result = solution_circular.nextGreaterElements(nums)
        print(f"Input: {nums}")
        print(f"Next Greater: {result}\n")

    # Test Stock Spanner
    print("Stock Spanner:")
    spanner = StockSpanner()
    prices = [100, 80, 60, 70, 60, 75, 85]

    for price in prices:
        span = spanner.next(price)
        print(f"Price: {price}, Span: {span}")

    print("\n" + "="*50 + "\n")

    # Test Remove K Digits
    solution_remove = SolutionRemoveDigits()

    print("Remove K Digits:")
    remove_cases = [
        ("1432219", 3),
        ("10200", 1),
        ("10", 2)
    ]

    for num, k in remove_cases:
        result = solution_remove.removeKdigits(num, k)
        print(f"Number: '{num}', k={k}")
        print(f"Result: '{result}'\n")

    # Test Remove Duplicate Letters
    solution_dup = SolutionRemoveDuplicates()

    print("Remove Duplicate Letters:")
    dup_cases = ["bcabc", "cbacdcbc", "ecbacba"]

    for s in dup_cases:
        result = solution_dup.removeDuplicateLetters(s)
        print(f"Input: '{s}'")
        print(f"Result: '{result}'\n")
