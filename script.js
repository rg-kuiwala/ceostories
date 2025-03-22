/**
 * NewsBlog Theme JavaScript
 * Author: Generated for Blogspot
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Current Date Display
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentDate.toLocaleDateString('en-US', options);
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    dateElement.textContent = dateString;
  }

  // Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Breaking News Slider (additional functionality if needed)
  const breakingItems = document.querySelectorAll('.breaking-news-item');
  if (breakingItems.length > 0) {
    // Adjust animation duration based on number of items
    const duration = breakingItems.length * 5; // 5 seconds per item
    breakingItems.forEach(item => {
      item.style.animationDuration = `${duration}s`;
    });
  }

  // Post Share Buttons
  const shareButtons = document.querySelectorAll('.social-share .share-btn');
  if (shareButtons.length > 0) {
    shareButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.classList[1]; // facebook, twitter, etc.
        const postUrl = encodeURIComponent(window.location.href);
        const postTitle = encodeURIComponent(document.title);
        
        let shareUrl = '';
        
        switch(type) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${postTitle}`;
            break;
          case 'pinterest':
            const img = encodeURIComponent(document.querySelector('meta[property="og:image"]')?.content || '');
            shareUrl = `https://pinterest.com/pin/create/button/?url=${postUrl}&media=${img}&description=${postTitle}`;
            break;
          case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${postTitle}%20${postUrl}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  // Image Lazy Loading
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // Newsletter Form Validation
  const subscribeForm = document.querySelector('.subscribe-form form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput) {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Here you would typically send the email to your subscription service
        // For demo purposes, we'll just show a success message
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }

  // Search Form
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = this.querySelector('input[type="text"]');
      if (searchInput) {
        const query = searchInput.value.trim();
        if (!query) {
          alert('Please enter a search term');
          return;
        }
        
        // In a real implementation, this would redirect to a search results page
        // or trigger an AJAX search
        alert(`Searching for: ${query}`);
      }
    });
  }

  // Post Hover Effects
  const postCards = document.querySelectorAll('.post-card');
  if (postCards.length > 0) {
    postCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
      });
    });
  }
});

// This function generates the Blogspot-compatible XML template
function generateBlogspotTemplate() {
  // This would be used to generate the XML template for Blogspot
  // In a real implementation, this would convert the HTML/CSS/JS to Blogger's XML format
  console.log('Blogspot template generation utility');
}

// Function to handle category filtering
function filterByCategory(category) {
  const allPosts = document.querySelectorAll('.post-card');
  if (allPosts.length > 0) {
    if (category === 'all') {
      allPosts.forEach(post => {
        post.style.display = 'block';
      });
    } else {
      allPosts.forEach(post => {
        const postCategory = post.querySelector('.category-tag');
        if (postCategory && postCategory.classList.contains(`cat-${category}`)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
    }
  }
}

// Function to format post dates
function formatPostDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
