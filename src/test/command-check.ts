import * as vscode from 'vscode';

export async function checkAvailableCommands() {
    const allCommands = await vscode.commands.getCommands(true);
    const sidebarCommands = allCommands.filter(cmd => 
        cmd.includes('sidebar') || 
        cmd.includes('activityBar') || 
        cmd.includes('activity') ||
        cmd.includes('explorer')
    );
    
    console.log('Available sidebar/activity bar commands:');
    sidebarCommands.forEach(cmd => console.log(`- ${cmd}`));
    
    return sidebarCommands;
}
