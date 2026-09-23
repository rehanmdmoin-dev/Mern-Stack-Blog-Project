const express = require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validationMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
    createTaskValidation,
    updateTaskValidation,
    reassignTaskValidation,
    changeStatusValidation,
    addCommentValidation,
} = require('../validations/taskValidation');

const router = express.Router();

router.use(authenticate);


router.get('/dashboard', taskController.getDashboard);

router.post('/', authorizeRoles('admin', 'manager'), validate(createTaskValidation), taskController.createTask);

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.get('/:id/history', authorizeRoles('admin', 'manager'), taskController.getHistory);

router.put('/:id', authorizeRoles('admin'), validate(updateTaskValidation), taskController.updateTask);


router.patch('/:id/reassign', authorizeRoles('admin', 'manager'), validate(reassignTaskValidation), taskController.reassignTask);


router.patch('/:id/status', validate(changeStatusValidation), taskController.changeStatus);


router.post('/:id/comments', validate(addCommentValidation), taskController.addComment);

router.post('/:id/attachments', upload.single('file'), taskController.uploadAttachment);


router.delete('/:id', authorizeRoles('admin'), taskController.deleteTask);

module.exports = router;
