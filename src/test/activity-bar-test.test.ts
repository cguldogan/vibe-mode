import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Activity Bar Hide Verification', () => {
	
	test('Should demonstrate activity bar hiding functionality', async () => {
		console.log('=== Activity Bar Hide Test ===');
		
		// Get initial state
		const workbenchConfig = vscode.workspace.getConfiguration('workbench');
		const initialState = workbenchConfig.get('activityBar.location');
		
		console.log('Initial activity bar location:', initialState);
		
		// Show the activity bar first (if hidden)
		try {
			await vscode.commands.executeCommand('workbench.action.activityBarLocation.default');
			console.log('✓ Activity bar set to default position');
		} catch (error) {
			console.log('Could not set activity bar to default:', (error as Error).message);
		}
		
		// Wait a moment for state to update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Check state after showing
		const afterShowState = workbenchConfig.get('activityBar.location');
		console.log('After showing - activity bar location:', afterShowState);
		
		// Now hide the activity bar using our command
		try {
			await vscode.commands.executeCommand('workbench.action.activityBarLocation.hide');
			console.log('✓ Activity bar hidden successfully');
		} catch (error) {
			console.log('Could not hide activity bar:', (error as Error).message);
			assert.fail('Activity bar hide command should work');
		}
		
		// Wait a moment for state to update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Check final state
		const finalState = workbenchConfig.get('activityBar.location');
		console.log('Final activity bar location:', finalState);
		
		// The activity bar should now be hidden
		assert.strictEqual(finalState, 'hidden', 'Activity bar should be hidden after command execution');
		
		console.log('=== Test completed successfully - Activity bar is hidden ===');
	});
	
	test('Should verify our extension hides the activity bar', async () => {
		console.log('=== Extension Activity Bar Hide Test ===');
		
		// First show the activity bar
		try {
			await vscode.commands.executeCommand('workbench.action.activityBarLocation.default');
			console.log('✓ Activity bar shown');
		} catch (error) {
			console.log('Could not show activity bar:', (error as Error).message);
		}
		
		// Wait for state update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Now use our extension command
		try {
			await vscode.commands.executeCommand('agent-first-mode.hidePrimarySidebar');
			console.log('✓ Extension hide sidebar command executed');
		} catch (error) {
			console.log('Extension command failed:', (error as Error).message);
			assert.fail('Extension hide sidebar command should work');
		}
		
		// Wait for state update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Check final state
		const workbenchConfig = vscode.workspace.getConfiguration('workbench');
		const finalState = workbenchConfig.get('activityBar.location');
		console.log('Final activity bar location after extension command:', finalState);
		
		// Verify the activity bar is hidden
		assert.strictEqual(finalState, 'hidden', 'Extension should hide the activity bar');
		
		console.log('=== Extension test completed successfully ===');
	});
});
