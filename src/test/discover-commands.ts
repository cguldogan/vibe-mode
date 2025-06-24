import * as vscode from 'vscode';

export async function discoverSidebarCommands() {
    const allCommands = await vscode.commands.getCommands(true);
    
    // Look for sidebar-related commands
    const sidebarCommands = allCommands.filter(cmd => 
        cmd.includes('sidebar') || 
        cmd.includes('explorer') ||
        cmd.includes('workbench.action.toggle') ||
        cmd.includes('workbench.view') ||
        cmd.includes('workbench.action.focus') ||
        cmd.includes('workbench.action.close')
    );
    
    console.log('=== All Sidebar Related Commands ===');
    sidebarCommands.forEach(cmd => console.log(`- ${cmd}`));
    
    return sidebarCommands;
}
