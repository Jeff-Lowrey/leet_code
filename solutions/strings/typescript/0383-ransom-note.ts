/**
### INTUITION:
The key insight is that to construct a ransom note from magazine letters, we need to ensure that the magazine contains
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
Input:
```
ransomNote = "aa", magazine = "aab"
ransomNote = "aa", magazine = "ab"
```

Step 1: Count magazine chars: {'a': 2, 'b': 1}
Step 2: Check 'a' (first): count is 2, decrement to 1
Step 3: Check 'a' (second): count is 1, decrement to 0
Step 4: All characters available
Step 1: Count magazine chars: {'a': 1, 'b': 1}
Step 2: Check 'a' (first): count is 1, decrement to 0
Step 3: Check 'a' (second): count is 0, not available

Output:
```
True
False
```

### TIME COMPLEXITY:
O(m + n)**
Where m is the length of magazine and n is the length of ransomNote. We iterate through both
strings once.

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Although we use a hash map, since we're limited to lowercase English letters (26 characters),
the space is bounded by a constant.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Check if ransom note can be constructed from magazine letters.
   *
   *         Args:
   *             ransomNote: The note to construct
   *             magazine: The source of letters
   *
   *         Returns:
   *             True if ransom note can be constructed, False otherwise
   *
   *         Time Complexity: O(m + n) where m is magazine length, n is ransomNote length
   *         Space Complexity: O(1) - bounded by 26 lowercase letters
   */
  solve(ransomNote: string, magazine: string): boolean {
    // Implementation
    char_count = Counter(magazine)
    for char in ransomNote:
    if char_count.set(char, = 0:
    return false
    char_count.get(char) -= 1
    return true
  }

  /**
   * Alternative solution using Counter subtraction.
   *
   *         This approach is more Pythonic but conceptually similar.
   *
   *         Time Complexity: O(m + n)
   *         Space Complexity: O(1)
   */
  solve_alternative(ransomNote: string, magazine: string): boolean {
    // Implementation
    ransom_count = Counter(ransomNote)
    magazine_count = Counter(magazine)
    for char, count in ransom_count.items():
    if magazine_count.get(char) < count:
    return false
    return true
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  console.log("\nExample usage:")
  solution = Solution()
  console.log(`Can construct 'aa' from 'aab': {solution.solve('aa', 'aab')}`)
  console.log(`Can construct 'aa' from 'ab': {solution.solve('aa', 'ab')}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;