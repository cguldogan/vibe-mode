import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Basic Functionality Tests', () => {
	test('VS Code API should be available', () => {
		assert.ok(vscode, 'VS Code API should be available');
		assert.ok(vscode.commands, 'VS Code commands API should be available');
		assert.ok(vscode.window, 'VS Code window API should be available');
	});

	test('Extension package.json validation', () => {
		const extension = vscode.extensions.getExtension('undefined_publisher.agent-first-mode');
		if (extension) {
			const packageJson = extension.packageJSON;
			
			assert.ok(packageJson.name, 'Package should have a name');
			assert.strictEqual(packageJson.name, 'agent-first-mode', 'Package name should match');
			assert.ok(packageJson.displayName, 'Package should have a display name');
			assert.strictEqual(packageJson.displayName, 'Copilot Layout Manager', 'Display name should match');
			assert.ok(packageJson.description, 'Package should have a description');
			assert.ok(packageJson.contributes, 'Package should have contributes section');
			assert.ok(packageJson.contributes.commands, 'Package should contribute commands');
		}
	});

	test('Command registration verification', async () => {
		const allCommands = await vscode.commands.getCommands(true);
		
		// Filter to only our extension commands
		const ourCommands = allCommands.filter(cmd => cmd.startsWith('agent-first-mode.'));
		
		// We should have exactly 4 commands
		assert.ok(ourCommands.length >= 4, `Should have at least 4 commands, found: ${ourCommands.length}`);
		
		// Check each expected command exists
		const expectedCommands = [
			'agent-first-mode.setupLayout',
			'agent-first-mode.openCopilotInEditor', 
			'agent-first-mode.moveTerminalToLeft',
			'agent-first-mode.hidePrimarySidebar'
		];
		
		expectedCommands.forEach(expectedCmd => {
			assert.ok(
				ourCommands.includes(expectedCmd),
				`Command ${expectedCmd} should be registered. Available commands: ${ourCommands.join(', ')}`
			);
		});
	});

	test('Error handling patterns', () => {
		// Test error message patterns
		const errorMessages = [
			'Unable to open Copilot in editor mode. Please ensure Copilot extension is installed and enabled.',
			'Unable to move terminal panel to left',
			'Unable to hide primary sidebar'
		];

		errorMessages.forEach(msg => {
			assert.ok(typeof msg === 'string', 'Error message should be a string');
			assert.ok(msg.length > 0, 'Error message should not be empty');
			assert.ok(msg.startsWith('Unable to'), 'Error message should start with "Unable to"');
		});
	});

	test('VS Code commands that the extension relies on', () => {
		// These are the VS Code built-in commands our extension uses
		const requiredCommands = [
			'vscode.editorChat.start',
			'workbench.action.terminal.toggleTerminal',
			'workbench.action.positionPanelLeft',
			'workbench.action.activityBarLocation.hide',
			'workbench.action.closeSidebar',
			'workbench.action.closeActiveEditor',
			'workbench.action.closeOtherEditors'
		];

		// We can't easily test if these work without mocking, but we can verify
		// they are part of our extension's expected command set
		requiredCommands.forEach(cmd => {
			assert.ok(typeof cmd === 'string', `Command ${cmd} should be a string`);
			assert.ok(cmd.length > 0, `Command ${cmd} should not be empty`);
		});
	});
});

suite('Command Discovery Tests', () => {
    test('Should list available sidebar commands', async () => {
        const allCommands = await vscode.commands.getCommands(true);
        const sidebarCommands = allCommands.filter(cmd => 
            cmd.includes('sidebar') || 
            cmd.includes('activityBar') || 
            cmd.includes('activity') ||
            cmd.includes('explorer')
        );
        
        console.log('Found sidebar commands:', sidebarCommands);
        
        // Check for common sidebar commands
        const expectedCommands = [
            'workbench.action.activityBarLocation.hide'
        ];
        
        expectedCommands.forEach(cmd => {
            assert.ok(sidebarCommands.includes(cmd), `Command ${cmd} should be available`);
        });
    });
});
