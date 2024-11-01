const muscleGroup = require('../models/muscleGroup.model');

class MuscleGroupService {
    static async createMuscleGroup(data) {
        try {
            return await muscleGroup.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async getAllMuscleGroups() {
        try {
            return await muscleGroup.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getMuscleGroupById(id) {
        try {
            if (!id) return null;
            return await muscleGroup.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

}