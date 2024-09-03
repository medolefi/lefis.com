function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill out both fields.");
    } else {
        var username = "John Doe"; // Simulated username; replace with actual logic
        localStorage.setItem("username", username);
        window.location.href = "home.html"; // Redirect to the home page
    }
}

function createAccount() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (firstname === "" || lastname === "" || email === "" || password === "") {
        alert("Please fill out all fields.");
    } else {
        var username = firstname + " " + lastname;
        localStorage.setItem("username", username);
        alert("Account created successfully!");
        window.location.href = "home.html"; // Redirect to the home page
    }
}

function submitPost() {
    var postContent = document.getElementById("postInput").value;
    var username = localStorage.getItem("username");

    if (postContent.trim() === "") {
        alert("Please write something before posting.");
        return;
    }

    var newPost = document.createElement("div");
    newPost.className = "post";
    
    var postHeader = document.createElement("div");
    postHeader.className = "post-header";

    var avatar = document.createElement("img");
    avatar.src = "user-avatar.jpg"; // Placeholder avatar image
    avatar.alt = "User Avatar";
    avatar.className = "avatar";

    var postUser = document.createElement("div");
    postUser.className = "post-user";
    postUser.innerText = username;

    var postContentDiv = document.createElement("div");
    postContentDiv.className = "post-content";
    postContentDiv.innerText = postContent;

    postHeader.appendChild(avatar);
    postHeader.appendChild(postUser);
    newPost.appendChild(postHeader);
    newPost.appendChild(postContentDiv);

    var feed = document.getElementById("feed");
    feed.insertBefore(newPost, feed.firstChild);

    document.getElementById("postInput").value = "";
    closePostModal(); // Close the modal after posting
}

function openPostModal() {
    document.getElementById("postModal").style.display = "block";
}

function closePostModal() {
    document.getElementById("postModal").style.display = "none";
}
// Function to add a new post
function addPost(username, content) {
    const postContainer = document.querySelector('.feed');
    if (postContainer) {
        const newPost = document.createElement('div');
        newPost.classList.add('post');
        
        newPost.innerHTML = `
            <div class="post-header">
                <img src="avatar.jpg" alt="Avatar" class="avatar">
                <div class="post-user">${username}</div>
            </div>
            <div class="post-content">${content}</div>
        `;
        
        postContainer.prepend(newPost); // Adds the new post to the top of the feed
    }
}

// Function to handle form submission for login and account creation
function handleFormSubmission(formId, successMessage, redirectUrl) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            // For simplicity, just show an alert
            alert(successMessage);
            // Redirect or perform other actions as needed
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        });
    }
}

// Function to handle Home page specific functionality
function handleHomePage() {
    const postSubmitButton = document.getElementById('postSubmit');
    if (postSubmitButton) {
        postSubmitButton.addEventListener('click', function() {
            const postContent = document.getElementById('postContent').value;
            const username = "YourUsername"; // Replace with the actual username
            
            if (postContent.trim() !== "") {
                addPost(username, postContent); // Adds the new post
                document.getElementById('postContent').value = ''; // Clear the textarea
                closePostModal(); // Close the modal
            } else {
                alert('Please write something before posting.');
            }
        });
    }
}

// Event listeners for opening and closing the post modal
document.addEventListener('DOMContentLoaded', function() {
    const postButton = document.querySelector('.post-button');
    const closeButton = document.querySelector('.close-button');
    const postModal = document.getElementById('postModal');
    
    if (postButton) {
        postButton.addEventListener('click', openPostModal);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closePostModal);
    }
    
    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === postModal) {
            closePostModal();
        }
    };

    // Handle navigation menu active state
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle form submissions for login and create account pages
    handleFormSubmission('loginForm', 'Login successful!', 'index.html');
    handleFormSubmission('createAccountForm', 'Account created successfully!', 'login.html');
    
    // Handle Home page functionality
    if (currentPage === 'index.html') {
        handleHomePage();
    }
});
