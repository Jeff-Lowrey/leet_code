"""
204. Count `Primes - Python` Implementation

Given an integer n, return the number of prime numbers that are less than n.

Time Complexity: O(`n` log log n)
Space Complexity: O(n)
"""

def countPrimes(n: int) -> int:
    """
    Count prime numbers less than n using Sieve of Eratosthenes.

    Args:
        n: The upper bound (exclusive)

    Returns:
        Number of prime numbers less than n
    """
    if n <= 2:
        return 0

    # Initialize boolean array - assume all numbers are prime initially
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False  # 0 and 1 are not prime

    # Sieve of Eratosthenes
    i = 2
    while i * i < n:
        if is_prime[i]:
            # Mark all multiples of i as not prime
            for j in range(i * i, n, i):
                is_prime[j] = False
        i += 1

    # Count prime numbers
    return sum(is_prime)


def countPrimes_optimized(n: int) -> int:
    """
    Optimized version that only checks odd numbers after 2.

    Args:
        n: The upper bound (exclusive)

    Returns:
        Number of prime numbers less than n
    """
    if n <= 2:
        return 0
    if n == 3:
        return 1

    # Start with 2 as the first prime
    count = 1  # Count 2 as prime

    # Only check odd numbers from 3 onwards
    is_prime = [True] * ((n - 1) // 2)

    # For odd numbers: index i represents number 2*i + 3
    for i in range(len(is_prime)):
        if is_prime[i]:
            p = 2 * i + 3
            # Mark multiples of p as not prime, starting from p^2
            for j in range(p * p, n, 2 * p):
                is_prime[(j - 3) // 2] = False

    return count + sum(is_prime)


def countPrimes_brute_force(n: int) -> int:
    """
    Brute force approach for comparison (less efficient).

    Args:
        n: The upper bound (exclusive)

    Returns:
        Number of prime numbers less than n
    """
    def is_prime(num: int) -> bool:
        if num < 2:
            return False
        if num == 2:
            return True
        if num % 2 == 0:
            return False

        for i in range(3, int(num**0.5) + 1, 2):
            if num % i == 0:
                return False
        return True

    count = 0
    for i in range(2, n):
        if is_prime(i):
            count += 1
    return count


# Test cases
if __name__ == "__main__":
    test_cases = [
        (10, 4),  # Primes less than 10: 2, 3, 5, 7
        (0, 0),   # No primes less than 0
        (1, 0),   # No primes less than 1
        (2, 0),   # No primes less than 2
        (3, 1),   # One prime less than 3: 2
        (5, 2),   # Two primes less than 5: 2, 3
        (20, 8),  # Primes less than 20: 2, 3, 5, 7, 11, 13, 17, 19
    ]

    print("Testing Sieve of Eratosthenes:")
    for n, expected in test_cases:
        result = countPrimes(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")

    print("\nTesting optimized version:")
    for n, expected in test_cases:
        result = countPrimes_optimized(n)
        print(f"n={n}: expected={expected}, got={result}, {'✓' if result == expected else '✗'}")

    # Test larger number with main algorithm only
    print(f"\nTesting n=1000: {countPrimes(1000)} primes")