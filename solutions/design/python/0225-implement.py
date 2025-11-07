"""
### INTUITION:
A stack follows LIFO (Last In First Out), while a queue follows FIFO (First In First Out).
To simulate stack behavior using queues, we need to reverse the order on every push or pop.
The most efficient approach is to reverse on push, making pop O(1).

### APPROACH:
1. **Single Queue Approach**: Use one main queue
2. **push**: Add new element, then rotate queue to move it to front
   - Add element to queue
   - Rotate queue: for each existing element, dequeue and enqueue (n-1 times)
   - This makes the newest element the front of the queue
3. **pop**: Simply dequeue from front (now acts like stack top)
4. **top**: Peek at front element
5. **empty**: Check if queue is empty

### WHY THIS WORKS:
- By rotating the queue on every push, we maintain stack order
- The most recently added element is always at the front
- Pop and top operations become O(1)
- Only push is O(n), which is acceptable

### EXAMPLE WALKTHROUGH:
Input:
```
push(1): queue = [1]
```

Steps:
Step 1: push(2): queue = [2] -> rotate -> [2, 1]
Step 2: push(3): queue = [3, 2, 1] -> rotate -> [3, 2, 1]
Step 3: top() -> 3
Step 4: pop() -> 3, queue = [2, 1]
Step 5: top() -> 2

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
- push: **O(n)** - need to rotate queue
- pop: **O(1)**
- top: **O(1)**
- empty: **O(1)**

### SPACE COMPLEXITY:
**O(n)** for storing n elements

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from collections import deque
