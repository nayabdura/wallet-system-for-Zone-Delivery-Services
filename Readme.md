# Zone Delivery Services

## Project Description
This project is an implementation of Zone Delivery Services, which includes authentication screens, a dashboard page, product management functionality, and a wallet system. Users can sign up, sign in, and reset their passwords if forgotten. After signing in, users are redirected to the dashboard page, where they can view, edit, and delete products, as well as add new products. The dashboard also includes real-time alerts for newly added products. Additionally, the project includes a wallet system for users to top up, withdraw, and make transactions.

## Installation
To run the project locally, follow these steps:

1. Ensure you have Node.js and Yarn (or npm) installed on your machine.
2. Clone this repository.
3. Navigate to the project directory in your terminal.
4. Run the following command to install dependencies:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```

## Usage
After installing dependencies, you can run the project locally using the following command:
```bash
yarn run dev
```
This will start the development server, and you can access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Dependencies and Use Cases
- **@stripe/stripe-js**: Used for integrating Stripe payments for the wallet system.
- **bcrypt**: Utilized for hashing passwords for secure storage and authentication.
- **express**: Used as the web server framework for handling API requests.
- **js-cookie**: Used for managing cookies, particularly for maintaining user sessions.
- **jsonwebtoken**: Used for generating and verifying JSON Web Tokens (JWT) for user authentication.
- **mongoose**: Utilized as an Object Data Modeling (ODM) library for MongoDB, facilitating interaction with the database.
- **next**: Framework used for building React applications with server-side rendering.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods that can be used at the top level of a web application to enable React components.
- **react-icons**: Used for displaying icons in the user interface.
- **socket.io-client**: Utilized for real-time communication between clients and servers, enabling real-time alerts for newly added products.

## Contributing
Contributions to this project are welcome. Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify and expand upon this template as needed to provide more detailed information about your project. Let me know if you need further assistance!