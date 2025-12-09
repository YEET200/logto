import { assert } from '@silverhand/essentials';
import { got, HTTPError } from 'got';

import type {
  GetConnectorConfig,
  SendMessageFunction,
  CreateConnector,
  SmsConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
  replaceSendMessageHandlebars,
} from '@logto/connector-kit';

import { defaultMetadata, endpoint } from './constant.js';
import type { ClicksendSmsRequest } from './types.js';
import { clicksendSmsConfigGuard } from './types.js';

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig(config, clicksendSmsConfigGuard);
    const { username, apiKey, from, templates } = config;
    const template = templates.find((template) => template.usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Cannot find template for type: ${type}`
      )
    );

    const requestBody: ClicksendSmsRequest = {
      messages: [
        {
          to,
          ...(from && { from }),
          body: replaceSendMessageHandlebars(template.content, payload),
        },
      ],
    };

    try {
      return await got.post(endpoint, {
        headers: {
          Authorization: 'Basic ' + Buffer.from([username, apiKey].join(':')).toString('base64'),
          'Content-Type': 'application/json',
        },
        json: requestBody,
      });
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const {
          response: { body: rawBody },
        } = error;
        assert(
          typeof rawBody === 'string',
          new ConnectorError(
            ConnectorErrorCodes.InvalidResponse,
            `Invalid response raw body type: ${typeof rawBody}`
          )
        );

        throw new ConnectorError(ConnectorErrorCodes.General, rawBody);
      }

      throw error;
    }
  };

const createClicksendSmsConnector: CreateConnector<SmsConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Sms,
    configGuard: clicksendSmsConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createClicksendSmsConnector;

