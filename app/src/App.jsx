import styled from "styled-components";

const App = () => {
  return <Container>
    <TopSection>
      {/* This is the Top Section Navbar Log */}
      <div className="logo">
        <img src="../public/Foody_Zone.svg" alt="Logo" />
      </div>
      {/* This is the Top section Navbar Search Section */}
      <div className="search">
        <input type="text" placeholder="Search Food" />
      </div>
    </TopSection>
  </Container>
};

export default App;

const Container = styled.div`
max-width: 1250px;
margin: 0 auto;`;
const TopSection = styled.section`
min-height: 90px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;
`;
