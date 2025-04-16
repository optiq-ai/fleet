import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaSearch, FaFilter, FaDownload, FaPlus, FaEllipsisV, FaCog, FaBell, FaCalendarAlt, FaRobot } from 'react-icons/fa';

const DocumentAutomation = ({ 
  automationRules, 
  documentTemplates, 
  reminderSettings, 
  isLoading, 
  error, 
  onSaveRule,
  onDeleteRule,
  onSaveTemplate,
  onDeleteTemplate,
  onSaveReminderSettings
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('rules');
  
  // State for editing rule
  const [editingRule, setEditingRule] = useState(null);
  
  // State for editing template
  const [editingTemplate, setEditingTemplate] = useState(null);
  
  // State for editing reminder settings
  const [editingReminderSettings, setEditingReminderSettings] = useState(false);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle edit rule
  const handleEditRule = (rule) => {
    setEditingRule(rule);
  };
  
  // Handle edit template
  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
  };
  
  // Handle edit reminder settings
  const handleEditReminderSettings = () => {
    setEditingReminderSettings(true);
  };
  
  // Render loading state
  if (isLoading) {
    return <LoadingMessage>Loading automation settings...</LoadingMessage>;
  }
  
  // Render error state
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  return (
    <Container>
      <Header>
        <Title>Document Automation</Title>
        <Description>
          Automate document workflows, set up reminders, and manage document templates.
        </Description>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'rules'} 
          onClick={() => handleTabChange('rules')}
        >
          <FaRobot /> Automation Rules
        </Tab>
        <Tab 
          active={activeTab === 'templates'} 
          onClick={() => handleTabChange('templates')}
        >
          <FaFileAlt /> Document Templates
        </Tab>
        <Tab 
          active={activeTab === 'reminders'} 
          onClick={() => handleTabChange('reminders')}
        >
          <FaBell /> Reminder Settings
        </Tab>
      </TabsContainer>
      
      {activeTab === 'rules' && (
        <TabContent>
          <SectionHeader>
            <SectionTitle>Automation Rules</SectionTitle>
            <PrimaryButton>
              <FaPlus /> Create New Rule
            </PrimaryButton>
          </SectionHeader>
          
          <SectionDescription>
            Set up rules to automatically process documents based on specific triggers and conditions.
          </SectionDescription>
          
          {automationRules.length > 0 ? (
            <RulesList>
              {automationRules.map(rule => (
                <RuleCard key={rule.id}>
                  <RuleHeader>
                    <RuleName>{rule.name}</RuleName>
                    <RuleStatus active={rule.active}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </RuleStatus>
                  </RuleHeader>
                  
                  <RuleDescription>{rule.description}</RuleDescription>
                  
                  <RuleDetails>
                    <RuleDetailItem>
                      <RuleDetailLabel>Trigger:</RuleDetailLabel>
                      <RuleDetailValue>{rule.trigger}</RuleDetailValue>
                    </RuleDetailItem>
                    
                    <RuleDetailItem>
                      <RuleDetailLabel>Conditions:</RuleDetailLabel>
                      <RuleDetailValue>
                        {rule.conditions.map((condition, index) => (
                          <ConditionItem key={index}>
                            {condition.field} {condition.operator} {condition.value}
                          </ConditionItem>
                        ))}
                      </RuleDetailValue>
                    </RuleDetailItem>
                    
                    <RuleDetailItem>
                      <RuleDetailLabel>Actions:</RuleDetailLabel>
                      <RuleDetailValue>
                        {rule.actions.map((action, index) => (
                          <ActionItem key={index}>
                            {action.type}: {action.description}
                          </ActionItem>
                        ))}
                      </RuleDetailValue>
                    </RuleDetailItem>
                  </RuleDetails>
                  
                  <RuleFooter>
                    <RuleMetadata>
                      Created: {new Date(rule.createdAt).toLocaleDateString()}
                      {rule.lastRun && ` • Last run: ${new Date(rule.lastRun).toLocaleDateString()}`}
                    </RuleMetadata>
                    
                    <RuleActions>
                      <SecondaryButton onClick={() => handleEditRule(rule)}>
                        <FaCog /> Edit
                      </SecondaryButton>
                    </RuleActions>
                  </RuleFooter>
                </RuleCard>
              ))}
            </RulesList>
          ) : (
            <EmptyMessage>
              No automation rules found. Create a new rule to automate document workflows.
            </EmptyMessage>
          )}
        </TabContent>
      )}
      
      {activeTab === 'templates' && (
        <TabContent>
          <SectionHeader>
            <SectionTitle>Document Templates</SectionTitle>
            <PrimaryButton>
              <FaPlus /> Create New Template
            </PrimaryButton>
          </SectionHeader>
          
          <SectionDescription>
            Create and manage document templates for quick generation of standardized documents.
          </SectionDescription>
          
          {documentTemplates.length > 0 ? (
            <TemplatesGrid>
              {documentTemplates.map(template => (
                <TemplateCard key={template.id}>
                  <TemplateIcon>
                    <FaFileAlt />
                  </TemplateIcon>
                  
                  <TemplateName>{template.name}</TemplateName>
                  <TemplateCategory>{template.category}</TemplateCategory>
                  
                  <TemplateDescription>{template.description}</TemplateDescription>
                  
                  <TemplateFooter>
                    <TemplateMetadata>
                      Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                    </TemplateMetadata>
                    
                    <TemplateActions>
                      <ActionButton onClick={() => handleEditTemplate(template)}>
                        <FaEllipsisV />
                      </ActionButton>
                    </TemplateActions>
                  </TemplateFooter>
                </TemplateCard>
              ))}
            </TemplatesGrid>
          ) : (
            <EmptyMessage>
              No document templates found. Create a new template to standardize document creation.
            </EmptyMessage>
          )}
        </TabContent>
      )}
      
      {activeTab === 'reminders' && (
        <TabContent>
          <SectionHeader>
            <SectionTitle>Reminder Settings</SectionTitle>
            <PrimaryButton onClick={handleEditReminderSettings}>
              <FaCog /> Edit Settings
            </PrimaryButton>
          </SectionHeader>
          
          <SectionDescription>
            Configure how and when document reminders are sent to users.
          </SectionDescription>
          
          <ReminderSettingsCard>
            <ReminderSettingSection>
              <ReminderSettingTitle>Default Reminder Schedule</ReminderSettingTitle>
              <ReminderSettingDescription>
                When to send reminders before document expiry dates
              </ReminderSettingDescription>
              
              <ReminderScheduleList>
                {reminderSettings.defaultSchedule.map((days, index) => (
                  <ReminderScheduleItem key={index}>
                    <FaCalendarAlt /> {days} days before expiry
                  </ReminderScheduleItem>
                ))}
              </ReminderScheduleList>
            </ReminderSettingSection>
            
            <ReminderSettingSection>
              <ReminderSettingTitle>Notification Methods</ReminderSettingTitle>
              <ReminderSettingDescription>
                How reminders are delivered to users
              </ReminderSettingDescription>
              
              <NotificationMethodsList>
                {reminderSettings.notificationMethods.map((method, index) => (
                  <NotificationMethodItem key={index} active={method.active}>
                    <NotificationMethodName>{method.name}</NotificationMethodName>
                    <NotificationMethodStatus>
                      {method.active ? 'Enabled' : 'Disabled'}
                    </NotificationMethodStatus>
                  </NotificationMethodItem>
                ))}
              </NotificationMethodsList>
            </ReminderSettingSection>
            
            <ReminderSettingSection>
              <ReminderSettingTitle>Escalation Rules</ReminderSettingTitle>
              <ReminderSettingDescription>
                When to escalate reminders to supervisors
              </ReminderSettingDescription>
              
              <EscalationRulesList>
                {reminderSettings.escalationRules.map((rule, index) => (
                  <EscalationRuleItem key={index}>
                    <EscalationRuleName>{rule.name}</EscalationRuleName>
                    <EscalationRuleDescription>
                      {rule.description}
                    </EscalationRuleDescription>
                  </EscalationRuleItem>
                ))}
              </EscalationRulesList>
            </ReminderSettingSection>
          </ReminderSettingsCard>
        </TabContent>
      )}
      
      {/* Rule Editor Modal would be implemented here */}
      {/* Template Editor Modal would be implemented here */}
      {/* Reminder Settings Editor Modal would be implemented here */}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#2196f3' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#2196f3' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #2196f3;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1e88e5;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`;

const RulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RuleCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const RuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RuleName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const RuleStatus = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => props.active ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.active ? '#4caf50' : '#9e9e9e'};
`;

const RuleDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
`;

const RuleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const RuleDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RuleDetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #666;
`;

const RuleDetailValue = styled.div`
  font-size: 14px;
  color: #333;
`;

const ConditionItem = styled.div`
  font-size: 14px;
  color: #333;
  padding: 4px 0;
`;

const ActionItem = styled.div`
  font-size: 14px;
  color: #333;
  padding: 4px 0;
`;

const RuleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RuleMetadata = styled.div`
  font-size: 12px;
  color: #999;
`;

const RuleActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const TemplateCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TemplateIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 50%;
  font-size: 24px;
`;

const TemplateName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
  text-align: center;
`;

const TemplateCategory = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;

const TemplateDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  text-align: center;
  flex-grow: 1;
`;

const TemplateFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TemplateMetadata = styled.div`
  font-size: 12px;
  color: #999;
`;

const TemplateActions = styled.div`
  position: relative;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #2196f3;
  }
`;

const ReminderSettingsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReminderSettingSection = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ReminderSettingTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
`;

const ReminderSettingDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
`;

const ReminderScheduleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ReminderScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

const NotificationMethodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationMethodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border-left: 3px solid ${props => props.active ? '#4caf50' : '#9e9e9e'};
`;

const NotificationMethodName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const NotificationMethodStatus = styled.div`
  font-size: 12px;
  color: #666;
`;

const EscalationRulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EscalationRuleItem = styled.div`
  padding: 10px 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
`;

const EscalationRuleName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

const EscalationRuleDescription = styled.div`
  font-size: 14px;
  color: #666;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
  padding: 20px;
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
`;

export default DocumentAutomation;
