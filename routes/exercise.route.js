const ExerciseController = require('../controllers/exercise.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const requiredRole = require('../middlewares/roleMiddleware');
const filterFieldsMiddleware = require('../middlewares/filterFieldsMiddleware');
const { TABLES, ACTIONS, ROLES } = require('../utils/staticData');

const router = require('express').Router();

// Get all exercises
router.get('/', authMiddleware, ExerciseController.getAllExercises);

// Get an exercise by id
router.get('/:id', authMiddleware, ExerciseController.getExerciseById);

// Get exercises by targeted muscle id
router.get('/muscle/:targetedMuscleId', authMiddleware, ExerciseController.getExercisesByTargetedMuscleId);

// Get an exercise by name
router.get('/name/:exercise_name', authMiddleware, ExerciseController.getExerciseByName);

// Create an exercise
router.post('/', authMiddleware, requiredRole(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.EXERCISE, ACTIONS.CREATE),
    ExerciseController.createExercise);

// Update an exercise
router.put('/:id', authMiddleware, requiredRole(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.EXERCISE, ACTIONS.UPDATE),
    ExerciseController.updateExercise);

// Delete an exercise
router.delete('/:id', authMiddleware, requiredRole(ROLES.ADMIN), ExerciseController.deleteExercise);

module.exports = router;