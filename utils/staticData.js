const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

const TABLES = {
    USER: 'Users',
    MUSCLE_GROUP: 'MuscleGroups',
    MUSCLE: 'Muscles',
    EXERCISE: 'Exercises',
    CATEGORY: 'Categories',
    EXERCISE_CATEGORY: 'ExerciseCategories',
};

const ACTIONS = {
    CREATE: 'create',
    UPDATE: 'update',
    GET: 'get',
    DELETE: 'delete',
};


module.exports = { ROLES, TABLES, ACTIONS };