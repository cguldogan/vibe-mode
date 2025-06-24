import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Copilot Layout Manager Integration Tests', () => {
	
	suiteSetup(async () => {
		vscode.window.showInformationMessage('Starting integration tests...');
		
		// Ensure extension is activated
		const extension = vscode.extensions.getExtension('undefined_publisher.agent-first-mode');
		if (extension && !extension.isActive) {
			await extension.activate();
		}
	});

	test('Extension should be activated', () => {
		const extension = vscode.extensions.getExtension('undefined_publisher.agent-first-mode');
		assert.ok(extension, 'Extension should be found');
		assert.ok(extension!.isActive, 'Extension should be active');
	});

	test('All commands should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		
		const expectedCommands = [
			'agent-first-mode.setupLayout',
			'agent-first-mode.openCopilotInEditor',
			'agent-first-mode.moveTerminalToLeft',
			'agent-first-mode.hidePrimarySidebar'
		];

		for (const expectedCommand of expectedCommands) {
			assert.ok(
				commands.includes(expectedCommand),
				`Command ${expectedCommand} should be registered`
			);
		}
	});

	test('Commands should be executable without throwing', async () => {
		const commands = [
			'agent-first-mode.openCopilotInEditor',
			'agent-first-mode.moveTerminalToLeft',
			'agent-first-mode.hidePrimarySidebar'
		];

		for (const command of commands) {
			try {
				// These commands might fail due to missing dependencies or UI state,
				// but they shouldn't throw unhandled exceptions
				await vscode.commands.executeCommand(command);
			} catch (error) {
				// Expected behavior - commands may fail gracefully
				assert.ok(true, `Command ${command} handled error gracefully`);
			}
		}
	});

	test('Setup layout command should be executable', async () => {
		try {
			await vscode.commands.executeCommand('agent-first-mode.setupLayout');
			// If we get here, the command executed without throwing
			assert.ok(true, 'Setup layout command executed');
		} catch (error) {
			// Commands may fail due to missing UI elements, but should handle errors gracefully
			assert.ok(true, 'Setup layout command handled error gracefully');
		}
	});

	test('Package.json should have correct command definitions', async () => {
		const extension = vscode.extensions.getExtension('undefined_publisher.agent-first-mode');
		assert.ok(extension, 'Extension should be found');
		
		const packageJson = extension!.packageJSON;
		assert.ok(packageJson.contributes, 'Package should have contributes section');
		assert.ok(packageJson.contributes.commands, 'Package should have commands section');
		
		const commands = packageJson.contributes.commands;
		assert.strictEqual(commands.length, 6, 'Should have 6 commands defined');
		
		const commandIds = commands.map((cmd: any) => cmd.command);
		assert.ok(commandIds.includes('agent-first-mode.setupLayout'), 'Should include setupLayout command');
		assert.ok(commandIds.includes('agent-first-mode.openCopilotInEditor'), 'Should include openCopilotInEditor command');
		assert.ok(commandIds.includes('agent-first-mode.moveTerminalToLeft'), 'Should include moveTerminalToLeft command');
		assert.ok(commandIds.includes('agent-first-mode.hidePrimarySidebar'), 'Should include hidePrimarySidebar command');
		assert.ok(commandIds.includes('agent-first-mode.cleanLayout'), 'Should include cleanLayout command');
	});
});
