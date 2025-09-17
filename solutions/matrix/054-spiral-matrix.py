"""
54. Spiral Matrix
Medium

Given an m x n matrix, return all elements of the matrix in spiral order.

Example:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
"""

class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        """
        Approach: Layer by layer
        Time Complexity: O(m * n)
        Space Complexity: O(1) excluding output
        """
        if not matrix or not matrix[0]:
            return []

        m, n = len(matrix), len(matrix[0])
        result = []

        top, bottom = 0, m - 1
        left, right = 0, n - 1

        while top <= bottom and left <= right:
            # Move right
            for col in range(left, right + 1):
                result.append(matrix[top][col])
            top += 1

            # Move down
            for row in range(top, bottom + 1):
                result.append(matrix[row][right])
            right -= 1

            # Move left (if we have rows remaining)
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    result.append(matrix[bottom][col])
                bottom -= 1

            # Move up (if we have columns remaining)
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    result.append(matrix[row][left])
                left += 1

        return result


"""
59. Spiral Matrix II
Medium

Given a positive integer n, generate an n x n matrix filled with elements from
1 to n² in spiral order.

Example:
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
"""

class SolutionGenerate:
    def generateMatrix(self, n: int) -> list[list[int]]:
        """
        Approach: Fill layer by layer
        Time Complexity: O(n²)
        Space Complexity: O(1) excluding output
        """
        matrix = [[0] * n for _ in range(n)]
        num = 1

        top, bottom = 0, n - 1
        left, right = 0, n - 1

        while top <= bottom and left <= right:
            # Fill top row
            for col in range(left, right + 1):
                matrix[top][col] = num
                num += 1
            top += 1

            # Fill right column
            for row in range(top, bottom + 1):
                matrix[row][right] = num
                num += 1
            right -= 1

            # Fill bottom row
            for col in range(right, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
            bottom -= 1

            # Fill left column
            for row in range(bottom, top - 1, -1):
                matrix[row][left] = num
                num += 1
            left += 1

        return matrix


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test Spiral Order
    test_matrices = [
        [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]],
        [[1]],
        [[1, 2], [3, 4]]
    ]

    print("Spiral Order:")
    for matrix in test_matrices:
        result = solution.spiralOrder(matrix)
        print(f"Matrix: {matrix}")
        print(f"Spiral: {result}\n")

    # Test Generate Matrix
    solution_gen = SolutionGenerate()

    print("Generate Spiral Matrix:")
    for n in [3, 1, 4]:
        result = solution_gen.generateMatrix(n)
        print(f"n = {n}:")
        for row in result:
            print(row)
        print()
