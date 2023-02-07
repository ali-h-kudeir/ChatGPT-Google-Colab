export interface NoteBookEngine {
  codeBlocksQuery: string[];
  cellQuery: string[];
  buttonsQuery: string[];
  watchRouteChange?: (callback: () => void) => void;
}

export const config: Record<string, NoteBookEngine> = {
  colab: {
    codeBlocksQuery: ['.codecell-input-output'],
    cellQuery: ['.inputarea'],
    buttonsQuery: ['.add-cell-buttons'],
  },
  jupyter: {
    codeBlocksQuery: ['.codecell-input-output'],
    cellQuery: ['#b_context'],
    buttonsQuery: ['.add-cell-buttons'],
  },
};
