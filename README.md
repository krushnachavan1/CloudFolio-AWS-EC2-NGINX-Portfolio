## 🚀 CloudFolio

![Status](https://img.shields.io/badge/status-live-success)
![Deployment](https://img.shields.io/badge/deployed%20on-AWS%20EC2-orange)
![Server](https://img.shields.io/badge/server-NGINX-green)
![Frontend](https://img.shields.io/badge/frontend-HTML%20CSS%20JS-blue)

---

### 📌 Overview
CloudFolio is a responsive and interactive portfolio website deployed on a live AWS EC2 instance using NGINX.

This project focuses on real-world cloud deployment along with frontend development, combining UI design, animations, and server-side hosting.

---

### ⚙️ Features
- Animated starfield background (Canvas API)
- Dynamic typing effect in hero section  
- Scroll-based reveal animations
- Animated skill progress bars & counters
- Mouse parallax effect on hero badges  
- Fully responsive design
- Custom hamburger menu (mobile)
- Active navigation highlight on scroll
- Visual AWS architecture section

---

### 🛠️ Tech Stack
- HTML (index.html)
- CSS (style.css)
- JavaScript (script.js)
- AWS EC2 (Ubuntu)
- NGINX
- Linux CLI / SSH

---

### 📂 Project Structure
```
CloudFolio/
│── index.html
│── style.css
│── script.js
```

---

### ☁️ Deployment Architecture
```
User Browser → Internet → Security Group (80/443)
→ AWS EC2 (Ubuntu) → NGINX → Static Files
```

---

### ⚙️ Deployment Steps
```bash
# Connect to EC2
ssh -i your-key.pem ec2-user@your-public-ip

# Install NGINX
sudo apt update
sudo apt install nginx -y

# Start NGINX
sudo systemctl start nginx

# Deploy website
sudo cp -r * /var/www/html/
```

---

### 🎯 What I Learned
- Launching and managing EC2 instances  
- Configuring NGINX as a web server  
- Working with Linux commands and SSH  
- Understanding cloud architecture basics  
- Building interactive UI with JavaScript  

---
---

### 💡 Note
This project reflects hands-on learning in Cloud Computing, Deployment, and Frontend Development.
