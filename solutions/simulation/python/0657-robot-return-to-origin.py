"""
LeetCode Problem 657: Robot Return to Origin
Difficulty: Easy
Category: Simulation

Problem Description:
There is a robot starting at position (0, 0) on a 2D plane. Given a sequence of its moves,
judge if this robot ends up at (0, 0) after it completes its moves.

The move sequence is represented by a string, and the character moves[i] represents its ith move.
Valid moves are 'R' (right), 'L' (left), 'U' (up), and 'D' (down). Return true if the robot
returns to the origin after all moves, or false otherwise.

Example 1:
Input: moves = "UD"
Output: true
Explanation: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin.

Example 2:
Input: moves = "LL"
Output: false

Constraints:
- 1 <= moves.length <= 2 * 10^4
- moves only contains the characters 'U', 'D', 'L', and 'R'.

METADATA:
Techniques: Simulation, Counting
Data Structures: String
Patterns: Position tracking, Balance checking
Time Complexity: O(n)
Space Complexity: O(1)
"""


def judgeCircle(moves: str) -> bool:
    """Check if robot returns to origin after all moves."""
    return moves.count('U') == moves.count('D') and moves.count('L') == moves.count('R')


def judgeCircleSimulation(moves: str) -> bool:
    """Alternative solution using explicit position tracking."""
    x, y = 0, 0
    for move in moves:
        if move == 'U':
            y += 1
        elif move == 'D':
            y -= 1
        elif move == 'L':
            x -= 1
        elif move == 'R':
            x += 1
    return x == 0 and y == 0


if __name__ == "__main__":
    test_cases = [
        ("UD", True),
        ("LL", False),
        ("RRDD", False),
        ("LDRRLRUULR", False),
        ("UDLR", True),
    ]

    print("Testing judgeCircle:")
    for moves, expected in test_cases:
        result = judgeCircle(moves)
        status = "✓" if result == expected else "✗"
        print(f"{status} judgeCircle(\"{moves}\") = {result}, expected = {expected}")
