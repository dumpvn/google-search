import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand("dumpvn.googleSearch", () => {
		const selectedText = getSelectedText();
		if (selectedText) {
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
