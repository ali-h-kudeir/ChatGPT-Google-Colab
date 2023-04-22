import { CheckIcon, CopyIcon, GearIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'preact/hooks';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Browser from 'webextension-polyfill';
import { captureEvent } from '../analytics';
import { Answer } from '../messaging';
import { shouldShowRatingTip } from './utils.js';

export type QueryStatus = 'success' | 'error' | undefined;

interface Props {
  body: string;
}

function ChatGPTQuery({ body }: Props) {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [done, setDone] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [status, setStatus] = useState<QueryStatus>();
  const [copied, setCopied] = useState(false);

  const isChrome = /chrome/i.test(navigator.userAgent);

  useEffect(() => {
    if (!body) {
      return;
    }
    const port = Browser.runtime.connect();
    const listener = (msg: any) => {
      if (msg.text) {
        setAnswer(msg);
        setStatus('success');
      } else if (msg.error) {
        setError(msg.error);
        setStatus('error');
      } else if (msg.event === 'DONE') {
        setDone(true);
      }
    };
    port?.onMessage.addListener(listener);
    port?.postMessage({ question: body });
    return () => {
      port?.onMessage.removeListener(listener);
      port?.disconnect();
    };
  }, [body, retry]);

  // retrieve error on focus
  useEffect(() => {
    const onFocus = () => {
      if (error && (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE')) {
        setError('');
        setRetry((r) => r + 1);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [error]);

  useEffect(() => {
    shouldShowRatingTip().then((show) => setShowTip(show));
  }, []);

  useEffect(() => {
    if (status === 'success') {
      captureEvent('show_answer', { host: location.host, language: navigator.language });
    }
  }, [body, status]);

  const clickCopyToClipboard = async () => {
    await navigator.clipboard.writeText(answer?.text ?? '');
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (answer) {
    return (
      <div className="markdown-body gpt-markdown" id="gpt-answer" dir="auto">
        <div className="gpt-header">
          <span className="font-bold">ChatGPT</span>
          <span className="cursor-pointer leading-[0] ml-1">
            <GearIcon size={14} />
          </span>
        </div>
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>{answer?.text ?? ''}</ReactMarkdown>
        <button
          className="colab-button my-2 cursor-pointer flex items-center gap-1"
          onClick={() => clickCopyToClipboard()}
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />} Copy
        </button>
        {done && showTip && (
          <p className="italic mt-2">
            Enjoy this extension? Give us a 5-star rating at{' '}
            <a
              href={
                isChrome
                  ? 'https://chrome.google.com/webstore/detail/chatgpt-for-google-colab/dfhfeifekpgapdlhfakecbbinnnfoohh'
                  : 'https://addons.mozilla.org/en-US/firefox/addon/chatgpt-for-google-colab/'
              }
              target="_blank"
              rel="noreferrer"
            >
              {isChrome ? 'Chrome' : 'Firefox'} Web Store
            </a>
          </p>
        )}
      </div>
    );
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <p>
        Please login and pass Cloudflare check at{' '}
        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>
        <span className="italic block mt-2 text-xs">
          OpenAI requires passing a security check every once in a while. If this keeps happening, change AI provider to
          OpenAI API in the extension options.
        </span>
      </p>
    );
  }
  if (error) {
    return (
      <p>
        Failed to load response from ChatGPT:
        <span className="break-all block">{error}</span>
      </p>
    );
  }

  return body ? <p className="text-[#b6b8ba] animate-pulse">Waiting for ChatGPT response...</p> : null;
}

export default memo(ChatGPTQuery);
