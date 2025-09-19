"""
242. Valid Anagram
Easy

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example:
Input: s = "anagram", t = "nagaram"
Output: true
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Two strings are anagrams if they contain the exact same characters with the same frequencies. We can verify this by counting character frequencies in both strings.

### APPROACH:
1. **Length check**: If strings have different lengths, they can't be anagrams
2. **Count characters**: Use a hash map or array to count frequency of each character
3. **Compare counts**: Both strings should have identical character frequency distributions

### WHY THIS WORKS:
- Anagrams are rearrangements of the same letters
- Character frequency is invariant under rearrangement
- If two strings have the same character frequencies, they must be anagrams

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1) - at most 26 lowercase letters

### MULTIPLE APPROACHES:

#### Approach 1: Counter (Most Concise)
```python
return Counter(s) == Counter(t)
```

#### Approach 2: Manual Counting (More Control)
- Count characters in first string
- Decrement counts for second string
- All counts should be zero

#### Approach 3: Sorting (Alternative)
```python
return sorted(s) == sorted(t)
```
Time: O(n log n), but very simple

### EXAMPLE WALKTHROUGH:
```
s = "anagram", t = "nagaram"

Character counts for s:
a: 3, n: 1, g: 1, r: 1, m: 1

Character counts for t:
n: 1, a: 3, g: 1, r: 1, m: 1

Both have identical counts → True
```

### EDGE CASES:
- Empty strings → True (both empty)
- Different lengths → False immediately
- Single character → direct comparison

</details>

from collections import Counter


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

        count = {}

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
