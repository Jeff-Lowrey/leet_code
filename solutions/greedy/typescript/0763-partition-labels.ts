/**
### INTUITION:
The key insight is that each partition should end at the last occurrence of any character in it. Track last occurrence of each character. Extend partition end while current position hasn't passed last occurrence of all seen characters.

### APPROACH:
1. **Find last occurrence**: Create dict mapping each char to its last index in s
2. **Initialize variables**: Set start = 0, end = 0, result = []
3. **Iterate through string**: For i, char in enumerate(s)
4. **Update partition end**: end = max(end, last_occurrence[char])
5. **Check if partition complete**: If i == end, partition ends here
6. **Add partition size**: Append (end - start + 1) to result
7. **Start new partition**: Set start = i + 1
8. **Return result**: Return result list with partition sizes

### WHY THIS WORKS:
- This ensures that track last occurrence of each character
- This ensures that extend partition end to max last occurrence of chars seen so far
- This ensures that when reach partition end, cut and start new partition
- This ensures that greedy: maximize partition size before cutting
- This ensures that o(n) time: two passes, O(26) = O(1) space for last occurrence map

### EXAMPLE WALKTHROUGH:
Input:
```
s = "ababcbacadefegdehijhklij"
```

Step 1: Record last occurrence of each character
last = {'a':8, 'b':5, 'c':7, 'd':14, 'e':15, ...}
Step 2: Iterate and extend partition
i=0, ch='a': end = max(0, 8) = 8
i=1, ch='b': end = max(8, 5) = 8
...

Steps:
Step 1: i=8: reached end → partition size = 9
Step 2: i=9, ch='c': end = 14
Step 3: ...

Output:
```
[9,7,8] (partition sizes)
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
  partitionLabels(s: string): number[] {
    const lastIndex = new Map<string, number>();

    // Record the last index of each character
    for (let i = 0; i < s.length; i++) {
      lastIndex.set(s[i], i);
    }

    const result: number[] = [];
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
      end = Math.max(end, lastIndex.get(s[i])!);

      if (i === end) {
        result.push(end - start + 1);
        start = i + 1;
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.partitionLabels("ababcbacadefegdehijhklij");
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([9, 7, 8]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.partitionLabels("eccbbbbdec");
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([10]) ? "PASS" : "FAIL"}`);

  const result3 = solution.partitionLabels("abc");
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([1, 1, 1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
