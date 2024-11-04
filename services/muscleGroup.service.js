/* Muscle Group Service 
    This service contains functions to 
    create, update, get all, get by id, get by name and delete muscle groups
*/

const MuscleGroup = require('../models/muscleGroup.model');
const CustomError = require('../utils/errors/customError');
class MuscleGroupService {
    // function to create a muscle group
    static async createMuscleGroup(data) {
        try {
            return await MuscleGroup.create(data);
        } catch (error) {
            throw error;
        }
    }

    // function to update a muscle group
    static async updateMuscleGroup(id, data) {
        try {
            const muscleGroup = await MuscleGroup.findByPk(id);
            if (!muscleGroup) {
                throw new CustomError('Muscle group not found', 404);
            } else {
                return await muscleGroup.update(data);
            }
        } catch (error) {
            throw error;
        }
    }

    // function to get all muscle groups
    static async getAllMuscleGroups() {
        try {
            return await MuscleGroup.findAll();
        } catch (error) {
            throw error;
        }
    }

    // function to get a muscle group by id
    static async getMuscleGroupById(id) {
        try {
            const muscleGroup = await MuscleGroup.findByPk(id);
            if (!muscleGroup) {
                throw new CustomError('Muscle group not found', 404);
            } else {
                return muscleGroup;
            }
        } catch (error) {
            throw error;
        }
    }

    // function to get a muscle group by name
    static async getMuscleGroupByName(muscle_group_name) {
        try {
            const muscleGroup = await MuscleGroup.findOne({ where: { muscle_group_name } });
            if (!muscleGroup) {
                throw new CustomError('Muscle group not found', 404);
            } else {
                return muscleGroup;
            }
        } catch (error) {
            throw error;
        }
    }

    // function to delete a muscle group
    static async deleteMuscleGroup(id) {
        try {
            const muscleGroup = await MuscleGroup.findByPk(id);
            if (!muscleGroup) {
                throw new CustomError('Muscle group not found', 404);
            } else {
                return await muscleGroup.destroy();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MuscleGroupService;