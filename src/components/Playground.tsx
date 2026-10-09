import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { runPythonCode } from '../services/pythonRunner';
import { recordCodeRunEvent } from '../services/storage';
import { Terminal, Play, Trash2, Sparkles, BookOpen, Clock } from 'lucide-react';

const PRESETS = [
  {
    name: 'ASCII Dragon Art',
    code: `# Draw a mythical ASCII dragon
dragon = """
                  / _ \\
                \\_\\(_)/_/
                 _//o\\\\_
                  /   \\
           ___  ___  _ _ _ _
         / _ \\| _ \\| | | | |
        | (_) |  _/|_  _|_  _|
         \\___/|_|    |_|  |_|
"""
print(dragon)
print("The Dragon of Code awakens in PyQuest!")
`,
  },
  {
    name: 'Fibonacci Generator',
    code: `# Calculate Fibonacci sequence up to 10 terms
def generate_fibonacci(count):
    seq = [0, 1]
    while len(seq) < count:
        seq.append(seq[-1] + seq[-2])
    return seq

terms = 10
fib = generate_fibonacci(terms)
print(f"First {terms} Fibonacci numbers:")
for idx, num in enumerate(fib):
    print(f"Term {idx}: {num}")
`,
  },
  {
    name: 'Text RPG Combat',
    code: `import random

hero_hp = 50
goblin_hp = 30

print("⚔️ A wild Goblin appeared!")

round_num = 1
while hero_hp > 0 and goblin_hp > 0:
    dmg = random.randint(8, 14)
    goblin_hp -= dmg
    print(f"Round {round_num}: Hero strikes for {dmg} damage! Goblin HP: {max(0, goblin_hp)}")
    
    if goblin_hp <= 0:
        print("🎉 Goblin was defeated! Victory!")
        break
        
    counter = random.randint(4, 8)
    hero_hp -= counter
    print(f"   Goblin retaliates for {counter} damage! Hero HP: {max(0, hero_hp)}")
    round_num += 1

print("Battle finished!")
`,
  },
  {
    name: 'List Comprehensions',
    code: `# Generate squares of even numbers
numbers = range(1, 15)
even_squares = [x**2 for x in numbers if x % 2 == 0]

print("Original range:", list(numbers))
print("Even squares:", even_squares)

# Word length mapper
words = ["Python", "Adventure", "Code", "Quest", "Victory"]
lengths = {word: len(word) for word in words}
print("Word lengths dictionary:", lengths)
`,
  },
];

export const Playground: React.FC = () => {
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<{
    stdout: string;
    stderr: string;
    error?: string;
    timeMs: number;
  } | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    recordCodeRunEvent();

    try {
      const res = await runPythonCode(code);
      setOutput({
        stdout: res.stdout,
        stderr: res.stderr,
        error: res.error,
        timeMs: res.executionTimeMs,
      });
    } catch (e: any) {
      setOutput({
        stdout: '',
        stderr: '',
        error: e?.message || 'Execution failed',
        timeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Python Web Sandbox</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Freeform Code Playground
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Experiment freely. Run custom Python code in WebAssembly with zero server overhead.
          </p>
        </div>

        {/* Preset Snippets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Examples:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setCode(p.code)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            isRunning={isRunning}
            minHeight="420px"
          />
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl flex flex-col min-h-[460px]">
          {/* Console Header */}
          <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Standard Output</span>
            </div>

            <div className="flex items-center gap-3">
              {output && (
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {output.timeMs}ms
                </span>
              )}
              {output && (
                <button
                  onClick={() => setOutput(null)}
                  className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  title="Clear Console"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 flex-1 font-mono text-xs overflow-auto">
            {!output ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 text-xs py-12">
                <Terminal className="w-8 h-8 mb-2 opacity-50 stroke-[1.5]" />
                <p>Press "Run (Ctrl+Enter)" to execute Python code.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {output.stdout && (
                  <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                    {output.stdout}
                  </pre>
                )}
                {output.stderr && (
                  <pre className="text-amber-400 whitespace-pre-wrap leading-relaxed">
                    {output.stderr}
                  </pre>
                )}
                {output.error && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 whitespace-pre-wrap font-sans text-xs">
                    {output.error}
                  </div>
                )}
                {!output.stdout && !output.stderr && !output.error && (
                  <p className="text-slate-500 italic">Program finished with exit code 0 (no output)</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
