/**
 * @swagger
 * /Blog/API/send/contact/info:
 *   post:
 *     summary: Send a contact form message with file upload
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */