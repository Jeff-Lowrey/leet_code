"""
# 0735. Asteroid Collision

# Difficulty: Medium

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>asteroids = [5,10,-5]</dd>
<dt>Output:</dt>
<dd>[5,10]</dd>
<dt>Explanation:</dt>
<dd>The 10 and -5 collide resulting in 10. The 5 and 10 never collide.</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: Stack-based Simulation, Collision Detection
**Data Structures**: Stack, Array
**Patterns**: Simulation, State Management
**Time Complexity**: **O(n)** - Each asteroid is pushed and popped at most once
**Space Complexity**: **O(n)** - Stack can contain all asteroids in worst case

### INTUITION:
Use a stack to simulate asteroids. Only right-moving asteroids (positive) can potentially collide with left-moving asteroids (negative). When we encounter a left-moving asteroid, we need to check if it collides with any right-moving asteroids already on the stack.

### APPROACH:
We iterate through the asteroids array and use a stack to track surviving asteroids. For each asteroid, if it's moving right (positive) or the stack is empty, we simply add it to the stack.

When we encounter a left-moving asteroid (negative), we need to handle potential collisions. We compare it with the top of the stack. If the stack top is moving left or the stack is empty, no collision occurs and we add the asteroid. If the stack top is moving right, a collision occurs. We compare their absolute values: if the left-moving asteroid is larger, it destroys the stack top and continues; if equal, both explode; if smaller, the left-moving asteroid explodes.

We continue this collision process until the left-moving asteroid explodes, gets added to the stack, or the stack becomes empty.

### WHY THIS WORKS:
- Stack naturally handles the sequential collision process
- Only right-moving followed by left-moving asteroids can collide
- Each asteroid is processed once, and each collision is resolved immediately
- The stack maintains the final state of surviving asteroids

### EXAMPLE WALKTHROUGH:
Input:
```
asteroids = [5, 10, -5]
```

**Step 1:** Process asteroid 5 (right-moving) → Stack: [5]

**Step 2:** Process asteroid 10 (right-moving) → Stack: [5, 10]

**Step 3:** Process asteroid -5 (left-moving) → Collision with 10

**Step 4:** Compare |-5| vs |10|: 5 < 10, so -5 explodes

**Step 5:** Final stack: [5, 10]

Output:
```
[5, 10]
```

### TIME COMPLEXITY:
**O(n)** - Each asteroid is pushed onto the stack at most once and popped at most once, giving us linear time complexity where n is the number of asteroids.

### SPACE COMPLEXITY:
**O(n)** - In the worst case (all asteroids moving in the same direction or no collisions), the stack will contain all n asteroids.

### EDGE CASES:
- **All moving right:** No collisions, all survive in order
- **All moving left:** No collisions, all survive in order
- **Equal size collision:** Both asteroids explode, neither survives
- **Single asteroid:** Always survives
- **Empty array:** Returns empty array

</details>
"""

from typing import List


class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        """
        Approach: Stack-based simulation of collisions
        Time Complexity: O(n)
        Space Complexity: O(n)

        Args:
            asteroids: Array of integers representing asteroids

        Returns:
            Array of asteroids remaining after all collisions
        """
        stack = []

        for asteroid in asteroids:
            # Process collisions for left-moving asteroid
            while stack and asteroid < 0 < stack[-1]:
                # Collision occurs: right-moving (stack top) vs left-moving (asteroid)
                if stack[-1] < -asteroid:
                    # Right-moving asteroid explodes, continue checking
                    stack.pop()
                    continue
                elif stack[-1] == -asteroid:
                    # Both explode
                    stack.pop()
                # If stack top is larger, current asteroid explodes
                break
            else:
                # No collision occurred, or asteroid survived all collisions
                stack.append(asteroid)

        return stack


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Example from problem
    asteroids1 = [5, 10, -5]
    expected1 = [5, 10]
    result1 = solution.asteroidCollision(asteroids1)
    print(f"Input: {asteroids1}")
    print(f"Output: {result1}")
    print(f"Expected: {expected1}")
    print(f"Pass: {result1 == expected1}")
    print()

    # Test case 2: Multiple collisions
    asteroids2 = [8, -8]
    expected2 = []
    result2 = solution.asteroidCollision(asteroids2)
    print(f"Input: {asteroids2}")
    print(f"Output: {result2}")
    print(f"Expected: {expected2}")
    print(f"Pass: {result2 == expected2}")
    print()

    # Test case 3: All same direction
    asteroids3 = [10, 2, -5]
    expected3 = [10]
    result3 = solution.asteroidCollision(asteroids3)
    print(f"Input: {asteroids3}")
    print(f"Output: {result3}")
    print(f"Expected: {expected3}")
    print(f"Pass: {result3 == expected3}")
    print()

    # Test case 4: Complex scenario
    asteroids4 = [-2, -1, 1, 2]
    expected4 = [-2, -1, 1, 2]
    result4 = solution.asteroidCollision(asteroids4)
    print(f"Input: {asteroids4}")
    print(f"Output: {result4}")
    print(f"Expected: {expected4}")
    print(f"Pass: {result4 == expected4}")
    print()
