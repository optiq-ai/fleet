import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';

const DetailContainer = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  width: 200px;
  color: #666;
`;

const DetailValue = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Component for displaying detailed driver information
 * @param {Object} props - Component props
 * @param {Object} props.driver - Driver data
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} DriverDetails component
 */
const DriverDetails = ({ driver, isLoading }) => {
  if (isLoading) {
    return <LoadingIndicator>Ładowanie szczegółów kierowcy...</LoadingIndicator>;
  }
  
  if (!driver) {
    return <div>Brak danych kierowcy.</div>;
  }
  
  // Fetch driver details from the API
  const driverDetails = driver.details || {
    personalInfo: {
      name: driver.name,
      dateOfBirth: 'Brak danych',
      phoneNumber: 'Brak danych',
      email: 'Brak danych',
      address: 'Brak danych',
      emergencyContact: 'Brak danych'
    },
    employmentInfo: {
      employeeId: 'Brak danych',
      hireDate: 'Brak danych',
      position: 'Brak danych',
      department: 'Brak danych',
      supervisor: 'Brak danych',
      contractType: 'Brak danych',
      workSchedule: 'Brak danych'
    },
    qualifications: {
      licenseNumber: driver.licenseNumber,
      licenseType: 'Brak danych',
      licenseIssueDate: 'Brak danych',
      licenseExpiryDate: 'Brak danych',
      additionalCertificates: []
    }
  };
  
  return (
    <Card>
      <SectionTitle>Szczegóły kierowcy: {driver.name}</SectionTitle>
      
      <GridSection>
        <DetailContainer>
          <DetailTitle>Informacje osobowe</DetailTitle>
          <DetailRow>
            <DetailLabel>Imię i nazwisko</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.name}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Data urodzenia</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.dateOfBirth}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Telefon</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.phoneNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.email}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Adres</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Kontakt awaryjny</DetailLabel>
            <DetailValue>{driverDetails.personalInfo.emergencyContact}</DetailValue>
          </DetailRow>
        </DetailContainer>
        
        <DetailContainer>
          <DetailTitle>Informacje o zatrudnieniu</DetailTitle>
          <DetailRow>
            <DetailLabel>ID pracownika</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.employeeId}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Data zatrudnienia</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.hireDate}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Stanowisko</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.position}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Dział</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.department}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Przełożony</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.supervisor}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Typ umowy</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.contractType}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Harmonogram pracy</DetailLabel>
            <DetailValue>{driverDetails.employmentInfo.workSchedule}</DetailValue>
          </DetailRow>
        </DetailContainer>
      </GridSection>
      
      <DetailContainer>
        <DetailTitle>Kwalifikacje</DetailTitle>
        <DetailRow>
          <DetailLabel>Numer prawa jazdy</DetailLabel>
          <DetailValue>{driverDetails.qualifications.licenseNumber}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Kategoria</DetailLabel>
          <DetailValue>{driverDetails.qualifications.licenseType}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Data wydania</DetailLabel>
          <DetailValue>{driverDetails.qualifications.licenseIssueDate}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Data ważności</DetailLabel>
          <DetailValue>{driverDetails.qualifications.licenseExpiryDate}</DetailValue>
        </DetailRow>
        
        {driverDetails.qualifications.additionalCertificates && driverDetails.qualifications.additionalCertificates.length > 0 && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Dodatkowe certyfikaty</DetailTitle>
            {driverDetails.qualifications.additionalCertificates.map((cert, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <DetailRow>
                  <DetailLabel>Nazwa</DetailLabel>
                  <DetailValue>{cert.name}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Data wydania</DetailLabel>
                  <DetailValue>{cert.issueDate}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Data ważności</DetailLabel>
                  <DetailValue>{cert.expiryDate}</DetailValue>
                </DetailRow>
              </div>
            ))}
          </>
        )}
      </DetailContainer>
    </Card>
  );
};

export default DriverDetails;
