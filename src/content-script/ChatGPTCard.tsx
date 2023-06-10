import { useState } from 'preact/hooks';
import { useId } from 'react';
import { Language, UserConfig } from '../config';
import Accordion from './accordion';
import ChatGPTQuery from './ChatGPTQuery';
import PROMPTS from './prompts';

interface Props {
  question: string;
  userConfig: UserConfig;
}

function ChatGPTCard({ question, userConfig }: Props) {
  const [prompt, setPrompt] = useState('');

  const id = useId();

  const [includeCurrentCell, setIncludeCurrentCell] = useState(true);

  const [closed, setClosed] = useState(false);

  const [body, setBody] = useState('');

  const language = userConfig.language === Language.Auto ? '' : `(in ${userConfig.language})`;

  const query = includeCurrentCell ? `${prompt}\n${language}\n${question}` : `${prompt}\n${language}`;

  const handleButtonClick = () => {
    setBody(query);
  };

  if (closed) {
    return null;
  }

  return (
    <Accordion visible>
      <div className="p-2.5">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select prompt
        </label>
        <select
          onChange={(e) => setPrompt(e.target.value)}
          id="countries"
          className="w-full prompt-select colab-text outline-none colab-border focus:border-blue-400 focus-within:border-blue-400"
        >
          <option>Select ChatGPT Task</option>
          <option value={PROMPTS.EXPLAIN}>1. Explain</option>
          <option value={PROMPTS.REFACTOR}>2. Refactor</option>
          <option value={PROMPTS.FIX}>3. Fix</option>
          <option value={PROMPTS.SUMMARIZE}>4. Summarize</option>
          <option value={PROMPTS.ADD_COMMENTS}>5. Add comments</option>
        </select>
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          className="iron-textarea mt-2 box-border resize-y colab-border input w-full outline-none p-1.5 rounded-sm focus:border-blue-400"
          placeholder="Type a custom prompt"
          rows={4}
        >
          {prompt}
        </textarea>
        <div className="flex items-center gap-3 my-2">
          <button className="colab-button cursor-pointer" onClick={() => handleButtonClick()}>
            Submit
          </button>
          <div className="flex items-center">
            <input
              id={'default-checkbox-' + id}
              type="checkbox"
              onChange={() => setIncludeCurrentCell(!includeCurrentCell)}
              checked={includeCurrentCell}
              className="w-3 h-3 text-blue-400 focus:border-2 colab-border rounded focus:ring-blue-400 dark:focus:ring-blue-400 dark:ring-offset-gray-800 focus:ring-2"
            />
            <label htmlFor={'default-checkbox-' + id} className="ml-1.5 colab-text text-xs">
              Include code
            </label>
          </div>
        </div>
        <ChatGPTQuery body={body} />
        <div className="flex items-center gap-5 mt-5">
          <button className="colab-button z-20 relative mt-5 cursor-pointer" onClick={() => setClosed(true)}>
            Close
          </button>
          <button className="colab-button z-20 relative mt-5 cursor-pointer" onClick={() => setPrompt('')}>
            Reset
          </button>
        </div>
      </div>
    </Accordion>
  );
}

export default ChatGPTCard;
