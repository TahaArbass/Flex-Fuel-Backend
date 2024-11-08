const ExerciseCategoryService = require('../services/exerciseCategory.service');
const CustomError = require('../utils/errors/customError');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');

// Exercise Category Controller
class ExerciseCategoryController {
    // get all exercise categories
    static async getAllExerciseCategories(req, res, next) {
        try {
            logInfo(req, 'info');
            const exerciseCategories = await ExerciseCategoryService.getAllExerciseCategories();
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, exerciseCategories);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get an exercise category by id
    static async getExerciseCategoryById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Exercise Category id is required`, 400);

            const exerciseCategory = await ExerciseCategoryService.getExerciseCategoryById(id);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, exerciseCategory);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get exercise categories by category id
    static async getExerciseCategoriesByCategoryId(req, res, next) {
        try {
            logInfo(req, 'info');
            const categoryId = req.params.category_id;
            if (!categoryId)
                throw new CustomError(`Category id is required`, 400);

            const exerciseCategory = await ExerciseCategoryService.getExerciseCategoriesByCategoryId(categoryId);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, exerciseCategory);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get exercise categories by exercise id
    static async getExerciseCategoriesByExerciseId(req, res, next) {
        try {
            logInfo(req, 'info');
            const exerciseId = req.params.exercise_id;
            if (!exerciseId)
                throw new CustomError(`Exercise id is required`, 400);

            const exerciseCategory = await ExerciseCategoryService.getExerciseCategoriesByExerciseId(exerciseId);

            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, exerciseCategory);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }


    // create an exercise category
    static async createExerciseCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const exerciseCategory = req.body;
            const newExerciseCategory = await ExerciseCategoryService.createExerciseCategory(exerciseCategory);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, newExerciseCategory);
            return res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // update an exercise category
    static async updateExerciseCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Exercise Category id is required`, 400);

            const exerciseCategory = req.body;
            const updatedExerciseCategory = await ExerciseCategoryService.updateExerciseCategory(id, exerciseCategory);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.EXERCISE_CATEGORY, req.user.role, updatedExerciseCategory);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // delete an exercise category
    static async deleteExerciseCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Exercise Category id is required`, 400);

            await ExerciseCategoryService.deleteExerciseCategory(id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ExerciseCategoryController;