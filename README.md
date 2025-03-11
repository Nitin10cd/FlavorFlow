<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlavorFlow - AI Integrated Food Order & Selling App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            color: #333;
        }
        h1, h2, h3 {
            color: #ff6f00;
        }
        h1 {
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .section {
            margin-bottom: 20px;
        }
        ul {
            padding-left: 20px;
        }
        code {
            background: #eee;
            padding: 5px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>FlavorFlow 🍽🤖</h1>
        <p><strong>AI-Integrated Food Order & Selling Web App</strong></p>

        <div class="section">
            <h2>🚀 Project Overview</h2>
            <p>FlavorFlow is a cutting-edge AI-integrated food ordering and selling platform where users can:</p>
            <ul>
                <li>Order *AI-verified healthy food* from registered hotels.</li>
                <li>Register their *hotel/restaurant* and sell *fitness meal plans, **monthly meal plans, or **individual dishes*.</li>
                <li>AI verifies each meal to ensure it meets safety and nutrition standards before adding it to the database.</li>
                <li>View dishes and meal plans in *single-page views* with detailed descriptions.</li>
            </ul>
        </div>

        <div class="section">
            <h2>🛠 Technologies Used</h2>
            <ul>
                <li><strong>MERN Stack:</strong> MongoDB, Express.js, React.js, Node.js</li>
                <li><strong>State Management:</strong> Context API</li>
                <li><strong>Routing:</strong> React Router</li>
                <li><strong>AI Model:</strong> Gemini AI (for food verification)</li>
                <li><strong>Security:</strong> JSON Web Token (JWT) & bcrypt</li>
                <li><strong>Styling:</strong> CSS</li>
            </ul>
        </div>

        <div class="section">
            <h2>📌 Features</h2>
            <ul>
                <li>🔹 *AI-Verified Food Ordering:* Users can order food that passes AI quality checks.</li>
                <li>🔹 *Hotel Registration:* Businesses can register and sell meals, plans, and fitness diets.</li>
                <li>🔹 *Fitness & Meal Plans:* Pre/Post-workout diets and monthly meal subscriptions.</li>
                <li>🔹 *Secure Authentication:* JWT for user authentication.</li>
                <li>🔹 *Real-time AI Verification:* Ensures food safety before adding to the platform.</li>
                <li>🔹 *Categorized Dishes:* Meals categorized for easy browsing.</li>
                <li>🔹 *Single-Page Dish View:* See full details before ordering.</li>
            </ul>
        </div>

        <div class="section">
            <h2>🛠 Installation & Setup</h2>
            <p>Follow these steps to set up FlavorFlow locally:</p>
            <h3>📌 Backend Setup</h3>
            <pre><code>git clone https://github.com/your-repo/flavorflow.git</code></pre>
            <pre><code>cd flavorflow/backend</code></pre>
            <pre><code>npm install</code></pre>
            <pre><code>npm start</code></pre>

            <h3>📌 Frontend Setup</h3>
            <pre><code>cd flavorflow/frontend</code></pre>
            <pre><code>npm install</code></pre>
            <pre><code>npm start</code></pre>
        </div>

        <div class="section">
            <h2>📌 API Endpoints</h2>
            <ul>
                <li><strong>POST</strong> <code>/api/auth/register</code> - Register new user</li>
                <li><strong>POST</strong> <code>/api/auth/login</code> - Login user</li>
                <li><strong>GET</strong> <code>/api/dishes</code> - Fetch all dishes</li>
                <li><strong>POST</strong> <code>/api/dishes/add</code> - Add new dish (AI Verified)</li>
                <li><strong>GET</strong> <code>/api/hotels</code> - Fetch registered hotels</li>
                <li><strong>POST</strong> <code>/api/hotels/register</code> - Register a new hotel</li>
            </ul>
        </div>

        <div class="section">
            <h2>💡 Future Enhancements</h2>
            <ul>
                <li>🔹 *AI-powered personalized meal recommendations*</li>
                <li>🔹 *Live order tracking system*</li>
                <li>🔹 *Integration with wearable devices for fitness tracking*</li>
            </ul>
        </div>

        <div class="section">
            <h2>👨‍💻 Contributors</h2>
            <p>Developed by: <strong>Rishu Saxena</strong></p>
            <p>Feel free to contribute! Fork the repo and make pull requests 🚀</p>
        </div>

        <div class="footer">
            <p>📧 Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
            <p>🌐 GitHub Repository: <a href="https://github.com/your-repo/flavorflow" target="_blank">FlavorFlow</a></p>
        </div>
    </div>

</body>
</html>