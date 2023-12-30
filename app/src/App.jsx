import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Components/SearchResult/SearchResult";

export const BASE_URl = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filterData,setFilterData] = useState(null);
  const [loading,setLoading] = useState(false); //! Set The Loading when the network request not perform then we show the loading state
  const [error,setError] = useState(null);
  const [selectedBtn,setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async() => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URl);
          
        const json = await response.json();

        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data!");
      }
    };
    fetchFoodData();
  }, []);

  console.log(data);

  //! This is for reference of the data - which type of data are retrieve from the API call
  // const temp = [
  //   {
  //       "name": "Boilded Egg",
  //       "price": 10,
  //       "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //       "image": "/images/egg.png",
  //       "type": "breakfast"
  //   },
  // ]

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn('all');
      return;
    }
    const filteredType = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filteredType);
    setSelectedBtn(type);
  }

  const filterButton = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
  <>
    <Container>
      <TopSection>
        {/* This is the Top Section Navbar Log */}
        <div className="logo">
          <img src="../public/Foody_Zone.svg" alt="Logo" />
        </div>
        {/* This is the Top Section Navbar Filter Buttons */}
        <FilterContainer>
          {filterButton.map((value) => (
            <Button isSelected={selectedBtn === value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
          ))}
        </FilterContainer>
        {/* This is the Top section Navbar Search Section */}
        <div className="search">
          <input onChange={searchFood} type="text" placeholder="Search Food" />
        </div>
      </TopSection>
      <SearchResult data={filterData}/>
    </Container>
  </> 
  );
};

export default App;

export const Container = styled.div`
max-width: 1250px;
margin: 0 auto;`;
const TopSection = styled.section`
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid #FF0909;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 170px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.button`
background: ${({isSelected}) => (isSelected ? "#FF0909" : "#FF4343")};
outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "#FF4343")};
/* background-color: ; */
border-radius: 5px;
padding: 07px 12px;
border: none;
color: white;
cursor: pointer;
&:hover {
  background-color: #ae3333;
}
`;

