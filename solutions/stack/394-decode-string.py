"""
# 394. Decode String
**Medium**

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic stack problem where we need to process nested brackets. When we encounter a number followed by '[', we need to remember what to repeat and how many times. When we hit ']', we decode the current segment and multiply it by the count.

### APPROACH:
1. **Use two stacks**: One for counts, one for strings
2. **Parse number**: When we see a digit, build the complete number
3. **Push on '['**: Save current count and string, reset for new level
4. **Pop on ']'**: Multiply current string by count and append to previous level
5. **Build result**: Characters are added to current string

### WHY THIS WORKS:
- Stack naturally handles nested structures
- We process from inside out, which is correct for nested encoding
- Each '[' starts a new encoding level, ']' completes it
- Numbers are always followed by '[', so we can parse them together

### TIME COMPLEXITY: O(n × m)
Where n is length of input, m is maximum decoded length

### SPACE COMPLEXITY: O(n)
For the stacks and intermediate strings

### EXAMPLE WALKTHROUGH:
```
Input: "3[a2[c]]"
1. '3': count = 3
2. '[': push count=3, string="", reset current
3. 'a': current_string = "a"
4. '2': count = 2
5. '[': push count=2, string="a", reset current
6. 'c': current_string = "c"
7. ']': current = "c" * 2 = "cc", pop: current = "a" + "cc" = "acc"
8. ']': current = "acc" * 3 = "accaccacc"
Output: "accaccacc"
```

### EDGE CASES:
- No brackets: return original string
- Single level: "3[a]" → "aaa"
- Nested levels: "2[a3[b]]" → "abbbabbb"
- Multiple segments: "2[ab]3[cd]" → "ababcdcdcd"

</details>
"""

class Solution:
    def decodeString(self, s: str) -> str:
        """
        Decode string using stack for nested brackets.

        Args:
            s: Encoded string with pattern k[encoded_string]

        Returns:
            Decoded string

        Time Complexity: O(n × m) where n is input length, m is max decoded length
        Space Complexity: O(n) for stacks and strings
        """
        stack_count = []  # Stack to store repeat counts
        stack_string = []  # Stack to store strings
        current_string = ""
        current_count = 0

        for char in s:
            if char.isdigit():
                # Build the complete number (could be multi-digit)
                current_count = current_count * 10 + int(char)
            elif char == '[':
                # Push current state and reset for new level
                stack_count.append(current_count)
                stack_string.append(current_string)
                current_count = 0
                current_string = ""
            elif char == ']':
                # Pop and decode current level
                repeat_count = stack_count.pop()
                prev_string = stack_string.pop()
                current_string = prev_string + current_string * repeat_count
            else:
                # Regular character, add to current string
                current_string += char

        return current_string

    def decodeStringRecursive(self, s: str) -> str:
        """
        Alternative recursive solution.

        Args:
            s: Encoded string

        Returns:
            Decoded string
        """
        def decode(index):
            result = ""
            count = 0

            while index < len(s):
                char = s[index]

                if char.isdigit():
                    count = count * 10 + int(char)
                elif char == '[':
                    # Recursively decode the content inside brackets
                    decoded_string, next_index = decode(index + 1)
                    result += decoded_string * count
                    count = 0
                    index = next_index
                elif char == ']':
                    # Return current result and next index
                    return result, index
                else:
                    # Regular character
                    result += char

                index += 1

            return result, index

        return decode(0)[0]


def test_solution():
    """Test cases for Problem 394."""
    solution = Solution()

    # Test case 1: Simple case
    result1 = solution.decodeString("3[a]2[bc]")
    expected1 = "aaabcbc"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Nested brackets
    result2 = solution.decodeString("3[a2[c]]")
    expected2 = "accaccacc"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Multiple digits
    result3 = solution.decodeString("2[abc]3[cd]ef")
    expected3 = "abcabccdcdcdef"
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single character
    result4 = solution.decodeString("abc3[cd]xyz")
    expected4 = "abccdcdcdxyz"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Complex nested
    result5 = solution.decodeString("3[a2[c2[d]]]")
    expected5 = "acddcddacddcddacddcdd"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: No brackets
    result6 = solution.decodeString("abcdef")
    expected6 = "abcdef"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test recursive solution
    result7 = solution.decodeStringRecursive("3[a2[c]]")
    expected7 = "accaccacc"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 394. Decode String ===")
    print(f"decodeString('3[a]2[bc]') -> {solution.decodeString('3[a]2[bc]')}")
    print(f"decodeString('3[a2[c]]') -> {solution.decodeString('3[a2[c]]')}")
    print(f"decodeString('2[abc]3[cd]ef') -> {solution.decodeString('2[abc]3[cd]ef')}")
