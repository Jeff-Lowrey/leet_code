"""
34. Find First and Last Position of Element in Sorted Array
Medium

Given an array of integers nums sorted in non-decreasing order, find the starting
and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Since we need O(log n) complexity on a sorted array, we must use binary search.
However, standard binary search finds ANY occurrence. We need to find the
FIRST and LAST occurrences specifically.

### KEY INSIGHT:
We can modify binary search to find boundaries:
- For first occurrence: when we find target, continue searching LEFT
- For last occurrence: when we find target, continue searching RIGHT

### APPROACH:
1. Use two separate binary searches
2. First search: find leftmost (first) occurrence
3. Second search: find rightmost (last) occurrence
4. Both searches maintain the O(log n) complexity

### FIRST OCCURRENCE ALGORITHM:
1. When nums[mid] == target: record position but search LEFT (right = mid - 1)
2. When nums[mid] < target: search RIGHT (left = mid + 1)
3. When nums[mid] > target: search LEFT (right = mid - 1)

### LAST OCCURRENCE ALGORITHM:
1. When nums[mid] == target: record position but search RIGHT (left = mid + 1)
2. When nums[mid] < target: search RIGHT (left = mid + 1)
3. When nums[mid] > target: search LEFT (right = mid - 1)

### EXAMPLE WALKTHROUGH:
```
nums = [5,7,7,8,8,10], target = 8

Find first 8:
- Search continues left even after finding 8
- Eventually finds index 3

Find last 8:
- Search continues right even after finding 8
- Eventually finds index 4

Result: [3, 4]
```

### WHY TWO SEARCHES?
- Single binary search can't determine boundaries in one pass
- Two focused searches are still O(log n) each = O(log n) total
- Each search has a specific goal (leftmost vs rightmost)

</details>
"""

class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        """
        Approach: Two binary searches
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        def find_first(nums, target):
            left, right = 0, len(nums) - 1
            result = -1

            while left <= right:
                mid = left + (right - left) // 2

                if nums[mid] == target:
                    result = mid
                    right = mid - 1  # Continue searching left
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1

            return result

        def find_last(nums, target):
            left, right = 0, len(nums) - 1
            result = -1

            while left <= right:
                mid = left + (right - left) // 2

                if nums[mid] == target:
                    result = mid
                    left = mid + 1  # Continue searching right
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1

            return result

        first = find_first(nums, target)
        if first == -1:
            return [-1, -1]

        last = find_last(nums, target)
        return [first, last]


"""
162. Find Peak Element
Medium

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element, and return its index.
If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞.

You must write an algorithm that runs in O(log n) time.

Example:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
"""

class SolutionPeak:
    def findPeakElement(self, nums: list[int]) -> int:
        """
        Approach: Binary search
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        left, right = 0, len(nums) - 1

        while left < right:
            mid = left + (right - left) // 2

            # If mid is on ascending slope, peak is to the right
            if nums[mid] < nums[mid + 1]:
                left = mid + 1
            # If mid is on descending slope, peak is to the left (including mid)
            else:
                right = mid

        return left


"""
981. Time Based Key-Value Store
Medium

Design a time-based key-value data structure that can store multiple values for
the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:
- TimeMap() Initializes the object of the data structure.
- void set(String key, String value, int timestamp) Stores the key with the value at the given time.
- String get(String key, int timestamp) Returns the value with timestamp_prev <= timestamp.
  If there are no values, return "".

Example:
Input:
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output:
[null, null, "bar", "bar", null, "bar2", "bar2"]
"""

class TimeMap:
    """
    Approach: Hash map with binary search
    Time Complexity: O(1) for set, O(log n) for get
    Space Complexity: O(n)
    """

    def __init__(self):
        self.store = {}  # key -> list of (timestamp, value) pairs

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""

        values = self.store[key]

        # Binary search for the rightmost timestamp <= given timestamp
        left, right = 0, len(values) - 1
        result = ""

        while left <= right:
            mid = left + (right - left) // 2

            if values[mid][0] <= timestamp:
                result = values[mid][1]
                left = mid + 1
            else:
                right = mid - 1

        return result


"""
875. Koko Eating Bananas
Medium

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i]
bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses
some pile of bananas and eats k bananas from that pile.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example:
Input: piles = [3,6,7,11], h = 8
Output: 4
"""

class SolutionBananas:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        """
        Approach: Binary search on answer
        Time Complexity: O(n log m) where m is max pile size
        Space Complexity: O(1)
        """
        def can_eat_all(speed):
            hours = 0
            for pile in piles:
                hours += (pile + speed - 1) // speed  # Ceiling division
            return hours <= h

        left, right = 1, max(piles)

        while left < right:
            mid = left + (right - left) // 2

            if can_eat_all(mid):
                right = mid
            else:
                left = mid + 1

        return left


# Test cases
if __name__ == "__main__":
    # Test Search Range
    solution = Solution()

    print("Find First and Last Position:")
    test_cases = [
        ([5, 7, 7, 8, 8, 10], 8),
        ([5, 7, 7, 8, 8, 10], 6),
        ([], 0),
        ([1], 1)
    ]

    for nums, target in test_cases:
        result = solution.searchRange(nums, target)
        print(f"Array: {nums}, Target: {target}")
        print(f"Range: {result}\n")

    # Test Peak Element
    solution_peak = SolutionPeak()

    print("Find Peak Element:")
    peak_cases = [
        [1, 2, 3, 1],
        [1, 2, 1, 3, 5, 6, 4],
        [1],
        [1, 2]
    ]

    for nums in peak_cases:
        result = solution_peak.findPeakElement(nums)
        print(f"Array: {nums}")
        print(f"Peak index: {result} (value: {nums[result]})\n")

    # Test TimeMap
    print("Time Based Key-Value Store:")
    time_map = TimeMap()
    operations = [
        ("set", "foo", "bar", 1),
        ("get", "foo", 1),
        ("get", "foo", 3),
        ("set", "foo", "bar2", 4),
        ("get", "foo", 4),
        ("get", "foo", 5)
    ]

    for op in operations:
        if op[0] == "set":
            time_map.set(op[1], op[2], op[3])
            print(f"Set: key='{op[1]}', value='{op[2]}', timestamp={op[3]}")
        else:  # get
            result = time_map.get(op[1], op[2])
            print(f"Get: key='{op[1]}', timestamp={op[2]} -> '{result}'")

    print("\n" + "="*50 + "\n")

    # Test Koko Eating Bananas
    solution_bananas = SolutionBananas()

    print("Koko Eating Bananas:")
    banana_cases = [
        ([3, 6, 7, 11], 8),
        ([30, 11, 23, 4, 20], 5),
        ([30, 11, 23, 4, 20], 6)
    ]

    for piles, h in banana_cases:
        result = solution_bananas.minEatingSpeed(piles, h)
        print(f"Piles: {piles}, h={h}")
        print(f"Min eating speed: {result}\n")