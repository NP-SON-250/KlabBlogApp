/**
 * @swagger
 * /Blog/API/comments:
 *   post:
 *     summary: Add a comment to a post
 *     tags:
 *       - Comment
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: User_Comment
 *         type: string
 *         required: true
 *         description: The comment text(optional)
 *       - in: formData
 *         name: Post_Id
 *         type: string
 *         required: true
 *         description: ID of the post to comment on(optional)
 *     responses:
 *       201:
 *         description: Comment added successfully
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
 *       400:
 *         description: Invalid request or missing required fields
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
 *         description: Failed to add comment
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
 * /Blog/API/allComments:
 *   get:
 *     summary: Get all comments with user and post information
 *     tags:
 *       - Comment
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
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
 *                       Comment_Date:
 *                         type: string
 *                         format: date-time
 *                       User_ID:
 *                         type: string
 *                         format: uuid
 *                       User_Name:
 *                         type: string
 *                       User_Email:
 *                         type: string
 *                       Post_Id:
 *                         type: string
 *                         format: uuid
 *                       User_Comment:
 *                         type: string
 *       500:
 *         description: Failed to retrieve comments
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

