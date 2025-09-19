"""
55. Jump Game
Medium

You are given an integer array nums. You are initially positioned at the array's
first index, and each element in the array represents your maximum jump length
at that position.

Return true if you can reach the last index, or false otherwise.

Example:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use greedy approach to track the farthest position we can reach. If at any point our current position exceeds the farthest reachable position, we can't proceed further.

### APPROACH (Greedy):
1. **Track max_reach** - the farthest index we can reach so far
2. **For each position i**:
   - If i > max_reach, we can't reach this position → return False
   - Update max_reach = max(max_reach, i + nums[i])
   - If max_reach ≥ last index → return True

### WHY THIS WORKS:
- We only need to know if the last index is reachable, not the actual path
- Greedy choice: always try to reach the farthest possible position
- If we can reach position i, and from i we can jump nums[i] steps, then we can reach any position up to i + nums[i]

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### THREE APPROACHES:

#### Approach 1: Forward Greedy (Optimal)
Track maximum reachable position while moving forward

#### Approach 2: Backward Greedy
Start from end, work backwards to see if position 0 can reach the end

#### Approach 3: Dynamic Programming
Use DP array to track reachability of each position

### EXAMPLE WALKTHROUGH (Forward Greedy):
```
Input: nums = [2,3,1,1,4]

i=0: max_reach = max(0, 0+2) = 2
     Can reach indices 0,1,2

i=1: max_reach = max(2, 1+3) = 4
     Can reach indices 0,1,2,3,4
     Since 4 ≥ last index (4), return True

Alternative example: nums = [3,2,1,0,4]

i=0: max_reach = max(0, 0+3) = 3
i=1: max_reach = max(3, 1+2) = 3
i=2: max_reach = max(3, 2+1) = 3
i=3: max_reach = max(3, 3+0) = 3
i=4: 4 > 3 (max_reach), so position 4 is unreachable → return False
```

### BACKWARD GREEDY INTUITION:
```
Start from last position, work backwards:
- Find positions that can reach the current "good" position
- If position 0 becomes "good", then we can reach the end
```

### KEY INSIGHT:
Greedy works because if we can reach the farthest possible position at each step, we maximize our chances of reaching the end. We don't need to consider suboptimal intermediate positions.

</details>

class Solution:
    def canJump(self, nums: list[int]) -> bool:
        """
        Approach: Greedy - Track maximum reachable position
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        max_reach = 0
        n = len(nums)

        for i in range(n):
            # If current position is not reachable
            if i > max_reach:
                return False

            # Update maximum reachable position
            max_reach = max(max_reach, i + nums[i])

            # If we can reach the last index
            if max_reach >= n - 1:
                return True

        return True

    def canJumpBackwards(self, nums: list[int]) -> bool:
        """
        Approach: Greedy - Work backwards
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        last_pos = len(nums) - 1

        for i in range(len(nums) - 2, -1, -1):
            if i + nums[i] >= last_pos:
                last_pos = i

        return last_pos == 0

    def canJumpDP(self, nums: list[int]) -> bool:
        """
        Approach: Dynamic Programming
        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        n = len(nums)
        dp = [False] * n
        dp[0] = True

        for i in range(1, n):
            for j in range(i):
                if dp[j] and j + nums[j] >= i:
                    dp[i] = True
                    break

        return dp[n - 1]


"""
45. Jump Game II
Medium

You are given a 0-indexed array of integers nums of length n.

Your goal is to reach nums[n - 1] starting from nums[0] with the minimum number
of jumps.

You can jump from index i to any index in the range [i + 1, min(i + nums[i], n - 1)].

Return the minimum number of jumps to reach nums[n - 1].

Example:
Input: nums = [2,3,1,1,4]
Output: 2
"""

class SolutionJumpII:
    def jump(self, nums: list[int]) -> int:
        """
        Approach: Greedy - BFS-like approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        n = len(nums)
        if n <= 1:
            return 0

        jumps = 0
        current_end = 0
        farthest = 0

        for i in range(n - 1):
            # Update farthest we can reach
            farthest = max(farthest, i + nums[i])

            # If we reached the end of current jump
            if i == current_end:
                jumps += 1
                current_end = farthest

                # Early termination
                if current_end >= n - 1:
                    break

        return jumps

    def jumpBFS(self, nums: list[int]) -> int:
        """
        Approach: Explicit BFS
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        n = len(nums)
        if n <= 1:
            return 0

        level = 0
        current_max = 0
        next_max = 0
        i = 0

        while current_max < n - 1:
            level += 1

            # Process all positions in current level
            while i <= current_max:
                next_max = max(next_max, i + nums[i])
                i += 1

            current_max = next_max

        return level


"""
134. Gas Station
Medium

There are n gas stations along a circular route, where the amount of gas at the
ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
from the ith station to its next station (i + 1)th station.

Given two integer arrays gas and cost, return the starting gas station's index if
you can travel around the circuit once in the clockwise direction, otherwise return -1.

Example:
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
"""

class SolutionGasStation:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        """
        Approach: Greedy - One pass
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        total_gas = 0
        current_gas = 0
        start_station = 0

        for i in range(len(gas)):
            diff = gas[i] - cost[i]
            total_gas += diff
            current_gas += diff

            # If we can't reach next station from current start
            if current_gas < 0:
                start_station = i + 1
                current_gas = 0

        # If total gas < total cost, impossible to complete circuit
        return start_station if total_gas >= 0 else -1

    def canCompleteCircuitBruteForce(self, gas: list[int], cost: list[int]) -> int:
        """
        Approach: Brute Force - Try each station
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(gas)

        for start in range(n):
            tank = 0
            can_complete = True

            for i in range(n):
                station = (start + i) % n
                tank += gas[station] - cost[station]

                if tank < 0:
                    can_complete = False
                    break

            if can_complete:
                return start

        return -1


# Test cases
if __name__ == "__main__":
    # Test Jump Game
    solution_jump = Solution()

    print("Jump Game:")
    test_cases_jump = [
        [2, 3, 1, 1, 4],
        [3, 2, 1, 0, 4],
        [0],
        [2, 0, 0]
    ]

    for nums in test_cases_jump:
        result = solution_jump.canJump(nums)
        print(f"Input: {nums} -> Can Jump: {result}")

    print("\n" + "="*50 + "\n")

    # Test Jump Game II
    solution_jump2 = SolutionJumpII()

    print("Jump Game II:")
    test_cases_jump2 = [
        [2, 3, 1, 1, 4],
        [2, 3, 0, 1, 4],
        [1, 1, 1, 1],
        [1]
    ]

    for nums in test_cases_jump2:
        result = solution_jump2.jump(nums)
        print(f"Input: {nums} -> Min Jumps: {result}")

    print("\n" + "="*50 + "\n")

    # Test Gas Station
    solution_gas = SolutionGasStation()

    print("Gas Station:")
    test_cases_gas = [
        ([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]),
        ([2, 3, 4], [3, 4, 3]),
        ([5, 1, 2, 3, 4], [4, 4, 1, 5, 1])
    ]

    for gas, cost in test_cases_gas:
        result = solution_gas.canCompleteCircuit(gas, cost)
        print(f"Gas: {gas}")
        print(f"Cost: {cost}")
        print(f"Start Station: {result}\n")
