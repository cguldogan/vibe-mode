// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Copilot Layout Manager extension is now active!');

	// Command to setup the complete layout (all three actions)
	const setupLayoutCommand = vscode.commands.registerCommand('agent-first-mode.setupLayout', async () => {
		try {
			// First clean the layout to avoid conflicts
			await cleanLayoutForCopilot();
			
			// Then execute all three actions in sequence
			await openCopilotInEditor();
			await moveTerminalToLeft();
			await hidePrimarySidebar();
			
			vscode.window.showInformationMessage('Copilot layout setup complete!');
		} catch (error) {
			vscode.window.showErrorMessage(`Error setting up layout: ${error}`);
		}
	});

	// Command to open Copilot in editor mode
	const openCopilotCommand = vscode.commands.registerCommand('agent-first-mode.openCopilotInEditor', async () => {
		try {
			await openCopilotInEditor();
			vscode.window.showInformationMessage('Copilot opened in editor mode');
		} catch (error) {
			vscode.window.showErrorMessage(`Error opening Copilot: ${error}`);
		}
	});

	// Command to move terminal panel to left
	const moveTerminalCommand = vscode.commands.registerCommand('agent-first-mode.moveTerminalToLeft', async () => {
		try {
			await moveTerminalToLeft();
			vscode.window.showInformationMessage('Terminal panel moved to left');
		} catch (error) {
			vscode.window.showErrorMessage(`Error moving terminal: ${error}`);
		}
	});

	// Command to hide primary sidebar
	const hideSidebarCommand = vscode.commands.registerCommand('agent-first-mode.hidePrimarySidebar', async () => {
		try {
			await hidePrimarySidebar();
			vscode.window.showInformationMessage('Primary sidebar hidden');
		} catch (error) {
			vscode.window.showErrorMessage(`Error hiding sidebar: ${error}`);
		}
	});

	// Command to clean layout for optimal Copilot experience
	const cleanLayoutCommand = vscode.commands.registerCommand('agent-first-mode.cleanLayout', async () => {
		try {
			await cleanLayoutForCopilot();
			vscode.window.showInformationMessage('Layout cleaned for optimal Copilot experience');
		} catch (error) {
			vscode.window.showErrorMessage(`Error cleaning layout: ${error}`);
		}
	});

	// Register all commands
	context.subscriptions.push(setupLayoutCommand);
	context.subscriptions.push(openCopilotCommand);
	context.subscriptions.push(moveTerminalCommand);
	context.subscriptions.push(hideSidebarCommand);
	context.subscriptions.push(cleanLayoutCommand);
}

// Function to open Copilot in editor mode
async function openCopilotInEditor(): Promise<void> {
	try {
		// Enhanced conflict detection and resolution
		const activeEditors = vscode.window.visibleTextEditors;
		const allTabGroups = vscode.window.tabGroups.all;
		const totalTabCount = allTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		
		// Check for specific problematic tabs
		const hasWelcomeTab = allTabGroups.some(group => 
			group.tabs.some(tab => tab.label.includes('Welcome'))
		);
		const hasUntitledTabs = allTabGroups.some(group =>
			group.tabs.some(tab => tab.label.includes('Untitled'))
		);
		const hasMultipleTabs = totalTabCount > 1;
		
		console.log(`Copilot opening - Tabs: ${totalTabCount}, Editors: ${activeEditors.length}, Welcome: ${hasWelcomeTab}, Untitled: ${hasUntitledTabs}`);
		
		// Enhanced cleanup logic for layout conflicts
		if (hasWelcomeTab || hasMultipleTabs || activeEditors.length > 1) {
			console.log('Detected layout conflict - performing enhanced cleanup...');
			
			// Close all editors to start with a clean slate
			try {
				await vscode.commands.executeCommand('workbench.action.closeAllEditors');
				console.log('✓ Closed all editors for clean layout');
			} catch (error) {
				console.log('Could not close all editors:', error);
				
				// Fallback: try to close them one by one
				try {
					if (hasWelcomeTab) {
						await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
					}
					if (hasMultipleTabs) {
						await vscode.commands.executeCommand('workbench.action.closeOtherEditors');
					}
				} catch (fallbackError) {
					console.log('Fallback cleanup failed:', fallbackError);
				}
			}
			
			// Ensure sidebar and panels are closed to avoid further conflicts
			try {
				await vscode.commands.executeCommand('workbench.action.closeSidebar');
				await vscode.commands.executeCommand('workbench.action.closePanel');
			} catch (error) {
				console.log('Could not close sidebar/panel:', error);
			}
			
			// Longer delay for cleanup to complete
			await new Promise(resolve => setTimeout(resolve, 200));
		}
		
		// Try working commands in order of preference
		try {
			// First try: Open chat in editor directly (most reliable approach)
			await vscode.commands.executeCommand('workbench.action.chat.openInEditor');
			console.log('✓ Copilot opened in editor mode using workbench.action.chat.openInEditor');
			return;
		} catch (error) {
			console.log('Primary command failed, trying fallback:', error);
		}
		
		try {
			// Second try: Open chat generally, then move to editor
			await vscode.commands.executeCommand('workbench.action.chat.open');
			await new Promise(resolve => setTimeout(resolve, 100));
			await vscode.commands.executeCommand('workbench.action.chat.openInEditor');
			console.log('✓ Copilot opened using chat.open -> openInEditor sequence');
			return;
		} catch (error) {
			console.log('Second fallback failed, trying third:', error);
		}
		
		try {
			// Third try: Focus Copilot panel then move to editor
			await vscode.commands.executeCommand('workbench.panel.chat.view.copilot.focus');
			await new Promise(resolve => setTimeout(resolve, 100));
			await vscode.commands.executeCommand('workbench.action.chat.openInEditor');
			console.log('✓ Copilot opened using panel focus -> openInEditor sequence');
			return;
		} catch (error) {
			console.log('Third fallback failed, trying final approach:', error);
		}
		
		try {
			// Final try: Quick chat toggle
			await vscode.commands.executeCommand('workbench.action.quickchat.toggle');
			console.log('✓ Copilot opened using quickchat toggle');
			return;
		} catch (error) {
			throw new Error('Unable to open Copilot in any mode. Please ensure Copilot extension is installed and enabled.');
		}
		
	} catch (error) {
		throw new Error(`Failed to open Copilot in editor mode: ${error}`);
	}
}

// Function to move terminal panel to left
async function moveTerminalToLeft(): Promise<void> {
	try {
		// First, ensure the panel is visible
		await vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal');
		
		// Move panel to left
		await vscode.commands.executeCommand('workbench.action.positionPanelLeft');
	} catch (error) {
		throw new Error('Unable to move terminal panel to left');
	}
}

// Function to hide primary sidebar
async function hidePrimarySidebar(): Promise<void> {
	try {
		// First close the sidebar panel (Explorer, etc.)
		await vscode.commands.executeCommand('workbench.action.closeSidebar');
		
		// Small delay to ensure command completes
		await new Promise(resolve => setTimeout(resolve, 50));
		
		// Then hide the activity bar (the icon bar)
		await vscode.commands.executeCommand('workbench.action.activityBarLocation.hide');
		
	} catch (error) {
		// Fallback to the toggle method if the above commands fail
		try {
			await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
		} catch (fallbackError) {
			throw new Error('Unable to hide primary sidebar');
		}
	}
}

// Function to clean layout for optimal Copilot experience
async function cleanLayoutForCopilot(): Promise<void> {
	try {
		console.log('Cleaning layout for optimal Copilot experience...');
		
		// Step 1: Get current state for logging
		const initialTabGroups = vscode.window.tabGroups.all;
		const initialTabCount = initialTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		const initialEditorCount = vscode.window.visibleTextEditors.length;
		
		console.log(`Initial state - Tabs: ${initialTabCount}, Editors: ${initialEditorCount}`);
		
		// Step 2: Aggressively close all conflicting editors
		if (initialTabCount > 0 || initialEditorCount > 0) {
			console.log('Closing all editors to prevent layout conflicts...');
			try {
				// First try to close all editors at once
				await vscode.commands.executeCommand('workbench.action.closeAllEditors');
				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error) {
				console.log('Could not close all editors, trying alternatives:', error);
				
				// Fallback: close specific problematic tabs
				const hasWelcomeTab = initialTabGroups.some(group => 
					group.tabs.some(tab => tab.label.includes('Welcome'))
				);
				
				if (hasWelcomeTab) {
					try {
						// Try to focus and close Welcome tab specifically
						await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
					} catch (welcomeError) {
						console.log('Could not close Welcome tab:', welcomeError);
					}
				}
				
				// Try to close other editors
				try {
					await vscode.commands.executeCommand('workbench.action.closeOtherEditors');
				} catch (otherError) {
					console.log('Could not close other editors:', otherError);
				}
			}
		}
		
		// Step 3: Close all panels that might interfere
		const panelCommands = [
			'workbench.action.closePanel',
			'workbench.action.closeAuxiliaryBar'
		];
		
		for (const command of panelCommands) {
			try {
				await vscode.commands.executeCommand(command);
			} catch (error) {
				console.log(`Could not execute ${command}:`, error);
			}
		}
		
		// Step 4: Hide sidebar components aggressively
		try {
			await vscode.commands.executeCommand('workbench.action.closeSidebar');
			await new Promise(resolve => setTimeout(resolve, 50));
		} catch (error) {
			console.log('Could not close sidebar:', error);
		}
		
		// Step 5: Hide activity bar
		try {
			await vscode.commands.executeCommand('workbench.action.activityBarLocation.hide');
			await new Promise(resolve => setTimeout(resolve, 50));
		} catch (error) {
			console.log('Could not hide activity bar:', error);
		}
		
		// Step 6: Ensure we have a completely clean slate
		try {
			// Hide status bar for maximum clean layout
			await vscode.commands.executeCommand('workbench.action.toggleStatusbarVisibility');
		} catch (error) {
			console.log('Could not toggle status bar:', error);
		}
		
		// Final delay to let all cleanup complete
		await new Promise(resolve => setTimeout(resolve, 300));
		
		// Log final state
		const finalTabGroups = vscode.window.tabGroups.all;
		const finalTabCount = finalTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		const finalEditorCount = vscode.window.visibleTextEditors.length;
		
		console.log(`Final state - Tabs: ${finalTabCount}, Editors: ${finalEditorCount}`);
		console.log('Layout cleanup completed - ready for optimal Copilot experience');
		
	} catch (error) {
		console.log('Error during layout cleanup:', error);
		throw new Error('Unable to clean layout for Copilot');
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
