const MuscleController = require('../controllers/muscle.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const filterFieldsMiddleware = require('../middlewares/filterFieldsMiddleware');
const { ROLES, TABLES } = require('../utils/staticData');

const express = require('express');
const router = express.Router();

// Get all muscles
router.get('/', authMiddleware, MuscleController.getAllMuscles);

// Get a muscle by id
router.get('/:id', authMiddleware, MuscleController.getMuscleById);

// Get muscles by muscle group id
router.get('/muscle-group/:muscleGroupId', authMiddleware, MuscleController.getMusclesByMuscleGroupId);

// Get a muscle by name
router.get('/name/:muscle_name', authMiddleware, MuscleController.getMuscleByName);

// Get muscles by muscle group name
router.get('/muscle-group/name/:muscle_group_name', authMiddleware, MuscleController.getMusclesByMuscleGroupName);

// create a muscle
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN), filterFieldsMiddleware(TABLES.MUSCLE, 'create'),
    MuscleController.createMuscle);

// update a muscle
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), filterFieldsMiddleware(TABLES.MUSCLE, 'update'), MuscleController.updateMuscle);

// delete a muscle
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), MuscleController.deleteMuscle);

module.exports = router;