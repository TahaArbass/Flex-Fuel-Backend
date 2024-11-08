const Exercise = require('../models/exercise.model');
const MuscleService = require('./muscle.service');
const CustomError = require('../utils/errors/customError');

// Exercise Service
class ExerciseService {

    // get all exercises
    static async getAllExercises() {
        try {
            return await Exercise.findAll();
        } catch (error) {
            throw error;
        }
    }

    // get an exercise by id
    static async getExerciseById(id) {
        try {
            const exercise = await Exercise.findByPk(id);
            if (!exercise)
                throw new CustomError(`Exercise not found`, 404);
            return exercise;
        } catch (error) {
            throw error;
        }
    }

    // get exercises by targeted muscle id
    static async getExercisesByTargetedMuscleId(targetedMuscleId) {
        try {
            const exercises = await Exercise.findAll({ where: { targeted_muscle_id: targetedMuscleId } });
            if (!exercises)
                throw new CustomError(`Exercises not found for this muscle`, 404);

            return exercises;
        } catch (error) {
            throw error;
        }
    }

    // get an exercise by name
    static async getExerciseByName(name) {
        try {
            const exercise = await Exercise.findOne({ where: { exercise_name: name } });
            if (!exercise)
                throw new CustomError(`Exercise not found`, 404);
            return exercise;
        } catch (error) {
            throw error;
        }
    }

    // create an exercise
    static async createExercise(exercise) {
        try {
            const muscle = await MuscleService.getMuscleById(exercise.targeted_muscle_id);
            if (!muscle)
                throw new CustomError(`Muscle not found`, 404);

            return await Exercise.create(exercise);
        } catch (error) {
            throw error;
        }
    }

    // update an exercise
    static async updateExercise(id, exercise) {
        try {
            const exerciseToUpdate = await Exercise.findByPk(id);
            if (!exerciseToUpdate)
                throw new CustomError(`Exercise not found`, 404);
            const targetedMuscle = await MuscleService.getMuscleById(exercise.targeted_muscle_id);

            if (!targetedMuscle)
                throw new CustomError(`Muscle not found`, 404);

            return await exerciseToUpdate.update(exercise);
        } catch (error) {
            throw error;
        }
    }

    // delete an exercise
    static async deleteExercise(id) {
        try {
            const exercise = await Exercise.findByPk(id);
            if (!exercise)
                throw new CustomError(`Exercise not found`, 404);

            return await exercise.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ExerciseService;