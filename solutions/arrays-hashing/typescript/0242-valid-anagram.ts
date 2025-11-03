/**
### INTUITION:
The key insight is that two strings are anagrams if they contain the exact same characters with the same frequencies. We can verify this by counting character frequencies in both strings.

### APPROACH:
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 1]
```

**Step 1:** Convert array to set
- set(nums) = {1, 2, 3}
- Set length = 3, Array length = 4

**Step 2:** Compare lengths
- len(nums) = 4 != len(set(nums)) = 3
- Since lengths differ, duplicates exist

Output: True

Alternative (Early Termination):
- seen = {}
- Check 1: not in seen, add it → seen = {1}
- Check 2: not in seen, add it → seen = {1, 2}
- Check 3: not in seen, add it → seen = {1, 2, 3}
- Check 1: found in seen → return True immediately

### TIME COMPLEXITY:
O(n)** - where n is the length of the strings (assuming both have the same length). We make two passes through the strings: one to build the character frequency map from the first string (**O(n)**), and one to verify against the second string (**O(n)**). Each character lookup and insertion in the hash map is **O(1)**. Total: **O(n)** + **O(n)** = **O(2n)** = **O(n)**. Early termination when a mismatch is found provides better average-case performance.

### SPACE COMPLEXITY:
O(1)** - for the array approach. We use a fixed-size array of 26 elements for lowercase English letters, regardless of input size. For the hash map approach, worst case is **O(k)** where k is the number of unique characters. Since the problem typically assumes lowercase English letters only (26 characters max), this is **O(26)** = **O(1)** constant space.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Approach: Character frequency counter
   * Time Complexity: O(n)
   * Space Complexity: O(1) - at most 26 characters
   */
  isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const count = new Map<string, number>();

    // Count characters in s
    for (const char of s) {
      count.set(char, (count.get(char) || 0) + 1);
    }

    // Subtract counts for t
    for (const char of t) {
      if (!count.has(char)) {
        return false;
      }
      count.set(char, count.get(char)! - 1);
      if (count.get(char)! < 0) {
        return false;
      }
    }

    // Check all counts are zero
    for (const value of count.values()) {
      if (value !== 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Manual counting approach using object
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  isAnagramManual(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const count: { [key: string]: number } = {};

    // Count characters in s
    for (const char of s) {
      count[char] = (count[char] || 0) + 1;
    }

    // Subtract counts for t
    for (const char of t) {
      if (!(char in count)) {
        return false;
      }
      count[char]--;
      if (count[char] < 0) {
        return false;
      }
    }

    return Object.values(count).every((v) => v === 0);
  }

  /**
   * Sorting approach
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  isAnagramSort(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    return s.split("").sort().join("") === t.split("").sort().join("");
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const s1 = "anagram";
  const t1 = "nagaram";
  console.log(`s: '${s1}', t: '${t1}'`);
  console.log(`Output: ${solution.isAnagram(s1, t1)}`); // true

  // Test case 2
  const s2 = "rat";
  const t2 = "car";
  console.log(`s: '${s2}', t: '${t2}'`);
  console.log(`Output: ${solution.isAnagram(s2, t2)}`); // false
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
