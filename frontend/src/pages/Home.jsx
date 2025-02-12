import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from "react-router-dom";
import "./Home.css"
import sports from '../assets/1.png';
import cook from '../assets/6.png';
import craft from '../assets/2.png';
import music from '../assets/5.png';
import img from '../assets/icon.png';



import productImage from '../assets/3.png';
import ladyImage from '../assets/4.png';

const ImageCarousel = () => {
    const slides = [
      {
        image: ladyImage,
        title: 'HOBBY HIVE',
        subtitle: 'Welcome to',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        buttonText: 'Buy Hobby Kits',
        link: '/shop',  // Navigation link for this slide
      },
      {
        image: productImage,
        title: 'HOBBY HIVE',
        subtitle: 'Welcome to',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        buttonText: 'Buy Hobby Kits',
        link: '/shop',  // Navigation link for this slide
      },
    ];
  
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); // Automatically switch slides every 5 seconds
  
      return () => clearInterval(interval); // Clean up on unmount
    }, [slides.length]);
  
    const handlePrevClick = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };
  
    const handleNextClick = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
  
    return (
      <div className="home-carousel">
        <div className="home-carousel-slide" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
          <div className="home-carousel-content">
            <h3>{slides[currentSlide].subtitle}</h3>
            <h1>{slides[currentSlide].title}</h1>
            <p>{slides[currentSlide].description}</p>
            <NavLink to={slides[currentSlide].link} className="home-carousel-btn">
              {slides[currentSlide].buttonText}
            </NavLink>
          </div>
        </div>
  
        <button className="home-carousel-control prev" onClick={handlePrevClick}>
          &#10094;
        </button>
        <button className="home-carousel-control next" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    );
  };




  const Services = () => {
    const services = [
      { name: "Craft", image: craft },
      { name: "Sports", image: sports },
      { name: "Music", image: music },
      { name: "Cooking", image: cook },
    ];
  
    return (
      <section id="services" className="services-section">
        <h2>Unleash Your Creativity with Premium Hobby Kits!</h2>
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.name} />
              <h3>{service.name}</h3>
              <button id="btn">Buy Now</button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  // VideoSection component
const VideoSection = () => {
    return (
      <section className="video-section">
        <div className="video-content">
          <h2 className="video-title">Find a New Hobby</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/yW3ORzaRXt8?si=LmqNS8HtIm0CuKaK"
              title="Makeup Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        </div>
      </section>
    );
  };
  // Testimonials component
const Testimonials = () => {
    const testimonials = [
      { name: "Arya", 
        text: "I recently joined Hobby Hive, and the experience has been fantastic. The platform offers a wide range of hobbies to explore, and everything is so easy to navigate. The community is welcoming, and I love how I can connect with others who share my interests. It's a great way to learn new skills while having fun!", image: img },
      { name: "Sharvari", text: "I recently joined Hobby Hive, and the experience has been fantastic. The platform offers a wide range of hobbies to explore, and everything is so easy to navigate. The community is welcoming, and I love how I can connect with others who share my interests. It's a great way to learn new skills while having fun!",  image: img },
      { name: "Artha", text: "I recently joined Hobby Hive, and the experience has been fantastic. The platform offers a wide range of hobbies to explore, and everything is so easy to navigate. The community is welcoming, and I love how I can connect with others who share my interests. It's a great way to learn new skills while having fun!",  image: img },
    ];
  
    return (
      <section id="testimonials" className="testimonials-section">
        <h2>Testimonials</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} />
              <p>{testimonial.text}</p>
              <h3>{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  };


function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');

  
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const navigate = useNavigate();

    const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInEmail');
      handleSuccess('User Logged out');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:3000/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <Navbar handleLogout={handleLogout} />
            {/* <h1>Welcome {loggedInUser}</h1> */}
            {/* <button className='logoutbtn' onClick={handleLogout}>Logout</button> */}

            <ImageCarousel />
            <Services />
            <VideoSection />
            <Testimonials />

        

            <Footer></Footer>

            <ToastContainer />
        </div>
    )
}

export default Home