import React, { useState } from 'react';
import styled from 'styled-components';
import './IconStyles.css';

const DocumentSearch = ({ 
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
  
  // State for advanced search
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  // State for advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    types: [],
    categories: [],
    statuses: [],
    dateFrom: '',
    dateTo: ''
  });
  
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
  
  // Toggle advanced search
  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  
  // Handle advanced filter change
  const handleAdvancedFilterChange = (filterType, value) => {
    if (filterType === 'types' || filterType === 'categories' || filterType === 'statuses') {
      // For multi-select filters
      const currentValues = [...advancedFilters[filterType]];
      const valueIndex = currentValues.indexOf(value);
      
      if (valueIndex === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(valueIndex, 1);
      }
      
      setAdvancedFilters({
        ...advancedFilters,
        [filterType]: currentValues
      });
    } else {
      // For date filters
      setAdvancedFilters({
        ...advancedFilters,
        [filterType]: value
      });
    }
  };
  
  // Apply advanced filters
  const applyAdvancedFilters = () => {
    // Here we would call a search API with the advanced filters
    // For now, we'll just update the search term to simulate this
    onFilterChange('search', filters.search);
  };
  
  // Reset advanced filters
  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      types: [],
      categories: [],
      statuses: [],
      dateFrom: '',
      dateTo: ''
    });
  };
  
  // Render loading state
  if (isLoading) {
    return <LoadingMessage>Searching documents...</LoadingMessage>;
  }
  
  // Render error state
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  return (
    <Container>
      <Header>
        <Title>Document Search</Title>
      </Header>
      
      <SearchSection>
        <MainSearchContainer>
          <SearchIcon>
            <span className="icon icon-search"></span>
          </SearchIcon>
          <MainSearchInput 
            type="text" 
            placeholder="Search all documents..." 
            value={filters.search} 
            onChange={handleSearchChange}
          />
          <AdvancedSearchToggle onClick={toggleAdvancedSearch}>
            {showAdvancedSearch ? 'Hide Advanced' : 'Advanced Search'}
          </AdvancedSearchToggle>
        </MainSearchContainer>
        
        {showAdvancedSearch && (
          <AdvancedSearchContainer>
            <AdvancedSearchSection>
              <SectionTitle>Document Type</SectionTitle>
              <CheckboxGroup>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="type-vehicle" 
                    checked={advancedFilters.types.includes('vehicle')}
                    onChange={() => handleAdvancedFilterChange('types', 'vehicle')}
                  />
                  <CheckboxLabel htmlFor="type-vehicle">Vehicle</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="type-driver" 
                    checked={advancedFilters.types.includes('driver')}
                    onChange={() => handleAdvancedFilterChange('types', 'driver')}
                  />
                  <CheckboxLabel htmlFor="type-driver">Driver</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="type-operational" 
                    checked={advancedFilters.types.includes('operational')}
                    onChange={() => handleAdvancedFilterChange('types', 'operational')}
                  />
                  <CheckboxLabel htmlFor="type-operational">Operational</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="type-compliance" 
                    checked={advancedFilters.types.includes('compliance')}
                    onChange={() => handleAdvancedFilterChange('types', 'compliance')}
                  />
                  <CheckboxLabel htmlFor="type-compliance">Compliance</CheckboxLabel>
                </CheckboxItem>
              </CheckboxGroup>
            </AdvancedSearchSection>
            
            <AdvancedSearchSection>
              <SectionTitle>Categories</SectionTitle>
              <CheckboxGroup>
                {categories.slice(0, 8).map(category => (
                  <CheckboxItem key={category.id}>
                    <Checkbox 
                      type="checkbox" 
                      id={`category-${category.code}`} 
                      checked={advancedFilters.categories.includes(category.code)}
                      onChange={() => handleAdvancedFilterChange('categories', category.code)}
                    />
                    <CheckboxLabel htmlFor={`category-${category.code}`}>{category.name}</CheckboxLabel>
                  </CheckboxItem>
                ))}
                {categories.length > 8 && (
                  <MoreLink>+ {categories.length - 8} more categories</MoreLink>
                )}
              </CheckboxGroup>
            </AdvancedSearchSection>
            
            <AdvancedSearchSection>
              <SectionTitle>Status</SectionTitle>
              <CheckboxGroup>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="status-active" 
                    checked={advancedFilters.statuses.includes('active')}
                    onChange={() => handleAdvancedFilterChange('statuses', 'active')}
                  />
                  <CheckboxLabel htmlFor="status-active">Active</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="status-expired" 
                    checked={advancedFilters.statuses.includes('expired')}
                    onChange={() => handleAdvancedFilterChange('statuses', 'expired')}
                  />
                  <CheckboxLabel htmlFor="status-expired">Expired</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="status-pending" 
                    checked={advancedFilters.statuses.includes('pending')}
                    onChange={() => handleAdvancedFilterChange('statuses', 'pending')}
                  />
                  <CheckboxLabel htmlFor="status-pending">Pending</CheckboxLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox 
                    type="checkbox" 
                    id="status-archived" 
                    checked={advancedFilters.statuses.includes('archived')}
                    onChange={() => handleAdvancedFilterChange('statuses', 'archived')}
                  />
                  <CheckboxLabel htmlFor="status-archived">Archived</CheckboxLabel>
                </CheckboxItem>
              </CheckboxGroup>
            </AdvancedSearchSection>
            
            <AdvancedSearchSection>
              <SectionTitle>Date Range</SectionTitle>
              <DateRangeContainer>
                <DateInput>
                  <DateLabel>From:</DateLabel>
                  <DateField 
                    type="date" 
                    value={advancedFilters.dateFrom}
                    onChange={(e) => handleAdvancedFilterChange('dateFrom', e.target.value)}
                  />
                </DateInput>
                <DateInput>
                  <DateLabel>To:</DateLabel>
                  <DateField 
                    type="date" 
                    value={advancedFilters.dateTo}
                    onChange={(e) => handleAdvancedFilterChange('dateTo', e.target.value)}
                  />
                </DateInput>
              </DateRangeContainer>
            </AdvancedSearchSection>
            
            <AdvancedSearchActions>
              <SecondaryButton onClick={resetAdvancedFilters}>
                Reset Filters
              </SecondaryButton>
              <PrimaryButton onClick={applyAdvancedFilters}>
                Apply Filters
              </PrimaryButton>
            </AdvancedSearchActions>
          </AdvancedSearchContainer>
        )}
      </SearchSection>
      
      {documents.length > 0 ? (
        <>
          <ResultsHeader>
            <ResultsCount>
              Found {pagination.total} documents matching your search
            </ResultsCount>
            <ResultsActions>
              <SecondaryButton>
                <span className="icon icon-download"></span> Export Results
              </SecondaryButton>
            </ResultsActions>
          </ResultsHeader>
          
          <DocumentsGrid>
            {documents.map(document => (
              <DocumentCard key={document.id}>
                <DocumentCardHeader>
                  <DocumentTypeLabel type={document.type}>
                    {document.type}
                  </DocumentTypeLabel>
                  <DocumentCardActions>
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
                  </DocumentCardActions>
                </DocumentCardHeader>
                
                <DocumentIcon>
                  <span className="icon icon-file"></span>
                </DocumentIcon>
                
                <DocumentCardContent>
                  <DocumentName>{document.name}</DocumentName>
                  <DocumentCategory>
                    {categories.find(cat => cat.code === document.category)?.name || document.category}
                  </DocumentCategory>
                  
                  <DocumentDetails>
                    {document.vehiclePlate && (
                      <DocumentDetail>
                        <DetailLabel>Vehicle:</DetailLabel>
                        <DetailValue>{document.vehiclePlate}</DetailValue>
                      </DocumentDetail>
                    )}
                    
                    {document.driverName && (
                      <DocumentDetail>
                        <DetailLabel>Driver:</DetailLabel>
                        <DetailValue>{document.driverName}</DetailValue>
                      </DocumentDetail>
                    )}
                    
                    <DocumentDetail>
                      <DetailLabel>Issue Date:</DetailLabel>
                      <DetailValue>{new Date(document.issueDate).toLocaleDateString()}</DetailValue>
                    </DocumentDetail>
                    
                    {document.expiryDate && (
                      <DocumentDetail>
                        <DetailLabel>Expiry Date:</DetailLabel>
                        <DetailValue isExpiring={new Date(document.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}>
                          {new Date(document.expiryDate).toLocaleDateString()}
                        </DetailValue>
                      </DocumentDetail>
                    )}
                  </DocumentDetails>
                  
                  <DocumentFooter>
                    <StatusBadge status={document.status}>
                      {document.status}
                    </StatusBadge>
                    
                    {document.tags && document.tags.length > 0 && (
                      <TagsContainer>
                        {document.tags.slice(0, 2).map((tag, index) => (
                          <Tag key={index}>{tag}</Tag>
                        ))}
                        {document.tags.length > 2 && (
                          <Tag>+{document.tags.length - 2}</Tag>
                        )}
                      </TagsContainer>
                    )}
                  </DocumentFooter>
                </DocumentCardContent>
              </DocumentCard>
            ))}
          </DocumentsGrid>
          
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
          No documents found matching your search criteria. Try adjusting your filters or search terms.
        </EmptyMessage>
      )}
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

const SearchSection = styled.div`
  margin-bottom: 20px;
`;

const MainSearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  color: #666;
`;

const MainSearchInput = styled.input`
  flex: 1;
  padding: 12px 15px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  }
`;

const AdvancedSearchToggle = styled.button`
  background: none;
  border: none;
  color: #2196f3;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdvancedSearchContainer = styled.div`
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const AdvancedSearchSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 10px 0;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const MoreLink = styled.div`
  font-size: 12px;
  color: #2196f3;
  cursor: pointer;
  margin-top: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const DateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DateLabel = styled.label`
  font-size: 12px;
  color: #666;
`;

const DateField = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const AdvancedSearchActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const PrimaryButton = styled.button`
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

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: #666;
`;

const ResultsActions = styled.div`
  display: flex;
  gap: 10px;
`;

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const DocumentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const DocumentCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
`;

const DocumentTypeLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.type) {
      case 'vehicle':
        return `color: #2196f3;`;
      case 'driver':
        return `color: #4caf50;`;
      case 'operational':
        return `color: #ff9800;`;
      case 'compliance':
        return `color: #9c27b0;`;
      default:
        return `color: #666;`;
    }
  }}
`;

const DocumentCardActions = styled.div`
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

const DocumentIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 20px auto;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 50%;
  font-size: 24px;
`;

const DocumentCardContent = styled.div`
  padding: 0 15px 15px;
`;

const DocumentName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
  text-align: center;
`;

const DocumentCategory = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  text-align: center;
`;

const DocumentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const DocumentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: ${props => props.isExpiring ? '#d32f2f' : '#333'};
  font-weight: ${props => props.isExpiring ? '600' : 'normal'};
`;

const DocumentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const TagsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 6px;
  background-color: #e3f2fd;
  color: #2196f3;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
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

export default DocumentSearch;
