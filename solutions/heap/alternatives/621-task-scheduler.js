/**

 *
 * This problem demonstrates key concepts in Heap.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to schedule tasks with a cooling period. The key insight is to always schedule
 * the most frequent task first (greedy approach) to minimize idle time.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - Scheduling most frequent tasks first minimizes total idle time
 * - Each round processes n+1 intervals (one execution + n cooling)
 * - Heap ensures we always pick the most frequent available task
 * - Queue tracks when tasks can be rescheduled
 *
 * TIME COMPLEXITY: O(n) where n is total number of tasks
 * SPACE COMPLEXITY: O(26) = O(1) for at most 26 unique tasks
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: tasks = ["A","A","A","B","B","B"], n = 2
 * Step 1: Frequencies: {A: 3, B: 3}
 * Step 2: Round 1: A B idle (heap: [2, 2])
 * Step 3: Round 2: A B idle (heap: [1, 1])
 * Step 4: Round 3: A B (heap: [])
 * Output: 8
 * ```
 *
 * EDGE CASES:
 * - n = 0 (no cooling needed)
 * - Single task type
 * - All tasks are different
 * - Very large n
 */

/**
 * MaxHeap implementation for task frequencies
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] >= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[largest]) {
                largest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[largest]) {
                largest = rightChild;
            }
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

/**
 * Main solution for Problem 621: Task Scheduler
 *
 * @param {character[]} tasks - Array of tasks
 * @param {number} n - Cooling interval
 * @return {number} - Minimum intervals needed
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(tasks, n) {
    if (tasks.length === 0) return 0;
    if (n === 0) return tasks.length;

    // Count task frequencies
    const freqMap = new Map();
    for (const task of tasks) {
        freqMap.set(task, (freqMap.get(task) || 0) + 1);
    }

    // Build max heap with frequencies
    const maxHeap = new MaxHeap();
    for (const freq of freqMap.values()) {
        maxHeap.push(freq);
    }

    let time = 0;
    const queue = []; // Queue to store [frequency, availableTime]

    while (maxHeap.size() > 0 || queue.length > 0) {
        time++;

        // Add back tasks that are out of cooldown
        if (queue.length > 0 && queue[0][1] === time) {
            maxHeap.push(queue.shift()[0]);
        }

        // Schedule the most frequent task
        if (maxHeap.size() > 0) {
            const freq = maxHeap.pop();
            if (freq > 1) {
                // Task needs to be scheduled again after cooldown
                queue.push([freq - 1, time + n + 1]);
            }
        }
    }

    return time;
}

/**
 * Test cases for Problem 621: Task Scheduler
 */
function testSolution() {
    console.log('Testing 621. Task Scheduler');

    // Test case 1: Basic functionality
    const result1 = solve(["A", "A", "A", "B", "B", "B"], 2);
    const expected1 = 8;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: No cooling needed
    const result2 = solve(["A", "A", "A", "B", "B", "B"], 0);
    const expected2 = 6;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All different tasks
    const result3 = solve(["A", "B", "C", "D", "E", "F"], 2);
    const expected3 = 6;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single task type
    const result4 = solve(["A", "A", "A", "A"], 2);
    const expected4 = 10;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Complex scenario
    const result5 = solve(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2);
    const expected5 = 16;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 621. Task Scheduler!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 621. Task Scheduler ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const tasks = ["A", "A", "A", "B", "B", "B"];
    const n = 2;
    console.log(`Input: tasks = [${tasks}], n = ${n}`);
    const result = solve(tasks, n);
    console.log(`Output: ${result}`);
    console.log('Explanation: One possible sequence is A -> B -> idle -> A -> B -> idle -> A -> B');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses a max heap to greedily schedule most frequent tasks
 * - Queue tracks tasks in cooldown period
 * - Alternative math formula: max(tasks.length, (maxFreq - 1) * (n + 1) + numMaxFreq)
 * - The heap approach is more general and easier to understand
 */
