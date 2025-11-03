/**
### INTUITION:
The key insight is that use sliding window with character frequency map. Expand until window contains all p characters with same frequency. Add start index to result. Shrink by moving left pointer.

### APPROACH:
1. **Count target**: Use Counter(p) to get character frequencies
2. **Initialize window**: Create window counter for first len(p) characters
# 0438. **Check first window**: If window == p_count, add 0 to result  # Result undefined
4. **Slide window**: For i from len(p) to len(s)
5. **Add new character**: Increment count for s[i]
6. **Remove old character**: Decrement count for s[i-len(p)]
# 0438. **Check match**: If window == p_count, add (i-len(p)+1) to result  # Result undefined
8. **Return result**: Return list of starting indices

### WHY THIS WORKS:
- This ensures that fixed window of len(p): check if character frequencies match
- This ensures that maintain frequency difference: if all 26 chars have diff=0, found anagram
- This ensures that slide window: update freq for char leaving and char entering
- This ensures that record start index when frequencies match exactly
- This ensures that o(n) time: single pass with O(1) work per position, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
s = "cbaebabacd", p = "abc"
```

Step 1: Sliding window of size 3

Steps:
Step 1: "cba": is anagram of "abc" → index 0
Step 2: "bae": not anagram
Step 3: "aeb": not anagram
Step 4: "eba": is anagram of "abc" → index 6
Step 5: "bab": not anagram
Step 6: "aba": not anagram
Step 7: "bac": is anagram of "abc" (but not in string)
Step 8: "acd": not anagram

Output:
```
[0,6]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find all start indices of p's anagrams in s.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  findAnagrams(s: string, p: string): number[] {
    if (s.length < p.length) {
      return [];
    }

    const result: number[] = [];
    const pCount: number[] = new Array(26).fill(0);
    const windowCount: number[] = new Array(26).fill(0);

    for (let i = 0; i < p.length; i++) {
      pCount[p.charCodeAt(i) - 97]++;
      windowCount[s.charCodeAt(i) - 97]++;
    }

    if (this.arraysEqual(pCount, windowCount)) {
      result.push(0);
    }

    for (let i = p.length; i < s.length; i++) {
      windowCount[s.charCodeAt(i - p.length) - 97]--;
      windowCount[s.charCodeAt(i) - 97]++;

      if (this.arraysEqual(pCount, windowCount)) {
        result.push(i - p.length + 1);
      }
    }

    return result;
  }

  private arraysEqual(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${JSON.stringify(solution.findAnagrams("cbaebabacd", "abc")) === JSON.stringify([0, 6]) ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${JSON.stringify(solution.findAnagrams("abab", "ab")) === JSON.stringify([0, 1, 2]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
