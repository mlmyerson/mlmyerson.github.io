import './App.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function App() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div className='layout'>
        <div className='about'>
          <h1>About Me</h1>
        </div>
        <div className='portrait'>
          <h1>Portrait</h1>
        </div>
        <div className='successes'>
          <h1>Successes</h1>
        </div>
        <div className='carousel'>
          <Carousel responsive={responsive}>
            <div className="carousel-card">
              <Card variant="outlined" raised={true}>
                <CardContent>
                  <div className='card-title'>
                    Card 1
                  </div>
                  <img src="/src/assets/react.svg" alt="React logo" className="card-image" />
                  <div className='card-description'>
                    Description
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="carousel-card">
              <Card variant="outlined" raised={true}>
                <CardContent>
                  <div className='card-title'>
                    Card 2
                  </div>
                  <img src="/src/assets/react.svg" alt="React logo" className="card-image" />
                  <div className='card-description'>
                    Description
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="carousel-card">
              <Card variant="outlined" raised={true}>
                <CardContent>
                  <div className='card-title'>
                    Card 3
                  </div>
                  <img src="/src/assets/react.svg" alt="React logo" className="card-image" />
                  <div className='card-description'>
                    Description
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="carousel-card">
              <Card variant="outlined" raised={true}>
                <CardContent>
                  <div className='card-title'>
                    Card 4
                  </div>
                  <img src="/src/assets/react.svg" alt="React logo" className="card-image" />
                  <div className='card-description'>
                    Description
                  </div>
                </CardContent>
              </Card>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default App
