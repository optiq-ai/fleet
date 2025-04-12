import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
  attachments?: string[];
  comments?: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

interface WorkflowAutomationProps {
  userId: string;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onTaskCreate: (task: Omit<Task, 'id'>) => Promise<void>;
  onCommentAdd: (taskId: string, comment: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  min-height: 500px;
`;

const Column = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

const ColumnHeader = styled.div<{ status: 'todo' | 'in_progress' | 'review' | 'done' }>`
  padding: 12px 16px;
  background-color: ${props => 
    props.status === 'todo' ? '#e3f2fd' : 
    props.status === 'in_progress' ? '#fff8e1' : 
    props.status === 'review' ? '#e8f5e9' : 
    '#e0f2f1'
  };
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnCount = styled.span`
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TaskCard = styled.div<{ priority: 'low' | 'medium' | 'high' }>`
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-left: 3px solid ${props => 
    props.priority === 'high' ? '#f44336' : 
    props.priority === 'medium' ? '#ffc107' : 
    '#4caf50'
  };
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const TaskTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const TaskAssignee = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AssigneeAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #333;
`;

const TaskDueDate = styled.div<{ overdue: boolean }>`
  color: ${props => props.overdue ? '#f44336' : '#666'};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const TaskDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TaskDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TaskDetailTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
`;

const TaskDetailStatus = styled.div<{ status: 'todo' | 'in_progress' | 'review' | 'done' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'todo' ? '#e3f2fd' : 
    props.status === 'in_progress' ? '#fff8e1' : 
    props.status === 'review' ? '#e8f5e9' : 
    '#e0f2f1'
  };
  color: ${props => 
    props.status === 'todo' ? '#1976d2' : 
    props.status === 'in_progress' ? '#f57f17' : 
    props.status === 'review' ? '#2e7d32' : 
    '#00796b'
  };
`;

const TaskDetailDescription = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  white-space: pre-wrap;
`;

const TaskDetailMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetaLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const MetaValue = styled.div`
  font-weight: 500;
`;

const CommentsSection = styled.div`
  margin-top: 24px;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

const CommentItem = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.div`
  font-weight: 500;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const CommentContent = styled.div`
  white-space: pre-wrap;
`;

const CommentForm = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 60px;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const CommentButton = styled.button`
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const WorkflowAutomation: React.FC<WorkflowAutomationProps> = ({ 
  userId, 
  onTaskUpdate, 
  onTaskCreate, 
  onCommentAdd 
}) => {
  // Stan dla zadań
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  
  // Stan dla nowego zadania
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    status: 'todo',
    priority: 'medium',
    category: 'General',
    comments: []
  });
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania zadań
    const sampleTasks: Task[] = [
      {
        id: 'task1',
        title: 'Przegląd floty pojazdów',
        description: 'Przeprowadzić przegląd techniczny wszystkich pojazdów w lokalizacji Warszawa.',
        assignee: 'user1',
        dueDate: '2025-04-20T00:00:00Z',
        status: 'todo',
        priority: 'high',
        category: 'Maintenance',
        comments: [
          {
            id: 'comment1',
            author: 'user2',
            content: 'Czy mamy już zarezerwowane terminy w serwisie?',
            timestamp: '2025-04-11T14:30:00Z'
          }
        ]
      },
      {
        id: 'task2',
        title: 'Analiza zużycia paliwa',
        description: 'Przygotować raport miesięczny dotyczący zużycia paliwa dla wszystkich pojazdów.',
        assignee: 'user3',
        dueDate: '2025-04-15T00:00:00Z',
        status: 'in_progress',
        priority: 'medium',
        category: 'Analytics'
      },
      {
        id: 'task3',
        title: 'Weryfikacja podejrzanych transakcji',
        description: 'Sprawdzić i zweryfikować wszystkie oznaczone jako podejrzane transakcje z ostatniego tygodnia.',
        assignee: 'user4',
        dueDate: '2025-04-13T00:00:00Z',
        status: 'in_progress',
        priority: 'high',
        category: 'Fraud'
      },
      {
        id: 'task4',
        title: 'Aktualizacja harmonogramu dostaw',
        description: 'Zaktualizować harmonogram dostaw na następny miesiąc uwzględniając nowe trasy.',
        assignee: 'user2',
        dueDate: '2025-04-18T00:00:00Z',
        status: 'todo',
        priority: 'medium',
        category: 'Logistics'
      },
      {
        id: 'task5',
        title: 'Szkolenie kierowców',
        description: 'Przygotować materiały szkoleniowe dotyczące bezpiecznej jazdy dla nowych kierowców.',
        assignee: 'user5',
        dueDate: '2025-04-25T00:00:00Z',
        status: 'todo',
        priority: 'low',
        category: 'Training'
      },
      {
        id: 'task6',
        title: 'Raport kosztów operacyjnych',
        description: 'Przygotować raport kosztów operacyjnych za pierwszy kwartał 2025.',
        assignee: 'user3',
        dueDate: '2025-04-10T00:00:00Z',
        status: 'review',
        priority: 'high',
        category: 'Finance'
      },
      {
        id: 'task7',
        title: 'Optymalizacja tras',
        description: 'Przeprowadzić analizę i optymalizację tras dla regionu południowego.',
        assignee: 'user1',
        dueDate: '2025-04-22T00:00:00Z',
        status: 'in_progress',
        priority: 'medium',
        category: 'Optimization'
      },
      {
        id: 'task8',
        title: 'Aktualizacja dokumentacji pojazdów',
        description: 'Zaktualizować dokumentację techniczną dla nowo zakupionych pojazdów.',
        assignee: 'user4',
        dueDate: '2025-04-17T00:00:00Z',
        status: 'done',
        priority: 'medium',
        category: 'Documentation'
      },
      {
        id: 'task9',
        title: 'Integracja z nowym systemem GPS',
        description: 'Przeprowadzić integrację floty z nowym systemem GPS.',
        assignee: 'user5',
        dueDate: '2025-04-30T00:00:00Z',
        status: 'todo',
        priority: 'high',
        category: 'Integration'
      },
      {
        id: 'task10',
        title: 'Przegląd umów z dostawcami',
        description: 'Przeprowadzić przegląd i aktualizację umów z dostawcami paliwa.',
        assignee: 'user2',
        dueDate: '2025-04-28T00:00:00Z',
        status: 'todo',
        priority: 'low',
        category: 'Legal'
      }
    ];
    
    setTasks(sampleTasks);
  }, []);
  
  // Filtrowanie zadań według statusu
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const reviewTasks = tasks.filter(task => task.status === 'review');
  const doneTasks = tasks.filter(task => task.status === 'done');
  
  // Obsługa tworzenia nowego zadania
  const handleCreateTask = async () => {
    try {
      await onTaskCreate(newTask);
      
      // Symulacja dodania zadania do stanu
      const createdTask: Task = {
        ...newTask,
        id: `task${Date.now()}`
      };
      
      setTasks(prev => [...prev, createdTask]);
      setShowCreateModal(false);
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        status: 'todo',
        priority: 'medium',
        category: 'General',
        comments: []
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  // Obsługa aktualizacji zadania
  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await onTaskUpdate(taskId, updates);
      
      // Aktualizacja stanu zadań
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
      
      // Aktualizacja wybranego zadania, jeśli jest otwarte
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // Obsługa dodawania komentarza
  const handleAddComment = async () => {
    if (!selectedTask || !newComment.trim()) return;
    
    try {
      await onCommentAdd(selectedTask.id, newComment);
      
      // Symulacja dodania komentarza do stanu
      const newCommentObj = {
        id: `comment${Date.now()}`,
        author: userId,
        content: newComment,
        timestamp: new Date().toISOString()
      };
      
      // Aktualizacja stanu zadań
      setTasks(prev => 
        prev.map(task => 
          task.id === selectedTask.id 
            ? { 
                ...task, 
                comments: [...(task.comments || []), newCommentObj] 
              } 
            : task
        )
      );
      
      // Aktualizacja wybranego zadania
      setSelectedTask(prev => 
        prev 
          ? { 
              ...prev, 
              comments: [...(prev.comments || []), newCommentObj] 
            } 
          : null
      );
      
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  // Obsługa otwierania szczegółów zadania
  const handleOpenTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Sprawdzanie, czy termin zadania minął
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };
  
  // Renderowanie inicjałów użytkownika
  const renderInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Mapowanie ID użytkownika na nazwę
  const getUserName = (userId: string) => {
    const userMap: Record<string, string> = {
      'user1': 'Jan Kowalski',
      'user2': 'Anna Nowak',
      'user3': 'Piotr Wiśniewski',
      'user4': 'Katarzyna Dąbrowska',
      'user5': 'Michał Lewandowski',
    };
    
    return userMap[userId] || userId;
  };
  
  return (
    <Container>
      <Header>
        <Title>Zarządzanie zadaniami i przepływem pracy</Title>
        <ActionButton onClick={() => setShowCreateModal(true)}>
          Nowe zadanie
        </ActionButton>
      </Header>
      
      <BoardContainer>
        <Column>
          <ColumnHeader status="todo">
            Do zrobienia
            <ColumnCount>{todoTasks.length}</ColumnCount>
          </ColumnHeader>
          <TaskList>
            {todoTasks.map(task => (
              <TaskCard 
                key={task.id} 
                priority={task.priority}
                onClick={() => handleOpenTaskDetails(task)}
              >
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>
                  <TaskAssignee>
                    <AssigneeAvatar>
                      {renderInitials(getUserName(task.assignee))}
                    </AssigneeAvatar>
                    {getUserName(task.assignee)}
                  </TaskAssignee>
                  <TaskDueDate overdue={isOverdue(task.dueDate)}>
                    {formatDate(task.dueDate)}
                  </TaskDueDate>
                </TaskMeta>
              </TaskCard>
            ))}
          </TaskList>
        </Column>
        
        <Column>
          <ColumnHeader status="in_progress">
            W trakcie
            <ColumnCount>{inProgressTasks.length}</ColumnCount>
          </ColumnHeader>
          <TaskList>
            {inProgressTasks.map(task => (
              <TaskCard 
                key={task.id} 
                priority={task.priority}
                onClick={() => handleOpenTaskDetails(task)}
              >
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>
                  <TaskAssignee>
                    <AssigneeAvatar>
                      {renderInitials(getUserName(task.assignee))}
                    </AssigneeAvatar>
                    {getUserName(task.assignee)}
                  </TaskAssignee>
                  <TaskDueDate overdue={isOverdue(task.dueDate)}>
                    {formatDate(task.dueDate)}
                  </TaskDueDate>
                </TaskMeta>
              </TaskCard>
            ))}
          </TaskList>
        </Column>
        
        <Column>
          <ColumnHeader status="review">
            Do przeglądu
            <ColumnCount>{reviewTasks.length}</ColumnCount>
          </ColumnHeader>
          <TaskList>
            {reviewTasks.map(task => (
              <TaskCard 
                key={task.id} 
                priority={task.priority}
                onClick={() => handleOpenTaskDetails(task)}
              >
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>
                  <TaskAssignee>
                    <AssigneeAvatar>
                      {renderInitials(getUserName(task.assignee))}
                    </AssigneeAvatar>
                    {getUserName(task.assignee)}
                  </TaskAssignee>
                  <TaskDueDate overdue={isOverdue(task.dueDate)}>
                    {formatDate(task.dueDate)}
                  </TaskDueDate>
                </TaskMeta>
              </TaskCard>
            ))}
          </TaskList>
        </Column>
        
        <Column>
          <ColumnHeader status="done">
            Zakończone
            <ColumnCount>{doneTasks.length}</ColumnCount>
          </ColumnHeader>
          <TaskList>
            {doneTasks.map(task => (
              <TaskCard 
                key={task.id} 
                priority={task.priority}
                onClick={() => handleOpenTaskDetails(task)}
              >
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>
                  <TaskAssignee>
                    <AssigneeAvatar>
                      {renderInitials(getUserName(task.assignee))}
                    </AssigneeAvatar>
                    {getUserName(task.assignee)}
                  </TaskAssignee>
                  <TaskDueDate overdue={false}>
                    {formatDate(task.dueDate)}
                  </TaskDueDate>
                </TaskMeta>
              </TaskCard>
            ))}
          </TaskList>
        </Column>
      </BoardContainer>
      
      {/* Modal tworzenia zadania */}
      {showCreateModal && (
        <ModalOverlay onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Nowe zadanie</ModalTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <FormLabel>Tytuł</FormLabel>
                <FormInput 
                  type="text" 
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Opis</FormLabel>
                <FormTextarea 
                  value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Przypisane do</FormLabel>
                <FormSelect 
                  value={newTask.assignee}
                  onChange={e => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                >
                  <option value="">Wybierz osobę</option>
                  <option value="user1">Jan Kowalski</option>
                  <option value="user2">Anna Nowak</option>
                  <option value="user3">Piotr Wiśniewski</option>
                  <option value="user4">Katarzyna Dąbrowska</option>
                  <option value="user5">Michał Lewandowski</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Termin</FormLabel>
                <FormInput 
                  type="date" 
                  value={newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : ''}
                  onChange={e => setNewTask(prev => ({ 
                    ...prev, 
                    dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' 
                  }))}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Priorytet</FormLabel>
                <FormSelect 
                  value={newTask.priority}
                  onChange={e => setNewTask(prev => ({ 
                    ...prev, 
                    priority: e.target.value as 'low' | 'medium' | 'high' 
                  }))}
                >
                  <option value="low">Niski</option>
                  <option value="medium">Średni</option>
                  <option value="high">Wysoki</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Kategoria</FormLabel>
                <FormSelect 
                  value={newTask.category}
                  onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="General">Ogólne</option>
                  <option value="Maintenance">Konserwacja</option>
                  <option value="Analytics">Analityka</option>
                  <option value="Fraud">Oszustwa</option>
                  <option value="Logistics">Logistyka</option>
                  <option value="Training">Szkolenia</option>
                  <option value="Finance">Finanse</option>
                  <option value="Optimization">Optymalizacja</option>
                  <option value="Documentation">Dokumentacja</option>
                  <option value="Integration">Integracja</option>
                  <option value="Legal">Prawne</option>
                </FormSelect>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setShowCreateModal(false)}>
                Anuluj
              </CancelButton>
              <SaveButton 
                onClick={handleCreateTask}
                disabled={!newTask.title || !newTask.assignee || !newTask.dueDate}
              >
                Utwórz
              </SaveButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Modal szczegółów zadania */}
      {showTaskDetailModal && selectedTask && (
        <ModalOverlay onClick={() => setShowTaskDetailModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Szczegóły zadania</ModalTitle>
              <CloseButton onClick={() => setShowTaskDetailModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <TaskDetailContainer>
                <TaskDetailHeader>
                  <TaskDetailTitle>{selectedTask.title}</TaskDetailTitle>
                  <TaskDetailStatus status={selectedTask.status}>
                    {selectedTask.status === 'todo' ? 'Do zrobienia' : 
                     selectedTask.status === 'in_progress' ? 'W trakcie' : 
                     selectedTask.status === 'review' ? 'Do przeglądu' : 
                     'Zakończone'}
                  </TaskDetailStatus>
                </TaskDetailHeader>
                
                <TaskDetailDescription>
                  {selectedTask.description}
                </TaskDetailDescription>
                
                <TaskDetailMeta>
                  <MetaItem>
                    <MetaLabel>Przypisane do</MetaLabel>
                    <MetaValue>{getUserName(selectedTask.assignee)}</MetaValue>
                  </MetaItem>
                  
                  <MetaItem>
                    <MetaLabel>Termin</MetaLabel>
                    <MetaValue style={{ color: isOverdue(selectedTask.dueDate) ? '#f44336' : 'inherit' }}>
                      {formatDate(selectedTask.dueDate)}
                    </MetaValue>
                  </MetaItem>
                  
                  <MetaItem>
                    <MetaLabel>Priorytet</MetaLabel>
                    <MetaValue>
                      {selectedTask.priority === 'high' ? 'Wysoki' : 
                       selectedTask.priority === 'medium' ? 'Średni' : 
                       'Niski'}
                    </MetaValue>
                  </MetaItem>
                  
                  <MetaItem>
                    <MetaLabel>Kategoria</MetaLabel>
                    <MetaValue>{selectedTask.category}</MetaValue>
                  </MetaItem>
                </TaskDetailMeta>
                
                <FormGroup>
                  <FormLabel>Status</FormLabel>
                  <FormSelect 
                    value={selectedTask.status}
                    onChange={e => handleUpdateTask(selectedTask.id, { 
                      status: e.target.value as 'todo' | 'in_progress' | 'review' | 'done' 
                    })}
                  >
                    <option value="todo">Do zrobienia</option>
                    <option value="in_progress">W trakcie</option>
                    <option value="review">Do przeglądu</option>
                    <option value="done">Zakończone</option>
                  </FormSelect>
                </FormGroup>
                
                <CommentsSection>
                  <FormLabel>Komentarze</FormLabel>
                  
                  <CommentsList>
                    {selectedTask.comments && selectedTask.comments.length > 0 ? (
                      selectedTask.comments.map(comment => (
                        <CommentItem key={comment.id}>
                          <CommentHeader>
                            <CommentAuthor>{getUserName(comment.author)}</CommentAuthor>
                            <CommentTime>{new Date(comment.timestamp).toLocaleString()}</CommentTime>
                          </CommentHeader>
                          <CommentContent>{comment.content}</CommentContent>
                        </CommentItem>
                      ))
                    ) : (
                      <div>Brak komentarzy</div>
                    )}
                  </CommentsList>
                  
                  <CommentForm>
                    <CommentInput 
                      placeholder="Dodaj komentarz..." 
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                    />
                    <CommentButton 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      Dodaj
                    </CommentButton>
                  </CommentForm>
                </CommentsSection>
              </TaskDetailContainer>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setShowTaskDetailModal(false)}>
                Zamknij
              </CancelButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default WorkflowAutomation;
