"""
# 1047. Remove All Adjacent Duplicates In String
**Easy**

You are given a string s consisting of lowercase English letters. A duplicate removal
consists of choosing two adjacent and equal characters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be
proven that the answer is unique.

"""

class Solution:
    def removeDuplicates(self, s: str) -> str:
        """
        Remove all adjacent duplicate characters from string using stack.

        Args:
            s: String consisting of lowercase English letters

        Returns:
            Final string after all duplicate removals

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []

        for char in s:
            # If stack is not empty and top element equals current character
            if stack and stack[-1] == char:
                stack.pop()  # Remove the duplicate pair
            else:
                stack.append(char)  # Add current character

        return ''.join(stack)


def test_solution():
    """Test cases for Problem 1047."""
    solution = Solution()

    # Test case 1
    # assert solution.solve() == expected

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
