"""
3. Longest Substring Without Repeating Characters
Medium

Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        Approach: Sliding Window with Hash Map
        Time Complexity: O(n)
        Space Complexity: O(min(n, m)) where m is size of charset
        """
        char_map = {}
        max_length = 0
        left = 0

        for right in range(len(s)):
            # If character is seen and is within current window
            if s[right] in char_map and char_map[s[right]] >= left:
                # Move left pointer to skip the duplicate
                left = char_map[s[right]] + 1

            # Update character's latest position
            char_map[s[right]] = right

            # Update max length
            max_length = max(max_length, right - left + 1)

        return max_length

    def lengthOfLongestSubstringSet(self, s: str) -> int:
        """
        Approach: Sliding Window with Set
        Time Complexity: O(2n) = O(n)
        Space Complexity: O(min(n, m))
        """
        char_set = set()
        max_length = 0
        left = 0

        for right in range(len(s)):
            # Remove characters from left until no duplicate
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1

            char_set.add(s[right])
            max_length = max(max_length, right - left + 1)

        return max_length


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1 = "abcabcbb"
    print(f"Input: '{s1}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s1)}")  # 3

    # Test case 2
    s2 = "bbbbb"
    print(f"Input: '{s2}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s2)}")  # 1

    # Test case 3
    s3 = "pwwkew"
    print(f"Input: '{s3}'")
    print(f"Output: {solution.lengthOfLongestSubstring(s3)}")  # 3
