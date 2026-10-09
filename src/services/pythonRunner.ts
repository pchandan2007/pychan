import { Challenge, TestCase } from '../types';

declare global {
  interface Window {
    loadPyodide?: (config?: any) => Promise<any>;
    pyodideInstance?: any;
  }
}

let pyodideLoadingPromise: Promise<any> | null = null;

/**
 * Initializes and returns the global Pyodide instance.
 */
export async function getPyodideInstance(): Promise<any> {
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (pyodideLoadingPromise) {
    return pyodideLoadingPromise;
  }

  pyodideLoadingPromise = (async () => {
    // If window.loadPyodide is not yet available, dynamically inject script tag
    if (typeof window.loadPyodide !== 'function') {
      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector('script[src*="pyodide"]');
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('Failed to load Pyodide script')));
          // If already loaded in between
          if (typeof window.loadPyodide === 'function') resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide from CDN'));
        document.head.appendChild(script);
      });
    }

    if (typeof window.loadPyodide !== 'function') {
      throw new Error('Pyodide loader function is not available.');
    }

    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/',
    });

    window.pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  executionTimeMs: number;
}

/**
 * Execute arbitrary Python code safely and capture stdout/stderr.
 */
export async function runPythonCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  try {
    const pyodide = await getPyodideInstance();

    // Prepare python harness to capture stdout/stderr
    const runnerScript = `
import sys
import io

_stdout_buffer = io.StringIO()
_stderr_buffer = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr

sys.stdout = _stdout_buffer
sys.stderr = _stderr_buffer

_exec_error = None
try:
    __namespace = {}
    exec('''${code.replace(/\\/g, '\\\\').replace(/'''/g, "\\'\\'\\'")}''', __namespace)
except Exception as _e:
    import traceback
    _exec_error = traceback.format_exc()
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

(_stdout_buffer.getvalue(), _stderr_buffer.getvalue(), _exec_error)
`;

    const [stdout, stderr, execError] = pyodide.runPython(runnerScript);
    const duration = Math.round(performance.now() - startTime);

    return {
      stdout: stdout || '',
      stderr: stderr || '',
      error: execError ? formatPythonError(execError) : undefined,
      executionTimeMs: duration,
    };
  } catch (err: any) {
    const duration = Math.round(performance.now() - startTime);
    return {
      stdout: '',
      stderr: '',
      error: err?.message || String(err),
      executionTimeMs: duration,
    };
  }
}

/**
 * Executes a challenge's test cases against the user's Python code in Pyodide.
 */
export async function testChallengeCode(
  userCode: string,
  challenge: Challenge
): Promise<{
  allPassed: boolean;
  testResults: TestCase[];
  stdout: string;
  stderr: string;
  error?: string;
  executionTimeMs: number;
}> {
  const startTime = performance.now();
  try {
    const pyodide = await getPyodideInstance();

    // We build a Python test runner that executes the user code and then tests each case
    const testCasesJson = JSON.stringify(
      challenge.testCases.map((tc) => ({
        id: tc.id,
        input: tc.input,
        expected: tc.expected,
      }))
    );

    const testHarness = `
import sys
import io
import json

_stdout_buffer = io.StringIO()
_stderr_buffer = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr

sys.stdout = _stdout_buffer
sys.stderr = _stderr_buffer

_results = []
_exec_error = None

try:
    _user_ns = {}
    exec('''${userCode.replace(/\\/g, '\\\\').replace(/'''/g, "\\'\\'\\'")}''', _user_ns)
    
    if '${challenge.entryFunctionName}' not in _user_ns:
        raise NameError("Function '${challenge.entryFunctionName}' is not defined. Please define 'def ${challenge.entryFunctionName}(...)'")

    _target_func = _user_ns['${challenge.entryFunctionName}']
    _cases = json.loads('''${testCasesJson.replace(/\\/g, '\\\\').replace(/'''/g, "\\'\\'\\'")}''')

    for _c in _cases:
        _c_id = _c['id']
        _c_input_str = _c['input']
        _c_expected = _c['expected']

        try:
            # Evaluate the arguments string as a tuple or direct expression
            # If input is '5, 10', eval('(' + input + ',)') gives (5, 10)
            if not _c_input_str.strip():
                _actual = _target_func()
            else:
                _args = eval(f"({_c_input_str},)", _user_ns)
                _actual = _target_func(*_args)

            # Compare actual with expected (handling float precision or list types)
            _passed = (_actual == _c_expected)
            _results.append({
                "id": _c_id,
                "passed": bool(_passed),
                "actual": _actual,
                "error": None
            })
        except Exception as _te:
            import traceback
            _results.append({
                "id": _c_id,
                "passed": False,
                "actual": None,
                "error": str(_te)
            })

except Exception as _e:
    import traceback
    _exec_error = traceback.format_exc()
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

json.dumps({
    "stdout": _stdout_buffer.getvalue(),
    "stderr": _stderr_buffer.getvalue(),
    "error": _exec_error,
    "results": _results
})
`;

    const rawJson = pyodide.runPython(testHarness);
    const parsed = JSON.parse(rawJson);

    const duration = Math.round(performance.now() - startTime);

    if (parsed.error) {
      return {
        allPassed: false,
        testResults: challenge.testCases.map((tc) => ({
          ...tc,
          passed: false,
          error: 'Execution failed before test execution',
        })),
        stdout: parsed.stdout || '',
        stderr: parsed.stderr || '',
        error: formatPythonError(parsed.error),
        executionTimeMs: duration,
      };
    }

    const testResults: TestCase[] = challenge.testCases.map((origCase) => {
      const match = parsed.results.find((r: any) => r.id === origCase.id);
      if (!match) {
        return { ...origCase, passed: false, error: 'Test did not run' };
      }
      return {
        ...origCase,
        passed: match.passed,
        actual: match.actual,
        error: match.error,
      };
    });

    const allPassed = testResults.every((t) => t.passed === true);

    return {
      allPassed,
      testResults,
      stdout: parsed.stdout || '',
      stderr: parsed.stderr || '',
      error: undefined,
      executionTimeMs: duration,
    };
  } catch (err: any) {
    const duration = Math.round(performance.now() - startTime);
    return {
      allPassed: false,
      testResults: challenge.testCases.map((tc) => ({
        ...tc,
        passed: false,
        error: err?.message || 'Error running test suite',
      })),
      stdout: '',
      stderr: '',
      error: err?.message || String(err),
      executionTimeMs: duration,
    };
  }
}

/**
 * Format Python error tracebacks for clean readability
 */
function formatPythonError(tracebackStr: string): string {
  const lines = tracebackStr.trim().split('\n');
  // Find last error message like "TypeError: ..." or "SyntaxError: ..."
  const lastLine = lines[lines.length - 1] || tracebackStr;
  return lastLine;
}
