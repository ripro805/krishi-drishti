"use client";

import React from "react";

interface SafeMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Pure React safe markdown formatter without dangerouslySetInnerHTML.
 * Supports bold, italic, code, headings, lists, and linebreaks with 100% XSS immunity.
 */
export const SafeMarkdown: React.FC<SafeMarkdownProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Split content by lines
  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];
  let isNumberedList = false;

  const flushList = () => {
    if (inList && listItems.length > 0) {
      if (isNumberedList) {
        renderedElements.push(
          <ol key={`ol-${renderedElements.length}`} className="my-2.5 ml-5 list-decimal space-y-1">
            {listItems}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${renderedElements.length}`} className="my-2.5 ml-5 list-disc space-y-1">
            {listItems}
          </ul>
        );
      }
      inList = false;
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      flushList();
      renderedElements.push(
        <h4 key={`h4-${i}`} className="mt-3.5 mb-1.5 font-bold text-sm sm:text-base text-slate-900 dark:text-white">
          {formatInline(trimmed.slice(4))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      renderedElements.push(
        <h3 key={`h3-${i}`} className="mt-4 mb-2 font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
          {formatInline(trimmed.slice(3))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushList();
      renderedElements.push(
        <h2 key={`h2-${i}`} className="mt-4 mb-2 font-black text-lg sm:text-xl text-slate-900 dark:text-white">
          {formatInline(trimmed.slice(2))}
        </h2>
      );
      continue;
    }

    // Unordered List (- or *)
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList || isNumberedList) {
        flushList();
        inList = true;
        isNumberedList = false;
      }
      listItems.push(
        <li key={`li-${i}`} className="text-xs sm:text-sm leading-relaxed">
          {formatInline(bulletMatch[1])}
        </li>
      );
      continue;
    }

    // Ordered List (1. or 2.)
    const orderedMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (orderedMatch) {
      if (!inList || !isNumberedList) {
        flushList();
        inList = true;
        isNumberedList = true;
      }
      listItems.push(
        <li key={`li-${i}`} className="text-xs sm:text-sm leading-relaxed">
          {formatInline(orderedMatch[2])}
        </li>
      );
      continue;
    }

    // Standard paragraph line
    flushList();
    renderedElements.push(
      <p key={`p-${i}`} className="my-1 text-xs sm:text-sm leading-relaxed">
        {formatInline(rawLine)}
      </p>
    );
  }

  flushList();

  return <div className={`space-y-1.5 text-slate-800 dark:text-slate-200 ${className}`}>{renderedElements}</div>;
};

/**
 * Format inline elements: **bold**, *italic*, `code`, [link]
 */
function formatInline(text: string): React.ReactNode {
  // Regex tokenization for **bold**, *italic*, and `code`
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // 1. Code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      tokens.push(
        <code
          key={`c-${keyIdx++}`}
          className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-[11px] text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 2. Bold: **bold**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      tokens.push(
        <strong key={`b-${keyIdx++}`} className="font-bold text-slate-900 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 3. Italic: *italic*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      tokens.push(
        <em key={`i-${keyIdx++}`} className="italic">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Plain text until next special character
    const nextSpecial = remaining.search(/[`*]/);
    if (nextSpecial === -1) {
      tokens.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Literal character that didn't match pairs
      tokens.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      tokens.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return tokens.length === 1 ? tokens[0] : <>{tokens}</>;
}
