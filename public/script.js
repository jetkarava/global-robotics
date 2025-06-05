// Enhanced JavaScript with advanced animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Particle Background System
  const canvas = document.getElementById("particleCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      // Random position
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height

      // Random size
      this.size = Math.random() * 3 + 0.5

      // Random velocity
      this.vx = Math.random() * 0.2 - 0.1
      this.vy = Math.random() * 0.2 - 0.1

      // Random color (blue/white shades)
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})` // Blue
      } else if (colorChoice < 0.6) {
        this.color = `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.2})` // Light blue
      } else {
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})` // White
      }

      // Random lifespan
      this.life = Math.random() * 300 + 100
      this.maxLife = this.life
    }

    update() {
      // Move particle
      this.x += this.vx
      this.y += this.vy

      // Decrease lifespan
      this.life--

      // Reset if off-screen or end of life
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life <= 0) {
        this.reset()
      }
    }

    draw() {
      // Calculate opacity based on remaining life
      const opacity = this.life / this.maxLife

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${opacity})`)
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const particleCount = Math.min(window.innerWidth / 3, 200) // Adjust count based on screen size

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animateParticles() {
    // Clear canvas with slight transparency to create trail effect
    ctx.fillStyle = "rgba(15, 23, 42, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Add occasional new particles
    if (Math.random() < 0.05 && particles.length < particleCount + 50) {
      particles.push(new Particle())
    }

    requestAnimationFrame(animateParticles)
  }

  // Start animation
  animateParticles()

  // Enhanced loading screen with better cleanup
  const loadingScreen = document.querySelector(".loading-screen")
  const loadingProgress = document.querySelector(".loading-progress")

  if (loadingScreen && loadingProgress) {
    let progress = 0
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(loadingInterval)
        setTimeout(() => {
          loadingScreen.classList.add("hidden")
          // Ensure it's completely removed after animation
          setTimeout(() => {
            loadingScreen.style.display = "none"
          }, 500)
        }, 500)
      }
      loadingProgress.style.width = progress + "%"
    }, 100)
  }

  // Better mobile detection and cursor handling
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768

  if (!isMobile) {
    // Only initialize cursor on desktop
    const cursor = document.querySelector(".cursor")
    const cursorGlow = document.querySelector(".cursor-glow")

    if (cursor && cursorGlow) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
        cursorGlow.style.left = e.clientX + "px"
        cursorGlow.style.top = e.clientY + "px"
      })
    }
  } else {
    // Hide cursor elements on mobile
    const cursor = document.querySelector(".cursor")
    const cursorGlow = document.querySelector(".cursor-glow")
    if (cursor) cursor.style.display = "none"
    if (cursorGlow) cursorGlow.style.display = "none"
  }

  // Enhanced cursor effects for interactive elements
  const cursor = document.querySelector(".cursor")
  const cursorGlow = document.querySelector(".cursor-glow")
  const interactiveElements = document.querySelectorAll(
    "button, a, .card, .team-card, .workflow-step, .stakeholder, input, textarea",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1.2)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1)"
    })
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuIcon = mobileMenuBtn.querySelector("i")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
      mobileMenuIcon.classList.remove("fa-bars")
      mobileMenuIcon.classList.add("fa-times")
      mobileMenuIcon.style.transform = "rotate(180deg)"
    } else {
      mobileMenuIcon.classList.remove("fa-times")
      mobileMenuIcon.classList.add("fa-bars")
      mobileMenuIcon.style.transform = "rotate(0deg)"
    }
  })

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuIcon.classList.remove("fa-times")
      mobileMenuIcon.classList.add("fa-bars")
      mobileMenuIcon.style.transform = "rotate(0deg)"
    })
  })

  // Enhanced active navigation highlighting
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section")

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)

  // Enhanced technology tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanels.forEach((panel) => panel.classList.remove("active"))

      // Add active class to clicked button and corresponding panel
      this.classList.add("active")
      const targetPanel = document.getElementById(targetTab)
      targetPanel.classList.add("active")

      // Add entrance animation
      targetPanel.style.animation = "none"
      setTimeout(() => {
        targetPanel.style.animation = "tabFadeIn 0.5s ease-out"
      }, 10)
    })
  })

  // Enhanced progress bars animation
  const progressBars = document.querySelectorAll(".progress-fill")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible && !bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width")
        setTimeout(() => {
          bar.style.width = width + "%"
        }, 200)
        bar.classList.add("animated")
      }
    })
  }

  window.addEventListener("scroll", animateProgressBars)
  animateProgressBars()

  // Enhanced contact form submission
  const contactForm = document.querySelector(".contact-form")
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const submitBtn = this.querySelector(".submit-btn")
    const originalText = submitBtn.querySelector("span").textContent

    // Get form data
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const message = this.querySelector("textarea").value

    // Enhanced validation
    if (!name || !email || !message) {
      showNotification("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Animate submit button
    submitBtn.querySelector("span").textContent = "Sending..."
    submitBtn.style.transform = "scale(0.95)"

    // Simulate form submission
    setTimeout(() => {
      submitBtn.querySelector("span").textContent = "Sent!"
      submitBtn.style.background = "linear-gradient(45deg, #16a34a, #22c55e)"

      setTimeout(() => {
        showNotification("Thank you for your message! We will get back to you soon.", "success")
        this.reset()
        submitBtn.querySelector("span").textContent = originalText
        submitBtn.style.background = "linear-gradient(45deg, #2563eb, #3b82f6)"
        submitBtn.style.transform = "scale(1)"
      }, 1000)
    }, 2000)
  })

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
        <span>${message}</span>
      </div>
    `

    // Add notification styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#16a34a" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }

  // Enhanced smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Fix the enhanced scroll animations - remove problematic initial hiding
  const animatedElements = document.querySelectorAll(
    ".card, .team-card, .workflow-step, .stakeholder, .timeline-item, .feature",
  )

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
        // Don't hide elements that are already visible
        if (!entry.target.classList.contains("animated")) {
          entry.target.style.animationDelay = Math.random() * 0.3 + "s"
          entry.target.classList.add("animated")
        }
      }
    })
  }, observerOptions)

  // Don't hide elements initially - they should be visible
  animatedElements.forEach((element) => {
    // Remove the problematic initial hiding
    // element.style.opacity = "0"
    // element.style.transform = "translateY(30px)"
    observer.observe(element)
  })

  // Partnership button functionality
  const partnershipBtn = document.querySelector(".partnership-btn")
  if (partnershipBtn) {
    partnershipBtn.addEventListener("click", () => {
      showNotification(
        "Thank you for your interest in partnerships! Please use the contact form to get in touch with our team.",
        "info",
      )
    })
  }

  // Enhanced hover effects for cards
  const cards = document.querySelectorAll(".card, .team-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
      this.style.boxShadow = "0 20px 40px rgba(59, 130, 246, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "none"
    })
  })

  // Enhanced parallax effect with bounds checking
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset
      const heroBackground = document.querySelector(".hero-background")
      const floatingObjects = document.querySelectorAll(".floating-satellite, .floating-planet, .floating-asteroid")

      if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`
      }

      floatingObjects.forEach((obj, index) => {
        if (scrolled < window.innerHeight) {
          const speed = 0.1 + index * 0.05
          obj.style.transform = `translateY(${scrolled * speed}px)`
        }
      })
    }, 16),
  )

  // Dynamic rocket animation trigger
  const heroSection = document.querySelector(".hero-section")
  const rocket = document.querySelector(".flying-rocket")

  if (heroSection && rocket) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rocket.style.display = "block"
          } else {
            rocket.style.display = "none"
          }
        })
      },
      { threshold: 0.3 },
    )

    heroObserver.observe(heroSection)
  }

  // Enhanced typing effect for hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const titleWords = heroTitle.querySelectorAll(".title-word")
    titleWords.forEach((word, index) => {
      word.style.animationDelay = index * 0.5 + "s"
    })
  }

  // Add glow effect to elements on hover
  const glowElements = document.querySelectorAll(".team-icon, .tech-icon, .workflow-icon, .stakeholder-icon")
  glowElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.filter = "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))"
    })

    element.addEventListener("mouseleave", function () {
      this.style.filter = "none"
    })
  })

  // Enhanced form field animations
  const formFields = document.querySelectorAll("input, textarea")
  formFields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)"
    })

    field.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)"
    })
  })

  // Add particle effect on click
  document.addEventListener("click", (e) => {
    createParticleEffect(e.clientX, e.clientY)
  })

  function createParticleEffect(x, y) {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: fixed;
      top: ${y}px;
      left: ${x}px;
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: particleExplosion 0.6s ease-out forwards;
    `

    document.body.appendChild(particle)

    setTimeout(() => {
      document.body.removeChild(particle)
    }, 600)
  }

  // Add CSS for particle animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes particleExplosion {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(3) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // Initialize all animations
  updateActiveNav()
  animateProgressBars()

  console.log("🚀 Global Robotics website loaded successfully!")
})

// Global scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add loading animation completion
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen")
    if (loadingScreen) {
      loadingScreen.style.display = "none"
    }
  }, 3000)
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll-based animations here
  }, 16),
) // ~60fps
