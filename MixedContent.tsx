import React from 'react';
import MathRenderer from './MathRenderer';

interface MixedContentProps {
    content: string;
    className?: string;
}

/**
 * Renders mixed content containing both plain text and inline LaTeX math.
 * LaTeX should be wrapped in $...$ for inline or $$...$$ for block math.
 * Also handles **bold** markdown syntax.
 * Inherits font and color from parent.
 */
const MixedContent: React.FC<MixedContentProps> = ({ content, className = "" }) => {
    if (!content) return null;

    // Check if content contains $ delimiters (inline math markers)
    const hasInlineMath = /\$[^$]+\$/.test(content);

    // Check if content is pure LaTeX (starts with \ or common LaTeX commands, no plain text)
    const isPureLaTeX = /^\\[a-zA-Z]/.test(content.trim()) ||
        /^[a-zA-Z0-9\s]*=/.test(content.trim()) ||
        (content.includes('\\frac') || content.includes('\\sqrt') || content.includes('\\pm'));

    // If it's pure LaTeX without inline $ markers, render directly
    if (isPureLaTeX && !hasInlineMath) {
        return <MathRenderer math={content} className={className} />;
    }

    // If no inline math markers and doesn't look like LaTeX, render as plain text
    if (!hasInlineMath && !isPureLaTeX) {
        // Handle **bold** markdown syntax
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return (
            <span className={className} style={{ fontFamily: 'inherit' }}>
                {parts.map((part, index) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index}>{part.slice(2, -2)}</strong>;
                    }
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                })}
            </span>
        );
    }

    // Split content by $...$ patterns for inline math
    const segments: React.ReactNode[] = [];
    let lastIndex = 0;

    // Match inline math: $...$  (but not $$...$$)
    const inlineMathRegex = /(?<!\$)\$(?!\$)([^$]+)\$(?!\$)/g;
    let match;

    while ((match = inlineMathRegex.exec(content)) !== null) {
        // Add text before this match
        if (match.index > lastIndex) {
            const textBefore = content.slice(lastIndex, match.index);
            // Handle **bold** in text segments
            const textParts = textBefore.split(/(\*\*[^*]+\*\*)/g);
            textParts.forEach((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    segments.push(<strong key={`text-${lastIndex}-${i}`}>{part.slice(2, -2)}</strong>);
                } else if (part) {
                    segments.push(<React.Fragment key={`text-${lastIndex}-${i}`}>{part}</React.Fragment>);
                }
            });
        }

        // Add the math content - inherit color from parent
        segments.push(
            <MathRenderer
                key={`math-${match.index}`}
                math={match[1]}
                className="inline-block mx-0.5 align-baseline"
            />
        );

        lastIndex = match.index + match[0].length;
    }

    // Add any remaining text after the last match
    if (lastIndex < content.length) {
        const remainingText = content.slice(lastIndex);
        const textParts = remainingText.split(/(\*\*[^*]+\*\*)/g);
        textParts.forEach((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                segments.push(<strong key={`text-end-${i}`}>{part.slice(2, -2)}</strong>);
            } else if (part) {
                segments.push(<React.Fragment key={`text-end-${i}`}>{part}</React.Fragment>);
            }
        });
    }

    return <span className={className} style={{ fontFamily: 'inherit' }}>{segments}</span>;
};

export default MixedContent;
