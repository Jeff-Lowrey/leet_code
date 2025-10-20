#!/usr/bin/env python3
"""Extract tags from all solution files and save to cache.

This script extracts techniques and data structures from all solution files
and saves them to data/problem_tags.json for fast loading.

Usage:
    python scripts/extract_tags.py [--verbose] [--force]

Options:
    --verbose    Show detailed progress
    --force      Force re-extraction even if cache exists
"""

import argparse
import json
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from leet_code.category_data import CategoryManager


def main():
    """Extract tags from all solutions and save to cache."""
    parser = argparse.ArgumentParser(description="Extract tags from solution files")
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show detailed progress"
    )
    parser.add_argument(
        "--force", "-f", action="store_true", help="Force re-extraction even if cache exists"
    )
    args = parser.parse_args()

    # Initialize CategoryManager
    base_dir = Path(__file__).parent.parent
    manager = CategoryManager(base_dir=base_dir)

    print("🏷️  Tag Extraction Tool")
    print("=" * 60)

    # Check if cache exists
    cache_file = base_dir / "data" / "problem_tags.json"
    if cache_file.exists() and not args.force:
        print(f"✓ Cache already exists: {cache_file}")
        print("  Use --force to re-extract")

        # Show cache stats
        with cache_file.open("r") as f:
            cache_data = json.load(f)
        print(f"  Cached problems: {len(cache_data)}")
        return 0

    # Extract tags
    print(f"\n📂 Scanning solutions directory: {manager.solutions_dir}")

    categories = manager.get_categories()
    print(f"✓ Found {len(categories)} categories")

    total_solutions = sum(len(cat.solutions) for cat in categories)
    print(f"✓ Found {total_solutions} total solutions")

    print("\n🔍 Extracting tags...")

    # Force fresh extraction
    tags = manager.get_problem_tags(force_refresh=True)

    # Statistics
    problems_with_techniques = sum(1 for t in tags.values() if t.techniques)
    problems_with_data_structures = sum(1 for t in tags.values() if t.data_structures)
    problems_with_patterns = sum(1 for t in tags.values() if t.patterns)

    print(f"\n✅ Extraction complete!")
    print(f"  Total problems processed: {len(tags)}")
    print(f"  Problems with techniques: {problems_with_techniques}")
    print(f"  Problems with data structures: {problems_with_data_structures}")
    print(f"  Problems with patterns: {problems_with_patterns}")
    print(f"  Cache saved to: {cache_file}")

    if args.verbose:
        print("\n📊 Detailed Statistics:")

        # Count unique techniques
        all_techniques = set()
        all_data_structures = set()
        all_patterns = set()

        for problem_tags in tags.values():
            all_techniques.update(problem_tags.techniques)
            all_data_structures.update(problem_tags.data_structures)
            all_patterns.update(problem_tags.patterns)

        print(f"  Unique techniques found: {len(all_techniques)}")
        if all_techniques:
            print("    " + ", ".join(sorted(all_techniques)))

        print(f"  Unique data structures found: {len(all_data_structures)}")
        if all_data_structures:
            print("    " + ", ".join(sorted(all_data_structures)))

        print(f"  Unique patterns found: {len(all_patterns)}")
        if all_patterns:
            print("    " + ", ".join(sorted(all_patterns)))

        # Show sample problems with tags
        print("\n  Sample tagged problems:")
        sample_count = 0
        for number, problem_tags in sorted(tags.items())[:5]:
            if problem_tags.techniques or problem_tags.data_structures or problem_tags.patterns:
                print(f"    #{number}:")
                if problem_tags.techniques:
                    print(f"      Techniques: {', '.join(problem_tags.techniques)}")
                if problem_tags.data_structures:
                    print(f"      Data Structures: {', '.join(problem_tags.data_structures)}")
                if problem_tags.patterns:
                    print(f"      Patterns: {', '.join(problem_tags.patterns)}")
                sample_count += 1
                if sample_count >= 5:
                    break

    return 0


if __name__ == "__main__":
    sys.exit(main())
