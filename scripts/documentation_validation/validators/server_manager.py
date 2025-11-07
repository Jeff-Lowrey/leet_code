#!/usr/bin/env python3
"""Flask Server Manager for HTML Validation

Manages a temporary Flask server instance for HTML validation:
- Finds an available port automatically
- Starts server in subprocess
- Waits for server to be ready
- Stops server when done
"""

import socket
import subprocess
import time
import urllib.request
import urllib.error
from pathlib import Path
from typing import Optional, Tuple


class FlaskServerManager:
    """Manages a Flask server instance for validation."""

    def __init__(self, repo_root: Path):
        """Initialize server manager.

        Args:
            repo_root: Path to repository root
        """
        self.repo_root = repo_root
        self.host = "127.0.0.1"
        self.port: Optional[int] = None
        self.process: Optional[subprocess.Popen] = None
        self.base_url: Optional[str] = None

    @staticmethod
    def find_available_port(start_port: int = 9500, max_attempts: int = 10) -> int:
        """Find an available port for the server.

        Args:
            start_port: Port to start searching from
            max_attempts: Maximum number of ports to try

        Returns:
            Available port number

        Raises:
            RuntimeError: If no available port found
        """
        for port in range(start_port, start_port + max_attempts):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                    sock.bind(('127.0.0.1', port))
                    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                    return port
            except OSError:
                continue

        raise RuntimeError(f"No available port found in range {start_port}-{start_port + max_attempts}")

    def start_server(self, timeout: int = 10) -> Tuple[bool, str]:
        """Start the Flask development server.

        Args:
            timeout: Maximum seconds to wait for server to be ready

        Returns:
            Tuple of (success: bool, message: str)
        """
        if self.process is not None:
            return False, "Server already running"

        # Find available port
        try:
            self.port = self.find_available_port()
            self.base_url = f"http://{self.host}:{self.port}"
        except RuntimeError as e:
            return False, str(e)

        # Start Flask server in subprocess
        app_path = self.repo_root / "src" / "leet_code" / "app.py"
        if not app_path.exists():
            return False, f"Flask app not found at {app_path}"

        try:
            # Run Flask with minimal output
            env = {
                'FLASK_APP': str(app_path),
                'PYTHONPATH': str(self.repo_root / "src"),
                'PATH': subprocess.os.environ.get('PATH', ''),
            }

            self.process = subprocess.Popen(
                ['python', '-m', 'flask', 'run', '--host', self.host, '--port', str(self.port)],
                cwd=str(self.repo_root),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=env,
                text=True
            )

            # Wait for server to be ready
            start_time = time.time()
            while time.time() - start_time < timeout:
                if self._check_server_ready():
                    return True, f"Server started on {self.base_url}"
                time.sleep(0.2)

            # Timeout - kill process
            self.stop_server()
            return False, f"Server failed to start within {timeout}s"

        except Exception as e:
            self.stop_server()
            return False, f"Error starting server: {e}"

    def _check_server_ready(self) -> bool:
        """Check if server is ready to accept requests.

        Returns:
            True if server is responding
        """
        if self.base_url is None:
            return False

        try:
            with urllib.request.urlopen(f"{self.base_url}/", timeout=1) as response:
                return response.status == 200
        except Exception:
            return False

    def stop_server(self) -> None:
        """Stop the Flask server if running."""
        if self.process is not None:
            try:
                self.process.terminate()
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait()
            finally:
                self.process = None
                self.port = None
                self.base_url = None

    def get_base_url(self) -> str:
        """Get the server's base URL.

        Returns:
            Base URL string

        Raises:
            RuntimeError: If server is not running
        """
        if self.base_url is None:
            raise RuntimeError("Server is not running")
        return self.base_url

    def __enter__(self):
        """Context manager entry - start server."""
        success, message = self.start_server()
        if not success:
            raise RuntimeError(f"Failed to start server: {message}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - stop server."""
        self.stop_server()
        return False
