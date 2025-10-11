# BLUB: CSS Frameworks
<img width="1397" height="752" alt="Skjermbilde 2025-10-08 kl  21 24 53" src="https://github.com/user-attachments/assets/29042318-2d82-45a5-9155-c8674f84b729" />


# Purpose

The purpose of this assignment was to apply Tailwind CSS to the JavaScript 2 course project in order to demonstrate skills in using a CSS framework for building responsive, accessible, and user-friendly interfaces. The focus was on improving design consistency, enhancing user experience, and ensuring the application works across different screen sizes.

# Description

This project is a continuation of the JavaScript 2 course assignment, styled with Tailwind CSS. The original functionality of the social media application remains the same, but the visual presentation and user experience have been improved through framework integration.

**BLUB** is a front-end social media application where users can register, log in, create posts, view posts from others, search, edit their own content, and manage their profile.  
The styling has been fully rebuilt using Tailwind CSS to ensure responsiveness, visual clarity, and a consistent design system.  

The project was developed as part of Noroff’s *Frontend Development* course, under the *CSS Frameworks* module.

### Key features include:

- **Authentication:** Register, log in, and log out securely using the Noroff Social API.  
- **Feed:** View all social posts with images, tags, and author details.  
- **Pagination:** Browse 12 posts per page with next/previous buttons (up to 50 pages). The view automatically scrolls to the top when navigating between pages.  
- **Search:** Filter posts by title or keyword.  
- **Profile Management:** View and edit user profile, including avatar updates and user details.  
- **Create & Manage Posts:** Create, edit, and delete your own social posts directly from the UI.  
- **Responsive Design:** All pages are fully responsive and optimized for mobile, tablet, and desktop.  
- **Dynamic Navigation:** Nav elements update dynamically depending on whether the user is logged in or not.  

### Learning Outcomes

Through this project, I have demonstrated the following skills:

- **CSS Framework Integration:** Applied Tailwind CSS effectively using npm and PostCSS configuration.  
- **Responsive Design:** Built layouts that adapt fluidly across multiple screen sizes.  
- **Improved UI/UX:** Enhanced design consistency, accessibility, and visual hierarchy.  
- **Code Organization:** Structured CSS and component styles efficiently for scalability.  
- **JavaScript Integration:** Combined framework styling with existing JavaScript logic and API functionality.  
- **Version Control:** Managed code through GitHub with structured commits and a clear branch workflow.  
- **Deployment:** Deployed the final application on Netlify for public access.  

### Improvements for Portfolio 2

As part of continuous improvement for *Portfolio 2*, the following enhancements were made:

1. Live hosted page on [Netlify](https://css-frameworks-mn.netlify.app/)
2. **Improved Navigation:** Nav elements now update dynamically based on authentication state, showing relevant links for logged-in and logged-out users.  
3. **Pagination Added:** Users can browse social posts across multiple pages, with automatic scrolling behavior and clear visual feedback.
4. **New Design:** New main colors and images.

# Client and Target Audience

The fictional client for this project is a modern social media startup focused on user-generated content and interaction.  
The platform is designed for users who want to share, explore, and manage social posts in a clean, accessible environment.

# Project Technologies

- **HTML:** Base structure of all pages.  
- **CSS (Tailwind):** Used for styling, layout, and responsive design.  
- **JavaScript (Vanilla):** Handles all dynamic functionality and API integration.  
- **Vite:** Provides modern build tooling and fast development environment.  
- **PostCSS & Autoprefixer:** Used for Tailwind processing and browser compatibility.  
- **Vitest:** Used for testing key functions.  
- **Noroff Social API:** Used for authentication, posts, profiles, and CRUD operations.  
- **GitHub:** Version control and project management.  
- **Netlify:** Deployment platform for the live demo.  

# Project Structure

The application uses multiple pages rendered dynamically through JavaScript and API calls.  
Routing and state are handled client-side without a framework.

- **Homepage:** Landing page for non-logged-in users, with login and register links.  
- **Login / Register Pages:** Handle authentication and token storage in localStorage.  
- **Feed:** Displays all social posts with pagination, search, and tags.  
- **Single Post Page:** Displays individual post details.  
- **Profile:** View and edit profile data, including avatar.  
- **Post Management:** Create, edit, and delete personal posts.  

# Development Tools

- **Visual Studio Code:** Main code editor.  
- **Figma:** Used for basic layout planning and component organization.  
- **Online Validators:**  
  - [W3C Validator](https://validator.w3.org/) for HTML validation  
  - [WAVE](https://wave.webaim.org/) for accessibility testing  

# Getting started
To get the project running on your local machine, follow these steps:

### Clone the repository:
```git clone https://github.com/marned91/CSS-Frameworks```

### Install Dependencies:
```npm install```

### Running the Development Server:
Start the development server with Vite:
```npm run dev```

### Build the project for production:
```npm run build```

### Test Build the project for production:
```npm run preview```

# Deployment
The project is hosted on Netlify for live demo purposes. You can view the live version [here](https://css-frameworks-mn.netlify.app/).


# Contributing
As this project is for a course assignment, I am not currently accepting external contributions. However, I welcome any feedback or suggestions for improvement. Feel free to create an issue in the repository if you have any thoughts on how to enhance the project.

Thank you for your understanding!

# Contact
[My Linkedin Page](https://www.linkedin.com/in/marte-n-18aab5101/)

# Sources used in project
- Blush https://blush.design/ for all illustrations/images. 
- Noroff's API documentation: https://docs.noroff.dev/docs/v2/social/posts 
- https://flowbite.com/docs/components/skeleton/#default-skeleton
- https://fontawesome.com/icons
- https://fonts.google.com/
- https://logo.com/
- https://tailwindcss.com/docs
- Noroff course content for Javascript 2 and CSS Frameworks

