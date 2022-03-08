import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand("dumpvn.googleSearch", () => {
		let selectedText = getSelectedText();
		if (selectedText) {
			// JavaScript remove prefix from string
			//              # spaces and start with a line comment 
			selectedText = selectedText.replace(/^(\s*#*)(\s*)/,'');
			selectedText = selectedText.replace(/^(\s*\/*)(\s*)/,'');
			selectedText = selectedText.replace(/^\s*(<#)\s*/,'');
			selectedText = selectedText.replace(/^\s*(\/*\**)\s*/,'');
			
			vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.google.com/search?q=${encodeURI(selectedText)}`))
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}

function getSelectedText() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		return editor.document.getText(editor.selection);
	}
	return '';
}
