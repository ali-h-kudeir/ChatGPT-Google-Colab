import { render } from 'preact';
import '../base.css';
import { getUserConfig, UserConfig } from '../config';
import ChatGPTCard from './ChatGPTCard';
import { config } from './search-engine-configs';
import { getPossibleElementByQuerySelector } from './utils';

const siteRegex = 'colab'; //new RegExp(Object.keys(config).join('|'))

export function insertAfter(newNode: Element, referenceNode: Element) {
  (referenceNode.parentNode as Element).insertBefore(newNode, referenceNode.nextSibling);
}

async function mount(parentContainer: Element, userConfig: UserConfig) {
  const siteName = location.hostname.match(siteRegex)![0];
  const siteConfig = config[siteName];
  const inputCell = getPossibleElementByQuerySelector(siteConfig.cellQuery, parentContainer)[0] as HTMLTextAreaElement;

  const chatGptButton = document.createElement('button');

  let container: Element;

  chatGptButton.innerText = 'ChatGPT';

  chatGptButton.classList.add('chatgpt-button', 'add-code', 'add-button');

  chatGptButton.addEventListener('click', () => {
    if (container) {
      container.remove();
    }

    container = document.createElement('div');

    container.classList.add('decode-container');
    inputCell?.appendChild(container);
    insertAfter(container, inputCell);

    render(<ChatGPTCard question={inputCell.innerText} userConfig={userConfig} />, container);
  });

  insertAfter(chatGptButton, inputCell);

  parentContainer.addEventListener('mouseenter', () => {
    chatGptButton.style.position = 'absolute';
    chatGptButton.style.visibility = 'visible';
  });

  parentContainer.addEventListener('mouseleave', () => {
    chatGptButton.style.visibility = 'hidden';
  });
}

async function run() {
  if (!window.location.href.includes('colab.research.google.com')) {
    return;
  }

  const siteName = location.hostname.match(siteRegex)![0];
  const siteConfig = config[siteName];

  const codeBlocks = getPossibleElementByQuerySelector(siteConfig.codeBlocksQuery) ?? [];

  const userConfig = await getUserConfig();

  const items = [...codeBlocks];

  items.forEach((item) => {
    mount(item, userConfig);
  });

  // attach chatgpt to newly added code cells.
  const targetNode = document.body;
  const nodeConfig = { childList: true, subtree: true };
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const newlyAddedCodeBlocks =
              getPossibleElementByQuerySelector(siteConfig.codeBlocksQuery, node as Element) ?? [];
            Array.from(newlyAddedCodeBlocks).forEach(function (item) {
              mount(item, userConfig);
            });
          }
        }
      }
    }
  });
  observer.observe(targetNode, nodeConfig);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => run(), 0);
  });
} else {
  setTimeout(() => run(), 0);
}
