"""Pytest configuration for black box tests with Playwright."""

import multiprocessing
import time
from typing import Generator

import pytest
from flask import Flask
from playwright.sync_api import Browser, Page
from werkzeug.serving import make_server

from src.leet_code.factory import create_app


class ServerThread(multiprocessing.Process):
    """Run Flask server in a separate process for testing."""

    def __init__(self, app: Flask, port: int = 5001) -> None:
        """Initialize server thread."""
        super().__init__(daemon=True)
        self.port = port
        self.app = app

    def run(self) -> None:
        """Run the Flask server."""
        server = make_server("127.0.0.1", self.port, self.app)
        server.serve_forever()


@pytest.fixture(scope="session")
def flask_app() -> Flask:
    """Create Flask app for testing."""
    app = create_app()
    app.config.update({"TESTING": True})
    return app


@pytest.fixture(scope="session")
def live_server(flask_app: Flask) -> Generator[str, None, None]:
    """Start Flask server for browser tests."""
    server = ServerThread(flask_app, port=5001)
    server.start()
    time.sleep(1)  # Give server time to start
    yield "http://127.0.0.1:5001"
    server.terminate()
    server.join(timeout=5)


@pytest.fixture
def page(browser: Browser, live_server: str) -> Generator[Page, None, None]:
    """Create a new browser page for each test."""
    context = browser.new_context(base_url=live_server)
    page = context.new_page()
    yield page
    context.close()
