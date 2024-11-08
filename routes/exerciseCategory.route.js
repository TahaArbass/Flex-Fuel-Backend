const ExerciseCategoryController = require('../controllers/exerciseCategory.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const requiredRole = require('../middlewares/roleMiddleware');
const filterFieldsMiddleware = require('../middlewares/filterFieldsMiddleware');
const { TABLES, ACTIONS, ROLES } = require('../utils/staticData');

const router = require('express').Router();

// Get all exercise categories
router.get('/', authMiddleware, ExerciseCategoryController.getAllExerciseCategories);

// Get an exercise category by id
router.get('/:id', authMiddleware, ExerciseCategoryController.getExerciseCategoryById);

// Get exercise categories by category id
router.get('/category/:category_id', authMiddleware, ExerciseCategoryController.getExerciseCategoriesByCategoryId);

// Get exercise categories by exercise id
router.get('/exercise/:exercise_id', authMiddleware, ExerciseCategoryController.getExerciseCategoriesByExerciseId);

// Create an exercise category
router.post('/', authMiddleware, requiredRole(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.EXERCISE_CATEGORY, ACTIONS.CREATE),
    ExerciseCategoryController.createExerciseCategory);

// Update an exercise category
router.put('/:id', authMiddleware, requiredRole(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.EXERCISE_CATEGORY, ACTIONS.UPDATE),
    ExerciseCategoryController.updateExerciseCategory);

// Delete an exercise category
router.delete('/:id', authMiddleware, requiredRole(ROLES.ADMIN),
    ExerciseCategoryController.deleteExerciseCategory);

module.exports = router;