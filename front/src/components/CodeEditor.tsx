import React, { useState, useEffect, useRef } from 'react';

interface EditorProps {
    initialValue?: string;
}

const CodeEditor: React.FC<EditorProps> = ({ initialValue = '' }) => {
    const [text, setText] = useState(initialValue);
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const editor = editorRef.current;
        const lineNumbers = lineNumbersRef.current;
        if (editor && lineNumbers) {
            const updateLineNumbers = () => {
                const lines = text.split('\n');
                const lineNumbersHTML = lines.map((_, index) => `<div class="LineIndex">${index + 1}</div>`).join('');
                lineNumbers.innerHTML = lineNumbersHTML;
            };

            editor.addEventListener('input', (event) => {
                setText((event.target as HTMLTextAreaElement).value);
                updateLineNumbers();
            });

            updateLineNumbers();
        }
    }, [text]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const selectionStart = editorRef.current?.selectionStart || 0;
            setText(text.substring(0, selectionStart) + '    ' + text.substring(selectionStart));
            editorRef.current?.setSelectionRange(selectionStart + 2, selectionStart + 2);
        }
    };

    return (
        <div className='CodeEditor'>
            <div className="EditorCont">
                <div className="LineNumbers" ref={lineNumbersRef} />
                <textarea
                    ref={editorRef}
                    className="Editor"
                    value={text}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default CodeEditor;

