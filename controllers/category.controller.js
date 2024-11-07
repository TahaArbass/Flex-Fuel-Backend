const CategoryService = require('../services/category.service');
const CustomError = require('../utils/CustomError');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');

// Category Controller
class CategoryController {
    // get all categories
    static async getAllCategories(req, res, next) {
        try {
            logInfo(req, 'info');
            const categories = await CategoryService.getAllCategories();
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.CATEGORY, req.user.role, categories);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get a category by id
    static async getCategoryById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Category id is required`, 400);

            const category = await CategoryService.getCategoryById(id);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.CATEGORY, req.user.role, category);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get a category by name
    static async getCategoryByName(req, res, next) {
        try {
            logInfo(req, 'info');
            const name = req.params.category_name;
            if (!name)
                throw new CustomError(`Category name is required`, 400);
            const category = await CategoryService.getCategoryByName(name);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.CATEGORY, req.user.role, category);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // create a category
    static async createCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const category = req.body;
            const newCategory = await CategoryService.createCategory(category);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.CATEGORY, req.user.role, newCategory);
            return res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // update a category
    static async updateCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Category id is required`, 400);

            const category = req.body;
            const updatedCategory = await CategoryService.updateCategory(id, category);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.CATEGORY, req.user.role, updatedCategory);
            return res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // delete a category
    static async deleteCategory(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id)
                throw new CustomError(`Category id is required`, 400);

            await CategoryService.deleteCategory(id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;