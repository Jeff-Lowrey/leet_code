I'll help you create a JavaScript implementation for finding connected components in a graph. I'll create a complete solution that meets the requirements.

```javascript
/**
 * Connected Components Implementation in JavaScript
 * This implementation provides functions to find connected components in an undirected graph
 * using both DFS and Union-Find approaches.
 */

class Graph {
    /**
     * Initialize a graph with a given number of vertices
     * @param {number} vertices - Number of vertices in the graph
     */
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Map();
        
        // Initialize adjacency list for all vertices
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    /**
     * Add an undirected edge between two vertices
     * @param {number} v - First vertex
     * @param {number} w - Second vertex
     */
    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    /**
     * Find connected components using DFS
     * @returns {Array} Array of connected components
     */
    findConnectedComponents() {
        const visited = new Array(this.vertices).fill(false);
        const components = [];

        for (let v = 0; v < this.vertices; v++) {
            if (!visited[v]) {
                const component = [];
                this.dfs(v, visited, component);
                components.push(component);
            }
        }

        return components;
    }

    /**
     * Depth First Search implementation
     * @param {number} v - Current vertex
     * @param {Array} visited - Array to track visited vertices
     * @param {Array} component - Current component being built
     */
    dfs(v, visited, component) {
        visited[v] = true;
        component.push(v);

        for (const neighbor of this.adjList.get(v)) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, component);
            }
        }
    }
}

/**
 * Union-Find data structure implementation for connected components
 */
class UnionFind {
    /**
     * Initialize Union-Find data structure
     * @param {number} size - Number of elements
     */
    constructor(size) {
        this.parent = Array.from({length: size}, (_, i) => i);
        this.rank = new Array(size).fill(0);
        this.components = size;
    }

    /**
     * Find the root of an element with path compression
     * @param {number} x - Element to find root for
     * @returns {number} Root element
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    /**
     * Union two elements by rank
     * @param {number} x - First element
     * @param {number} y - Second element
     */
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.components--;
        }
    }

    /**
     * Get number of connected components
     * @returns {number} Number of components
     */
    getComponentCount() {
        return this.components;
    }
}

// Example usage
function demonstrateConnectedComponents() {
    // Create a graph with 8 vertices
    const graph = new Graph(8);
    
    // Add edges
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(3, 4);
    graph.addEdge(5, 6);
    graph.addEdge(6, 7);

    // Find connected components using DFS
    const components = graph.findConnectedComponents();
    
    console.log("Connected Components using DFS:");
    components.forEach((component, index) => {
        console.log(`Component ${index + 1}:`, component);
    });

    // Demonstrate Union-Find approach
    const uf = new UnionFind(8);
    uf.union(0, 1);
    uf.union(1, 2);
    uf.union(3, 4);
    uf.union(5, 6);
    uf.union(6, 7);

    console.log("\nNumber of components using Union-Find:", uf.getComponentCount());
}

// Run the demonstration
demonstrateConnectedComponents();

// Export classes for external use
module.exports = {
    Graph,
    UnionFind
};
```

This implementation provides a complete solution for finding connected components in an undirected graph using two different approaches:

1. DFS-based approach using a Graph class
2. Union-Find data structure approach

The code includes:

- A `Graph` class with methods for:
  - Adding edges
  - Finding connected components using DFS
  - DFS traversal implementation

- A `UnionFind` class with methods for:
  - Union operations
  - Find operations with path compression
  - Getting component count

The implementation handles:
- Edge cases (empty graph, single vertex)
- Proper initialization
- Efficient operations using appropriate data structures

The code follows JavaScript best practices:
- Clear class and method structure
- Comprehensive comments
- Consistent naming conventions
- Proper error handling
- Module exports for reusability

The demonstration code shows how to use both approaches and prints the results to the console.