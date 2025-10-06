"""
# 990. Satisfiability of Equality Equations
**Medium**

You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==xj" or "xi!=xj".

Here, xi and xj are lowercase letters (not necessarily different) that represent one-letter variable names.

Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

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

### TIME COMPLEXITY: O(N × α(N))
Where N is number of equations and α is inverse Ackermann function

### SPACE COMPLEXITY: O(1)
Since we only have 26 possible variables (a-z)

### EXAMPLE WALKTHROUGH:
```
Input: ["a==b","b!=a"]
Step 1: Process equalities - Union('a', 'b')
Step 2: Check inequalities - "b!=a" but a and b are in same group
Output: False (contradiction)

Input: ["a==b","b==c","a!=d"]
Step 1: Process equalities - Union('a','b'), Union('b','c') → {a,b,c} group
Step 2: Check inequalities - "a!=d" and d is separate → no conflict
Output: True
```

### KEY INSIGHTS:
- Equality is transitive: if a==b and b==c, then a==c
- Union-Find naturally handles transitivity
- Process all equalities first to establish groups
- Inequality between variables in same group = contradiction

### EDGE CASES:
- No equations (vacuously true)
- Only equality equations
- Only inequality equations
- Self-reference equations like "a==a" or "a!=a"

</details>
"""

class Solution:
    def equationsPossible(self, equations: list[str]) -> bool:
        """
        Check if equality equations can be satisfied using Union-Find.

        Args:
            equations: List of equations in format "xi==xj" or "xi!=xj"

        Returns:
            True if equations can be satisfied, False otherwise

        Time Complexity: O(N × α(N)) where N is number of equations
        Space Complexity: O(1) since we have at most 26 variables
        """
        # Union-Find for 26 lowercase letters
        parent = list(range(26))

        def find(x):
            """Find root with path compression."""
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x, y):
            """Union two variables."""
            px, py = find(x), find(y)
            if px != py:
                parent[px] = py

        def char_to_index(c):
            """Convert character to index (a=0, b=1, etc.)."""
            return ord(c) - ord('a')

        # Step 1: Process all equality equations
        for eq in equations:
            if eq[1] == '=':  # Equality equation "xi==xj"
                x, y = char_to_index(eq[0]), char_to_index(eq[3])
                union(x, y)

        # Step 2: Check all inequality equations
        for eq in equations:
            if eq[1] == '!':  # Inequality equation "xi!=xj"
                x, y = char_to_index(eq[0]), char_to_index(eq[3])
                if find(x) == find(y):  # Same component = contradiction
                    return False

        return True

    def equationsPossibleAlternative(self, equations: list[str]) -> bool:
        """
        Alternative implementation with explicit Union-Find class.

        Args:
            equations: List of equations

        Returns:
            True if satisfiable, False otherwise
        """
        class UnionFind:
            def __init__(self, n):
                self.parent = list(range(n))
                self.rank = [0] * n

            def find(self, x):
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]

            def union(self, x, y):
                px, py = self.find(x), self.find(y)
                if px == py:
                    return

                if self.rank[px] < self.rank[py]:
                    px, py = py, px

                self.parent[py] = px
                if self.rank[px] == self.rank[py]:
                    self.rank[px] += 1

            def connected(self, x, y):
                return self.find(x) == self.find(y)

        uf = UnionFind(26)

        # Parse and categorize equations
        equalities = []
        inequalities = []

        for eq in equations:
            if eq[1:3] == '==':
                equalities.append((ord(eq[0]) - ord('a'), ord(eq[3]) - ord('a')))
            else:  # eq[1:3] == '!='
                inequalities.append((ord(eq[0]) - ord('a'), ord(eq[3]) - ord('a')))

        # Process equalities
        for x, y in equalities:
            uf.union(x, y)

        # Check inequalities
        for x, y in inequalities:
            if uf.connected(x, y):
                return False

        return True

def test_solution():
    """Test cases for 990. Satisfiability of Equality Equations."""
    solution = Solution()

    # Test case 1: Contradiction
    result1 = solution.equationsPossible(["a==b","b!=a"])
    expected1 = False
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Consistent
    result2 = solution.equationsPossible(["b==a","a==b"])
    expected2 = True
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Complex case
    result3 = solution.equationsPossible(["a==b","b==c","a!=d"])
    expected3 = True
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Self-contradiction
    result4 = solution.equationsPossible(["a!=a"])
    expected4 = False
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test alternative implementation
    result5 = solution.equationsPossibleAlternative(["a==b","b!=a"])
    expected5 = False
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    equations = ["a==b","b==c","a!=d"]
    print(f"Equations {equations} satisfiable: {solution.equationsPossible(equations)}")
