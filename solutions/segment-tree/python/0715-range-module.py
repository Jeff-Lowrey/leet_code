"""
### INTUITION:
This problem requires efficient range updates and queries. We can use segment trees with lazy propagation, or maintain a sorted list of disjoint intervals and merge/split them as needed.

### APPROACH:
1. **Initialize interval list**: Create empty sorted list to store disjoint intervals [left, right)
2. **addRange operation**: Find all intervals that overlap or are adjacent to [left, right), merge them into single interval
3. **Remove overlapping**: Delete all intervals that would be merged, insert new merged interval maintaining sorted order
4. **queryRange operation**: Binary search to find intervals that could contain [left, right), verify complete coverage
5. **removeRange operation**: Find all intervals that overlap with [left, right), split them and remove the overlapping parts
6. **Maintain invariants**: Keep intervals sorted and disjoint at all times for efficient operations
7. **Return query result**: For queries, return True only if entire range is continuously tracked

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
addRange(10, 20): ranges = [(10, 20)]
```

removeRange(14, 16): ranges = [(10, 14), (16, 20)]
queryRange(10, 14): true (fully covered)
queryRange(13, 15): false (15 not covered)
queryRange(16, 17): true (fully covered)

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
- Segment Tree: **O(log n)** per operation
- Sorted Intervals: **O(n)** worst case, **O(log n)** average

### SPACE COMPLEXITY:
**O(n)**
For tree or interval list

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""
