"""
# 1041. Robot Bounded In Circle

# Difficulty: Medium

Solve problem #1041: Robot Bounded In Circle

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>input data here</dd>
<dt>Output:</dt>
<dd>output data here</dd>
<dt>Explanation:</dt>
<dd>Explanation of the solution</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: Simulation, Direction tracking, Mathematical analysis
**Data Structures**: String
**Patterns**: Cycle detection, State analysis
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(1)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
</details>
"""


def isRobotBounded(instructions: str) -> bool:
    """Check if robot is bounded in a circle."""
    # Directions: North, East, South, West
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    x, y = 0, 0
    direction = 0  # 0: North, 1: East, 2: South, 3: West

    for instruction in instructions:
        if instruction == 'G':
            x += directions[direction][0]
            y += directions[direction][1]
        elif instruction == 'L':
            direction = (direction - 1) % 4
        elif instruction == 'R':
            direction = (direction + 1) % 4

    # Robot is bounded if it returns to origin OR not facing north
    return (x == 0 and y == 0) or direction != 0


if __name__ == "__main__":
    test_cases = [
        ("GGLLGG", True),
        ("GG", False),
        ("GL", True),
        ("GLGLGGLGL", False),
        ("GLRLLGLL", True),
    ]

    print("Testing isRobotBounded:")
    for instructions, expected in test_cases:
        result = isRobotBounded(instructions)
        status = "✓" if result == expected else "✗"
        print(f"{status} isRobotBounded(\"{instructions}\") = {result}, expected = {expected}")
