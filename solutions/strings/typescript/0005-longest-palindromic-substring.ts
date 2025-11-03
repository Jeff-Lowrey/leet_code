/**
### INTUITION:
The key insight is that a palindrome mirrors around its center. We can expand around each possible center
(each character and between each pair of characters) to find all palindromes.

### APPROACH:
1. **Expand Around Center**: For each position, expand outward while characters match
2. **Two Cases**: Odd-length palindromes (single center) and even-length (two centers)
3. **Track Maximum**: Keep track of longest palindrome found
4. **Alternative - DP**: Build table where dp[i][j] = is s[i:j+1] a palindrome

### WHY THIS WORKS:
By expanding around each possible center, we check all possible palindromes.
A palindrome reads the same forwards and backwards, so we expand while the
characters on both sides match.

### EXAMPLE WALKTHROUGH:
Input:
```
s = "babad"
```

Steps:
Step 1: Center at 'b' (index 0) → expand → "b" (length 1)
Step 2: Center at 'a' (index 1) → expand → "bab" (length 3)
Step 3: Center at 'b' (index 2) → expand → "b" (length 1)
Step 4: Center at 'a' (index 3) → expand → "aba" (length 3)
Step 5: Center at 'd' (index 4) → expand → "d" (length 1)
Step 6: Longest found → length 3

Output:
```
"bab"
```

Note: "aba" is also a valid answer

### TIME COMPLEXITY:
- Expand around center: **O(n²)** - n centers, each expansion **O(n)**
- Dynamic Programming: **O(n²)**
- Manacher's Algorithm: **O(n)** - optimal

### SPACE COMPLEXITY:
- Expand around center: **O(1)**
- Dynamic Programming: **O(n²)**
- Manacher's Algorithm: **O(n)**

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find longest palindromic substring using expand around center.
   *
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  longestPalindrome(s: string): string {
    if (!s) {
      return "";
    }

    let start = 0;
    let maxLen = 0;

    const expandAroundCenter = (left: number, right: number): number => {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
      }
      return right - left - 1;
    };

    for (let i = 0; i < s.length; i++) {
      // Odd length palindrome (single center)
      const len1 = expandAroundCenter(i, i);
      // Even length palindrome (two centers)
      const len2 = expandAroundCenter(i, i + 1);

      // Get maximum length
      const length = Math.max(len1, len2);

      // Update if we found longer palindrome
      if (length > maxLen) {
        maxLen = length;
        // Calculate start position
        start = i - Math.floor((length - 1) / 2);
      }
    }

    return s.substring(start, start + maxLen);
  }

  /**
   * Find longest palindromic substring using dynamic programming.
   *
   * Time Complexity: O(n²)
   * Space Complexity: O(n²)
   */
  longestPalindromeDP(s: string): string {
    if (!s) {
      return "";
    }

    const n = s.length;
    const dp: boolean[][] = Array(n)
      .fill(null)
      .map(() => Array(n).fill(false));

    let start = 0;
    let maxLen = 1;

    // Every single character is a palindrome
    for (let i = 0; i < n; i++) {
      dp[i][i] = true;
    }

    // Check for palindromes of length 2
    for (let i = 0; i < n - 1; i++) {
      if (s[i] === s[i + 1]) {
        dp[i][i + 1] = true;
        start = i;
        maxLen = 2;
      }
    }

    // Check for lengths greater than 2
    for (let length = 3; length <= n; length++) {
      for (let i = 0; i < n - length + 1; i++) {
        const j = i + length - 1;

        // Check if s[i:j+1] is palindrome
        if (s[i] === s[j] && dp[i + 1][j - 1]) {
          dp[i][j] = true;
          start = i;
          maxLen = length;
        }
      }
    }

    return s.substring(start, start + maxLen);
  }

  /**
   * Brute force approach - check all substrings.
   *
   * Time Complexity: O(n³)
   * Space Complexity: O(1)
   */
  longestPalindromeBruteForce(s: string): string {
    const isPalindrome = (sub: string): boolean => {
      return sub === sub.split("").reverse().join("");
    };

    const n = s.length;
    let longest = "";

    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        const substring = s.substring(i, j + 1);
        if (isPalindrome(substring) && substring.length > longest.length) {
          longest = substring;
        }
      }
    }

    return longest;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const test1 = solution.longestPalindrome("babad");
  console.log(`Test 1: ${test1 === "bab" || test1 === "aba" ? "PASS" : "FAIL"}`);

  console.log(`Test 2: ${solution.longestPalindrome("cbbd") === "bb" ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.longestPalindrome("a") === "a" ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.longestPalindrome("racecar") === "racecar" ? "PASS" : "FAIL"}`);

  const test5 = solution.longestPalindromeDP("babad");
  console.log(`Test 5: ${test5 === "bab" || test5 === "aba" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
