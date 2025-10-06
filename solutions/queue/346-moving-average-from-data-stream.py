"""
346. Moving Average from Data Stream
Easy

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the `MovingAverage` class:
- `MovingAverage(int size)` Initializes the object with the window size `size`.
- `double next(int val)` Returns the moving average of the last `size` values of the stream.

Example:
Input: ["MovingAverage", "next", "next", "next", "next"]
       [[3], [1], [10], [3], [5]]
Output: [null, 1.0, 5.5, 4.66667, 6.0]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a queue to maintain the sliding window of values. When the window exceeds the size limit, remove the oldest element and add the new one.

### APPROACH:
1. **Initialize** a queue to store values and track the window size
2. **For each new value**:
   - Add `val` to the queue
   - If queue size exceeds `size`, remove the front element
   - Calculate and return the average of current elements

### WHY THIS WORKS:
- Queue maintains FIFO order for the sliding window
- We keep exactly `size` elements (or fewer initially)
- Sum and count give us the moving average efficiently

### TIME COMPLEXITY: O(1) per operation
### SPACE COMPLEXITY: O(size)

### EXAMPLE WALKTHROUGH:
```
MovingAverage(3):
next(1): queue=[1], avg=1.0
next(10): queue=[1,10], avg=5.5
next(3): queue=[1,10,3], avg=4.67
next(5): queue=[10,3,5], avg=6.0 (removed 1)
```

</details>
"""

from collections import deque

class MovingAverage:
    def __init__(self, size: int):
        """
        Initialize data structure
        Time Complexity: O(1)
        Space Complexity: O(size)
        """
        self.size = size
        self.queue = deque()
        self.window_sum = 0

    def next(self, val: int) -> float:
        """
        Calculate moving average with new value
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.queue.append(val)
        self.window_sum += val

        # Remove oldest element if window exceeds size
        if len(self.queue) > self.size:
            self.window_sum -= self.queue.popleft()

        return self.window_sum / len(self.queue)


# Test cases
if __name__ == "__main__":
    # Test case 1
    moving_avg = MovingAverage(3)
    print(f"next(1): {moving_avg.next(1)}")    # 1.0
    print(f"next(10): {moving_avg.next(10)}")  # 5.5
    print(f"next(3): {moving_avg.next(3)}")    # 4.67
    print(f"next(5): {moving_avg.next(5)}")    # 6.0