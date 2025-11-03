/**
### INTUITION:
The key insight is tracking what range [1, covered] we can currently form. If we
can form [1, covered], and we have a number x where x <= covered + 1, then adding
x extends our range to [1, covered + x]. If x > covered + 1, we have a gap and
need to patch with (covered + 1).

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Data structures: Array (for storage)**
1. **Track coverage**: Maintain the maximum number we can currently build using array
2. **Use available numbers**: If nums[i] <= covered + 1, use it from array to extend coverage
3. **Patch when needed**: If nums[i] > covered + 1, patch with (covered + 1)
4. **Greedy choice**: Always patch with (covered + 1) as it doubles our coverage

### WHY THIS WORKS:
- **Greedy Selection** technique: At each step, make the locally optimal choice (patch with covered + 1)
- This greedy choice is optimal because patching with (covered + 1) doubles our coverage range
- If we can form [1, covered], adding (covered + 1) lets us form [1, 2×covered + 1]
- Using existing numbers from **Array** when possible (nums[i] <= covered + 1) is always better than patching
- The sorted **Array** property ensures we process numbers in optimal order
- Greedy works because: patching with any number larger than (covered + 1) would leave a gap
- Each patch maximizes coverage extension, minimizing total patches needed
- The algorithm maintains the invariant that [1, covered] is always formable

### EXAMPLE WALKTHROUGH:
Input:** nums = [1,3], n = 6

Step 1:** Initialize covered = 0, patches = 0
- Need to cover range [1,6]

Step 2:** Process nums[0] = 1
- 1 <= 0+1? Yes → Use 1
- covered = 0+1 = 1
- Can now form: [1,1]

Step 3:** Check nums[1] = 3
- 3 <= 1+1? No (3 > 2) → Gap detected!
- Need to patch with (covered + 1) = 2
- patches = 1, covered = 1 + 2 = 3
- Can now form: [1,3]

Step 4:** Now check nums[1] = 3 again
- 3 <= 3+1? Yes → Use 3
- covered = 3+3 = 6
- Can now form: [1,6]

Step 5:** Check termination
- covered >= 6, done!

Output:
```
1 (patched with 2)
```

### TIME COMPLEXITY:
O(m + log n)**
Where m is length of nums. In worst case, we need log(n) patches.

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  minPatches(nums: number[], n: number): number {
    let patches = 0;
    let miss = 1;
    let i = 0;

    while (miss <= n) {
      if (i < nums.length && nums[i] <= miss) {
        miss += nums[i];
        i++;
      } else {
        miss += miss;
        patches++;
      }
    }

    return patches;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minPatches([1, 3], 6) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minPatches([1, 5, 10], 20) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minPatches([1, 2, 2], 5) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
