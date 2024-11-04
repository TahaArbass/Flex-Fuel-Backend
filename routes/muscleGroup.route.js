const muscleGroupController = require('../controllers/muscleGroup.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/staticData');
const roleMiddleware = require('../middlewares/roleMiddleware');
const express = require('express');
const router = express.Router();

// Get all muscle groups
router.get('/', authMiddleware,
    muscleGroupController.getAllMuscleGroups);

// Get muscle group by id
router.get('/:id', authMiddleware,
    muscleGroupController.getMuscleGroupById);

// Get muscle group by muscle name
router.get('/name/:muscle_group_name',
    authMiddleware, muscleGroupController.getMuscleGroupByMuscleName);


// Create muscle group
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN),
    muscleGroupController.createMuscleGroup);

// Update muscle group by id
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN),
    muscleGroupController.updateMuscleGroup);

// Delete muscle group by id
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN),
    muscleGroupController.deleteMuscleGroup);

module.exports = router;