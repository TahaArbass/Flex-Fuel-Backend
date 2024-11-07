const CategoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const filterFieldsMiddleware = require('../middlewares/filterFieldsMiddleware');
const { TABLES, ROLES, ACTIONS } = require('../utils/staticData');

const router = require('express').Router();

// get all categories
router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.getAllCategories);

// get a category by id
router.get('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.getCategoryById);

// get a category by name
router.get('/name/:category_name', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.getCategoryByName);

// create a category
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.CATEGORY, ACTIONS.CREATE),
    CategoryController.createCategory);

// update a category
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN),
    filterFieldsMiddleware(TABLES.CATEGORY, ACTIONS.UPDATE),
    CategoryController.updateCategory);

// delete a category
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.deleteCategory);

module.exports = router;