const ExerciseService = require('../services/exercise.service');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');
const CustomError = require('../utils/errors/customError');
// Exercise Controller
class ExerciseController {
    // get all exercises
    static async getAllExercises(req, res, next) {
        try {
            logInfo(req, 'info');
            const exercises = await ExerciseService.getAllExercises();
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, exercises);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get an exercise by id
    static async getExerciseById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Please provide an id', 400);
            }
            const exercise = await ExerciseService.getExerciseById(id);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, exercise);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get exercises by targeted muscle id
    static async getExercisesByTargetedMuscleId(req, res, next) {
        try {
            logInfo(req, 'info');
            const targetedMuscleId = req.params.targetedMuscleId;
            if (!targetedMuscleId) {
                throw new CustomError('Please provide a targeted muscle id', 400);
            }
            const exercises = await ExerciseService.getExercisesByTargetedMuscleId(targetedMuscleId);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, exercises);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get an exercise by name
    static async getExerciseByName(req, res, next) {
        try {
            logInfo(req, 'info');
            const name = req.params.exercise_name;
            if (!name) {
                throw new CustomError('Please provide a name', 400);
            }
            const exercise = await ExerciseService.getExerciseByName(name);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, exercise);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get exercises by muscle group name
    static async getExercisesByMuscleGroupName(req, res, next) {
        try {
            logInfo(req, 'info');
            const muscleGroupName = req.params.muscle_group_name;
            if (!muscleGroupName) {
                throw new CustomError('Please provide a muscle group name', 400);
            }
            const exercises = await ExerciseService.getExercisesByMuscleGroupName(muscleGroupName);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, exercises);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // create an exercise
    static async createExercise(req, res, next) {
        try {
            logInfo(req, 'info');
            const data = req.body;
            console.log(data);
            const newExercise = await ExerciseService.createExercise(data);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, newExercise);
            return res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // update an exercise
    static async updateExercise(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Please provide an id', 400);
            }
            const data = req.body;
            const updatedExercise = await ExerciseService.updateExercise(id, data);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE, req.user.role, updatedExercise);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // delete an exercise
    static async deleteExercise(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Please provide an id', 400);
            }
            await ExerciseService.deleteExercise(id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ExerciseController;