/**
 * # Difficulty: Easy
 *
 * # 860. Lemonade Change
 *
 * Difficulty: Medium
 *
 * At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
 *
 * Note that you do not have any change in hand at first.
 *
 * Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide the correct change to every customer, or false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[5,5,5,10,20]</dd>
 * <dt>Output:</dt>
 * <dd>True</dd>
 * <dt>Explanation:</dt>
 * <dd>Return true because correct change can always be made for [5,5,5,10,20]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Queue Operations
 * **Data Structures**: Array, Queue
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * This is a greedy problem about making change optimally. We need to track our cash inventory and make change using the fewest bills possible. The key insight is to always use larger bills first when making change.
 *
 * ### APPROACH:
 * 1. **Track inventory**: Keep count of $5 and $10 bills
 * 2. **Process each customer**: Handle payment based on bill amount
 * 3. **Make change greedily**: Use largest bills first for optimal change-making
 * 4. **Check feasibility**: Return false if we can't make proper change
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [5,5,5,10,20]
 * ```
 *
 * Steps:
 * Step 1: 5 → count_5=1, count_10=0 ✓
 * Step 2: 5 → count_5=2, count_10=0 ✓
 * Step 3: 5 → count_5=3, count_10=0 ✓
 * Step 4: 10 → need $5 change → count_5=2, count_10=1 ✓
 * Step 5: 20 → need $15 change → use 1×$10 + 1×$5 → count_5=1, count_10=0 ✓
 *
 * Output:
 * ```
 * True
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Process each customer once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only tracking counts of two bill denominations
 *
 * ### EDGE CASES:
 * - Not enough $5 bills for $10 payment
 * - Not enough change combinations for $20 payment
 * - Empty input (return True)
 *
 * </details>
 */

class Solution {
  lemonadeChange(bills: number[]): boolean {
    let fives = 0;
    let tens = 0;

    for (const bill of bills) {
      if (bill === 5) {
        fives++;
      } else if (bill === 10) {
        if (fives === 0) return false;
        fives--;
        tens++;
      } else {
        // bill === 20
        if (tens > 0 && fives > 0) {
          tens--;
          fives--;
        } else if (fives >= 3) {
          fives -= 3;
        } else {
          return false;
        }
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

  console.log(`Test 1: ${solution.lemonadeChange([5, 5, 5, 10, 20]) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.lemonadeChange([5, 5, 10, 10, 20]) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.lemonadeChange([5, 5, 10]) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
