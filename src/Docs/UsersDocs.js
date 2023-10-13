// Get all Users Registered
/**
 * @swagger
 * /api/klab/user/createuser:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               First_Name:
 *                 type: string
 *               Last_Name:
 *                 type: string
 *               email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Profile:
 *                 type: string
 *                 format: binary  # This indicates that it's expecting a file
 *             required:
 *               - First_Name
 *               - Last_Name
 *               - email
 *               - Password
 *               - Profile
 *     responses:
 *       201:
 *         description: User Registration Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "201"
 *                 message:
 *                   type: string
 *                   example: "User Registration Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     First_Name:
 *                       type: string
 *                     Last_Name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     Profile:
 *                       type: string
 * /
 /**
 * @swagger
 * /api/klab/user/read:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   First_Name:
 *                     type: string
 *                     example: John
 *                   Last_Name:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   Profile:
 *                     type: string
 *                     example: http://example.com/profile.jpg
 * /
 /**
 * @swagger
 * /api/klab/user/login:
 *   post:
 *     summary: User Login Here
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID to comment on
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 name: email
 *               Password:
 *                 type: string
 *                 name: Password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     First_Name:
 *                       type: string
 *                       example: John
 *                     Last_Name:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     Profile:
 *                       type: string
 *                       example: http://example.com/profile.jpg
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "401"
 *                 message:
 *                   type: string
 *                   example: "Incorrect email or password"
 * /
 /**
 * @swagger
 * /api/klab/user/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               First_Name:
 *                 type: string
 *               Last_Name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 required: true
 *               Profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     First_Name:
 *                       type: string
 *                       example: John
 *                     Last_Name:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     Profile:
 *                       type: string
 *                       example: http://example.com/new_profile.jpg
 * /
 /**
 * @swagger
 * /api/klab/user/DeleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
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
