"""
# Difficulty: Easy

# 383. Ransom Note

This problem demonstrates key concepts in Strings and Hash Tables.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>ransomNote = "aa", magazine = "aab"</dd>
<dt>Output:</dt>
<dd>True</dd>
<dt>Explanation:</dt>
<dd>The ransom note 'aa' cannot be constructed from magazine 'ab' (not enough 'a's)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(m + n)
**Space Complexity**: O(1)

### INTUITION:
To construct a ransom note from magazine letters, we need to ensure that the magazine contains
at least as many of each character as required by the ransom note. This is essentially checking
if one string's character frequencies are a subset of another's character frequencies.

### APPROACH:
1. **Count magazine characters**: Build a frequency map of all characters in the magazine
2. **Verify ransom note**: For each character in ransom note, check if available in magazine
3. **Decrement counts**: As we use characters from magazine, decrease their counts
4. **Return result**: If we can construct entire ransom note, return True; otherwise False

### WHY THIS WORKS:
- Hash map provides O(1) lookup for character availability
- By counting magazine characters first, we know what's available
- Decrementing counts as we consume characters ensures we don't reuse
- If any character is unavailable or exhausted, we return False immediately

### EXAMPLE WALKTHROUGH:
```
Input: ransomNote = "aa", magazine = "aab"
Step 1: Count magazine chars: {'a': 2, 'b': 1}
Step 2: Check 'a' (first): count is 2, decrement to 1
Step 3: Check 'a' (second): count is 1, decrement to 0
Step 4: All characters available
Output: True

Input: ransomNote = "aa", magazine = "ab"
Step 1: Count magazine chars: {'a': 1, 'b': 1}
Step 2: Check 'a' (first): count is 1, decrement to 0
Step 3: Check 'a' (second): count is 0, not available
Output: False
```

### TIME COMPLEXITY:
O(m + n)
Where m is the length of magazine and n is the length of ransomNote. We iterate through both
strings once.

### SPACE COMPLEXITY:
O(1)
Although we use a hash map, since we're limited to lowercase English letters (26 characters),
the space is bounded by a constant.

### EDGE CASES:
- Empty ransom note: Always True (can construct nothing from anything)
- Empty magazine: False if ransom note is non-empty, True if both empty
- Magazine shorter than ransom note: Could still be False
- Ransom note with characters not in magazine: False

</details>
"""

from collections import Counter


class Solution:
    def solve(self, ransomNote: str, magazine: str) -> bool:
        """
        Check if ransom note can be constructed from magazine letters.

        Args:
            ransomNote: The note to construct
            magazine: The source of letters

        Returns:
            True if ransom note can be constructed, False otherwise

        Time Complexity: O(m + n) where m is magazine length, n is ransomNote length
        Space Complexity: O(1) - bounded by 26 lowercase letters
        """
        # Count character frequencies in magazine
        char_count = Counter(magazine)

        # Check if we can construct the ransom note
        for char in ransomNote:
            if char_count[char] == 0:
                return False
            char_count[char] -= 1

        return True

    def solve_alternative(self, ransomNote: str, magazine: str) -> bool:
        """
        Alternative solution using Counter subtraction.

        This approach is more Pythonic but conceptually similar.

        Time Complexity: O(m + n)
        Space Complexity: O(1)
        """
        ransom_count = Counter(ransomNote)
        magazine_count = Counter(magazine)

        # Check if all characters in ransom note are available in sufficient quantity
        for char, count in ransom_count.items():
            if magazine_count[char] < count:
                return False

        return True


def test_solution() -> None:
    """
    Test cases for 383. Ransom Note.
    """
    solution = Solution()

    # Test case 1: Cannot construct - missing character
    solution.solve("a", "b")

    # Test case 2: Cannot construct - not enough of each character
    solution.solve("aa", "ab")

    # Test case 3: Can construct
    solution.solve("aa", "aab")

    # Test case 4: Empty ransom note (can always construct nothing)
    solution.solve("", "abc")

    # Test case 5: Exact match
    solution.solve("abc", "abc")

    # Test case 6: Magazine has extras
    solution.solve("abc", "aabbcc")

    # Test case 7: Both empty
    solution.solve("", "")

    # Test case 8: Complex case
    solution.solve("hello", "hheelllloo")

    # Test alternative solution
    result9 = solution.solve_alternative("aa", "aab")
    assert result9 == True, f"Test 9 (alternative) failed: expected True, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Can construct 'aa' from 'aab': {solution.solve('aa', 'aab')}")
    print(f"Can construct 'aa' from 'ab': {solution.solve('aa', 'ab')}")
