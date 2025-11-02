/**
 * Difficulty: Medium
 *
 * We are given an array `asteroids` of integers representing asteroids in a row.
 *
 * For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.
 *
 * Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>asteroids = [5,10,-5]</dd>
 * <dt>Output:</dt>
 * <dd>[5,10]</dd>
 * <dt>Explanation:</dt>
 * <dd>The 10 and -5 collide resulting in 10. The 5 and 10 never collide.</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Stack-based Simulation, Collision Detection
 * **Data Structures**: Stack, Array
 * **Patterns**: Simulation, State Management
 * **Time Complexity**: O(n) - Each asteroid is pushed and popped at most once
 * **Space Complexity**: O(n) - Stack can contain all asteroids in worst case
 *
 * ### INTUITION:
 * Use a stack to simulate asteroids. Only right-moving asteroids (positive) can potentially collide with left-moving asteroids (negative). When we encounter a left-moving asteroid, we need to check if it collides with any right-moving asteroids already on the stack.
 *
 * ### APPROACH:
 * We iterate through the asteroids array and use a stack to track surviving asteroids. For each asteroid, if it's moving right (positive) or the stack is empty, we simply add it to the stack.
 *
 * When we encounter a left-moving asteroid (negative), we need to handle potential collisions. We compare it with the top of the stack. If the stack top is moving left or the stack is empty, no collision occurs and we add the asteroid. If the stack top is moving right, a collision occurs. We compare their absolute values: if the left-moving asteroid is larger, it destroys the stack top and continues; if equal, both explode; if smaller, the left-moving asteroid explodes.
 *
 * We continue this collision process until the left-moving asteroid explodes, gets added to the stack, or the stack becomes empty.
 *
 * ### WHY THIS WORKS:
 * - Stack naturally handles the sequential collision process
 * - Only right-moving followed by left-moving asteroids can collide
 * - Each asteroid is processed once, and each collision is resolved immediately
 * - The stack maintains the final state of surviving asteroids
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * asteroids = [5, 10, -5]
 * ```
 *
 * **Step 1:** Process asteroid 5 (right-moving) → Stack: [5]
 *
 * **Step 2:** Process asteroid 10 (right-moving) → Stack: [5, 10]
 *
 * **Step 3:** Process asteroid -5 (left-moving) → Collision with 10
 *
 * **Step 4:** Compare |-5| vs |10|: 5 < 10, so -5 explodes
 *
 * **Step 5:** Final stack: [5, 10]
 *
 * Output:
 * ```
 * [5, 10]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Each asteroid is pushed onto the stack at most once and popped at most once, giving us linear time complexity where n is the number of asteroids.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - In the worst case (all asteroids moving in the same direction or no collisions), the stack will contain all n asteroids.
 *
 * ### EDGE CASES:
 * - **All moving right:** No collisions, all survive in order
 * - **All moving left:** No collisions, all survive in order
 * - **Equal size collision:** Both asteroids explode, neither survives
 * - **Single asteroid:** Always survives
 * - **Empty array:** Returns empty array
 *
 * </details>
 */

class Solution {
  /**
   * Main solution method
   *
   * Approach: Stack-based simulation of collisions
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  asteroidCollision(asteroids: number[]): number[] {
    const stack: number[] = [];

    for (const asteroid of asteroids) {
      let destroyed = false;

      // Process collisions for left-moving asteroid
      while (
        stack.length > 0 &&
        asteroid < 0 &&
        stack[stack.length - 1] > 0
      ) {
        const top = stack[stack.length - 1];

        // Collision occurs: right-moving (stack top) vs left-moving (asteroid)
        if (top < -asteroid) {
          // Right-moving asteroid explodes, continue checking
          stack.pop();
        } else if (top === -asteroid) {
          // Both explode
          stack.pop();
          destroyed = true;
          break;
        } else {
          // Stack top is larger, current asteroid explodes
          destroyed = true;
          break;
        }
      }

      // Add asteroid if it survived all collisions
      if (!destroyed) {
        stack.push(asteroid);
      }
    }

    return stack;
  }
}

// Test cases
function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  console.log("Test Case 1:");
  const asteroids1 = [5, 10, -5];
  const expected1 = [5, 10];
  const result1 = solution.asteroidCollision(asteroids1);
  console.log(`Input: ${JSON.stringify(asteroids1)}`);
  console.log(`Output: ${JSON.stringify(result1)}`);
  console.log(`Expected: ${JSON.stringify(expected1)}`);
  console.log(
    `Pass: ${JSON.stringify(result1) === JSON.stringify(expected1)}`,
  );
  console.log();

  // Test case 2: Multiple collisions
  console.log("Test Case 2:");
  const asteroids2 = [8, -8];
  const expected2: number[] = [];
  const result2 = solution.asteroidCollision(asteroids2);
  console.log(`Input: ${JSON.stringify(asteroids2)}`);
  console.log(`Output: ${JSON.stringify(result2)}`);
  console.log(`Expected: ${JSON.stringify(expected2)}`);
  console.log(
    `Pass: ${JSON.stringify(result2) === JSON.stringify(expected2)}`,
  );
  console.log();

  // Test case 3: All same direction
  console.log("Test Case 3:");
  const asteroids3 = [10, 2, -5];
  const expected3 = [10];
  const result3 = solution.asteroidCollision(asteroids3);
  console.log(`Input: ${JSON.stringify(asteroids3)}`);
  console.log(`Output: ${JSON.stringify(result3)}`);
  console.log(`Expected: ${JSON.stringify(expected3)}`);
  console.log(
    `Pass: ${JSON.stringify(result3) === JSON.stringify(expected3)}`,
  );
  console.log();

  // Test case 4: Complex scenario
  console.log("Test Case 4 (Edge Case):");
  const asteroids4 = [-2, -1, 1, 2];
  const expected4 = [-2, -1, 1, 2];
  const result4 = solution.asteroidCollision(asteroids4);
  console.log(`Input: ${JSON.stringify(asteroids4)}`);
  console.log(`Output: ${JSON.stringify(result4)}`);
  console.log(`Expected: ${JSON.stringify(expected4)}`);
  console.log(
    `Pass: ${JSON.stringify(result4) === JSON.stringify(expected4)}`,
  );
  console.log();
}

// Run tests if executed directly
if (require.main === module) {
  runTests();
}

export default Solution;
