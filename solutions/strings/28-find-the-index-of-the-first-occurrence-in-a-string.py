"""
# 28. Find The Index Of The First Occurrence In A String
**Easy**

This problem demonstrates key concepts in String matching and pattern searching.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is the classic string matching problem (also known as finding a substring). We need to find
the first position where the needle (pattern) appears in the haystack (text). The straightforward
approach is to check each position in the haystack to see if the needle starts there.

### APPROACH:
1. **Handle edge cases**: If needle is empty, return 0 (convention)
2. **Iterate through valid positions**: Only check positions where needle could fit
3. **Check each position**: For each valid position, compare needle with substring
4. **Return on match**: As soon as we find a match, return the starting index
5. **Return -1 if not found**: If we complete the loop without finding needle

### WHY THIS WORKS:
- We systematically check every possible position where needle could start
- At each position, we verify if all characters of needle match
- We stop early if we find a mismatch at any position within needle
- The first match we find is guaranteed to be the earliest occurrence

### TIME COMPLEXITY: O(n * m)
Where n is the length of haystack and m is the length of needle. In the worst case, we check
every position (n - m + 1) and for each position compare m characters.

Note: More advanced algorithms like KMP or Rabin-Karp can achieve O(n + m), but for most
practical purposes and typical inputs, the simple approach is sufficient and easier to understand.

### SPACE COMPLEXITY: O(1)
We only use a few variables regardless of input size.

### EXAMPLE WALKTHROUGH:
```
Input: haystack = "sadbutsad", needle = "sad"
Step 1: Check position 0: "sad" == "sad" ✓
Output: 0

Input: haystack = "leetcode", needle = "leeto"
Step 1: Check position 0: "leetc" != "leeto" ✗
Step 2: Check position 1: "eetco" != "leeto" ✗
...continue checking...
Step n: No match found
Output: -1
```

### EDGE CASES:
- Empty needle: Return 0 (convention)
- Needle longer than haystack: Return -1
- Needle equals haystack: Return 0
- Needle not in haystack: Return -1
- Multiple occurrences: Return first one

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses a sliding window pattern matching technique.

### Algorithm Steps:
1. Handle edge case: if needle is empty, return 0
2. Calculate the last valid starting position (haystack length - needle length)
3. For each valid position i in haystack:
   - Compare substring haystack[i:i+len(needle)] with needle
   - If match found, return i
4. If no match found after checking all positions, return -1

### Python Built-in Alternative:
Python's str.find() method can also solve this, but implementing it manually demonstrates
understanding of the algorithm.

</details>
"""


class Solution:
    def solve(self, haystack: str, needle: str) -> int:
        """
        Find the index of the first occurrence of needle in haystack.

        Args:
            haystack: The string to search in
            needle: The substring to find

        Returns:
            Index of first occurrence, or -1 if not found

        Time Complexity: O(n * m) where n is haystack length, m is needle length
        Space Complexity: O(1)
        """
        # Edge case: empty needle
        if not needle:
            return 0

        # Edge case: needle longer than haystack
        if len(needle) > len(haystack):
            return -1

        # Check each valid starting position
        for i in range(len(haystack) - len(needle) + 1):
            # Check if needle matches at position i
            match = True
            for j in range(len(needle)):
                if haystack[i + j] != needle[j]:
                    match = False
                    break

            if match:
                return i

        return -1

    def solve_pythonic(self, haystack: str, needle: str) -> int:
        """
        Pythonic solution using string slicing.

        More readable and Pythonic, relies on Python's optimized string operations.

        Time Complexity: O(n * m)
        Space Complexity: O(1)
        """
        if not needle:
            return 0

        needle_len = len(needle)
        haystack_len = len(haystack)

        for i in range(haystack_len - needle_len + 1):
            if haystack[i:i + needle_len] == needle:
                return i

        return -1

    def solve_builtin(self, haystack: str, needle: str) -> int:
        """
        Using Python's built-in str.find() method.

        This is the most Pythonic way but doesn't demonstrate algorithm knowledge.

        Time Complexity: O(n * m) - Python's implementation is highly optimized
        Space Complexity: O(1)
        """
        return haystack.find(needle)


def test_solution():
    """
    Test cases for 28. Find The Index Of The First Occurrence In A String.
    """
    solution = Solution()

    # Test case 1: Found at index 0
    result1 = solution.solve("sadbutsad", "sad")
    assert result1 == 0, f"Test 1 failed: expected 0, got {result1}"

    # Test case 2: Not found
    result2 = solution.solve("leetcode", "leeto")
    assert result2 == -1, f"Test 2 failed: expected -1, got {result2}"

    # Test case 3: Found in middle
    result3 = solution.solve("hello", "ll")
    assert result3 == 2, f"Test 3 failed: expected 2, got {result3}"

    # Test case 4: Needle equals haystack
    result4 = solution.solve("a", "a")
    assert result4 == 0, f"Test 4 failed: expected 0, got {result4}"

    # Test case 5: Empty needle
    result5 = solution.solve("hello", "")
    assert result5 == 0, f"Test 5 failed: expected 0, got {result5}"

    # Test case 6: Needle longer than haystack
    result6 = solution.solve("ab", "abc")
    assert result6 == -1, f"Test 6 failed: expected -1, got {result6}"

    # Test case 7: Found at end
    result7 = solution.solve("mississippi", "issip")
    assert result7 == 4, f"Test 7 failed: expected 4, got {result7}"

    # Test case 8: Multiple occurrences (should return first)
    result8 = solution.solve("ababab", "ab")
    assert result8 == 0, f"Test 8 failed: expected 0, got {result8}"

    # Test pythonic solution
    result9 = solution.solve_pythonic("sadbutsad", "sad")
    assert result9 == 0, f"Test 9 (pythonic) failed: expected 0, got {result9}"

    # Test builtin solution
    result10 = solution.solve_builtin("sadbutsad", "sad")
    assert result10 == 0, f"Test 10 (builtin) failed: expected 0, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Find 'sad' in 'sadbutsad': index {solution.solve('sadbutsad', 'sad')}")
    print(f"Find 'leeto' in 'leetcode': index {solution.solve('leetcode', 'leeto')}")
    print(f"Find 'll' in 'hello': index {solution.solve('hello', 'll')}")
