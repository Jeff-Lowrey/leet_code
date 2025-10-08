"""
# 715. Range Module
**Hard**

A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.

A half-open interval [left, right) denotes all the real numbers x where left <= x < right.

Implement the RangeModule class:

- RangeModule() Initializes the object.
- void addRange(int left, int right) Adds the half-open interval [left, right), tracking every real number in that interval.
- boolean queryRange(int left, int right) Returns true if every real number in the interval [left, right) is currently being tracked, and false otherwise.
- void removeRange(int left, int right) Stops tracking every real number currently being tracked in the half-open interval [left, right).

<details>
<parameter name="summary"><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This problem requires efficient range updates and queries. We can use segment trees with lazy propagation, or maintain a sorted list of disjoint intervals and merge/split them as needed.

### APPROACHES:
1. **Segment Tree with Lazy Propagation**: O(log n) per operation
2. **Sorted Intervals with Binary Search**: O(n) worst case, but efficient in practice
3. **TreeMap/SortedDict**: Similar to sorted intervals

### WHY SEGMENT TREE WORKS:
- Track which ranges are covered (1) or not (0)
- Add: set range to 1
- Remove: set range to 0
- Query: check if all values in range are 1
- Lazy propagation optimizes range updates

### WHY SORTED INTERVALS WORK:
- Maintain list of disjoint covered intervals
- Add: merge overlapping intervals
- Remove: split/remove overlapping intervals
- Query: check if query range is contained in some interval

### TIME COMPLEXITY:
- Segment Tree: O(log n) per operation
- Sorted Intervals: O(n) worst case, O(log n) average

### SPACE COMPLEXITY: O(n)
For tree or interval list

### EXAMPLE WALKTHROUGH:
```
addRange(10, 20): ranges = [(10, 20)]
removeRange(14, 16): ranges = [(10, 14), (16, 20)]
queryRange(10, 14): true (fully covered)
queryRange(13, 15): false (15 not covered)
queryRange(16, 17): true (fully covered)
```

### KEY INSIGHTS:
- Maintain disjoint intervals
- Merge overlapping intervals on add
- Split intervals on remove
- Binary search finds relevant intervals
- Half-open intervals simplify merge logic

### EDGE CASES:
- Empty ranges
- Overlapping add operations
- Removing non-existent ranges
- Query on empty module
- Adjacent intervals (should merge)

</details>
"""

import bisect


class RangeModule:
    """
    Range module using sorted intervals approach.

    Time Complexity: O(n) worst case, O(log n) average per operation
    Space Complexity: O(n) for interval storage
    """

    def __init__(self):
        """Initialize with empty interval list."""
        self.intervals = []  # Sorted list of (left, right) intervals

    def addRange(self, left: int, right: int) -> None:
        """
        Add range [left, right) to tracked ranges.

        Args:
            left: Left boundary (inclusive)
            right: Right boundary (exclusive)
        """
        # Find intervals that overlap or are adjacent to [left, right)
        new_intervals = []
        i = 0

        # Add intervals before [left, right)
        while i < len(self.intervals) and self.intervals[i][1] < left:
            new_intervals.append(self.intervals[i])
            i += 1

        # Merge overlapping/adjacent intervals
        while i < len(self.intervals) and self.intervals[i][0] <= right:
            left = min(left, self.intervals[i][0])
            right = max(right, self.intervals[i][1])
            i += 1

        new_intervals.append((left, right))

        # Add remaining intervals
        while i < len(self.intervals):
            new_intervals.append(self.intervals[i])
            i += 1

        self.intervals = new_intervals

    def queryRange(self, left: int, right: int) -> bool:
        """
        Check if range [left, right) is fully covered.

        Args:
            left: Left boundary (inclusive)
            right: Right boundary (exclusive)

        Returns:
            True if entire range is covered, False otherwise
        """
        # Binary search for interval that might contain [left, right)
        i = bisect.bisect_left(self.intervals, (left, float("inf")))

        # Check previous interval (might contain left)
        if i > 0:
            i -= 1

        # Check if [left, right) is contained in intervals[i]
        if i < len(self.intervals):
            l, r = self.intervals[i]
            return l <= left and right <= r

        return False

    def removeRange(self, left: int, right: int) -> None:
        """
        Remove range [left, right) from tracked ranges.

        Args:
            left: Left boundary (inclusive)
            right: Right boundary (exclusive)
        """
        new_intervals = []
        i = 0

        # Add intervals before [left, right)
        while i < len(self.intervals) and self.intervals[i][1] <= left:
            new_intervals.append(self.intervals[i])
            i += 1

        # Process overlapping intervals
        while i < len(self.intervals) and self.intervals[i][0] < right:
            l, r = self.intervals[i]

            # Keep part before left
            if l < left:
                new_intervals.append((l, left))

            # Keep part after right
            if r > right:
                new_intervals.append((right, r))

            i += 1

        # Add remaining intervals
        while i < len(self.intervals):
            new_intervals.append(self.intervals[i])
            i += 1

        self.intervals = new_intervals


class RangeModuleSegmentTree:
    """
    Range module using segment tree with lazy propagation.

    Time Complexity: O(log n) per operation
    Space Complexity: O(n)
    """

    def __init__(self):
        """Initialize segment tree."""
        self.MAX_VAL = 10**9
        self.tree = {}
        self.lazy = {}

    def _push(self, node, start, end):
        """Push lazy value to children."""
        if node in self.lazy:
            self.tree[node] = self.lazy[node]
            if start != end:
                self.lazy[2 * node] = self.lazy[node]
                self.lazy[2 * node + 1] = self.lazy[node]
            del self.lazy[node]

    def _update(self, node, start, end, l, r, val):
        """Update range [l, r) to val."""
        if start >= end or l >= r or r <= start or l >= end:
            return

        if l <= start and end <= r:
            self.lazy[node] = val
            self._push(node, start, end)
            return

        mid = (start + end) // 2
        self._push(node, start, end)
        self._update(2 * node, start, mid, l, r, val)
        self._update(2 * node + 1, mid, end, l, r, val)

        # Update current node
        left_val = self.tree.get(2 * node, 0)
        right_val = self.tree.get(2 * node + 1, 0)
        self.tree[node] = 1 if left_val == 1 and right_val == 1 and mid - start == end - mid else 0

    def _query(self, node, start, end, l, r):
        """Query if range [l, r) is fully covered."""
        if start >= end or l >= r or r <= start or l >= end:
            return True

        self._push(node, start, end)

        if l <= start and end <= r:
            return self.tree.get(node, 0) == 1

        mid = (start + end) // 2
        left_covered = self._query(2 * node, start, mid, l, r)
        right_covered = self._query(2 * node + 1, mid, end, l, r)
        return left_covered and right_covered

    def addRange(self, left: int, right: int) -> None:
        """Add range [left, right)."""
        self._update(1, 0, self.MAX_VAL, left, right, 1)

    def queryRange(self, left: int, right: int) -> bool:
        """Check if range [left, right) is fully covered."""
        return self._query(1, 0, self.MAX_VAL, left, right)

    def removeRange(self, left: int, right: int) -> None:
        """Remove range [left, right)."""
        self._update(1, 0, self.MAX_VAL, left, right, 0)


def test_solution():
    """Test cases for Problem 715."""

    # Test sorted intervals approach
    print("Testing sorted intervals approach:")
    obj = RangeModule()

    obj.addRange(10, 20)
    result1 = obj.queryRange(10, 14)
    assert result1, f"Expected True, got {result1}"

    result2 = obj.queryRange(13, 15)
    assert result2, f"Expected True, got {result2}"

    result3 = obj.queryRange(16, 17)
    assert result3, f"Expected True, got {result3}"

    obj.removeRange(14, 16)
    result4 = obj.queryRange(10, 14)
    assert result4, f"Expected True, got {result4}"

    result5 = obj.queryRange(13, 15)
    assert not result5, f"Expected False, got {result5}"

    result6 = obj.queryRange(16, 17)
    assert result6, f"Expected True, got {result6}"

    # Test segment tree approach
    print("Testing segment tree approach:")
    obj2 = RangeModuleSegmentTree()

    obj2.addRange(10, 20)
    result7 = obj2.queryRange(10, 14)
    assert result7, f"Expected True, got {result7}"

    obj2.removeRange(14, 16)
    result8 = obj2.queryRange(13, 15)
    assert not result8, f"Expected False, got {result8}"

    # Test merging intervals
    obj3 = RangeModule()
    obj3.addRange(10, 20)
    obj3.addRange(15, 25)  # Should merge
    result9 = obj3.queryRange(10, 25)
    assert result9, f"Expected True, got {result9}"

    # Test removing entire range
    obj4 = RangeModule()
    obj4.addRange(10, 20)
    obj4.removeRange(10, 20)
    result10 = obj4.queryRange(10, 20)
    assert not result10, f"Expected False, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    print("\n=== 715. Range Module ===")

    # Demonstrate sorted intervals approach
    print("\nSorted Intervals Approach:")
    rm = RangeModule()

    operations = [
        ("addRange", 10, 20),
        ("removeRange", 14, 16),
        ("queryRange", 10, 14),
        ("queryRange", 13, 15),
        ("queryRange", 16, 17),
    ]

    for op, left, right in operations:
        if op == "addRange":
            rm.addRange(left, right)
            print(f"addRange({left}, {right})")
            print(f"  Intervals: {rm.intervals}")
        elif op == "removeRange":
            rm.removeRange(left, right)
            print(f"removeRange({left}, {right})")
            print(f"  Intervals: {rm.intervals}")
        elif op == "queryRange":
            result = rm.queryRange(left, right)
            print(f"queryRange({left}, {right}) → {result}")

    # Demonstrate merging
    print("\nMerging adjacent intervals:")
    rm2 = RangeModule()
    rm2.addRange(1, 3)
    print(f"After addRange(1, 3): {rm2.intervals}")
    rm2.addRange(3, 5)
    print(f"After addRange(3, 5): {rm2.intervals}")
    rm2.addRange(2, 4)
    print(f"After addRange(2, 4): {rm2.intervals}")

    # Performance comparison
    print("\nApproach complexities:")
    print("Sorted Intervals: O(n) worst case, O(log n) average per operation")
    print("Segment Tree:     O(log n) per operation")
