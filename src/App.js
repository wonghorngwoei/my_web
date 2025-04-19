import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <div className="ai-theme">
      {/* Futuristic Header with Particle Background */}
      <header className="particle-header">
      <Canvas className="particle-canvas">
        <OrbitControls enableZoom={false} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      
      <motion.div 
        className="header-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="name-container">
          <h1 className="neon-text">Wong Horng Woei</h1>
          <p className="glow-text">AI Fresh Graduate | Coffee & Travel Enthusiast</p>
        </div>
        
        
        <motion.div className="tab-switcher-container">
          <motion.div className="tab-switcher">
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={activeTab === 'portfolio' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('travel')}
              className={activeTab === 'travel' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Travel Stories
            </button>
            {/* Add this new button */}
            <button 
              onClick={() => setActiveTab('hobbies')}
              className={activeTab === 'hobbies' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hobbies
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' ? (
            <PortfolioSection key="portfolio" />
          ) : activeTab === 'travel' ? (
            <TravelSection key="travel" />
          ) : (
            <HobbiesSection key="hobbies" />
          )}
        </AnimatePresence>
      </main>

      {/* Futuristic Footer */}
      <footer className="neon-footer" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="footer-content"
        >
          <div className="social-links">
            <a href="https://github.com/wonghorngwoei" target="_blank" rel="noopener noreferrer"><FiGithub className="icon" /></a>
            <a href="https://www.linkedin.com/in/wonghorngwoei/" target="_blank" rel="noopener noreferrer"><FiLinkedin className="icon" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FiGlobe className="icon" /></a>
          </div>
          <p>© {new Date().getFullYear()} | Built with DeepSeek, Designed & Perfected by Wong Horng Woei</p>
          <div className="circuit-line"></div>
        </motion.div>
      </footer>
    </div>
  );
}

// Portfolio Section Component
function PortfolioSection() {
  const projects = [
    {
      id: 1,
      title: "Lifestyle Disease Prediction Management System (Final Year Project)",
      description: "A web-based Lifestyle Disease Prediction and Management System using Python, scikit-learn, Flask, and MySQL to analyze user lifestyle data and predict risks for diabetes, stroke, and asthma, providing personalized health recommendations.",
      tags: ["Python", "XGBoost", "Flask", "MySQL", "Machine Learning"],
      image: process.env.PUBLIC_URL + "/images/FYP.png",
      github: "https://github.com/wonghorngwoei/FYP_TP055241"
    },
    {
      id: 2,
      title: " Web-based Car Sales System",
      description: "A web-based Car Sales System using Java, MySQL, and Bootstrap, featuring user management, transaction tracking, and interactive reporting to automate inventory and sales processes for improved operational efficiency.",
      tags: ["JAVA", "MySQL", "Bootstrap Framework"],
      image: process.env.PUBLIC_URL + "/images/CarSalesSys.png",
      github: "https://github.com/wonghorngwoei/CarSalesSystem"
    },
    {
      id: 3,
      title: "Glove Defect Detection System",
      description: "MATLAB-based Glove Defect Detection System using image processing techniques, including morphological operations and thresholding, to accurately identify defects with bounding boxes, gaining practical experience in computer vision and pattern recognition.",
      tags: ["MATLAB", "Computer Vision", "Pattern Recognition"],
      image: process.env.PUBLIC_URL + "/images/GlovePic.png",
      github: "https://github.com/wonghorngwoei/GloveDetectionSystem"
    },
    {
      id: 4,
      title: "Heart Disease Classification System",
      description: "A machine learning-based system developed using Python to predict whether a patient has heart disease based on clinical data. This project explores multiple classification models, performs rigorous data preprocessing, and evaluates the effectiveness of each approach using industry-standard metrics.",
      tags: ["Jupyter Notebook", "Machine Learning", "Random Forest", "SVM", "Logistic Regression"],
      image: process.env.PUBLIC_URL + "/images/FAI.png",
      github: "https://github.com/wonghorngwoei/FurtherAI"
    },
    {
      id: 5,
      title: "Employee Attrition Analysis in R",
      description: "An in-depth HR analytics project using R programming to uncover insights about employee attrition, retirement, layoffs, and gender balance across departments and stores in British Columbia, Canada. The project uses real employee datasets to explore patterns, visualize results, and provide actionable recommendations to HR.",
      tags: ["R", "Data Analysis", "RStudio"],
      image: process.env.PUBLIC_URL + "/images/PFDA.png",
      github: "https://github.com/wonghorngwoei/PFDA"
    },
    {
      id: 6,
      title: "McDonald Location Finder with LLM Chatbot",
      description: "A comprehensive system to locate McDonald's outlets in Kuala Lumpur, Malaysia with AI-powered store information queries.",
      tags: ["React.JS", "Python", "SQLite", "LLM", "FastAPI"],
      image: process.env.PUBLIC_URL + "/images/McD.png",
      github: "https://github.com/wonghorngwoei/McDonald_Location_with_LLMChatbot"
    },
    ];

    // Pagination state
    const [visibleProjects, setVisibleProjects] = useState(6); // Initial number to show
    const projectsPerLoad = 3; // Number to add each time

    const loadMore = () => {
      setVisibleProjects(prev => prev + projectsPerLoad);
    };

    return (
      <section className="portfolio-section">
        <motion.h2 className="section-title">
          My <span className="highlight">Projects</span>
        </motion.h2>
        
        <div className="projects-grid">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {visibleProjects < projects.length && (
          <motion.div 
            className="load-more-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={loadMore}
              className="load-more-button"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Projects
              <div className="button-arrow">→</div>
            </button>
          </motion.div>
        )}
      </section>
    );
  }

  // Extracted Project Card Component for better organization
  const ProjectCard = ({ project, index }) => {

    const projectLinks = {
      1: "https://github.com/wonghorngwoei/FYP_TP055241",
      2: "https://github.com/wonghorngwoei/CarSalesSystem",
      3: "https://github.com/wonghorngwoei/GloveDetectionSystem",
      4: "https://github.com/wonghorngwoei/FurtherAI",
      5: "https://github.com/wonghorngwoei/PFDA",
      6: "https://github.com/wonghorngwoei/McDonald_Location_with_LLMChatbot"
    };

    return (
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
          y: -10, 
          boxShadow: "0 10px 20px rgba(0, 255, 255, 0.3)"
        }}
      >
        <a 
        href={projectLinks[project.id]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="project-link"
        >
          <div className="project-image-container">
            <img 
              src={project.image} 
              alt={project.title}
              className="project-image"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400/0a0a20/00ffff?text=Project+Image';
              }}
            />
            
            {/* Default State (Title + Tags) */}
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            {/* Hover State (Description Only) */}
            <div className="project-description-overlay">
              <p className="project-description">{project.description}</p>
              <div className="github-link">
              <FiGithub className="github-icon" />
              <span>View on GitHub</span>
            </div>
            </div>
          </div>
        </a>
      </motion.div>
    );
  };

// Travel Section Component
function TravelSection() {
  const stories = [
    {
      id: 1,
      title: "Study Abroad Adventure",
      location: "Japan",
      date: "Spring 2024 - Spring 2025",
      description: "Learning Japanese, Travel, and Exploring New Opportunities",
      images: [
        process.env.PUBLIC_URL + "/images/no1.jpeg",
        process.env.PUBLIC_URL + "/images/no2.jpeg",
        process.env.PUBLIC_URL + "/images/no3.jpeg",
        process.env.PUBLIC_URL + "/images/no4.jpeg",
        process.env.PUBLIC_URL + "/images/no5.jpeg",
        process.env.PUBLIC_URL + "/images/no6.jpeg",
        process.env.PUBLIC_URL + "/images/no7.jpeg",
        process.env.PUBLIC_URL + "/images/no8.jpeg",
        process.env.PUBLIC_URL + "/images/no9.jpeg"
      ]
    },
    {
      id: 2,
      title: "Alpine AI Retreat",
      location: "Swiss Alps",
      date: "Winter 2022",
      description: "A coding retreat in the mountains, where I developed neural networks with a view of snow-capped peaks.",
      images: [
        "https://source.unsplash.com/random/600x400/?swiss,alps",
        "https://source.unsplash.com/random/600x400/?mountain,cabin",
        "https://source.unsplash.com/random/600x400/?snow,landscape"
      ]
    },
    {
      id: 3,
      title: "Desert Code Oasis",
      location: "Marrakech, Morocco",
      date: "Fall 2021",
      description: "Finding inspiration in the geometric patterns of Islamic architecture for my UI designs.",
      images: [
        "https://source.unsplash.com/random/600x400/?marrakech",
        "https://source.unsplash.com/random/600x400/?morocco,architecture",
        "https://source.unsplash.com/random/600x400/?desert,sunset"
      ]
    }
  ];

  return (
    <section className="travel-section">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        My <span className="highlight">Travel</span> Chronicles
      </motion.h2>
      
      <div className="stories-container">
        {stories.map((story, index) => (
          <motion.article
            key={story.id}
            className="story-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="story-header">
              <h3>{story.title}</h3>
              <div className="story-meta">
                <span className="location">{story.location}</span>
                <span className="date">{story.date}</span>
              </div>
            </div>
            
            <p className="story-description">{story.description}</p>
            
            <div className="story-gallery">
              {story.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="gallery-image"
                  whileHover={{ scale: 1.1, zIndex: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img src={image} 
                  alt={`${story.title} 
                  ${imgIndex + 1}`} 
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/0a0a20/ff00ff?text=Travel+Photo';
                    e.target.onerror = null;
                  }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HobbiesSection() {
  return (
    <motion.section
      className="hobbies-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="section-title">
        My <span className="highlight">Passions</span>
      </h2>
      
      <div className="hobbies-grid">
        {/* Travel */}
        <motion.div 
          className="hobby-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="hobby-icon">✈️</div>
          <h3>Travelling</h3>
          <p>Exploring new opportunities, embrace the obstacles </p>
        </motion.div>
        
        {/* Cafe Hopping */}
        <motion.div 
          className="hobby-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="hobby-icon">☕</div>
          <h3>Cafe Hopping</h3>
          <p>Places to hangout with friends and family. (Discuss travel plans too)</p>
        </motion.div>
        
        {/* Badminton */}
        <motion.div 
          className="hobby-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="hobby-icon">🏸</div>
          <h3>Badminton</h3>
          <p>Hoping one day to become LCW</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default App;