#!/usr/bin/env python3
"""Leet Code Learning Tool - CLI Entry Point

This module provides the command-line interface to run the Flask application.
All application logic has been organized into task-specific modules.
"""

import argparse

if __name__ == "__main__":
    from .factory import create_app

    parser = argparse.ArgumentParser(description="Leet Code Learning Tool Web Interface")
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Hostname to bind to (default: 127.0.0.1 - localhost only)",
    )
    parser.add_argument("--port", type=int, default=9501, help="Port to bind to (default: 9501)")
    parser.add_argument("--debug", action="store_true", default=True, help="Enable debug mode (default: True)")

    args = parser.parse_args()

    app = create_app()

    print(" * Server accessible at:")
    print(f" * - http://localhost:{args.port}")
    print(f" * - http://127.0.0.1:{args.port}")
    app.run(debug=args.debug, host=args.host, port=args.port)
