const PROMPTS = {
  ADD_COMMENTS:
    'Please add descriptive comments to the following code, explaining what each section of code is doing and why it is important. Consider using clear, concise language and formatting the comments in a readable way',
  EXPLAIN:
    'Please provide a markdown formatted explanation of the following code. This should include a detailed description of what the code does, its structure, how it works, and any notable features or functionality. Consider including examples and use cases to make your explanation clear and comprehensive',
  REFACTOR:
    'Provide a refactored version of the following code to make it more efficient, readable, and maintainable. Consider optimizing for performance, following coding standards, and making the code more modular',
  FIX: 'Diagnose and fix any bugs in the following code. Provide a detailed explanation of what the issue was and how you resolved it, along with the updated code that eliminates the bugs',
  SUMMARIZE:
    'Please provide a markdown formatted summary of the following code. This should include a brief description of what the code does, its structure, and any notable features or functionality',
};

export type PromptsKey = keyof typeof PROMPTS;

export default PROMPTS;
