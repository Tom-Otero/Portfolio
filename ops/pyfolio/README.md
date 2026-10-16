# Pyfolio

Pyfolio is a multi-tool Python package for deployment, analysis, and related tasks.  
It is structured as a top-level package with submodules, making it easy to run individual tools while maintaining clean imports and an editable install workflow.

---

## Project Structure

```
Portfolio/ops/pyfolio
├── pyproject.toml
├── README.md
├── src
│   ├── pyfolio
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── deploy
│   │       ├── __init__.py
│   │       ├── __main__.py
│   │       ├── file_transfer.py
```

---

## Setup (Editable Install)

Use a virtual environment to isolate your project:

# create & activate venv
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .\.venv\Scripts\activate  # Windows

# upgrade pip/setuptools/wheel
python -m pip install --upgrade pip setuptools wheel

# install pyfolio in editable mode
pip install -e .

Editable install means changes to source files take effect immediately without reinstalling.

⸻

Running Tools

Top-level instructions

python -m pyfolio

This prints usage instructions and a brief overview of submodules.

Submodules

python -m pyfolio.deploy   # runs deployment scripts
# future example:
python -m pyfolio.analyze  # runs analysis tools


⸻

Development Workflow
	•	Add new functionality under src/pyfolio/ or subpackages.
	•	Use relative imports inside pyfolio:

from .deploy.file_transfer import send_files

	•	Run code using python -m pyfolio.<submodule>.

⸻

Dependencies

Declare any runtime dependencies in pyproject.toml under [project.dependencies]:

dependencies = [
    "requests>=2.30.0"
]

Install them automatically with:

pip install -e .


⸻

Notes
	•	Top-level python -m pyfolio is meant as a help / instructions entrypoint.
	•	Each submodule can be run independently.
	•	This layout is CI/CD friendly, making it easier to automate deployments or testing without manually modifying paths.

⸻

Optional Enhancements
	•	Add CLI argument parsing in pyfolio/__main__.py to route to submodules automatically.
	•	Add [project.scripts] in pyproject.toml for direct CLI commands (deploy instead of python -m pyfolio.deploy).
	•	Add unit tests under src/pyfolio/tests/.
