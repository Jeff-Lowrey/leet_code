/**
### INTUITION:
This is a classic **Union-Find** problem. We need to check if equality and inequality constraints can be satisfied simultaneously. The key insight is to first process all equality constraints to group variables, then check if inequality constraints violate these groups.

### APPROACH:
1. **Initialize parent array**: Create Array (parent tracking for **Union-Find**) of size 26 for tracking equivalence classes (one per lowercase letter)
2. **Process equalities**: Use **Union-Find** to group variables that must be equal, storing parent relationships in array
3. **Check inequalities**: For each "!=" constraint using String (equation parsing), verify variables are in different groups using find operation on array
4. **Return result**: True if no conflicts found, False otherwise

### WHY THIS WORKS:
- **Union-Find** efficiently manages equivalence classes through array-based parent tracking
- Path compression optimizes find operations by flattening tree structure in array
- **Array** traversal processes equations in two passes for efficiency
- Equality constraints create connected components (equivalence classes)
- Inequality constraints must not connect variables in same component
- Two-pass approach separates grouping from validation

### EXAMPLE WALKTHROUGH:
Given input ["a==b","b==c","a!=d"]:

Input:
```
["a==b","b==c","a!=d"]
```

Step 1:** Initialize parent array
- parent[0..25] = [0,1,2,...,25] (each variable is its own parent)
- Variables: a=0, b=1, c=2, d=3

Step 2:** Process equality "a==b"
- Union(a, b): parent[0] = 1
- Groups: {a,b}, {c}, {d}, ...

Step 3:** Process equality "b==c"
- Union(b, c): parent[1] = 2
- Groups: {a,b,c}, {d}, ...

Step 4:** Check inequality "a!=d"
- find(a) = 2 (through path compression: a→b→c)
- find(d) = 3
- 2 ≠ 3, so no conflict

Step 4:** Return result
- All constraints satisfied, no contradictions found
- Can assign: a=0, b=0, c=0, d=1

Output:
```
true
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

class Solution {
  /**
   * Check if equality equations can be satisfied using **Union-Find**.
   *
   *         Args:
   *             equations: List of equations in format "xi==xj" or "xi!=xj"
   *
   *         Returns:
   *             True if equations can be satisfied, False otherwise
   *
   *         Time Complexity: O(N × α(N)) where N is number of equations
   *         Space Complexity: O(1) since we have at most 26 variables
   */
  equationsPossible(equations: string[]): boolean {
    const parent = **Array**.from({ length: 26 }, (_, i) => i);

    const find = (x: number): number => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]); // Path compression
      }
      return parent[x];
    };

    const union = (x: number, y: number): void => {
      parent[find(x)] = find(y);
    };

    // Process all equality equations first
    for (const eq of equations) {
      if (eq[1] === "=") {
        const x = eq.charCodeAt(0) - 97; // 'a' = 97
        const y = eq.charCodeAt(3) - 97;
        union(x, y);
      }
    }

    // Check inequality equations
    for (const eq of equations) {
      if (eq[1] === "!") {
        const x = eq.charCodeAt(0) - 97;
        const y = eq.charCodeAt(3) - 97;
        if (find(x) === find(y)) {
          return false; // Contradiction found
        }
      }
    }

    return true;
  }

  /**
   * Alternative implementation with explicit **Union-Find** class.
   *
   *         Args:
   *             equations: List of equations
   *
   *         Returns:
   *             True if satisfiable, False otherwise
   */
  equationsPossibleAlternative(equations: string[]): boolean {
    class UnionFind {
      parent: number[];
      rank: number[];

      constructor(n: number) {
        this.parent = **Array**.from({ length: n }, (_, i) => i);
        this.rank = **Array**(n).fill(0);
      }

      find(x: number): number {
        if (this.parent[x] !== x) {
          this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
      }

      union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
          if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
          } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
          } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
          }
        }
      }
    }

    const uf = new UnionFind(26);

    // Process equalities
    for (const eq of equations) {
      if (eq[1] === "=") {
        const x = eq.charCodeAt(0) - 97;
        const y = eq.charCodeAt(3) - 97;
        uf.union(x, y);
      }
    }

    // Check inequalities
    for (const eq of equations) {
      if (eq[1] === "!") {
        const x = eq.charCodeAt(0) - 97;
        const y = eq.charCodeAt(3) - 97;
        if (uf.find(x) === uf.find(y)) {
          return false;
        }
      }
    }

    return true;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const equations = ["a==b", "b==c", "a!=d"];
  console.log(`Equations [${equations}] satisfiable:`, solution.equationsPossible(equations));

  const equations2 = ["a==b", "b!=a"];
  console.log(`Equations [${equations2}] satisfiable:`, solution.equationsPossible(equations2));
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;