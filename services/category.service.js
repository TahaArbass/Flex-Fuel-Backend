const Category = require('../models/category.model');
const CustomError = require('../utils/CustomError');

// Category Service
class CategoryService {
    // get all categories
    static async getAllCategories() {
        try {
            return await Category.findAll();
        } catch (error) {
            throw error;
        }
    }

    // get a category by id
    static async getCategoryById(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category)
                throw new CustomError(`Category not found`, 404);
            return category;
        } catch (error) {
            throw error;
        }
    }

    // get a category by name
    static async getCategoryByName(name) {
        try {
            const category = await Category.findOne({ where: { category_name: name } });
            if (!category)
                throw new CustomError(`Category not found`, 404);
            return category;
        } catch (error) {
            throw error;
        }
    }

    // create a category
    static async createCategory(category) {
        try {
            return await Category.create(category);
        } catch (error) {
            throw error;
        }
    }

    // update a category
    static async updateCategory(id, category) {
        try {
            const updatedCategory = await Category.findByPk(id);
            if (!updatedCategory)
                throw new CustomError(`Category not found`, 404);

            await updatedCategory.update(category);
            return updatedCategory;
        } catch (error) {
            throw error;
        }
    }

    // delete a category
    static async deleteCategory(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category)
                throw new CustomError(`Category not found`, 404);

            await category.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryService;