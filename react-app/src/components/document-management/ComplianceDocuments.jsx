import React, { useState } from 'react';
import styled from 'styled-components';
import './IconStyles.css';

const ComplianceDocuments = ({ 
  documents, 
  categories, 
  pagination, 
  filters, 
  isLoading, 
  error, 
  onFilterChange 
}) => {
  // State for document actions
  const [activeDocument, setActiveDocument] = useState(null);
  
  // State for upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    onFilterChange('category', e.target.value);
  };
  
  // Handle status filter change
  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };
  
  // Handle pagination change
  const handlePageChange = (page) => {
    onFilterChange('page', page);
  };
  
  // Toggle document actions menu
  const toggleDocumentActions = (documentId) => {
    setActiveDocument(activeDocument === documentId ? null : documentId);
  };
  
  // Render loading state
  if (isLoading) {
    return <LoadingMessage>Loading compliance documents...</LoadingMessage>;
  }
  
  // Render error state
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  return (
    <Container>
      <Header>
        <Title>Compliance Documents</Title>
        <Actions>
          <Button onClick={() => setShowUploadModal(true)}>
            <span className="icon icon-plus"></span> Upload Document
          </Button>
        </Actions>
      </Header>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Category:</FilterLabel>
          <FilterSelect value={filters.category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.code}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Status:</FilterLabel>
          <FilterSelect value={filters.status} onChange={handleStatusChange}>
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </FilterSelect>
        </FilterGroup>
        
        <SearchContainer>
          <SearchIcon>
            <span className="icon icon-search"></span>
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search compliance documents..." 
            value={filters.search} 
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </FiltersContainer>
      
      {documents.length > 0 ? (
        <>
          <DocumentsTable>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(document => {
                // Find category to determine if document is required for compliance
                const category = categories.find(cat => cat.code === document.category);
                const isRequired = category ? category.requiredForCompliance : false;
                
                return (
                  <tr key={document.id}>
                    <td>
                      <DocumentName>
                        <DocumentIcon>
                          <span className="icon icon-file"></span>
                        </DocumentIcon>
                        {document.name}
                      </DocumentName>
                    </td>
                    <td>
                      {category?.name || document.category}
                    </td>
                    <td>{new Date(document.issueDate).toLocaleDateString()}</td>
                    <td>
                      {document.expiryDate ? (
                        <ExpiryDate isExpiring={new Date(document.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}>
                          {new Date(document.expiryDate).toLocaleDateString()}
                        </ExpiryDate>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>
                      <StatusBadge status={document.status}>
                        {document.status}
                      </StatusBadge>
                    </td>
                    <td>
                      <RequiredBadge required={isRequired}>
                        {isRequired ? 'Required' : 'Optional'}
                      </RequiredBadge>
                    </td>
                    <td>
                      <ActionsContainer>
                        <ActionButton onClick={() => toggleDocumentActions(document.id)}>
                          <span className="icon icon-ellipsis-v"></span>
                        </ActionButton>
                        
                        {activeDocument === document.id && (
                          <ActionsMenu>
                            <ActionMenuItem>
                              <span className="icon icon-download"></span> Download
                            </ActionMenuItem>
                            <ActionMenuItem>
                              <span className="icon icon-search"></span> View Details
                            </ActionMenuItem>
                            <ActionMenuItem>
                              <span className="icon icon-plus"></span> Set Reminder
                            </ActionMenuItem>
                          </ActionsMenu>
                        )}
                      </ActionsContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </DocumentsTable>
          
          <PaginationContainer>
            <PaginationInfo>
              Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} documents
            </PaginationInfo>
            <PaginationButtons>
              <PaginationButton 
                disabled={pagination.page === 1} 
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </PaginationButton>
              
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNumber = pagination.page <= 3 
                  ? i + 1 
                  : pagination.page + i - 2;
                
                if (pageNumber > 0 && pageNumber <= pagination.pages) {
                  return (
                    <PaginationButton 
                      key={pageNumber}
                      active={pageNumber === pagination.page}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationButton>
                  );
                }
                return null;
              })}
              
              <PaginationButton 
                disabled={pagination.page === pagination.pages} 
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </PaginationButton>
            </PaginationButtons>
          </PaginationContainer>
        </>
      ) : (
        <EmptyMessage>
          No compliance documents found. Try adjusting your filters or upload a new document.
        </EmptyMessage>
      )}
      
      {/* Upload Modal would be implemented here */}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
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

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: white;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const DocumentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    background-color: #f9f9f9;
  }
  
  td {
    font-size: 14px;
    color: #333;
  }
  
  tbody tr:hover {
    background-color: #f5f7fa;
  }
`;

const DocumentName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DocumentIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 4px;
  font-size: 16px;
`;

const ExpiryDate = styled.span`
  color: ${props => props.isExpiring ? '#d32f2f' : 'inherit'};
  font-weight: ${props => props.isExpiring ? '600' : 'normal'};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background-color: #e8f5e9;
          color: #4caf50;
        `;
      case 'expired':
        return `
          background-color: #ffebee;
          color: #d32f2f;
        `;
      case 'pending':
        return `
          background-color: #fff8e1;
          color: #ffc107;
        `;
      case 'archived':
        return `
          background-color: #f5f5f5;
          color: #9e9e9e;
        `;
      default:
        return `
          background-color: #e3f2fd;
          color: #2196f3;
        `;
    }
  }}
`;

const RequiredBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => props.required ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.required ? '#4caf50' : '#9e9e9e'};
`;

const ActionsContainer = styled.div`
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

const ActionsMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  overflow: hidden;
`;

const ActionMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f7fa;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const PaginationButton = styled.button`
  background-color: ${props => props.active ? '#2196f3' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#2196f3' : '#ddd'};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover {
    background-color: ${props => props.active ? '#1e88e5' : '#f5f5f5'};
  }
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

export default ComplianceDocuments;
