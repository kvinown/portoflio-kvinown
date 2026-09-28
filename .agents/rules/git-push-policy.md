# Git Push Policy

## Rule
NEVER automatically run `git commit` or `git push` after making code changes.

## Rationale
The user must first test the changes in their local development environment (`dev`). Only proceed with pushing code to the remote repository (GitHub) when the user explicitly requests or approves it.
