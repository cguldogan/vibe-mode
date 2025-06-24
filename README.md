# Copilot Layout Manager

A VS Code extension that provides an optimal layout for working with GitHub Copilot by managing the editor layout, terminal position, and sidebar visibility with enhanced conflict resolution.

## Features

This extension provides the following commands to optimize your VS Code layout for Copilot usage:

### Primary Commands

- **Setup Layout** (`agent-first-mode.setupLayout`) - Executes all layout optimizations with conflict resolution
- **Open Copilot in Editor** (`agent-first-mode.openCopilotInEditor`) - Opens Copilot chat with enhanced conflict detection
- **Move Terminal to Left** (`agent-first-mode.moveTerminalToLeft`) - Positions the terminal panel on the left side
- **Hide Primary Sidebar** (`agent-first-mode.hidePrimarySidebar`) - Hides the activity bar and sidebar for more space

### Utility Commands

- **Clean Layout** (`agent-first-mode.cleanLayout`) - Aggressively cleans layout by closing conflicting editors and panels

## Enhanced Layout Conflict Resolution

This extension now includes enhanced logic to resolve layout conflicts that can occur when multiple editors, Welcome tabs, or other UI elements compete for space with Copilot chat.

### Automatic Conflict Detection
- Detects Welcome tabs that conflict with Copilot layout
- Identifies multiple open editors that create clutter
- Recognizes when sidebar and panels interfere with optimal layout

### Aggressive Cleanup Strategy
- Closes all conflicting editors before opening Copilot
- Hides sidebar, activity bar, and unnecessary panels
- Provides a clean slate for optimal Copilot interaction
- Includes comprehensive logging for troubleshooting

### Usage

### Quick Setup
Run the **"Copilot Layout Manager: Setup Layout"** command from the Command Palette to execute all layout optimizations with automatic conflict resolution.

### Individual Commands
- **"Copilot Layout Manager: Open Copilot in Editor"** - Opens Copilot chat in editor mode with conflict resolution
- **"Copilot Layout Manager: Move Terminal to Left"** - Repositions terminal panel to the left side
- **"Copilot Layout Manager: Hide Primary Sidebar"** - Hides activity bar and sidebar
- **"Copilot Layout Manager: Clean Layout"** - Performs aggressive cleanup of conflicting UI elements

## Technical Details

### Layout Optimization Strategy
1. **Clean Slate Approach**: Closes all conflicting editors and tabs
2. **UI Minimization**: Hides non-essential UI elements (sidebar, activity bar, panels)
3. **Terminal Optimization**: Positions terminal on the left for better workflow
4. **Copilot Integration**: Opens Copilot chat in the optimal editor position

### Conflict Resolution
The extension detects and resolves common layout conflicts:
- Multiple open editors competing for space
- Welcome tab interfering with Copilot chat
- Sidebar and activity bar reducing available space
- Bottom panels creating visual clutter

### Commands Used
- `vscode.editorChat.start` - Opens Copilot in editor mode
- `workbench.action.positionPanelLeft` - Moves terminal to left
- `workbench.action.closeSidebar` - Hides the sidebar
- `workbench.action.activityBarLocation.hide` - Hides the activity bar
- `workbench.action.closeAllEditors` - Cleans up conflicting editors

## Requirements

- VS Code version 1.74.0 or higher
- GitHub Copilot extension (recommended for full functionality)

## Installation

1. Clone this repository
2. Open the folder in VS Code
3. Press `F5` to run the extension in a new Extension Development Host window
4. Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) to access the commands

## Extension Commands

This extension contributes the following commands:

- `agent-first-mode.setupLayout`: Setup Layout (with conflict resolution)
- `agent-first-mode.openCopilotInEditor`: Open Copilot in Editor (enhanced)
- `agent-first-mode.moveTerminalToLeft`: Move Terminal Panel to Left  
- `agent-first-mode.hidePrimarySidebar`: Hide Primary Sidebar
- `agent-first-mode.cleanLayout`: Clean Layout (aggressive cleanup)

## Known Issues and Limitations

- Requires GitHub Copilot extension to be installed for full functionality
- Some VS Code commands may not be available in all environments
- Layout changes are immediate and may require manual restoration if undesired

## Release Notes

### 0.0.1
- Initial release with basic layout management
- Commands for Copilot, terminal, and sidebar management
- Comprehensive test suite

### 0.0.2 (Current)
- **Enhanced layout conflict resolution** - Fixes the Welcome tab + Copilot layout conflict
- **Aggressive cleanup strategy** for optimal Copilot experience
- **Improved Welcome tab handling** and multi-editor conflict resolution
- **Added Clean Layout command** for proactive layout management
- **Enhanced logging and debugging** capabilities
- **80+ comprehensive tests** including layout conflict scenarios

## Testing

The extension includes comprehensive test coverage with 80+ tests covering:

- **Unit Tests**: Individual function testing
- **Integration Tests**: Command registration and execution
- **Layout Tests**: Real layout state verification
- **Conflict Resolution Tests**: Welcome tab and multi-editor scenarios
- **Visual Layout Tests**: UI component positioning
- **Error Handling Tests**: Graceful failure scenarios

Run tests with:
```bash
npm test
```

---

**Enjoy optimizing your VS Code layout for Copilot!**

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

## Testing

This extension includes comprehensive automated tests to ensure reliability and functionality.

### Running Tests

```bash
# Run all tests (54 tests total)
npm test

# Run tests with watch mode during development
npm run watch

# Compile and lint before testing
npm run pretest
```

### Test Structure

The extension includes five types of tests:

1. **Unit Tests** (`src/test/extension.test.ts`) - Test individual functions and command registration with mocking
2. **Integration Tests** (`src/test/integration.test.ts`) - Test extension activation and command availability in VS Code environment  
3. **Basic Functionality Tests** (`src/test/basic.test.ts`) - Test core VS Code API integration and package validation
4. **Layout Position Verification Tests** (`src/test/layout-positioning.test.ts`) - Test component positioning and layout state changes
5. **Real Layout State Verification Tests** (`src/test/real-layout-verification.test.ts`) - Test actual workspace layout inspection and validation
6. **Visual Layout State Tests** (`src/test/visual-layout.test.ts`) - Test actual component positioning and layout state validation

### Test Coverage

- ✅ Extension activation and deactivation
- ✅ Command registration verification
- ✅ Error handling and fallback mechanisms  
- ✅ Package.json validation
- ✅ VS Code API integration
- ✅ Mock testing for command execution
- ✅ **Panel position verification** (left, right, bottom states)
- ✅ **Sidebar visibility state tracking** (show/hide states)
- ✅ **Copilot editor positioning** (fallback command testing)
- ✅ **Complete layout setup verification** (all components positioned correctly)
- ✅ **Layout state persistence** (configuration tracking)
- ✅ **Real workspace layout inspection** (actual VS Code environment testing)
- ✅ **Component state detection** (terminal, sidebar, Copilot availability)
- ✅ **Error recovery and resilience** (graceful failure handling)
- ✅ **Visual component positioning** (actual command execution and state verification)

### Layout Positioning Tests

The comprehensive layout positioning tests verify that components and layout elements are correctly positioned:

- **Activity Bar Hiding**: Tests that the activity bar (primary sidebar) is properly hidden using `workbench.action.activityBarLocation.hide`
- **Panel Position Changes**: Verifies terminal panels correctly move from bottom/right to left position using `workbench.action.positionPanelLeft`
- **Sidebar State Management**: Tracks sidebar visibility state and ensures proper hide/show functionality
- **Component State Tracking**: Monitors all layout components (panel position, sidebar visibility, Copilot status)  
- **Command Sequence Verification**: Ensures the correct VS Code commands are called in proper order
- **Fallback Behavior**: Tests that alternative commands work when primary commands fail
- **State Persistence**: Verifies layout changes persist and are reflected in VS Code configuration
- **Configuration Validation**: Tests that layout configuration values are correctly set and accessible
- **Real Environment Testing**: All tests run in actual VS Code instance with real command execution
