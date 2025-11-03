"""
### INTUITION:
The key insight is that two strings are anagrams if they contain the exact same characters with the same frequencies. We can verify this by counting character frequencies in both strings.

### APPROACH:
1. **Length check**: If strings have different lengths, they can't be anagrams
2. **Count characters**: Use a hash map or array to count frequency of each character
3. **Compare counts**: Both strings should have identical character frequency distributions

### WHY THIS WORKS:
- Anagrams are rearrangements of the same letters
- Character frequency is invariant under rearrangement
- If two strings have the same character frequencies, they must be anagrams

### EXAMPLE WALKTHROUGH:
Input:
```
s = "anagram", t = "nagaram"
```

Character counts for s:
a: 3, n: 1, g: 1, r: 1, m: 1
Character counts for t:
n: 1, a: 3, g: 1, r: 1, m: 1

Steps:
Step 1: Both have identical counts → True

Output:
```
True
```

### TIME COMPLEXITY:
**O(n)** - where n is the length of the strings (assuming both have the same length). We make two passes through the strings: one to build the character frequency map from the first string (**O(n)**), and one to verify against the second string (**O(n)**). Each character lookup and insertion in the hash map is **O(1)**. Total: **O(n)** + **O(n)** = **O(2n)** = **O(n)**. Early termination when a mismatch is found provides better average-case performance.

### SPACE COMPLEXITY:
**O(1)** - for the array approach. We use a fixed-size array of 26 elements for lowercase English letters, regardless of input size. For the hash map approach, worst case is **O(k)** where k is the number of unique characters. Since the problem typically assumes lowercase English letters only (26 characters max), this is **O(26)** = **O(1)** constant space.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from collections import Counter
from typing import Any


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        """
        Approach: Character frequency counter
        Time Complexity: O(n)
        Space Complexity: O(1) - at most 26 characters
        """
        return Counter(s) == Counter(t)

    def isAnagramManual(self, s: str, t: str) -> bool:
        """
        Manual counting approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if len(s) != len(t):
            return False

        count: dict[Any, Any] = {}

        # Count characters in s
        for char in s:
            count[char] = count.get(char, 0) + 1

        # Subtract counts for t
        for char in t:
            if char not in count:
                return False
            count[char] -= 1
            if count[char] < 0:
                return False

        return all(v == 0 for v in count.values())

    def isAnagramSort(self, s: str, t: str) -> bool:
        """
        Sorting approach
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        return sorted(s) == sorted(t)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1, t1 = "anagram", "nagaram"
    print(f"s: '{s1}', t: '{t1}'")
    print(f"Output: {solution.isAnagram(s1, t1)}")  # True

    # Test case 2
    s2, t2 = "rat", "car"
    print(f"s: '{s2}', t: '{t2}'")
    print(f"Output: {solution.isAnagram(s2, t2)}")  # False
