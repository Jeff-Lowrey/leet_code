/**
 * # 0078. Subsets
 * 
 * # Difficulty: Medium
 * 
 * Given an integer array `nums` of unique elements, return all possible subsets
 * (the power `set`).
 * 
 * The solution `set` must not contain duplicate subsets. Return the solution in any order.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,2,3]</dd>
 * <dt>Output:</dt>
 * <dd>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All subsets of [1,2,3] include [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Matrix
 * **Patterns**: Backtracking, Tree Pattern
 * **Time Complexity**: O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 * **Space Complexity**: O(n) - recursion depth
 * 
 * ### INTUITION:
The key insight is that generate all possible subsets (power set) by making binary choices for each element: include it or don't include it in the current subset. Use backtracking to explore all combinations.

### APPROACH:
 * **Data structures: Array (results storage, current subset tracking)**
 * 1. **Initialize result list**: Create an empty array to store all subsets (will include empty set)
 * 2. **Define recursive backtracking function**: Create a helper function with start index and current subset array parameters
 * 3. **Add current subset**: At each recursive call, add a copy of the current subset array to results (captures all intermediate states)
 * 4. **Iterate from start index**: Loop through remaining elements in array starting from the start index to avoid duplicates
 * 5. **Include element and recurse**: Add current element to subset array, then recursively explore with next start index (i+1)
 * 6. **Backtrack**: Remove the last added element from array to try the next element at the current level
 * 7. **Return power set**: After all recursive exploration completes, return the complete collection of 2^n subsets
 * 
 * ### WHY THIS WORKS:
- This ensures that each element has 2 choices: include or exclude
- This ensures that total subsets = 2^n (binary choices for n elements)
- This ensures that backtracking systematically explores all combinations
- This ensures that adding current subset at each step captures all intermediate states

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,3]
```

**Step 1:** Initialize result list
- Create empty array: result = []
- This will store all 2^3 = 8 subsets

**Step 2:** Define recursive backtracking function
- Function: backtrack(start=0, current=[])
- Parameters track: start index in array and current subset being built

**Step 3:** Add current subset at each call
- backtrack(0, []) → add [] to result
- backtrack(1, [1]) → add [1] to result
- backtrack(2, [1,2]) → add [1,2] to result
- backtrack(3, [1,2,3]) → add [1,2,3] to result

**Step 4:** Iterate from start index
- At start=0: loop through indices [0,1,2] (elements [1,2,3])
- At start=1: loop through indices [1,2] (elements [2,3])
- At start=2: loop through indices [2] (element [3])

**Step 5:** Include element and recurse
- Include 1: current = [1], recurse with start=1
  - Include 2: current = [1,2], recurse with start=2
    - Include 3: current = [1,2,3], recurse with start=3 (loop ends)

**Step 6:** Backtrack
- After [1,2,3], remove 3: current = [1,2]
- After [1,2], remove 2: current = [1]
  - Include 3: current = [1,3], recurse with start=3
- After [1,3], remove 3, remove 1: current = []
  - Include 2: current = [2], recurse with start=2

**Step 7:** Return power set
- After all recursive calls: result = [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]

Output:
```
[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

### TIME COMPLEXITY:
 * O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 * 
 * ### SPACE COMPLEXITY:
 * O(n) - recursion depth

 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

