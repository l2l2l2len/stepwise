import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ math, block = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && math) {
      // Clean up common LaTeX delimiters that might be returned by LLMs
      let cleanMath = math
        .replace(/^\\\[/, '')
        .replace(/\\\]$/, '')
        .replace(/^\\\(/, '')
        .replace(/\\\)$/, '')
        .replace(/^\$\$/, '')
        .replace(/\$\$$/, '')
        .replace(/^\$/, '')
        .replace(/\$$/, '')
        .trim();

      // Final safety check: if the LLM returned Markdown code blocks
      cleanMath = cleanMath.replace(/^```latex\n?/, '').replace(/\n?```$/, '');

      // Check if it's plain text without math symbols - wrap in \text{} to preserve spaces
      // Plain text = no backslashes, no math operators like ^, _, {, }
      const hasMathSymbols = /[\\^_{}]/.test(cleanMath) ||
        /[=+\-*/]/.test(cleanMath) ||
        /\d/.test(cleanMath);

      if (!hasMathSymbols && cleanMath.includes(' ')) {
        // It's plain text with spaces - use \textit{} to get italic serif with preserved spaces
        cleanMath = `\\textit{${cleanMath}}`;
      }

      try {
        katex.render(cleanMath, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          trust: true,
          strict: false,
          output: 'html'
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
        // Fallback to plain text if rendering completely fails
        if (containerRef.current) {
          containerRef.current.textContent = cleanMath;
        }
      }
    }
  }, [math, block]);

  return (
    <span
      ref={containerRef}
      className={`${className} ${block ? 'block w-full text-center' : 'inline-block'} overflow-x-auto overflow-y-hidden max-w-full align-middle scrollbar-hide py-2`}
      aria-label={math}
    />
  );
};

export default MathRenderer;