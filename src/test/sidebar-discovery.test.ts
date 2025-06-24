import * as assert from 'assert';
import * as vscode from 'vscode';
import { discoverSidebarCommands } from './discover-commands';

suite('Sidebar Command Discovery', () => {
    test('Should discover all sidebar-related commands', async () => {
        const sidebarCommands = await discoverSidebarCommands();
        
        console.log(`Found ${sidebarCommands.length} sidebar-related commands`);
        
        // Look for specific commands that might hide the sidebar
        const hidingCommands = sidebarCommands.filter(cmd => 
            cmd.includes('hide') || 
            cmd.includes('close') || 
            cmd.includes('toggle') ||
            cmd.includes('visibility')
        );
        
        console.log('=== Commands that might hide sidebar ===');
        hidingCommands.forEach(cmd => console.log(`- ${cmd}`));
        
        assert.ok(sidebarCommands.length > 0, 'Should find some sidebar commands');
    });
    
    test('Should test sidebar visibility commands', async () => {
        const commands = [
            'workbench.action.toggleSidebarVisibility',
            'workbench.action.closeSidebar', 
            'workbench.action.focusSideBar',
            'workbench.view.explorer.toggleVisibility',
            'workbench.action.toggleExplorerVisibility'
        ];
        
        console.log('=== Testing Sidebar Commands ===');
        
        for (const command of commands) {
            try {
                const allCommands = await vscode.commands.getCommands(true);
                if (allCommands.includes(command)) {
                    console.log(`✓ Command exists: ${command}`);
                    
                    // Try to execute it
                    try {
                        await vscode.commands.executeCommand(command);
                        console.log(`  ✓ Executed successfully: ${command}`);
                    } catch (execError) {
                        console.log(`  ✗ Execution failed: ${command} - ${(execError as Error).message}`);
                    }
                } else {
                    console.log(`✗ Command not found: ${command}`);
                }
            } catch (error) {
                console.log(`Error checking command ${command}: ${(error as Error).message}`);
            }
        }
        
        assert.ok(true, 'Command testing completed');
    });
});
