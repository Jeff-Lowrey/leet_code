/**
 * 990. Satisfiability
 * Medium
 *
 * Satisfiability Solver Implementation This implementation provides functionality to solve boolean satisfiability problems
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Satisfiability is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Satisfiability Solver Implementation
 * This implementation provides functionality to solve boolean satisfiability problems
 */

class SatisfiabilitySolver {
    constructor() {
        this.variables = new Set();
        this.clauses = [];
    }

    /**
     * Adds a clause to the formula
     * @param {Array} clause - Array of literals (positive or negative integers)
     */
    addClause(clause) {
        this.clauses.push(clause);
        for (let literal of clause) {
            this.variables.add(Math.abs(literal));
        }
    }

    /**
     * Checks if an assignment satisfies a clause
     * @param {Array} clause - The clause to check
     * @param {Map} assignment - Variable assignments
     * @returns {boolean} - True if clause is satisfied
     */
    isClauseSatisfied(clause, assignment) {
        for (let literal of clause) {
            const variable = Math.abs(literal);
            const value = assignment.get(variable);
            if ((literal > 0 && value) || (literal < 0 && !value)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Recursive function to try different assignments
     * @param {Map} assignment - Current variable assignments
     * @param {Array} unassigned - Remaining unassigned variables
     * @returns {Map|null} - Solution if found, null otherwise
     */
    solve(assignment = new Map(), unassigned = [...this.variables]) {
        // Base case: all variables assigned
        if (unassigned.length === 0) {
            // Check if all clauses are satisfied
            for (let clause of this.clauses) {
                if (!this.isClauseSatisfied(clause, assignment)) {
                    return null;
                }
            }
            return assignment;
        }

        // Try assigning true and false to the next variable
        const variable = unassigned[0];
        const remaining = unassigned.slice(1);

        // Try true
        assignment.set(variable, true);
        const resultTrue = this.solve(assignment, remaining);
        if (resultTrue !== null) {
            return resultTrue;
        }

        // Try false
        assignment.set(variable, false);
        const resultFalse = this.solve(assignment, remaining);
        if (resultFalse !== null) {
            return resultFalse;
        }

        // Backtrack
        assignment.delete(variable);
        return null;
    }

    /**
     * Main method to solve the satisfiability problem
     * @returns {Object} - Result object containing solution status and assignment
     */
    solveSAT() {
        const solution = this.solve();
        
        if (solution === null) {
            return {
                isSatisfiable: false,
                assignment: null
            };
        }

        return {
            isSatisfiable: true,
            assignment: Object.fromEntries(solution)
        };
    }
}

// Example usage
function example() {
    const solver = new SatisfiabilitySolver();
    
    // Example formula: (x1 OR !x2) AND (x2 OR x3) AND (!x1 OR x3)
    solver.addClause([1, -2]);  // x1 OR !x2
    solver.addClause([2, 3]);   // x2 OR x3
    solver.addClause([-1, 3]);  // !x1 OR x3

    const result = solver.solveSAT();
    console.log('Is satisfiable:', result.isSatisfiable);
    console.log('Assignment:', result.assignment);
}

// Export the solver class
module.exports = {
    SatisfiabilitySolver
};

// Run example if not being imported
if (require.main === module) {
    example();
}