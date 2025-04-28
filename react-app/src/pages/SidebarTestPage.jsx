import React from 'react';
// Removed Router import as it's provided by App.jsx
import styled from 'styled-components';
import SidebarEnhanced from '../components/layout/SidebarEnhanced';

const TestPageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const CardContent = styled.div`
  color: #666;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 8px;
`;

/**
 * Test page for previewing the enhanced sidebar
 */
const SidebarTestPage = () => {
  return (
    <TestPageContainer>
        {/* The enhanced sidebar component */}
        <SidebarEnhanced />
        
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Header>
            <Title>Enhanced Sidebar Preview</Title>
          </Header>
          
          <ContentArea>
            <Card>
              <CardTitle>About This Preview</CardTitle>
              <CardContent>
                This is a test page to preview the enhanced sidebar with improved visual design.
                The sidebar now includes icons, better spacing, visual hierarchy, and interactive effects.
                Try interacting with the sidebar to see the hover effects, animations, and dropdown behavior.
              </CardContent>
            </Card>
            
            <Card>
              <CardTitle>Visual Enhancements</CardTitle>
              <CardContent>
                <FeatureList>
                  <FeatureItem><strong>Icons:</strong> Each menu item now has a relevant icon for better visual recognition.</FeatureItem>
                  <FeatureItem><strong>Improved Hover Effects:</strong> Menu items have subtle animations and transformations on hover.</FeatureItem>
                  <FeatureItem><strong>Visual Hierarchy:</strong> Section dividers and category labels organize the sidebar into logical groups.</FeatureItem>
                  <FeatureItem><strong>Enhanced Typography:</strong> Better font sizing and spacing for improved readability.</FeatureItem>
                  <FeatureItem><strong>Interactive Effects:</strong> Ripple animations on click and smooth transitions for dropdowns.</FeatureItem>
                  <FeatureItem><strong>Improved Spacing:</strong> Better padding and margins for a cleaner look.</FeatureItem>
                  <FeatureItem><strong>Custom Scrollbar:</strong> Subtle custom scrollbar that appears only when needed.</FeatureItem>
                </FeatureList>
              </CardContent>
            </Card>
            
            <Card>
              <CardTitle>Instructions</CardTitle>
              <CardContent>
                <p>Please explore the sidebar by:</p>
                <FeatureList>
                  <FeatureItem>Hovering over menu items to see hover effects</FeatureItem>
                  <FeatureItem>Clicking on dropdown menus to see the animation</FeatureItem>
                  <FeatureItem>Observing the visual hierarchy with section dividers and category labels</FeatureItem>
                  <FeatureItem>Noticing the ripple effect when clicking menu items</FeatureItem>
                </FeatureList>
                <p>This is a preview version. The actual implementation will be integrated with the main application after approval.</p>
              </CardContent>
            </Card>
          </ContentArea>
        </div>
      </TestPageContainer>
  );
};

export default SidebarTestPage;
