"""
# Difficulty: Medium

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:
- If the group's length is 1, append the character to s.
- Otherwise, append the character followed by the group's length.

The compressed string s should not be returned separately, but instead, be stored in the
input character array chars. Note that group lengths that are 10 or longer will be split
into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

Example:
Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>chars = ["a","a","b","b","c","c","c"]</dd>
<dt>Output:</dt>
<dd>Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]</dd>
<dt>Explanation:</dt>
<dd>Compressed string ['a','a','b','b','c','c','c'] becomes ['a','2','b','2','c','3'] with length 6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to compress consecutive identical characters in-place. The key insight is using
two pointers: one to read through the array, and one to write the compressed result back
to the same array. This allows us to modify the array in-place with O(1) extra space.

### APPROACH:
1. **Two Pointers**: Use `read` pointer to scan array, `write` pointer for result
2. **Count Consecutive**: For each character, count how many consecutive times it appears
3. **Write Character**: Always write the character itself
4. **Write Count**: If count > 1, write the count digits
5. **Handle Multi-Digit Counts**: Split counts like 12 into '1', '2'

### WHY THIS WORKS:
- Writing pointer never overtakes reading pointer (compressed is always shorter)
- We process characters left to right in a single pass
- In-place modification is safe because we consume input faster than we produce output
- Converting count to string and iterating over digits handles multi-digit counts

### EXAMPLE WALKTHROUGH:
```
Input: ["a","a","b","b","c","c","c"]

Read pointer scans:
1. chars[0-1]: 'a' appears 2 times
   Write: chars[0]='a', chars[1]='2'
   write=2

2. chars[2-3]: 'b' appears 2 times
   Write='b', chars[3]='2'
   write=4

3. chars[4-6]: 'c' appears 3 times
   Write='c', chars[5]='3'
   write=6

Result: ["a","2","b","2","c","3"] with length 6
```

### TIME COMPLEXITY:
O(n)
- Single pass through the array with read pointer
- Writing compressed data is proportional to input size

### SPACE COMPLEXITY:
O(1)
- Only using constant extra space (pointers and counters)
- Modifying the array in-place

### EDGE CASES:
- Single character: Return 1
- All different characters: Return original length
- All same characters: Return 1 + len(str(count))
- Very long runs (count >= 10): Multi-digit handling

</details>
"""

from collections import deque


class Solution:
    def compress(self, chars: list[str]) -> int:
        """
        Compress array of characters in-place.

        Args:
            chars: List of characters to compress

        Returns:
            New length of compressed array

        Time Complexity: O(n) where n is length of chars
        Space Complexity: O(1) - in-place modification
        """
        if not chars:
            return 0

        write = 0  # Position to write compressed data
        read = 0  # Position to read original data

        while read < len(chars):
            current_char = chars[read]
            count = 0

            # Count consecutive occurrences of current character
            while read < len(chars) and chars[read] == current_char:
                read += 1
                count += 1

            # Write the character
            chars[write] = current_char
            write += 1

            # Write the count if greater than 1
            if count > 1:
                # Convert count to string and write each digit
                for digit in str(count):
                    chars[write] = digit
                    write += 1

        return write

    def compressVerbose(self, chars: list[str]) -> int:
        """
        More verbose implementation with detailed steps.

        Args:
            chars: List of characters to compress

        Returns:
            New length of compressed array
        """
        if len(chars) <= 1:
            return len(chars)

        write_idx = 0
        i = 0

        while i < len(chars):
            # Get current character
            char = chars[i]
            count = 0

            # Count how many times this character repeats
            while i < len(chars) and chars[i] == char:
                i += 1
                count += 1

            # Write the character to the result
            chars[write_idx] = char
            write_idx += 1

            # If count > 1, write the count digits
            if count > 1:
                count_str = str(count)
                for digit_char in count_str:
                    chars[write_idx] = digit_char
                    write_idx += 1

        return write_idx

    def compressWithDeque(self, chars: list[str]) -> int:
        """
        Alternative using deque for count digits (less efficient).

        Args:
            chars: List of characters to compress

        Returns:
            New length of compressed array
        """
        if not chars:
            return 0

        write = 0
        read = 0

        while read < len(chars):
            current_char = chars[read]
            count = 0

            while read < len(chars) and chars[read] == current_char:
                read += 1
                count += 1

            chars[write] = current_char
            write += 1

            if count > 1:
                # Use deque to handle digits
                count_digits = deque(str(count))
                while count_digits:
                    chars[write] = count_digits.popleft()
                    write += 1

        return write


def test_solution() -> None:
    """Test cases for Problem 443."""
    solution = Solution()

    # Test case 1: Basic compression
    chars1 = ["a", "a", "b", "b", "c", "c", "c"]
    result1 = solution.compress(chars1)
    expected1 = 6
    expected_chars1 = ["a", "2", "b", "2", "c", "3"]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"
    assert chars1[:result1] == expected_chars1, f"Expected {expected_chars1}, got {chars1[:result1]}"

    # Test case 2: Single character groups
    chars2 = ["a"]
    result2 = solution.compress(chars2)
    expected2 = 1
    expected_chars2 = ["a"]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"
    assert chars2[:result2] == expected_chars2, f"Expected {expected_chars2}, got {chars2[:result2]}"

    # Test case 3: All different characters
    chars3 = ["a", "b", "c"]
    result3 = solution.compress(chars3)
    expected3 = 3
    expected_chars3 = ["a", "b", "c"]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"
    assert chars3[:result3] == expected_chars3, f"Expected {expected_chars3}, got {chars3[:result3]}"

    # Test case 4: Long run requiring multi-digit count
    chars4 = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]
    result4 = solution.compress(chars4)
    expected4 = 3
    expected_chars4 = ["a", "1", "2"]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"
    assert chars4[:result4] == expected_chars4, f"Expected {expected_chars4}, got {chars4[:result4]}"

    # Test case 5: Mixed compression
    chars5 = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]
    result5 = solution.compress(chars5)
    expected5 = 4
    expected_chars5 = ["a", "b", "1", "2"]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"
    assert chars5[:result5] == expected_chars5, f"Expected {expected_chars5}, got {chars5[:result5]}"

    # Test case 6: Two characters repeated
    chars6 = ["a", "a"]
    result6 = solution.compress(chars6)
    expected6 = 2
    expected_chars6 = ["a", "2"]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"
    assert chars6[:result6] == expected_chars6, f"Expected {expected_chars6}, got {chars6[:result6]}"

    # Test verbose solution
    chars7 = ["a", "a", "b", "b", "c", "c", "c"]
    result7 = solution.compressVerbose(chars7)
    expected7 = 6
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 443. String Compression ===")

    test_cases = [
        ["a", "a", "b", "b", "c", "c", "c"],
        ["a"],
        ["a", "b", "c"],
        ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
        ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
    ]

    for chars in test_cases:
        original = chars.copy()
        length = solution.compress(chars)
        print(f"Original: {original}")
        print(f"Compressed: {chars[:length]} (length: {length})")
        print()

    # Demonstrate the algorithm
    print("Step-by-step for ['a','a','b','b','c','c','c']:")
    chars = ["a", "a", "b", "b", "c", "c", "c"]
    print("Initial:", chars)
    print("1. Read 'a' x2, write ['a','2'] at position 0-1")
    print("2. Read 'b' x2, write ['b','2'] at position 2-3")
    print("3. Read 'c' x3, write ['c','3'] at position 4-5")
    length = solution.compress(chars)
    print(f"Final: {chars[:length]}")
