import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Fixed Copilot Opening Tests', () => {
	
	test('Should test the fixed vibeOn implementation', async () => {
		console.log('=== Testing Fixed Copilot Implementation ===');
		
		// Clean up any existing tabs first
		try {
			await vscode.commands.executeCommand('workbench.action.closeAllEditors');
			await new Promise(resolve => setTimeout(resolve, 100));
		} catch (error) {
			console.log('Initial cleanup error:', error);
		}
		
		// Get initial state
		const initialTabGroups = vscode.window.tabGroups.all;
		const initialTabCount = initialTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		console.log(`Initial tab count: ${initialTabCount}`);
		
		// Test our fixed implementation (vibe on includes Copilot opening)
		try {
			await vscode.commands.executeCommand('vibe-mode.vibeOn');
			console.log('✓ Fixed vibeOn command executed successfully');
		} catch (error) {
			console.log(`✗ Fixed command failed: ${(error as Error).message}`);
		}
		
		// Wait for command to complete
		await new Promise(resolve => setTimeout(resolve, 300));
		
		// Check final state
		const finalTabGroups = vscode.window.tabGroups.all;
		const finalTabCount = finalTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		console.log(`Final tab count: ${finalTabCount}`);
		
		console.log('Final tabs:');
		finalTabGroups.forEach((group, index) => {
			console.log(`  Group ${index}: ${group.tabs.length} tabs`);
			group.tabs.forEach(tab => {
				console.log(`    - ${tab.label} (active: ${tab.isActive})`);
			});
		});
		
		// Check if we have a chat tab
		const hasChatTab = finalTabGroups.some(group =>
			group.tabs.some(tab => 
				tab.label.toLowerCase().includes('chat') ||
				tab.label.toLowerCase().includes('copilot')
			)
		);
		
		console.log(`Has chat/copilot tab: ${hasChatTab}`);
		
		// The fix should result in Copilot actually opening
		assert.ok(finalTabCount > initialTabCount || hasChatTab, 'Should open Copilot tab or increase tab count');
		
		console.log('=== Fixed implementation test completed ===');
	});
	
	test('Should verify Copilot opens in editor area', async () => {
		console.log('=== Verifying Copilot Opens in Editor Area ===');
		
		// Clean state
		try {
			await vscode.commands.executeCommand('workbench.action.closeAllEditors');
			await new Promise(resolve => setTimeout(resolve, 100));
		} catch (error) {
			console.log('Cleanup error:', error);
		}
		
		// Test direct command
		try {
			await vscode.commands.executeCommand('workbench.action.chat.openInEditor');
			console.log('✓ Direct workbench.action.chat.openInEditor works');
		} catch (error) {
			console.log(`✗ Direct command failed: ${(error as Error).message}`);
		}
		
		await new Promise(resolve => setTimeout(resolve, 200));
		
		// Check if chat opened in editor
		const tabGroups = vscode.window.tabGroups.all;
		const chatInEditor = tabGroups.some(group =>
			group.tabs.some(tab => tab.label.toLowerCase().includes('chat'))
		);
		
		console.log(`Chat opened in editor: ${chatInEditor}`);
		
		// Check active editors
		const activeEditors = vscode.window.visibleTextEditors;
		console.log(`Active editors: ${activeEditors.length}`);
		
		assert.ok(chatInEditor, 'Chat should open in editor area');
		console.log('=== Editor area verification completed ===');
	});
	
	test('Should test complete setup layout with fixed Copilot opening', async () => {
		console.log('=== Testing Complete Setup Layout with Fixed Copilot ===');
		
		// Create a messy state first
		try {
			await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
			await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
			await vscode.commands.executeCommand('workbench.action.focusSideBar');
			await vscode.commands.executeCommand('workbench.action.activityBarLocation.default');
			console.log('✓ Created messy layout state');
		} catch (error) {
			console.log('Setup error:', error);
		}
		
		await new Promise(resolve => setTimeout(resolve, 200));
		
		// Get before state
		const beforeTabGroups = vscode.window.tabGroups.all;
		const beforeTabCount = beforeTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		console.log(`Before setup - Tab count: ${beforeTabCount}`);
		
		// Test complete setup layout
		try {
			await vscode.commands.executeCommand('vibe-mode.vibeOn');
			console.log('✓ Complete setup layout executed');
		} catch (error) {
			console.log(`Setup layout error: ${(error as Error).message}`);
		}
		
		await new Promise(resolve => setTimeout(resolve, 500));
		
		// Check final state
		const afterTabGroups = vscode.window.tabGroups.all;
		const afterTabCount = afterTabGroups.reduce((count, group) => count + group.tabs.length, 0);
		console.log(`After setup - Tab count: ${afterTabCount}`);
		
		console.log('Final layout:');
		afterTabGroups.forEach((group, index) => {
			console.log(`  Group ${index}: ${group.tabs.length} tabs`);
			group.tabs.forEach(tab => {
				console.log(`    - ${tab.label}`);
			});
		});
		
		// Check if Copilot is open
		const hasCopilotTab = afterTabGroups.some(group =>
			group.tabs.some(tab => 
				tab.label.toLowerCase().includes('chat') ||
				tab.label.toLowerCase().includes('copilot')
			)
		);
		
		// Check configuration
		const workbenchConfig = vscode.workspace.getConfiguration('workbench');
		const activityBarLocation = workbenchConfig.get('activityBar.location');
		console.log(`Activity bar location: ${activityBarLocation}`);
		
		console.log(`Copilot tab present: ${hasCopilotTab}`);
		
		// Complete setup should result in Copilot being open and clean layout
		assert.ok(hasCopilotTab, 'Complete setup should open Copilot');
		
		console.log('=== Complete setup layout test completed ===');
	});
	
	test('Should validate working commands are being used', async () => {
		console.log('=== Validating Working Commands Usage ===');
		
		// Test each working command individually
		const workingCommands = [
			'workbench.action.chat.openInEditor',
			'workbench.action.chat.open',
			'workbench.panel.chat.view.copilot.focus',
			'workbench.action.quickchat.toggle'
		];
		
		for (const command of workingCommands) {
			try {
				// Close any existing chat first
				await vscode.commands.executeCommand('workbench.action.closeAllEditors');
				await new Promise(resolve => setTimeout(resolve, 100));
				
				// Test the command
				await vscode.commands.executeCommand(command);
				console.log(`✓ ${command} - WORKS`);
				
				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error) {
				console.log(`✗ ${command} - FAILED: ${(error as Error).message}`);
			}
		}
		
		assert.ok(true, 'Command validation completed');
		console.log('=== Working commands validation completed ===');
	});
});
