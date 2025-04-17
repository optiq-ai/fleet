import React, { useState, useEffect } from 'react';
import './AutomationSettings.css';
import SettingsCard from '../common/SettingsCard';
import SettingsInput from '../common/SettingsInput';
import SettingsSelect from '../common/SettingsSelect';
import SettingsToggle from '../common/SettingsToggle';
import SettingsButton from '../common/SettingsButton';
import mockSettingsService from '../../../services/api/mockSettingsService';

/**
 * AutomationSettings component
 * 
 * This component allows users to configure automation settings:
 * - Automation rules
 * - Task scheduling
 * - Trigger conditions
 * - Message templates
 * 
 * @returns {JSX.Element} AutomationSettings component
 */
const AutomationSettings = () => {
  // State for automation settings
  const [automation, setAutomation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // State for editing
  const [editingRule, setEditingRule] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showNewRule, setShowNewRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    trigger: '',
    action: '',
    enabled: true
  });

  // Fetch automation settings
  useEffect(() => {
    const fetchAutomation = async () => {
      try {
        setLoading(true);
        const data = await mockSettingsService.getAutomationSettings();
        setAutomation(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać ustawień automatyzacji');
        console.error('Error fetching automation settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAutomation();
  }, []);

  // Handle rule enabled toggle
  const handleRuleEnabledToggle = (ruleId) => {
    const updatedRules = automation.automationRules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          enabled: !rule.enabled
        };
      }
      return rule;
    });

    setAutomation({
      ...automation,
      automationRules: updatedRules
    });
  };

  // Handle task schedule toggle
  const handleTaskScheduleToggle = (taskId) => {
    const updatedTasks = automation.scheduledTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          enabled: !task.enabled
        };
      }
      return task;
    });

    setAutomation({
      ...automation,
      scheduledTasks: updatedTasks
    });
  };

  // Handle task schedule change
  const handleTaskScheduleChange = (taskId, schedule) => {
    const updatedTasks = automation.scheduledTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          schedule
        };
      }
      return task;
    });

    setAutomation({
      ...automation,
      scheduledTasks: updatedTasks
    });
  };

  // Start editing rule
  const startEditingRule = (rule) => {
    setEditingRule({
      ...rule
    });
  };

  // Save edited rule
  const saveEditedRule = () => {
    const updatedRules = automation.automationRules.map(rule => {
      if (rule.id === editingRule.id) {
        return editingRule;
      }
      return rule;
    });

    setAutomation({
      ...automation,
      automationRules: updatedRules
    });

    setEditingRule(null);
  };

  // Cancel editing rule
  const cancelEditingRule = () => {
    setEditingRule(null);
  };

  // Add new rule
  const addNewRule = () => {
    const newId = Math.max(...automation.automationRules.map(rule => rule.id)) + 1;
    
    const ruleToAdd = {
      id: newId,
      name: newRule.name,
      description: newRule.description,
      trigger: newRule.trigger,
      action: newRule.action,
      enabled: newRule.enabled
    };
    
    setAutomation({
      ...automation,
      automationRules: [...automation.automationRules, ruleToAdd]
    });
    
    setNewRule({
      name: '',
      description: '',
      trigger: '',
      action: '',
      enabled: true
    });
    
    setShowNewRule(false);
  };

  // Start editing template
  const startEditingTemplate = (template) => {
    setEditingTemplate({
      ...template
    });
  };

  // Save edited template
  const saveEditedTemplate = () => {
    const updatedTemplates = automation.messageTemplates.map(template => {
      if (template.id === editingTemplate.id) {
        return editingTemplate;
      }
      return template;
    });

    setAutomation({
      ...automation,
      messageTemplates: updatedTemplates
    });

    setEditingTemplate(null);
  };

  // Cancel editing template
  const cancelEditingTemplate = () => {
    setEditingTemplate(null);
  };

  // Save automation settings
  const handleSaveAutomation = async () => {
    try {
      setSaveStatus('saving');
      await mockSettingsService.updateAutomationSettings(automation);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Error saving automation settings:', err);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="settings-loading">Ładowanie ustawień automatyzacji...</div>;
  }

  // Show error state
  if (error) {
    return <div className="settings-error">{error}</div>;
  }

  // Show automation settings
  return (
    <div className="automation-settings">
      <SettingsCard title="Reguły automatyzacji">
        <p className="settings-description">
          Zarządzaj regułami automatyzacji procesów.
        </p>
        
        <div className="automation-rules">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Wyzwalacz</th>
                <th>Akcja</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {automation.automationRules.map((rule) => (
                <tr key={rule.id}>
                  <td>
                    <div className="rule-name">{rule.name}</div>
                    <div className="rule-description">{rule.description}</div>
                  </td>
                  <td>{rule.trigger}</td>
                  <td>{rule.action}</td>
                  <td>
                    <SettingsToggle
                      checked={rule.enabled}
                      onChange={() => handleRuleEnabledToggle(rule.id)}
                    />
                  </td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingRule(rule)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="add-new-section">
            {!showNewRule ? (
              <SettingsButton 
                onClick={() => setShowNewRule(true)}
                type="primary"
              >
                Dodaj nową regułę
              </SettingsButton>
            ) : (
              <div className="add-new-form">
                <h4>Dodaj nową regułę automatyzacji</h4>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Nazwa"
                    value={newRule.name}
                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsInput
                    label="Opis"
                    value={newRule.description}
                    onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Wyzwalacz"
                    value={newRule.trigger}
                    onChange={(e) => setNewRule({...newRule, trigger: e.target.value})}
                    options={automation.availableTriggers.map(trigger => ({
                      value: trigger,
                      label: trigger
                    }))}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsSelect
                    label="Akcja"
                    value={newRule.action}
                    onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                    options={automation.availableActions.map(action => ({
                      value: action,
                      label: action
                    }))}
                  />
                </div>
                
                <div className="settings-form-row">
                  <SettingsToggle
                    label="Włączona"
                    checked={newRule.enabled}
                    onChange={() => setNewRule({...newRule, enabled: !newRule.enabled})}
                  />
                </div>
                
                <div className="form-actions">
                  <SettingsButton onClick={() => setShowNewRule(false)}>
                    Anuluj
                  </SettingsButton>
                  <SettingsButton 
                    type="primary" 
                    onClick={addNewRule}
                    disabled={!newRule.name || !newRule.trigger || !newRule.action}
                  >
                    Dodaj
                  </SettingsButton>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {editingRule && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj regułę automatyzacji</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingRule.name}
                  onChange={(e) => setEditingRule({...editingRule, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Opis"
                  value={editingRule.description}
                  onChange={(e) => setEditingRule({...editingRule, description: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsSelect
                  label="Wyzwalacz"
                  value={editingRule.trigger}
                  onChange={(e) => setEditingRule({...editingRule, trigger: e.target.value})}
                  options={automation.availableTriggers.map(trigger => ({
                    value: trigger,
                    label: trigger
                  }))}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsSelect
                  label="Akcja"
                  value={editingRule.action}
                  onChange={(e) => setEditingRule({...editingRule, action: e.target.value})}
                  options={automation.availableActions.map(action => ({
                    value: action,
                    label: action
                  }))}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsToggle
                  label="Włączona"
                  checked={editingRule.enabled}
                  onChange={() => setEditingRule({...editingRule, enabled: !editingRule.enabled})}
                />
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingRule}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedRule}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <SettingsCard title="Harmonogram zadań">
        <p className="settings-description">
          Zarządzaj harmonogramem automatycznych zadań.
        </p>
        
        <div className="scheduled-tasks">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa zadania</th>
                <th>Harmonogram</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {automation.scheduledTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="task-name">{task.name}</div>
                    <div className="task-description">{task.description}</div>
                  </td>
                  <td>
                    <SettingsSelect
                      value={task.schedule}
                      onChange={(e) => handleTaskScheduleChange(task.id, e.target.value)}
                      options={[
                        { value: 'hourly', label: 'Co godzinę' },
                        { value: 'daily', label: 'Codziennie' },
                        { value: 'weekly', label: 'Co tydzień' },
                        { value: 'monthly', label: 'Co miesiąc' }
                      ]}
                      disabled={!task.enabled}
                      className="schedule-select"
                    />
                  </td>
                  <td>
                    <SettingsToggle
                      checked={task.enabled}
                      onChange={() => handleTaskScheduleToggle(task.id)}
                    />
                  </td>
                  <td>
                    <div className="last-run">
                      Ostatnie uruchomienie: {task.lastRun || 'Nigdy'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      <SettingsCard title="Warunki wyzwalające">
        <p className="settings-description">
          Definiuj warunki, które wyzwalają automatyzacje.
        </p>
        
        <div className="trigger-conditions">
          <div className="conditions-list">
            {automation.triggerConditions.map((condition) => (
              <div key={condition.id} className="condition-item">
                <div className="condition-header">
                  <h4 className="condition-name">{condition.name}</h4>
                  <SettingsToggle
                    checked={condition.enabled}
                    onChange={() => {
                      const updatedConditions = automation.triggerConditions.map(c => {
                        if (c.id === condition.id) {
                          return {
                            ...c,
                            enabled: !c.enabled
                          };
                        }
                        return c;
                      });
                      
                      setAutomation({
                        ...automation,
                        triggerConditions: updatedConditions
                      });
                    }}
                  />
                </div>
                
                <div className="condition-description">
                  {condition.description}
                </div>
                
                {condition.enabled && (
                  <div className="condition-parameters">
                    {condition.parameters.map((param) => (
                      <div key={param.name} className="condition-parameter">
                        <SettingsInput
                          label={param.label}
                          value={param.value}
                          type={param.type}
                          onChange={(e) => {
                            const updatedConditions = automation.triggerConditions.map(c => {
                              if (c.id === condition.id) {
                                return {
                                  ...c,
                                  parameters: c.parameters.map(p => {
                                    if (p.name === param.name) {
                                      return {
                                        ...p,
                                        value: e.target.value
                                      };
                                    }
                                    return p;
                                  })
                                };
                              }
                              return c;
                            });
                            
                            setAutomation({
                              ...automation,
                              triggerConditions: updatedConditions
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Szablony wiadomości">
        <p className="settings-description">
          Zarządzaj szablonami wiadomości dla automatycznych powiadomień.
        </p>
        
        <div className="message-templates">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Nazwa szablonu</th>
                <th>Typ</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {automation.messageTemplates.map((template) => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>{template.type}</td>
                  <td>
                    <SettingsButton 
                      onClick={() => startEditingTemplate(template)}
                      className="small-button"
                    >
                      Edytuj
                    </SettingsButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editingTemplate && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edytuj szablon wiadomości</h3>
              
              <div className="settings-form-row">
                <SettingsInput
                  label="Nazwa"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                />
              </div>
              
              <div className="settings-form-row">
                <SettingsSelect
                  label="Typ"
                  value={editingTemplate.type}
                  onChange={(e) => setEditingTemplate({...editingTemplate, type: e.target.value})}
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Powiadomienie push' }
                  ]}
                />
              </div>
              
              <div className="settings-form-row">
                <label className="settings-label">Treść szablonu</label>
                <textarea
                  className="template-content"
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                  rows={6}
                />
                <div className="template-variables">
                  <div className="variables-title">Dostępne zmienne:</div>
                  {editingTemplate.availableVariables.map((variable) => (
                    <div key={variable} className="variable-item">
                      {variable}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="edit-modal-actions">
                <SettingsButton onClick={cancelEditingTemplate}>
                  Anuluj
                </SettingsButton>
                <SettingsButton 
                  type="primary" 
                  onClick={saveEditedTemplate}
                >
                  Zapisz
                </SettingsButton>
              </div>
            </div>
          </div>
        )}
      </SettingsCard>

      <div className="settings-actions">
        <SettingsButton 
          type="primary" 
          onClick={handleSaveAutomation}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz ustawienia automatyzacji'}
        </SettingsButton>
        
        {saveStatus === 'success' && (
          <div className="settings-save-status settings-save-success">
            Ustawienia automatyzacji zostały zapisane pomyślnie.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="settings-save-status settings-save-error">
            Wystąpił błąd podczas zapisywania ustawień automatyzacji.
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationSettings;
