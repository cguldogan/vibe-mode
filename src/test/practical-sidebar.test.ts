import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Practical Sidebar Hide Tests', () => {
	
	test('Should demonstrate that sidebar commands work in sequence', async () => {
		console.log('=== Practical Sidebar Hide Test ===');
		
		// Test the sequence of commands our extension uses
		const commandSequence = [
			{ command: 'workbench.action.focusSideBar', description: 'Focus sidebar (make visible)' },
			{ command: 'workbench.action.closeSidebar', description: 'Close sidebar panel' },
			{ command: 'workbench.action.activityBarLocation.hide', description: 'Hide activity bar' }
		];
		
		let successCount = 0;
		
		for (const { command, description } of commandSequence) {
			try {
				await vscode.commands.executeCommand(command);
				console.log(`✓ ${description} - SUCCESS`);
				successCount++;
				
				// Small delay between commands
				await new Promise(resolve => setTimeout(resolve, 100));
				
			} catch (error) {
				console.log(`✗ ${description} - FAILED: ${(error as Error).message}`);
			}
		}
		
		// All commands should execute successfully
		assert.strictEqual(successCount, commandSequence.length, 
			`All ${commandSequence.length} commands should execute successfully`);
		
		console.log(`=== All ${successCount} commands executed successfully ===`);
	});
	
	test('Should verify extension commands execute in production-like environment', async () => {
		console.log('=== Production-like Extension Test ===');
		
		// Test each of our extension commands individually
		const extensionCommands = [
			'agent-first-mode.openCopilotInEditor',
			'agent-first-mode.moveTerminalToLeft', 
			'agent-first-mode.hidePrimarySidebar'
		];
		
		let results: { [key: string]: boolean } = {};
		
		for (const command of extensionCommands) {
			try {
				await vscode.commands.executeCommand(command);
				results[command] = true;
				console.log(`✓ ${command} - EXECUTED`);
				
				// Delay between commands
				await new Promise(resolve => setTimeout(resolve, 150));
				
			} catch (error) {
				results[command] = false;
				console.log(`✗ ${command} - FAILED: ${(error as Error).message}`);
			}
		}
		
		console.log('Command results:', results);
		
		// At minimum, the sidebar hide command should work
		assert.ok(results['agent-first-mode.hidePrimarySidebar'], 
			'Hide primary sidebar command should execute successfully');
		
		// Terminal command should also work
		assert.ok(results['agent-first-mode.moveTerminalToLeft'], 
			'Move terminal to left command should execute successfully');
		
		console.log('=== Extension commands verified ===');
	});
	
	test('Should verify VS Code UI state can be controlled', async () => {
		console.log('=== UI State Control Test ===');
		
		// Test that we can control the major UI elements
		const uiControls = [
			{ command: 'workbench.action.togglePanel', name: 'Panel toggle' },
			{ command: 'workbench.action.toggleSidebarVisibility', name: 'Sidebar visibility' },
			{ command: 'workbench.action.activityBarLocation.default', name: 'Activity bar show' },
			{ command: 'workbench.action.activityBarLocation.hide', name: 'Activity bar hide' }
		];
		
		let controlsWorking = 0;
		
		for (const { command, name } of uiControls) {
			try {
				await vscode.commands.executeCommand(command);
				console.log(`✓ ${name} - Command works`);
				controlsWorking++;
				
				await new Promise(resolve => setTimeout(resolve, 50));
				
			} catch (error) {
				console.log(`✗ ${name} - Command failed: ${(error as Error).message}`);
			}
		}
		
		// Most UI controls should work
		assert.ok(controlsWorking >= 3, `At least 3 UI controls should work, got ${controlsWorking}`);
		
		console.log(`=== ${controlsWorking} UI controls verified working ===`);
	});
});
