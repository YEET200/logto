import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorConfigFormItemType } from '@logto/connector-kit';

export const endpoint = 'https://rest.clicksend.com/v3/sms/send';

export const defaultMetadata: ConnectorMetadata = {
  id: 'clicksend-sms',
  target: 'clicksend-sms',
  platform: null,
  name: {
    en: 'Clicksend SMS Service',
    ko: 'Clicksend SMS 서비스',
    fr: 'Service de SMS Clicksend',
    es: 'Servicio de SMS Clicksend',
  },
  logo: './logo.svg',
  logoDark: './logo-dark.svg',
  description: {
    en: 'Clicksend provides SMS messaging services with global reach and reliable delivery.',
    'zh-CN': 'Clicksend 提供具有全球覆盖范围和可靠交付的短信服务。',
    'tr-TR': 'Clicksend, küresel erişim ve güvenilir teslimat ile SMS mesajlaşma hizmetleri sağlar.',
    ko: 'Clicksend는 글로벌 도달 범위와 안정적인 전송을 제공하는 SMS 메시징 서비스를 제공합니다.',
  },
  readme: './README.md',
  formItems: [
    {
      key: 'username',
      label: 'Username',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<username>',
    },
    {
      key: 'apiKey',
      label: 'API Key',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<api-key>',
    },
    {
      key: 'from',
      label: 'From (Sender ID)',
      type: ConnectorConfigFormItemType.Text,
      required: false,
      placeholder: '<sender-id-or-phone-number>',
      description:
        'The sender ID or phone number to send messages from. Can be a phone number in E.164 format or an alphanumeric sender ID (if supported in your region).',
    },
    {
      key: 'templates',
      label: 'Templates',
      type: ConnectorConfigFormItemType.Json,
      required: true,
      defaultValue: [
        {
          usageType: 'SignIn',
          content:
            'Your Logto sign-in verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Register',
          content:
            'Your Logto sign-up verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'ForgotPassword',
          content:
            'Your Logto password change verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'OrganizationInvitation',
          content:
            'Your Logto organization invitation code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Generic',
          content:
            'Your Logto verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'UserPermissionValidation',
          content:
            'Your Logto permission validation code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'BindNewIdentifier',
          content:
            'Your Logto new identifier binding code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'MfaVerification',
          content:
            'Your Logto MFA verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'BindMfa',
          content:
            'Your Logto 2-step verification setup code is {{code}}. The code will remain active for 10 minutes.',
        },
      ],
    },
  ],
};

