/**
 * @swagger
 * /Blog/API/login:
 *   post:
 *     summary: User login
 *     tags: 
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Profile:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful user login
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
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found or incorrect password
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
 *         description: Failed to process login request
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
 * /Blog/API/allPosts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
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
 *                       Post_Image:
 *                         type: string
 *                       Post_Title:
 *                         type: string
 *                       Post_Content:
 *                         type: string
 *                       Posted_On:
 *                         type: string
 *                       Posted_By:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           First_Name:
 *                             type: string
 *                           Last_Name:
 *                             type: string
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
 *         description: Failed to retrieve posts
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
 * /Blog/API/post/{id}:
 *   get:
 *     summary: Get a specific post by ID
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
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
 *                     Post_Image:
 *                       type: string
 *                     Post_Title:
 *                       type: string
 *                     Post_Content:
 *                       type: string
 *                     Posted_On:
 *                       type: string
 *                     Posted_By:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         First_Name:
 *                           type: string
 *                         Last_Name:
 *                           type: string
 *       404:
 *         description: Post not found
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
 *         description: Failed to retrieve post
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
 * /Blog/API/post/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: formData
 *         name: Post_Image
 *         type: file
 *         description: Post Image
 *       - in: formData
 *         name: Post_Title
 *         type: string
 *         description: New Post Title
 *       - in: formData
 *         name: Post_Content
 *         type: string
 *         description: New Post Content
 *     responses:
 *       200:
 *         description: Post updated successfully
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
 *                     Post_Image:
 *                       type: string
 *                     Post_Title:
 *                       type: string
 *                     Post_Content:
 *                       type: string
 *                     Posted_On:
 *                       type: string
 *                     Posted_By:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         First_Name:
 *                           type: string
 *                         Last_Name:
 *                           type: string
 *       404:
 *         description: Post not found
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
 *         description: Failed to update post
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
 * /Blog/API/post/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Post not found
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
 *         description: Failed to delete post
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


