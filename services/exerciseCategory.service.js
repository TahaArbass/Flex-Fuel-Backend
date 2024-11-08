const ExerciseCategory = require('../models/exerciseCategory.model');
const CustomError = require('../utils/errors/customError');
const CategoryService = require('./category.service');
const ExerciseService = require('./exercise.service');

// Exercise Category Service
class ExerciseCategoryService {
    // get all exercise categories
    static async getAllExerciseCategories() {
        try {
            return await ExerciseCategory.findAll();
        } catch (error) {
            throw error;
        }
    }

    // get an exercise category by id
    static async getExerciseCategoryById(id) {
        try {
            const exerciseCategory = await ExerciseCategory.findByPk(id);
            if (!exerciseCategory)
                throw new CustomError(`Exercise Category not found`, 404);
            return exerciseCategory;
        } catch (error) {
            throw error;
        }
    }

    // get exercise categories by exercise id
    static async getExerciseCategoriesByExerciseId(exerciseId) {
        try {
            const exerciseCategories = await ExerciseCategory.findAll({ where: { exercise_id: exerciseId } });
            if (exerciseCategories.length === 0)
                throw new CustomError(`Exercise Categories not found for this exercise`, 404);

            return exerciseCategories;
        } catch (error) {
            throw error;
        }
    }

    // get exercise categories by category id
    static async getExerciseCategoriesByCategoryId(categoryId) {
        try {
            const exerciseCategories = await ExerciseCategory.findAll({ where: { category_id: categoryId } });
            if (exerciseCategories.length === 0)
                throw new CustomError(`Exercise Categories not found for this category`, 404);

            return exerciseCategories;
        } catch (error) {
            throw error;
        }
    }

    // create an exercise category
    static async createExerciseCategory(exerciseCategory) {
        try {
            const { exercise_id, category_id } = exerciseCategory;
            // check if the category exists
            await CategoryService.getCategoryById(category_id);
            // check if the exercise exists
            await ExerciseService.getExerciseById(exercise_id);

            // check if the exercise category exists
            const existingExerciseCategory = await ExerciseCategory.findOne({ where: { exercise_id, category_id } });
            if (existingExerciseCategory)
                throw new CustomError(`Exercise Category already exists`, 400);

            return await ExerciseCategory.create(exerciseCategory);
        } catch (error) {
            throw error;
        }
    }

    // update an exercise category
    static async updateExerciseCategory(id, exerciseCategory) {
        try {
            const updatedExerciseCategory = await ExerciseCategory.findByPk(id);
            if (!updatedExerciseCategory)
                throw new CustomError(`Exercise Category not found`, 404);
            // check if the category exists
            await CategoryService.getCategoryById(category_id);
            // check if the exercise exists
            await ExerciseService.getExerciseById(exercise_id);

            await updatedExerciseCategory.update(exerciseCategory);
            return updatedExerciseCategory;
        } catch (error) {
            throw error;
        }
    }

    // delete an exercise category
    static async deleteExerciseCategory(id) {
        try {
            const exerciseCategory = await ExerciseCategory.findByPk(id);
            if (!exerciseCategory)
                throw new CustomError(`Exercise Category not found`, 404);

            await exerciseCategory.destroy();
            return exerciseCategory;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ExerciseCategoryService;