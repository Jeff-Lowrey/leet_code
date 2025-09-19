"""
76. Minimum Window Substring
Hard

Given two strings s and t of lengths m and n respectively, return the minimum
window substring of s such that every character in t (including duplicates) is
included in the window. If there is no such substring, return the empty string "".

Example:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
"""

from collections import Counter


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        """
        Approach: Sliding window with character frequency
        Time Complexity: O(m + n)
        Space Complexity: O(k) where k is size of character set
        """
        if not s or not t:
            return ""

        # Count characters in t
        t_count = Counter(t)
        required = len(t_count)

        # Sliding window variables
        left = right = 0
        formed = 0
        window_counts = {}

        # Result
        ans = float("inf"), None, None

        while right < len(s):
            # Expand window
            char = s[right]
            window_counts[char] = window_counts.get(char, 0) + 1

            if char in t_count and window_counts[char] == t_count[char]:
                formed += 1

            # Contract window
            while left <= right and formed == required:
                char = s[left]

                # Update result
                if right - left + 1 < ans[0]:
                    ans = (right - left + 1, left, right)

                window_counts[char] -= 1
                if char in t_count and window_counts[char] < t_count[char]:
                    formed -= 1

                left += 1

            right += 1

        return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]


"""
424. Longest Repeating Character Replacement
Medium

You are given a string s and an integer k. You can choose any character of the
string and change it to any other uppercase English character. You can perform
this operation at most k times.

Return the length of the longest substring containing the same letter you can get
after performing the above operations.

Example:
Input: s = "ABAB", k = 2
Output: 4
"""

class SolutionCharacterReplacement:
    def characterReplacement(self, s: str, k: int) -> int:
        """
        Approach: Sliding window with character frequency
        Time Complexity: O(n)
        Space Complexity: O(1) - at most 26 characters
        """
        left = 0
        max_freq = 0
        char_count = {}
        result = 0

        for right in range(len(s)):
            # Add character to window
            char_count[s[right]] = char_count.get(s[right], 0) + 1
            max_freq = max(max_freq, char_count[s[right]])

            # Check if window is valid
            window_size = right - left + 1
            if window_size - max_freq > k:
                # Shrink window
                char_count[s[left]] -= 1
                left += 1
            else:
                result = max(result, window_size)

        return result


"""
239. Sliding Window Maximum
Hard

You are given an array of integers nums, there is a sliding window of size k
which is moving from the very left of the array to the very right. You can only
see the k numbers in the window.

Return the max sliding window.

Example:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
"""

from collections import deque


class SolutionWindowMaximum:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        """
        Approach: Monotonic deque
        Time Complexity: O(n)
        Space Complexity: O(k)
        """
        deq = deque()  # Stores indices
        result = []

        for i in range(len(nums)):
            # Remove indices outside current window
            while deq and deq[0] < i - k + 1:
                deq.popleft()

            # Remove smaller elements (maintain decreasing order)
            while deq and nums[deq[-1]] < nums[i]:
                deq.pop()

            deq.append(i)

            # Add to result if window is complete
            if i >= k - 1:
                result.append(nums[deq[0]])

        return result

    def maxSlidingWindowHeap(self, nums: list[int], k: int) -> list[int]:
        """
        Approach: Max heap
        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        import heapq

        result = []
        heap = []

        for i in range(len(nums)):
            heapq.heappush(heap, (-nums[i], i))

            # Remove elements outside window
            while heap and heap[0][1] <= i - k:
                heapq.heappop(heap)

            if i >= k - 1:
                result.append(-heap[0][0])

        return result


# Test cases
if __name__ == "__main__":
    # Test Minimum Window Substring
    solution = Solution()

    print("Minimum Window Substring:")
    test_cases = [
        ("ADOBECODEBANC", "ABC"),
        ("a", "a"),
        ("a", "aa"),
        ("ab", "b")
    ]

    for s, t in test_cases:
        result = solution.minWindow(s, t)
        print(f"s: '{s}', t: '{t}'")
        print(f"Min window: '{result}'\n")

    # Test Character Replacement
    solution_char = SolutionCharacterReplacement()

    print("Longest Repeating Character Replacement:")
    char_cases = [
        ("ABAB", 2),
        ("AABABBA", 1),
        ("AAAA", 2)
    ]

    for s, k in char_cases:
        result = solution_char.characterReplacement(s, k)
        print(f"s: '{s}', k={k}")
        print(f"Max length: {result}\n")

    # Test Sliding Window Maximum
    solution_max = SolutionWindowMaximum()

    print("Sliding Window Maximum:")
    max_cases = [
        ([1, 3, -1, -3, 5, 3, 6, 7], 3),
        ([1], 1),
        ([1, -1], 1),
        ([9, 11], 2)
    ]

    for nums, k in max_cases:
        result = solution_max.maxSlidingWindow(nums, k)
        print(f"nums: {nums}, k={k}")
        print(f"Max windows: {result}\n")
