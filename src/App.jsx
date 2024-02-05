
import { useEffect, useState, useRef } from 'react'
import './App.css'
import useFetch from './components/hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  
  }, [finder]);
  
  const textInput = useRef();
  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }
  
  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPages = location && Math.floor(location.residents.length / quantity)+1;
  return (
      <div className='app'>
        {
          isLoading ? 
            <h2>Loading</h2>
          :
          <>
            <img className='app__img-header' src="https://cdn.europosters.eu/image/hp/66133.jpg" alt="headerrm" />
            <h1> Rick and Morty App</h1>
            <form onSubmit={handleSubmit} className='app__form'>
              <input 
                className='app__text'
                type="number" 
                ref={textInput} 
                placeholder='Type a Number 1 to 126'
              />
              <button className='app__btn'>Search</button>
            </form>
            {
              hasError || finder=='0' ? 
                <h2>This location do NOT exist</h2>
                :
                <> 
                  <LocationCard 
                    location={location}
                  />
                   <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                  <div className='app__container'>
                    {
                      residentsPart.map(resident => (
                        <ResidentCard  
                          key={resident}
                          url={resident}
                        />
                      ))
                    }
                  </div>
                  <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </>
            }
          </>
        }
     </div>
    
  )
}

export default App;
