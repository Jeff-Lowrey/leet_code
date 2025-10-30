/**
 * 0374. Guess Number Higher Or Lower
 *
 * Difficulty: Easy
 * 
 * We are playing the Guess Game. The game is as follows:
 * 
 * I pick a number from 1 to n. You have to guess which number I picked.
 * 
 * Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
 * 
 * You call a pre-defined API int guess(int num), which returns three possible results:
 * - -1: Your guess is higher than the number I picked (i.e. num > pick).
 * - 1: Your guess is lower than the number I picked (i.e. num < pick).
 * - 0: Your guess is correct (i.e. num == pick).
 * 
 * Return the number that I picked.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1</dd>
 * <dt>Output:</dt>
 * <dd>* 6
 * 1
 * 1</dd>
 * <dt>Explanation:</dt>
 * <dd>Target number is guessed using binary search strategy</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Stack, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * This is a classic binary search problem where we need to find a target number using feedback from a guess API. The key insight is to use the API response to narrow down the search space by half in each iteration.
 * 
 * ### APPROACH:
 * 1. **Binary search**: Use binary search on the range [1, n]
 * 2. **API feedback**: Use guess() API response to adjust search bounds
 * 3. **Boundary adjustment**: Move left/right pointers based on feedback
 * 4. **Termination**: Continue until API returns 0 (correct guess)
 * 
 * ### WHY THIS WORKS:
 * - Binary search optimally reduces search space by half each iteration
 * - API feedback provides perfect direction information
 * - Guaranteed to find the answer in O(log n) time
 * - Similar to searching in a sorted array but using API instead of direct comparison
 * 
 *

This solution uses hash table lookup for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * Given input n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1:
 *
 * Input:
 * ```
 * n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1
 * ```
 *
 * Step 1: guess(5) returns 1 (pick > 5), so left = 6
 * Step 2: guess(8) returns -1 (pick < 8), so right = 7
 * Step 3: guess(6) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 *
 * Output:
 * ```
 * 6
 * 1
 * 1
 * ```

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Binary search through range [1, n]
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space
 * 
 * ### EDGE CASES:
 * - Single number (n = 1): return 1
 * - Pick at boundaries (pick = 1 or pick = n)
 * - Large n values: use overflow-safe mid calculation
 * 
 * </details>
 */

// Mock guess API for testing
let pickedNumber = 6;
function guess(num: number): number {
  if (num > pickedNumber) return -1;
  if (num < pickedNumber) return 1;
  return 0;
}

class Solution {
  /**
   * Find the picked number using binary search with guess API.
   *
   *         Args:
   *             n: Upper bound of the number range [1, n]
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(log n)
   *         Space Complexity: O(1)
   */
  guessNumber(n: number): number {
    let left = 1;
    let right = n;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2); // Avoid overflow
      const result = guess(mid);

      if (result === 0) {
        return mid; // Found the correct number
      } else if (result === -1) {
        right = mid - 1; // Guess too high, search lower half
      } else {
        left = mid + 1; // Guess too low, search upper half
      }
    }

    return -1; // Should never reach here
  }

  /**
   * Recursive solution for guess number game.
   *
   *         Args:
   *             n: Upper bound of range
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(log n)
   *         Space Complexity: O(log n) due to recursion stack
   */
  guessNumberRecursive(n: number): number {
    const binarySearch = (left: number, right: number): number => {
      if (left > right) {
        return -1; // Should not happen
      }

      const mid = left + Math.floor((right - left) / 2);
      const result = guess(mid);

      if (result === 0) {
        return mid;
      } else if (result === -1) {
        return binarySearch(left, mid - 1);
      } else {
        return binarySearch(mid + 1, right);
      }
    };

    return binarySearch(1, n);
  }

  /**
   * Linear search solution (inefficient but simple).
   *
   *         Args:
   *             n: Upper bound
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  guessNumberLinear(n: number): number {
    for (let i = 1; i <= n; i++) {
      if (guess(i) === 0) {
        return i;
      }
    }
    return -1;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 374. Guess Number Higher Or Lower ===");

  // Demonstrate different scenarios
  const testCases: [number, number][] = [
    [10, 6],
    [100, 25],
    [50, 1],
    [1, 1],
  ];

  for (const [n, pick] of testCases) {
    pickedNumber = pick;
    const result = solution.guessNumber(n);
    console.log(`Range [1, ${n}], picked number: ${result}`);
  }

  // Show API call simulation
  console.log("\nAPI simulation for n=10, pick=6:");
  pickedNumber = 6;
  let left = 1;
  let right = 10;
  let callCount = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const result = guess(mid);
    callCount++;
    console.log(`Call ${callCount}: guess(${mid}) = ${result}`);

    if (result === 0) {
      console.log(`Found! Answer is ${mid}`);
      break;
    } else if (result === -1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;