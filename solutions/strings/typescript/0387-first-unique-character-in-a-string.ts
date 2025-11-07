/**
### INTUITION:
The key insight is that to find the first unique (non-repeating) character in a string, we need to know the frequency
of each character. A character is unique if it appears exactly once. We need to return the index
of the first such character when reading left to right.

### APPROACH:
1. **Count frequencies**: Build a frequency map of all characters in the string
2. **Find first unique**: Iterate through string again, checking frequency map
3. **Return index**: Return the index of first character with frequency 1
4. **Return -1**: If no unique character exists

### WHY THIS WORKS:
- This ensures that two-pass approach: first pass counts, second pass finds
- This ensures that hash map provides O(1) lookup for character frequencies
- This ensures that by iterating left to right in second pass, we find the first unique character
- This ensures that this approach is more efficient than checking each character's uniqueness separately

### EXAMPLE WALKTHROUGH:
Input:
```
s = "leetcode"
s = "loveleetcode"
```

Step 1: Count frequencies: {'l':1, 'e':3, 't':1, 'c':1, 'o':1, 'd':1}
Step 2: Check s[0]='l': frequency is 1, found first unique!
Step 1: Count frequencies: {'l':2, 'o':2, 'v':1, 'e':4, 't':1, 'c':1, 'd':1}
Step 2: Check s[0]='l': frequency is 2, not unique
Step 3: Check s[1]='o': frequency is 2, not unique
Step 4: Check s[2]='v': frequency is 1, found first unique!

Output:
```
0
2
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input
We make two passes through the string: one to count (**O(n)**) and one to find (**O(n)**).
Total is **O(2n)** = **O(n)**.

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Although we use a hash map, since we're limited to lowercase English letters (26 characters),
the space is bounded by a constant. For general character sets, it would be **O(k)** where k is
the character set size.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Find index of first unique (non-repeating) character in string.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1) - bounded by 26 characters
   */
  firstUniqChar(s: string): number {
    const charCount: Map<string, number> = new Map();

    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
      if (charCount.get(s[i]) === 1) {
        return i;
      }
    }

    return -1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.firstUniqChar("leetcode") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.firstUniqChar("loveleetcode") === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.firstUniqChar("aabb") === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.firstUniqChar("z") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.firstUniqChar("aabbccz") === 6 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
