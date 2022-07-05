import type { FC } from 'react';
import { useAppEnvironment } from '../../../api/appEnvironment/hook';
import { t } from '../../../api/i18n/translate';
import { Paragraph } from '../Paragraph/Paragraph';
import { aboutApp, aboutAppName } from './AboutApp.module.css';

export const AboutApp: FC = () => {
  const appEnvironment = useAppEnvironment();

  if (appEnvironment === undefined) {
    return <></>;
  }

  return (
    <div className={aboutApp}>
      <span className={aboutAppName}>
        {t('about_app_version', [appEnvironment.app.name, appEnvironment.app.version])}
      </span>

      <Paragraph>
        Designed and developed by{' '}
        <a href="https://github.com/flaksp" rel="noreferrer noopener" target="_blank">
          Petr Flaks
        </a>{' '}
        with help of{' '}
        <a
          href="https://github.com/camellia-app/camellia/graphs/contributors"
          rel="noreferrer noopener"
          target="_blank"
        >
          awesome contributors
        </a>{' '}
        ❤️
      </Paragraph>
    </div>
  );
};
