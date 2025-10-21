#!/usr/bin/env python3
"""Add METADATA section to all solution files.

This script adds a METADATA section to the SOLUTION EXPLANATION block
in all Python and JavaScript solution files.

Usage:
    python scripts/add_metadata_section.py [--dry-run] [--language py|js]

Options:
    --dry-run     Show what would be changed without making changes
    --language    Target language (py, js, or all) [default: all]
"""

import argparse
import re
from pathlib import Path


def has_metadata_section(content: str) -> bool:
    """Check if file already has a METADATA section."""
    return bool(re.search(r"### METADATA:", content, re.IGNORECASE))


def has_solution_explanation(content: str) -> bool:
    """Check if file has SOLUTION EXPLANATION block."""
    return bool(re.search(r"<summary><b>🔍 SOLUTION EXPLANATION</b></summary>", content))


def extract_metadata_from_content(content: str) -> dict[str, str]:
    """Extract existing metadata from content for preservation."""
    metadata = {
        "techniques": "",
        "data_structures": "",
        "patterns": "",
        "time_complexity": "",
        "space_complexity": "",
    }

    # Try to extract time complexity
    time_match = re.search(r"### TIME COMPLEXITY:\s*([^\n]+)", content, re.IGNORECASE)
    if time_match:
        metadata["time_complexity"] = time_match.group(1).strip()

    # Try to extract space complexity
    space_match = re.search(r"### SPACE COMPLEXITY:\s*([^\n]+)", content, re.IGNORECASE)
    if space_match:
        metadata["space_complexity"] = space_match.group(1).strip()

    return metadata


def create_metadata_section(metadata: dict[str, str]) -> str:
    """Create METADATA section with extracted or placeholder values."""
    return f"""### METADATA:
**Techniques**: {metadata["techniques"] or "TBD"}
**Data Structures**: {metadata["data_structures"] or "TBD"}
**Patterns**: {metadata["patterns"] or "TBD"}
**Time Complexity**: {metadata["time_complexity"] or "TBD"}
**Space Complexity**: {metadata["space_complexity"] or "TBD"}

"""


def add_metadata_to_file(file_path: Path, dry_run: bool = False) -> tuple[bool, str]:
    """Add METADATA section to a solution file.

    Returns:
        Tuple of (was_modified, status_message)
    """
    try:
        content = file_path.read_text()

        # Check if already has metadata
        if has_metadata_section(content):
            return False, f"Already has METADATA section"

        # Check if has solution explanation block
        if not has_solution_explanation(content):
            return False, f"No SOLUTION EXPLANATION block found"

        # Extract existing metadata
        metadata = extract_metadata_from_content(content)

        # Create metadata section
        metadata_section = create_metadata_section(metadata)

        # Find the position to insert (after <summary> line)
        pattern = r"(<summary><b>🔍 SOLUTION EXPLANATION</b></summary>\s*\n)"
        match = re.search(pattern, content)

        if not match:
            return False, f"Could not find insertion point"

        # Insert metadata section
        new_content = content[: match.end()] + "\n" + metadata_section + content[match.end() :]

        if not dry_run:
            file_path.write_text(new_content)
            return True, "✓ Added METADATA section"
        else:
            return True, "Would add METADATA section"

    except Exception as e:
        return False, f"Error: {str(e)}"


def main():
    """Add METADATA sections to solution files."""
    parser = argparse.ArgumentParser(description="Add METADATA sections to solution files")
    parser.add_argument("--dry-run", action="store_true", help="Show changes without applying them")
    parser.add_argument(
        "--language",
        choices=["py", "js", "all"],
        default="all",
        help="Target language (default: all)",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).parent.parent
    solutions_dir = base_dir / "solutions"

    print("🏷️  Add METADATA Section Tool")
    print("=" * 60)

    if args.dry_run:
        print("DRY RUN MODE - No files will be modified")
        print("=" * 60)

    # Determine file patterns
    patterns = []
    if args.language in ["py", "all"]:
        patterns.append("**/*.py")
    if args.language in ["js", "all"]:
        patterns.append("**/alternatives/*.js")

    # Collect all solution files
    all_files = []
    for pattern in patterns:
        all_files.extend(solutions_dir.glob(pattern))

    print(f"\n📂 Found {len(all_files)} solution files")

    # Process files
    stats = {"modified": 0, "skipped": 0, "errors": 0}
    results = []

    for file_path in sorted(all_files):
        relative_path = file_path.relative_to(base_dir)
        was_modified, message = add_metadata_to_file(file_path, dry_run=args.dry_run)

        if was_modified:
            stats["modified"] += 1
            if args.dry_run:
                results.append(f"  [DRY RUN] {relative_path}: {message}")
            else:
                results.append(f"  ✓ {relative_path}")
        elif "Error" in message:
            stats["errors"] += 1
            results.append(f"  ✗ {relative_path}: {message}")
        else:
            stats["skipped"] += 1
            # Don't print skipped files unless verbose

    # Print results
    if results:
        print("\n📝 Results:")
        for result in results[:50]:  # Show first 50
            print(result)
        if len(results) > 50:
            print(f"  ... and {len(results) - 50} more")

    # Print summary
    print(f"\n{'=' * 60}")
    print("Summary:")
    print(f"  Modified: {stats['modified']}")
    print(f"  Skipped: {stats['skipped']}")
    print(f"  Errors: {stats['errors']}")
    print(f"  Total: {len(all_files)}")

    if args.dry_run:
        print(f"\nRun without --dry-run to apply changes")

    return 0


if __name__ == "__main__":
    import sys

    sys.exit(main())
