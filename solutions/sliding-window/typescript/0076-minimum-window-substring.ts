/**
### INTUITION:
The key insight is that use sliding window with character counts. Expand right until window contains all t characters. Then shrink left while maintaining validity. Track minimum window. Use two frequency maps for comparison.

### APPROACH:
1. **Count target characters**: Use Counter(t) to get required character frequencies
2. **Initialize window variables**: Set left = 0, min_len = float('inf'), required = len(t_count), formed = 0
3. **Expand window with right**: For right in range(len(s)), add s[right] to window_counts
4. **Track formation**: If window_counts[char] == t_count[char], increment formed
5. **Contract window**: While formed == required, try shrinking from left
6. **Update minimum**: If current window smaller, update min_len and min_start
7. **Remove from left**: Remove s[left] from window, increment left
8. **Return result**: Return s[min_start:min_start+min_len] if found, else empty string

### WHY THIS WORKS:
- This ensures that expanding window until all t chars included, then contract to minimize
- This ensures that two frequency maps: need (from t) and window (current counts)
- This ensures that have/need counters track how many unique chars satisfy frequency
- This ensures that when have == need, try contracting left to find minimum
- This ensures that o(m + n) time: scan s once, O(1) space for fixed alphabet

### EXAMPLE WALKTHROUGH:
Input:
```
s = "ADOBECODEBANC", t = "ABC"
```

Step 1: Expand window until valid
"ADOBEC" contains A,B,C
Step 2: Contract from left
"DOBEC" missing A
"ADOBEC" is minimum so far (6 chars)
Step 3: Continue expanding
"ODEBANC" contains A,B,C
Contract: "BANC" (4 chars) - new minimum

Output:
```
"BANC"
```

### TIME COMPLEXITY:
O(n)**

- Single pass through the input

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
   * Find minimum window substring containing all characters from t.
   *
   * Time Complexity: O(m + n)
   * Space Complexity: O(1) - fixed alphabet size
   */
  minWindow(s: string, t: string): string {
    if (!s || !t || s.length < t.length) {
      return "";
    }

    const tCount: Map<string, number> = new Map();
    for (const char of t) {
      tCount.set(char, (tCount.get(char) || 0) + 1);
    }

    const windowCount: Map<string, number> = new Map();
    let required = tCount.size;
    let formed = 0;
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;

    for (let right = 0; right < s.length; right++) {
      const char = s[right];
      windowCount.set(char, (windowCount.get(char) || 0) + 1);

      if (tCount.has(char) && windowCount.get(char) === tCount.get(char)) {
        formed++;
      }

      while (formed === required && left <= right) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1;
          minStart = left;
        }

        const leftChar = s[left];
        windowCount.set(leftChar, windowCount.get(leftChar)! - 1);

        if (tCount.has(leftChar) && windowCount.get(leftChar)! < tCount.get(leftChar)!) {
          formed--;
        }

        left++;
      }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minWindow("ADOBECODEBANC", "ABC") === "BANC" ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minWindow("a", "a") === "a" ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minWindow("a", "aa") === "" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
