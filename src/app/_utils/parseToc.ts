import { load } from 'cheerio';
import { TocItem } from '../types';

export const parseToc = (html: string): TocItem[] => {
  const $ = load(html);
  const headings = $('h1, h2, h3').toArray();

  const root: TocItem[] = [];
  const stack: TocItem[][] = [[]]; // Use a stack to manage the current level of the hierarchy

  headings.forEach((element) => {
    const level = parseInt(element.tagName[1]); // Assuming tagName is 'h1', 'h2', or 'h3'
    const text = $(element).text();
    const id = $(element).attr('id') ?? '';

    const tocItem: TocItem = { id, text, tagName: element.tagName, children: [] };

    while (stack.length > level) {
      stack.pop();
    }

    if (stack.length < level) {
      while (stack.length < level) {
        const last = stack[stack.length - 1];
        if (last.length > 0) {
          stack.push(last[last.length - 1].children);
        } else {
          stack.push([]);
        }
      }
    }

    stack[stack.length - 1].push(tocItem);

    if (level === 1) {
      root.push(tocItem);
    }
  });
  return root;
};
