import React, { useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Loader2, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  onRun: () => void;
  isRunning?: boolean;
  onReset?: () => void;
  readOnly?: boolean;
  minHeight?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  isRunning = false,
  onReset,
  readOnly = false,
  minHeight = '320px',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);

  const lines = code.split('\n');

  // Handle Tab key and shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;

    // Ctrl+Enter or Cmd+Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces
      const updated = code.substring(0, start) + '    ' + code.substring(end);
      onChange(updated);

      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    } else if (e.key === 'Enter') {
      // Auto-indent: preserve leading spaces from current line
      const start = textarea.selectionStart;
      const currentLine = code.substring(0, start).split('\n').pop() || '';
      const match = currentLine.match(/^(\s+)/);
      const leadingSpaces = match ? match[1] : '';

      // If previous line ends with colon (:), add 4 more spaces
      const extraIndent = currentLine.trimEnd().endsWith(':') ? '    ' : '';

      if (leadingSpaces.length > 0 || extraIndent.length > 0) {
        e.preventDefault();
        const indent = leadingSpaces + extraIndent;
        const updated = code.substring(0, start) + '\n' + indent + code.substring(textarea.selectionEnd);
        onChange(updated);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
        }, 0);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col shadow-lg shadow-black/40">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-mono text-[11px] ml-2 font-medium">
            main.py
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded font-mono">
            Python 3.12 (Pyodide)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <button
              onClick={onReset}
              disabled={isRunning || readOnly}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-[11px] disabled:opacity-50"
              title="Reset code to original starter template"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors text-[11px]"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {!readOnly && (
            <button
              onClick={onRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-all text-xs disabled:opacity-50 shadow-sm shadow-emerald-900/50"
              title="Run code (Ctrl + Enter)"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run
                  <span className="hidden sm:inline text-[10px] opacity-75 font-mono ml-0.5">
                    (Ctrl+↵)
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Textarea & Line Numbers */}
      <div className="relative flex flex-1 overflow-auto bg-slate-950 text-slate-100 font-mono text-[13px] leading-relaxed">
        {/* Line Numbers Column */}
        <div className="select-none py-3 pl-3 pr-2 text-right text-slate-600 bg-slate-950/80 border-r border-slate-900 text-xs font-mono min-w-[2.5rem]">
          {lines.map((_, i) => (
            <div key={i} className="leading-[1.625rem]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Real Editable Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 resize-none bg-transparent p-3 outline-none text-emerald-200/90 font-mono text-[13px] leading-[1.625rem] whitespace-pre tab-4 selection:bg-emerald-900/60 selection:text-white"
          style={{ minHeight, tabSize: 4 }}
        />
      </div>

      <div className="px-3.5 py-1.5 bg-slate-950 border-t border-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Lines: {lines.length} · Characters: {code.length}</span>
        <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-slate-300">Tab</kbd> for 4 spaces</span>
      </div>
    </div>
  );
};
