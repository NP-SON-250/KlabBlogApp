// Get all Users Registered
/**
 * @swagger
 * /api/klab/blog/createBlog:
 *   post:
 *     summary: Create a new blog post
 *     tags:
 *       - Blog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bogImage:
 *                 type: string
 *                 format: binary  # This indicates that it's expecting a file
 *               blogTitle:
 *                 type: string
 *               blogContent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post created successfully
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
 *                   example: "Blog post created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bogImage:
 *                       type: string
 *                       example: http://example.com/blog_image.jpg
 *                     blogTitle:
 *                       type: string
 *                       example: "Title of the Blog"
 *                     blogContent:
 *                       type: string
 *                       example: "Content of the blog post"
 */




 /**
 * @swagger
 * /api/klab/blog/readAllBlogs:
 *   get:
 *     summary: Get all blog posts
 *     tags:
 *       - Blog
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: List of all blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bogImage:
 *                     type: string
 *                     example: http://example.com/blog_image.jpg
 *                   blogTitle:
 *                     type: string
 *                     example: "Title of the Blog"
 *                   blogContent:
 *                     type: string
 *                     example: "Content of the blog post"
 *       404:
 *         description: No blogs found
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
 *                   example: "No blogs found"
 */


 /**
 * @swagger
 * /api/klab/blog/readById/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bogImage:
 *                   type: string
 *                   example: http://example.com/blog_image.jpg
 *                 blogTitle:
 *                   type: string
 *                   example: "Title of the Blog"
 *                 blogContent:
 *                   type: string
 *                   example: "Content of the blog post"
 *       404:
 *         description: Blog post not found
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
 *                   example: "Blog post not found"
 */


 /**
 * @swagger
 * /api/klab/blog/updateBlog/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bogImage:
 *                 type: string
 *                 format: binary  # This indicates that it's expecting a file
 *               blogTitle:
 *                 type: string
 *                 example: "Updated Title of the Blog"
 *               blogContent:
 *                 type: string
 *                 example: "Updated Content of the blog post"
 *     responses:
 *       200:
 *         description: Blog post updated successfully
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
 *                   example: "Blog post updated successfully"
 *       404:
 *         description: Blog post not found
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
 *                   example: "Blog post not found"
 */


 /**
 * @swagger
 * /api/klab/blog/deleteBlog/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
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
 *                   example: "Blog post deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bogImage:
 *                       type: string
 *                       example: http://example.com/blog_image.jpg
 *                     blogTitle:
 *                       type: string
 *                       example: "Title of the Blog"
 *                     blogContent:
 *                       type: string
 *                       example: "Content of the blog post"
 *       404:
 *         description: Blog post not found
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
 *                   example: "Blog post not found"
 */

 
 /**
 * @swagger
 * /api/api/klab/blog/{id}/comment:
 *   post:
 *     summary: Create a comment on a blog post
 *     tags:
 *       - Blog
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
 *               comment:
 *                 type: string
 *                 name: Comment
 *     responses:
 *       200:
 *         description: Comment added successfully
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
 *                   example: "Comment added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: string
 *                       example: "Great blog post!"
 *       401:
 *         description: Unauthorized. Please login to leave a comment.
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
 *                   example: "Unauthorized. Please login to leave a comment."
 *       404:
 *         description: Blog post not found
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
 *                   example: "Blog post not found"
 */
