"""
# Difficulty: Medium

# 0134. Gas Station

There are n gas stations along a circular route, where the amount of gas at the
ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
from the ith station to its next (i + 1)th station. You begin the journey with an
empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if
you can travel around the circuit once in the clockwise direction, otherwise return -1.
If there exists a solution, it is guaranteed to be unique.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>gas = [1,2,3,4,5], cost = [3,4,5,1,2]</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>Car can complete circuit starting at gas station 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Array Traversal, Greedy Selection
**Data Structures**: Array, Linked List
**Patterns**: Greedy Algorithm, Tree Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
This problem can be solved greedily by recognizing two key insights:
1. If the total gas is less than total cost, completing the circuit is impossible
2. If we run out of gas at station i when starting from station j, then no station
   between j and i can be a valid starting point

### APPROACH:
1. **Check feasibility**: If sum(gas) < sum(cost), return -1
2. **Track current gas**: Simulate traveling and track current gas level
3. **Reset when negative**: When gas becomes negative, the next station becomes
   the new candidate starting point
4. **Greedy choice**: We don't need to check previous stations again because if
   starting from j fails at i, then j+1, j+2, ..., i-1 will also fail

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
gas = [1,2,3,4,5], cost = [3,4,5,1,2]
```

Check total: sum(gas) = 15, sum(cost) = 15 (feasible)
Start at index 0:
i=0: current_gas = 0 + (1-3) = -2 (negative!)
Reset start to 1, current_gas = 0
Start at index 1:
i=1: current_gas = 0 + (2-4) = -2 (negative!)
Reset start to 2, current_gas = 0
Start at index 2:
i=2: current_gas = 0 + (3-5) = -2 (negative!)
Reset start to 3, current_gas = 0
Start at index 3:
i=3: current_gas = 0 + (4-1) = 3 ✓
i=4: current_gas = 3 + (5-2) = 6 ✓
All positions checked, total_gas >= 0

Output:
```
3
```

### TIME COMPLEXITY:
O(n)
Single pass through the arrays

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- Single station: Only possible if gas[0] >= cost[0]
- All gas equals all cost: First station with gas[i] >= cost[i] works
- Multiple resets: The algorithm handles multiple candidate starting points
- Impossible cases: Return -1 when total gas < total cost

</details>
"""

from typing import List


class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        """
        Find the starting gas station index to complete the circuit.

        Uses greedy approach with two key observations:
        1. If total gas < total cost, no solution exists
        2. If we fail at station i starting from j, then j+1 to i-1 also fail

        Args:
            gas: Array where gas[i] is amount of gas at station i
            cost: Array where cost[i] is gas needed to travel from i to i+1

        Returns:
            Starting station index, or -1 if impossible

        Time Complexity: O(n) - single pass through arrays
        Space Complexity: O(1) - only tracking variables
        """
        n = len(gas)
        total_gas = 0
        current_gas = 0
        start_station = 0

        for i in range(n):
            diff = gas[i] - cost[i]
            total_gas += diff
            current_gas += diff

            # If current gas is negative, we can't reach next station
            # from current starting point
            if current_gas < 0:
                # Try next station as new starting point
                start_station = i + 1
                current_gas = 0

        # If total gas is negative, completing circuit is impossible
        return start_station if total_gas >= 0 else -1

    def canCompleteCircuitBruteForce(self, gas: List[int], cost: List[int]) -> int:
        """
        Brute force solution: try each station as starting point.

        Args:
            gas: Array of gas amounts at each station
            cost: Array of costs to travel to next station

        Returns:
            Starting station index, or -1 if impossible

        Time Complexity: O(n²) - try each station, simulate full circuit
        Space Complexity: O(1)
        """
        n = len(gas)

        for start in range(n):
            current_gas = 0
            can_complete = True

            # Try to complete circuit starting from 'start'
            for i in range(n):
                station = (start + i) % n
                current_gas += gas[station] - cost[station]

                if current_gas < 0:
                    can_complete = False
                    break

            if can_complete:
                return start

        return -1

    def canCompleteCircuitVerbose(self, gas: List[int], cost: List[int]) -> int:
        """
        Verbose version with detailed tracking for educational purposes.

        Args:
            gas: Array of gas amounts
            cost: Array of travel costs

        Returns:
            Starting station index, or -1 if impossible
        """
        n = len(gas)

        # Quick check: if total gas < total cost, impossible
        if sum(gas) < sum(cost):
            return -1

        start = 0
        current_gas = 0

        for i in range(n):
            # Calculate net gain/loss at this station
            net_gain = gas[i] - cost[i]
            current_gas += net_gain

            # If we run out of gas, this starting point doesn't work
            if current_gas < 0:
                # All stations from start to i cannot be valid starting points
                # The next station (i+1) becomes our new candidate
                start = i + 1
                current_gas = 0

        return start


def test_solution() -> None:
    """Test cases for Problem 134."""
    solution = Solution()

    # Test case 1: Standard case - starting from index 3
    result1 = solution.canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Impossible case
    result2 = solution.canCompleteCircuit([2, 3, 4], [3, 4, 3])
    expected2 = -1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Start from beginning
    result3 = solution.canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1])
    expected3 = 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single station - possible
    result4 = solution.canCompleteCircuit([5], [4])
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single station - impossible
    result5 = solution.canCompleteCircuit([2], [5])
    expected5 = -1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: All equal
    result6 = solution.canCompleteCircuit([4, 4, 4, 4], [4, 4, 4, 4])
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Large example
    result7 = solution.canCompleteCircuit([2, 3, 4, 5, 6, 7, 8, 1], [3, 4, 5, 6, 7, 8, 1, 2])
    expected7 = 6  # Starting at index 6 works
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test brute force solution
    result8 = solution.canCompleteCircuitBruteForce([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.canCompleteCircuitVerbose([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
    expected9 = 3
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 134. Gas Station ===")
    print(
        f"canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]) -> {solution.canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])}"
    )
    print(f"canCompleteCircuit([2,3,4], [3,4,3]) -> {solution.canCompleteCircuit([2, 3, 4], [3, 4, 3])}")
