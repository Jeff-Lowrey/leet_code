"""
LeetCode Problem 1041: Robot Bounded In Circle
Difficulty: Medium
Category: Simulation

Problem Description:
On an infinite plane, a robot initially stands at (0, 0) facing north. The robot receives a string
of instructions. Valid instructions are 'G' (go straight 1 unit), 'L' (turn 90 degrees left), and
'R' (turn 90 degrees right).

The robot performs the instructions repeatedly forever. Return true if and only if there exists a
circle in the plane such that the robot never leaves the circle.

Example 1:
Input: instructions = "GGLLGG"
Output: true

Example 2:
Input: instructions = "GG"
Output: false

Example 3:
Input: instructions = "GL"
Output: true

Constraints:
- 1 <= instructions.length <= 100
- instructions[i] is 'G', 'L', or 'R'.

METADATA:
Techniques: Simulation, Direction tracking, Mathematical analysis
Data Structures: String
Patterns: Cycle detection, State analysis
Time Complexity: O(n)
Space Complexity: O(1)

Intuition:
Robot is bounded if after 1 cycle: (1) it returns to origin, OR (2) it's not facing north.
If not facing north, it will return to origin after at most 4 cycles.
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
