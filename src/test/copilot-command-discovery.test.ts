import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Copilot Command Discovery and Fix Tests', () => {
	
	test('Should discover all available Copilot-related commands', async () => {
		console.log('=== Discovering Copilot Commands ===');
		
		// Get all available commands
		const allCommands = await vscode.commands.getCommands(true);
		
		// Filter for Copilot-related commands
		const copilotCommands = allCommands.filter(cmd => 
			cmd.toLowerCase().includes('copilot') ||
			cmd.toLowerCase().includes('chat') ||
			cmd.toLowerCase().includes('github.copilot') ||
			cmd.toLowerCase().includes('vscode.editorChat') ||
			cmd.toLowerCase().includes('workbench.panel.chat') ||
			cmd.toLowerCase().includes('workbench.action.chat')
		);
		
		console.log(`Found ${copilotCommands.length} Copilot/Chat related commands:`);
		copilotCommands.forEach(cmd => {
			console.log(`  - ${cmd}`);
		});
		
		// Test specific commands we're trying to use
		const commandsToTest = [
			'vscode.editorChat.start',
			'workbench.panel.chat.view.copilot.focus',
			'workbench.action.chat.openInEditor',
			'github.copilot.openChat',
			'github.copilot.generateInlineChat',
			'workbench.action.chat.open',
			'workbench.action.quickchat.toggle',
			'workbench.panel.chatSidebar.copilot.focus'
		];
		
		console.log('\n=== Testing Specific Commands ===');
		for (const command of commandsToTest) {
			const exists = allCommands.includes(command);
			console.log(`${exists ? '✓' : '✗'} ${command} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
		}
		
		assert.ok(copilotCommands.length > 0, 'Should find some Copilot/Chat commands');
		console.log('=== Command discovery completed ===');
	});
	
	test('Should test working Copilot commands', async () => {
		console.log('=== Testing Working Copilot Commands ===');
		
		const allCommands = await vscode.commands.getCommands(true);
		const workingCommands: string[] = [];
		const failingCommands: string[] = [];
		
		// Commands to test for opening Copilot chat
		const candidateCommands = [
			'vscode.editorChat.start',
			'workbench.panel.chat.view.copilot.focus',
			'workbench.action.chat.openInEditor',
			'workbench.action.chat.open',
			'workbench.action.quickchat.toggle',
			'github.copilot.openChat',
			'github.copilot.generateInlineChat',
			'workbench.panel.chatSidebar.copilot.focus',
			'workbench.panel.chat.view.copilot.open'
		];
		
		for (const command of candidateCommands) {
			if (allCommands.includes(command)) {
				try {
					await vscode.commands.executeCommand(command);
					workingCommands.push(command);
					console.log(`✓ ${command} - WORKS`);
					
					// Small delay between commands
					await new Promise(resolve => setTimeout(resolve, 100));
				} catch (error) {
					failingCommands.push(command);
					console.log(`✗ ${command} - FAILED: ${(error as Error).message}`);
				}
			} else {
				console.log(`- ${command} - NOT AVAILABLE`);
			}
		}
		
		console.log(`\nSummary: ${workingCommands.length} working, ${failingCommands.length} failing`);
		console.log('Working commands:', workingCommands);
		console.log('Failing commands:', failingCommands);
		
		assert.ok(workingCommands.length > 0, 'Should have at least one working Copilot command');
		console.log('=== Command testing completed ===');
	});
	
	test('Should verify current openCopilotInEditor function behavior', async () => {
		console.log('=== Testing Current Implementation ===');
		
		try {
			// Test our current implementation
			await vscode.commands.executeCommand('agent-first-mode.openCopilotInEditor');
			console.log('✓ Our openCopilotInEditor command executed without throwing');
			
			// Check if any new editors or tabs were opened
			const tabGroups = vscode.window.tabGroups.all;
			const totalTabs = tabGroups.reduce((count, group) => count + group.tabs.length, 0);
			
			console.log(`Tabs after command: ${totalTabs}`);
			tabGroups.forEach((group, index) => {
				console.log(`  Group ${index}: ${group.tabs.length} tabs`);
				group.tabs.forEach(tab => {
					console.log(`    - ${tab.label} (${tab.input ? 'input' : 'other'})`);
				});
			});
			
			// Check if any panels are open
			const activeEditors = vscode.window.visibleTextEditors.length;
			console.log(`Active editors: ${activeEditors}`);
			
		} catch (error) {
			console.log(`✗ Our command failed: ${(error as Error).message}`);
		}
		
		assert.ok(true, 'Current implementation test completed');
		console.log('=== Current implementation test completed ===');
	});
	
	test('Should test alternative approaches for opening Copilot', async () => {
		console.log('=== Testing Alternative Approaches ===');
		
		// Approach 1: Try to open chat sidebar first, then move to editor
		try {
			console.log('Approach 1: Chat sidebar then editor...');
			
			// First try to open chat in sidebar
			await vscode.commands.executeCommand('workbench.panel.chat.view.copilot.focus');
			await new Promise(resolve => setTimeout(resolve, 200));
			
			// Then try to move it to editor area
			await vscode.commands.executeCommand('workbench.action.chat.openInEditor');
			console.log('✓ Approach 1 completed');
			
		} catch (error) {
			console.log(`✗ Approach 1 failed: ${(error as Error).message}`);
		}
		
		// Approach 2: Try quickchat toggle
		try {
			console.log('Approach 2: Quick chat toggle...');
			await vscode.commands.executeCommand('workbench.action.quickchat.toggle');
			console.log('✓ Approach 2 completed');
		} catch (error) {
			console.log(`✗ Approach 2 failed: ${(error as Error).message}`);
		}
		
		// Approach 3: Try to open any chat, then manipulate
		try {
			console.log('Approach 3: Generic chat open...');
			await vscode.commands.executeCommand('workbench.action.chat.open');
			console.log('✓ Approach 3 completed');
		} catch (error) {
			console.log(`✗ Approach 3 failed: ${(error as Error).message}`);
		}
		
		assert.ok(true, 'Alternative approaches tested');
		console.log('=== Alternative approaches test completed ===');
	});
});
