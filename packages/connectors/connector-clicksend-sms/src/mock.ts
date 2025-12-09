import type { ClicksendSmsConfig } from './types.js';

const mockedUsername = 'test-username';
const mockedApiKey = 'test-api-key';
const mockedFrom = '+1234567890';

export const mockedConfig: ClicksendSmsConfig = {
  username: mockedUsername,
  apiKey: mockedApiKey,
  from: mockedFrom,
  templates: [
    {
      usageType: 'Generic',
      content: 'This is for testing purposes only. Your verification code is {{code}}.',
    },
  ],
};

