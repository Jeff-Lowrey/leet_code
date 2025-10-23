/**
 * # 682. Baseball Game
 *
 * # 682. Baseball Game
 *
 * # Difficulty: Easy
 *
 * You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.
 *
 * You are given a list of strings `operations`, where `operations[i]` is the ith operation you must apply to the record and is one of the following:
 *
 * - An integer `x`: Record a new score of `x`.
 * - `'+'`: Record a new score that is the sum of the previous two scores.
 * - `'D'`: Record a new score that is double the previous score.
 * - `'C'`: Invalidate the previous score, removing it from the record.
 *
 * Return the sum of all the scores on the record after applying all the operations.
 *
 * **Example 1:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>ops = ["5","2","C","D","+"]</dd>
 * <dt>Output:</dt>
 * <dd>30</dd>
 * </dl>
 *
 * **Example 2:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>ops = ["5","-2","4","C","D","9","+","+"]</dd>
 * <dt>Output:</dt>
 * <dd>27</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Stack Operations, String Parsing
 * **Data Structures**: Stack, Array
 * **Patterns**: Stack Pattern, Operation Processing
 * **Time Complexity**: **O(n)** - Process each operation once
 * **Space Complexity**: **O(n)** - Stack stores up to n scores
 *
 * ### INTUITION:
 * Use a stack to maintain the record of scores. Process each operation and modify the stack accordingly.
 *
 * ### APPROACH:
 * We iterate through each operation in the list. For integer strings, we parse them and push onto the stack. For '+', we add the sum of the top two elements. For 'D', we double the top element. For 'C', we pop the last element. After processing all operations, we return the sum of all elements in the stack.
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Process each of n operations once
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Stack can grow to size n
 *
 * </details>
 */

class Solution {
  /**
   * Calculate final score after applying baseball game operations.
   *
   * Approach: Stack-based operation processing
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @param {string[]} operations - Array of operation strings
   * @return {number} - Sum of all scores after operations
   */
  calPoints(operations: string[]): number {
    const stack: number[] = [];

    for (const op of operations) {
      if (op === "+") {
        // Add sum of last two scores
        stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
      } else if (op === "D") {
        // Double the last score
        stack.push(2 * stack[stack.length - 1]);
      } else if (op === "C") {
        // Remove the last score
        stack.pop();
      } else {
        // It's an integer, add it to the stack
        stack.push(parseInt(op));
      }
    }

    return stack.reduce((sum, score) => sum + score, 0);
  }
}

// Test cases
function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const ops1: string[] = ["5", "2", "C", "D", "+"];
  console.log(`Test 1: ${solution.calPoints(ops1)}`);
  console.log(`Expected: 30\n`);

  // Test case 2
  const ops2: string[] = ["5", "-2", "4", "C", "D", "9", "+", "+"];
  console.log(`Test 2: ${solution.calPoints(ops2)}`);
  console.log(`Expected: 27\n`);

  // Test case 3
  const ops3: string[] = ["1", "C"];
  console.log(`Test 3: ${solution.calPoints(ops3)}`);
  console.log(`Expected: 0\n`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
