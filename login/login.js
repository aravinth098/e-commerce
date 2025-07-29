// Sign up
async function handleSignup() {
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!username || !email || !password) {
        alert("Nanba, don’t leave me alone... she already did 😢");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.text();
        alert(result);

        if (response.ok) {
            window.location.href = "index.html"; // Redirect to homepage after successful signup
        }
    } catch (error) {
        console.error("Signup failed:", error);
        alert("Oops! Server didn't respond. Try again later.");
    }
}

// Login
document.querySelector("input[value='Sign in']").addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.querySelector("input[placeholder='Username']").value.trim();
    const password = document.querySelector("input[placeholder='Password']").value.trim();

    if (!username || !password) {
        alert("What bro? Very wrong bro 😤");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const message = await response.text();
        console.log("Response message:", JSON.stringify(message)); // For debugging

        if (response.ok && message.trim() === "Login Successful!") {
            // Redirect to index.html
            alert("masss bro")
            window.location.href = "http://127.0.0.1:5500/index.html";
        } else {
            alert("Login failed: " + message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Ayyo! Something went wrong. Check server connection.");
    }
});

