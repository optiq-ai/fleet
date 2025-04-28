import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageButton = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--textSecondary)'};
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--hover)'};
    border-color: var(--primary);
    color: ${props => props.active ? 'white' : 'var(--primary)'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer title={t('header.language')}>
      <LanguageButton 
        onClick={() => changeLanguage('en')} 
        active={i18n.language === 'en'}
        disabled={i18n.language === 'en'}
      >
        {t('languageSwitcher.english')}
      </LanguageButton>
      <LanguageButton 
        onClick={() => changeLanguage('pl')} 
        active={i18n.language === 'pl'}
        disabled={i18n.language === 'pl'}
      >
        {t('languageSwitcher.polish')}
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;

