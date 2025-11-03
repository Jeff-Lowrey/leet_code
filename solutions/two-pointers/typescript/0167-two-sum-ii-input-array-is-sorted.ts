/**
### INTUITION:
The key insight is that array is sorted, so use two pointers from both ends. If sum < target, move left pointer right. If sum > target, move right pointer left. If equal, found the pair.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(numbers) - 1
2. **Loop while left < right**: Continue until pointers meet
3. **Calculate sum**: current_sum = numbers[left] + numbers[right]
4. **Check if found**: If current_sum == target, return [left+1, right+1]
5. **Adjust pointers**: If current_sum < target, increment left; else decrement right
6. **Continue search**: Repeat until target found
7. **Return result**: Return indices of the two numbers

### WHY THIS WORKS:
- Two pointers: left at start, right at end
- If sum < target, increment left (need larger value)
- If sum > target, decrement right (need smaller value)
- If sum == target, found pair
- O(n) time single pass, O(1) space, exploits sorted property

### EXAMPLE WALKTHROUGH:
Input:
```
numbers = [2, 7, 11, 15], target = 9
```

Step 1: Initialize pointers
left = 0 (numbers[0] = 2)
right = 3 (numbers[3] = 15)
Step 2: First iteration
current_sum = 2 + 15 = 17
17 > 9, so move right pointer left
right = 2
Step 3: Second iteration
left = 0 (numbers[0] = 2)
right = 2 (numbers[2] = 11)
current_sum = 2 + 11 = 13
13 > 9, so move right pointer left
right = 1
Step 4: Third iteration
left = 0 (numbers[0] = 2)
right = 1 (numbers[1] = 7)
current_sum = 2 + 7 = 9
9 == 9 ✓ Found!

Output:
```
[1, 2] (1-indexed positions)
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
  twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];

      if (sum === target) {
        return [left + 1, right + 1];
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return [];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${JSON.stringify(solution.twoSum([2, 7, 11, 15], 9)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 2: ${JSON.stringify(solution.twoSum([2, 3, 4], 6)) === JSON.stringify([1, 3]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 3: ${JSON.stringify(solution.twoSum([-1, 0], -1)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
