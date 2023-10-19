/**
 * @swagger
 * /Blog/API/signup:
 *   post:
 *     summary: Register a new user
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
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User Registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     First_Name:
 *                       type: string
 *                     Last_Name:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     Registered_On:
 *                       type: string
 *                     Created_Posts:
 *                       type: array
 *                       items:
 *                         type: string
 */



/**
 * @swagger
 * /Blog/API/login:
 *   post:
 *     summary: Login to the application
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 users:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     First_Name:
 *                       type: string
 *                     Last_Name:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     Registered_On:
 *                       type: string
 *                     Created_Posts:
 *                       type: array
 *                       items:
 *                         type: string
 *                 token:
 *                   type: string
 *       404:
 *         description: User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Login Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */


/**
 * @swagger
 * /Blog/API//getAllUsersWithPosts:
 *   get:
 *     summary: Get all users with their posts and comments
 *     tags: 
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of users with posts and comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       First_Name:
 *                         type: string
 *                       Last_Name:
 *                         type: string
 *                       Email:
 *                         type: string
 *                       Role:
 *                         type: string
 *                       Registered_On:
 *                         type: string
 *                       Created_Posts:
 *                         type: array
 *                         items:
 *                           type: string
 *                       Comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             Comment_Date:
 *                               type: string
 *                             User_ID:
 *                               type: string
 *                             User_Name:
 *                               type: string
 *                             User_Email:
 *                               type: string
 *                             Post_Id:
 *                               type: string
 *                             User_Comment:
 *                               type: string
 *       403:
 *         description: Unauthorized Access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to retrieve users with posts and comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
