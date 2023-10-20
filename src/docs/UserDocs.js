/**
 * @swagger
 * tags:
 *   name: User
 *   description: User operations
 */

/**
 * @swagger
 * /Blog/API/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Profile:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture of the user (optional)
 *               First_Name:
 *                 type: string
 *                 description: First name of the user
 *               Last_Name:
 *                 type: string
 *                 description: Last name of the user
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user (at least 8 characters, containing a mix of letters and numbers)
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '200'
 *                 message:
 *                   type: string
 *                   example: 'User Registered'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '400'
 *                 message:
 *                   type: string
 *                   example: 'Invalid Email format'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '500'
 *                 message:
 *                   type: string
 *                   example: 'Failed to proceed registration'
 */


/**
 * @swagger
 * /Blog/API/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '200'
 *                 message:
 *                   type: string
 *                   example: 'User Login Successful'
 *                 token:
 *                   type: string
 *                   example: 'YOUR_JWT_TOKEN'
 *       '404':
 *         description: User not found or incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '404'
 *                 message:
 *                   type: string
 *                   example: 'User Not Found Or Password Incorrect'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '500'
 *                 message:
 *                   type: string
 *                   example: 'Login Failed'
 */


/**
 * @swagger
 * /Blog/API/users/view/all:
 *   get:
 *     summary: View all users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '500'
 *                 message:
 *                   type: string
 *                   example: 'Failed to retrieve users'
 */


 /**
 * @swagger
 * /Blog/API/users/byId/{id}:
 *   get:
 *     summary: View a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Profile:
 *                   type: string
 *                   example: http://example.com/profile_image.jpg
 *                 First_Name:
 *                   type: string
 *                   example: "User First name"
 *                 Last_Name:
 *                   type: string
 *                   example: "User Last name"
 *                 Email:
 *                   type: string
 *                   example: "User Email"
 *                 Password:
 *                   type: string
 *                   example: "User Password"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */


 /**
 * @swagger
 * /Blog/API/users/update/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Profile:
 *                 type: string
 *                 format: binary
 *                 description: The updated profile picture of the user (optional)
 *               First_Name:
 *                 type: string
 *                 description: Updated first name of the user
 *               Last_Name:
 *                 type: string
 *                 description: Updated last name of the user
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Updated email of the user
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: Updated password of the user (at least 8 characters, containing a mix of letters and numbers)
 *               Role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Updated role of the user (optional)
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '200'
 *                 message:
 *                   type: string
 *                   example: 'User Update Succeeded'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '400'
 *                 message:
 *                   type: string
 *                   example: 'Invalid Email format Or other validation error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '500'
 *                 message:
 *                   type: string
 *                   example: 'Failed to update user'
 */

 /**
 * @swagger
 * /Blog/API/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '200'
 *                 message:
 *                   type: string
 *                   example: 'User Deleted Successfully'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '404'
 *                 message:
 *                   type: string
 *                   example: 'User not found'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: '500'
 *                 message:
 *                   type: string
 *                   example: 'Error occurred while deleting user'
 */

