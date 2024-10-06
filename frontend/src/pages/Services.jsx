import React, { useState } from 'react';
import "./Services.css"
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselItems = [
        {
            src: '/images/profile3.avif',
            name: 'Sharvari More',
            feedback: 'This Website is very efficient to use Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae consequatur voluptatum sequi dolorem reprehenderit, accusantium impedit soluta dolores pariatur amet esse mollitia asperiores quos natus doloremque ipsa excepturi saepe. Minima id quaerat alias maiores minus.'
        },
        {
            src: '/images/profile1.png',
            name: 'Ajinkya Patil',
            feedback: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam nostrum, cumque, et sunt iure corporis eveniet quasi odit corrupti soluta molestiae? Laboriosam laborum omnis rem error necessitatibus eveniet quasi? Totam dicta porro doloremque perferendis sed qui recusandae dolore voluptate blanditiis illo! Nihil corporis autem nulla atque qui, non culpa nostrum eos delectus, laudantium maxime eaque dolorem ut deleniti mollitia. Iure, vero cum quis veniam cumque voluptates inventore ea illum itaque?'
        },
        {
            src: '/images/profile3.avif',
            name: 'Arya Madhavi',
            feedback: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus officia eos suscipit nam sequi, obcaecati praesentium necessitatibus reiciendis, quas dolor ab nobis exercitationem saepe maiores voluptatum minus quos fugit iure molestias. Numquam, officia repudiandae nisi sit modi quas maxime, nesciunt odit voluptate explicabo enim, molestias omnis ratione ad saepe assumenda voluptatem iste inventore aliquid a adipisci ipsa id consequatur? Omnis odit, voluptas animi cupiditate vitae accusamus libero nulla ex? Aspernatur aut tempora libero ea labore omnis voluptatibus at non eos quibusdam temporibus sit maiores quae repudiandae fugit, commodi quis voluptates doloremque optio impedit culpa? Voluptatem reiciendis dolore dolores hic officiis!'
        },
        {
            src: '/images/profile4.png',
            name: 'Yash Rahate',
            feedback: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus officia eos suscipit nam sequi, obcaecati praesentium necessitatibus reiciendis, quas dolor ab nobis exercitationem saepe maiores voluptatum minus quos fugit iure molestias. Numquam, officia repudiandae nisi sit modi quas maxime, nesciunt odit voluptate explicabo enim, molestias omnis ratione ad saepe assumenda voluptatem iste inventore aliquid a adipisci ipsa id consequatur? Omnis odit, voluptas animi cupiditate vitae accusamus libero nulla ex? Aspernatur aut tempora libero ea labore omnis voluptatibus at non eos quibusdam temporibus sit maiores quae repudiandae fugit, commodi quis voluptates doloremque optio impedit culpa? Voluptatem reiciendis dolore dolores hic officiis!'
        }
    ];

    const showItem = (index) => {
        const carouselSlide = document.querySelector('.carousel-slide');
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-index * 100}%)`;
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) {
            showItem(newIndex);
            setTimeout(() => {
                const carouselSlide = document.querySelector('.carousel-slide');
                carouselSlide.style.transition = 'none';
                setCurrentIndex(0);
                carouselSlide.style.transform = `translateX(0)`;
                setIsTransitioning(false);
            }, 500);
        } else {
            setCurrentIndex(newIndex);
            showItem(newIndex);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            const carouselSlide = document.querySelector('.carousel-slide');
            carouselSlide.style.transition = 'none';
            setCurrentIndex(carouselItems.length - 1);
            carouselSlide.style.transform = `translateX(${-carouselItems.length * 100}%)`;
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                showItem(carouselItems.length - 1);
                setIsTransitioning(false);
            }, 0);
        } else {
            setCurrentIndex(newIndex);
            showItem(newIndex);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };
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
    return (<>
          <Navbar handleLogout={handleLogout} />
        <div>

            

            <div className="svgimg">
                <img src="/images/rangoli.svg" alt="Rangoli" />
                <NavLink to="/appointment" activeclassname="active"><button >BOOK</button></NavLink>
            </div>

            <div className="ourservices">
                <div className="border"></div>
                OUR SERVICES
                <div className="border"></div>
            </div>

            <div className="box">
                <div className="imgbor"></div>
                <img className="img1" src="/images/bridal.png" alt="" />
                <img className="img2" src="/images/mhendi.png" width="400px" alt="" />
                <img className="img3" src="/images/haircolor.png" width="400px" alt="" />
                <img className="img4" src="/images/haircut.png" width="400px" alt="" />
                <img className="img5" src="/images/manicure.png" width="400px" alt="" />
                <div className="t t1">
                <div><b>Bridal Makeup</b></div>
                <div>know more</div>
                </div>
                <div className="t t2">
                <div><b>Bridal Mehndi</b></div>
                <div>know more</div>
                </div>
                <div className="t t3">
                <div><b>Hair Color</b></div>
                <div>know more</div>
                </div>
                <div className="t t4">
                <div><b>Hair Cut</b></div>
                <div>know more</div>
                </div>
                <div className="t t5">
                <div><b>Manicure</b></div>
                <div>know more</div>
                </div>
            </div>

            <div className="feedbacks">
                <div className="border"></div>
                FEEDBACKS
                <div className="border"></div>
            </div>

            <div className="carousel">
                <div className="carousel-slide">
                    {carouselItems.map((item, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={item.src} alt={`Image ${index + 1}`} />
                            <div className="carousel-text">
                                <h2>{item.name}</h2>
                                <p>{item.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={handlePrev}>❮</button>
                <button className="next" onClick={handleNext}>❯</button>
            </div>

            <Footer></Footer>
        </div>
    </>
    );
};

export default Services;
