# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Overview

This extension is called "Vibe Mode" and helps developers enter their optimal coding flow state by providing commands to:

1. Enter Vibe Mode (optimize workspace layout for focus)
2. Exit Vibe Mode (restore default layout)  
3. Open Copilot in editor mode
4. Move the terminal panel to the left side
5. Hide the primary sidebar
6. Clean layout for optimal focus

## Development Guidelines

- Use TypeScript for all source code
- Follow VS Code extension development best practices
- Use proper error handling with try-catch blocks
- Provide meaningful user feedback through notifications
- Use async/await for command execution
- Register all commands properly in the activation function

## Key Commands

- `vibe-mode.vibeOn` - Enter Vibe Mode (optimal flow state)
- `vibe-mode.vibeOff` - Exit Vibe Mode (restore default layout)
- `vibe-mode.openCopilotInEditor` - Opens Copilot in editor mode
- `vibe-mode.moveTerminalToLeft` - Moves terminal panel to left
- `vibe-mode.hidePrimarySidebar` - Hides the primary sidebar
- `vibe-mode.cleanLayout` - Clean layout for focus

## VS Code API Usage

The extension uses the following VS Code commands:
- `workbench.action.chat.openInEditor` - For opening Copilot in editor
- `workbench.action.positionPanelLeft` - For moving terminal to left
- `workbench.action.activityBarLocation.hide` - For hiding the activity bar/sidebar
