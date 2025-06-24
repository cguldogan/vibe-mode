# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Overview

This extension is called "Copilot Layout Manager" and provides commands to:

1. Open Copilot in editor mode
2. Move the terminal panel to the left side
3. Hide the primary sidebar
4. Execute all three actions at once with a single command

## Development Guidelines

- Use TypeScript for all source code
- Follow VS Code extension development best practices
- Use proper error handling with try-catch blocks
- Provide meaningful user feedback through notifications
- Use async/await for command execution
- Register all commands properly in the activation function

## Key Commands

- `agent-first-mode.setupLayout` - Executes all three layout changes
- `agent-first-mode.openCopilotInEditor` - Opens Copilot in editor mode
- `agent-first-mode.moveTerminalToLeft` - Moves terminal panel to left
- `agent-first-mode.hidePrimarySidebar` - Hides the primary sidebar

## VS Code API Usage

The extension uses the following VS Code commands:
- `vscode.editorChat.start` - For opening Copilot in editor
- `workbench.action.positionPanelLeft` - For moving terminal to left
- `workbench.action.activityBarLocation.hide` - For hiding the activity bar/sidebar
