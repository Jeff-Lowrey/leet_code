/**
### INTUITION:
This is a classic Union-Find problem. We need to check if equality and inequality constraints can be satisfied simultaneously. The key insight is to first process all equality constraints to group variables, then check if inequality constraints violate these groups.

### APPROACH:
1. **Process equalities**: Use Union-Find to group variables that must be equal
2. **Check inequalities**: For each "!=" constraint, verify variables are in different groups
3. **Return result**: True if no conflicts found, False otherwise

### WHY THIS WORKS:
- Union-Find efficiently manages equivalence classes
- Equality constraints create connected components
- Inequality constraints must not connect variables in same component
- Two-pass approach separates grouping from validation

### EXAMPLE WALKTHROUGH:
Input:
```
["a==b","b!=a"]
["a==b","b==c","a!=d"]
```

Step 1: Process equalities - Union('a', 'b')
Step 2: Check inequalities - "b!=a" but a and b are in same group

Steps:
Step 1: Process equalities - Union('a','b'), Union('b','c') → {a,b,c} group
Step 2: Check inequalities - "a!=d" and d is separate → no conflict

Output:
```
False (contradiction)
True
```

### TIME COMPLEXITY:
O(N × α(N)**)
Where N is number of equations and α is inverse Ackermann function

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Since we only have 26 possible variables (a-z)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Check if equality equations can be satisfied using Union-Find
 * @param {string[]} equations - Array of equations in format "xi==xj" or "xi!=xj"
 * @returns {boolean} True if equations can be satisfied, false otherwise
 *
 * Time Complexity: O(N × α(N)) where N is number of equations
 * Space Complexity: O(1) since we have at most 26 variables
 */
function equationsPossible(equations) {
  // Union-Find for 26 lowercase letters
  const parent = Array.from({ length: 26 }, (_, i) => i);

  /**
   * Find root with path compression
   * @param {number} x - Index to find root for
   * @returns {number} Root of the component
   */
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  /**
   * Union two variables
   * @param {number} x - First variable index
   * @param {number} y - Second variable index
   */
  function union(x, y) {
    const px = find(x);
    const py = find(y);
    if (px !== py) {
      parent[px] = py;
    }
  }

  /**
   * Convert character to index (a=0, b=1, etc.)
   * @param {string} c - Character to convert
   * @returns {number} Index representation
   */
  function charToIndex(c) {
    return c.charCodeAt(0) - "a".charCodeAt(0);
  }

  // Step 1: Process all equality equations
  for (const eq of equations) {
    if (eq[1] === "=") {
      // Equality equation "xi==xj"
      const x = charToIndex(eq[0]);
      const y = charToIndex(eq[3]);
      union(x, y);
    }
  }

  // Step 2: Check all inequality equations
  for (const eq of equations) {
    if (eq[1] === "!") {
      // Inequality equation "xi!=xj"
      const x = charToIndex(eq[0]);
      const y = charToIndex(eq[3]);
      if (find(x) === find(y)) {
        // Same component = contradiction
        return false;
      }
    }
  }

  return true;
}

/**
 * Alternative implementation with explicit Union-Find class
 * @param {string[]} equations - Array of equations
 * @returns {boolean} True if satisfiable, false otherwise
 */
function equationsPossibleAlternative(equations) {
  class UnionFind {
    constructor(n) {
      this.parent = Array.from({ length: n }, (_, i) => i);
      this.rank = new Array(n).fill(0);
    }

    find(x) {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }

    union(x, y) {
      let px = this.find(x);
      let py = this.find(y);

      if (px === py) {
        return;
      }

      if (this.rank[px] < this.rank[py]) {
        [px, py] = [py, px];
      }

      this.parent[py] = px;
      if (this.rank[px] === this.rank[py]) {
        this.rank[px]++;
      }
    }

    connected(x, y) {
      return this.find(x) === this.find(y);
    }
  }

  const uf = new UnionFind(26);

  // Parse and categorize equations
  const equalities = [];
  const inequalities = [];

  for (const eq of equations) {
    if (eq.substring(1, 3) === "==") {
      equalities.push([
        eq.charCodeAt(0) - "a".charCodeAt(0),
        eq.charCodeAt(3) - "a".charCodeAt(0),
      ]);
    } else {
      // eq.substring(1, 3) === '!='
      inequalities.push([
        eq.charCodeAt(0) - "a".charCodeAt(0),
        eq.charCodeAt(3) - "a".charCodeAt(0),
      ]);
    }
  }

  // Process equalities
  for (const [x, y] of equalities) {
    uf.union(x, y);
  }

  // Check inequalities
  for (const [x, y] of inequalities) {
    if (uf.connected(x, y)) {
      return false;
    }
  }

  return true;
}

/**
 * Test cases for Problem 990: Satisfiability of Equality Equations
 */
function testSolution() {
  console.log("Testing 990. Satisfiability of Equality Equations");

  // Test case 1: Contradiction
  const result1 = equationsPossible(["a==b", "b!=a"]);
  const expected1 = false;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Consistent
  const result2 = equationsPossible(["b==a", "a==b"]);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Complex case
  const result3 = equationsPossible(["a==b", "b==c", "a!=d"]);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Self-contradiction
  const result4 = equationsPossible(["a!=a"]);
  const expected4 = false;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty equations
  const result5 = equationsPossible([]);
  const expected5 = true;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Only equalities
  const result6 = equationsPossible(["a==b", "b==c", "c==d"]);
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 7: Only inequalities
  const result7 = equationsPossible(["a!=b", "b!=c", "c!=d"]);
  const expected7 = true;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  // Test case 8: Complex contradiction
  const result8 = equationsPossible(["a==b", "b==c", "c==d", "a!=d"]);
  const expected8 = false;
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );

  // Test alternative implementation
  const result9 = equationsPossibleAlternative(["a==b", "b!=a"]);
  const expected9 = false;
  console.assert(
    result9 === expected9,
    `Alternative test failed: expected ${expected9}, got ${result9}`,
  );

  console.log(
    "All test cases passed for 990. Satisfiability of Equality Equations!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 990. Satisfiability of Equality Equations ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Contradiction case
  const equations1 = ["a==b", "b!=a"];
  const result1 = equationsPossible(equations1);
  console.log(`equationsPossible(${JSON.stringify(equations1)}) -> ${result1}`);
  console.log(
    "Analysis: a==b groups them together, but b!=a requires them apart → contradiction",
  );

  // Example 2: Consistent case
  const equations2 = ["a==b", "b==c", "a!=d"];
  const result2 = equationsPossible(equations2);
  console.log(
    `\nequationsPossible(${JSON.stringify(equations2)}) -> ${result2}`,
  );
  console.log("Analysis: {a,b,c} form one group, d is separate → consistent");

  // Example 3: Complex case
  const equations3 = ["c==c", "b==d", "x!=z"];
  const result3 = equationsPossible(equations3);
  console.log(
    `\nequationsPossible(${JSON.stringify(equations3)}) -> ${result3}`,
  );
  console.log(
    "Analysis: c==c is trivial, b==d groups them, x!=z are separate → consistent",
  );

  // Example 4: Algorithm comparison
  console.log(`\nAlgorithm comparison:`);
  const testEquations = ["a==b", "b==c", "a!=d"];
  const approaches = [
    ["Basic Union-Find", equationsPossible],
    ["Alternative with class", equationsPossibleAlternative],
  ];

  for (const [name, method] of approaches) {
    const result = method(testEquations);
    console.log(`${name}: ${result}`);
  }

  console.log(`\nKey insights:`);
  console.log(
    `1. Union-Find manages equivalence classes for equality constraints`,
  );
  console.log(
    `2. Two-pass approach: first group equalities, then validate inequalities`,
  );
  console.log(
    `3. Contradiction occurs when inequality constraint connects same group`,
  );
  console.log(`4. Time complexity: O(N × α(N)) where α is inverse Ackermann`);
  console.log(`5. Space complexity: O(1) since we have at most 26 variables`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  equationsPossible,
  equationsPossibleAlternative,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses Union-Find as the primary approach for its natural fit with equivalence relations
 * - Time complexity is O(N × α(N)) where α is the inverse Ackermann function (practically constant)
 * - Space complexity is O(1) since we have at most 26 variables (a-z)
 * - The algorithm handles all edge cases including self-contradictions and empty inputs
 * - Essential insight: process all equalities first to establish groups, then validate inequalities
 * - Alternative implementation demonstrates explicit Union-Find class with rank optimization
 */
