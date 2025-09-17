"""
125. Valid Palindrome
Easy

A phrase is a palindrome if, after converting all uppercase letters into lowercase
letters and removing all non-alphanumeric characters, it reads the same forward
and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example:
Input: s = "A man, a plan, a canal: Panama"
Output: true
"""

class Solution:
    def isPalindrome(self, s: str) -> bool:
        """
        Approach: Two pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left, right = 0, len(s) - 1

        while left < right:
            # Skip non-alphanumeric characters
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1

            # Compare characters (case-insensitive)
            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True

    def isPalindromeSimple(self, s: str) -> bool:
        """
        Approach: Clean string first
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Remove non-alphanumeric and convert to lowercase
        cleaned = ''.join(char.lower() for char in s if char.isalnum())

        # Check if palindrome
        return cleaned == cleaned[::-1]


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1 = "A man, a plan, a canal: Panama"
    print(f"Input: '{s1}'")
    print(f"Output: {solution.isPalindrome(s1)}")  # True

    # Test case 2
    s2 = "race a car"
    print(f"Input: '{s2}'")
    print(f"Output: {solution.isPalindrome(s2)}")  # False

    # Test case 3
    s3 = " "
    print(f"Input: '{s3}'")
    print(f"Output: {solution.isPalindrome(s3)}")  # True
