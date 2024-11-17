const Muscle = require('../models/muscle.model');
const MuscleGroupService = require('./muscleGroup.service');
const CustomError = require('../utils/errors/customError');

// Service class for the Muscle model
class MuscleService {
    // get all muscles
    static async getAllMuscles() {
        try {
            return await Muscle.findAll();
        } catch (error) {
            throw error;
        }
    }

    // get a muscle by id
    static async getMuscleById(id) {
        try {
            const muscle = await Muscle.findByPk(id);
            if (!muscle)
                throw new CustomError(`Muscle not found`, 404);
            return muscle;
        } catch (error) {
            throw error;
        }
    }

    // get muscles by muscle group id
    static async getMusclesByMuscleGroupId(muscleGroupId) {
        try {
            const muscles = await Muscle.findAll({ where: { muscle_group_id: muscleGroupId } });
            if (!muscles)
                throw new CustomError(`Muscles not found for this muscle group`, 404);

            return muscles;
        } catch (error) {
            throw error;
        }
    }

    // get a muscle by name
    static async getMuscleByName(name) {
        try {
            const muscle = await Muscle.findOne({ where: { muscle_name: name } });
            if (!muscle)
                throw new CustomError(`Muscle not found`, 404);
            return muscle;
        } catch (error) {
            throw error;
        }
    }

    // get muscles by muscle group name
    static async getMusclesByMuscleGroupName(muscleGroupName) {
        try {
            const muscleGroup = await MuscleGroupService.getMuscleGroupByName(muscleGroupName);
            const muscles = await Muscle.findAll({
                where: { muscle_group_id: muscleGroup.id }
            })
            if (!muscles)
                throw new CustomError('Muscles not found', 404);

            return muscles;
        } catch (error) {
            throw error;
        }
    }

    // create a new muscle
    static async createMuscle(data) {
        try {
            const muscleGroup = await MuscleGroupService.getMuscleGroupById(data.muscle_group_id);
            if (!muscleGroup)
                throw new CustomError('Muscle group not found', 404);

            const muscle = await Muscle.create(data);
            return muscle;
        } catch (error) {
            throw error;
        }
    }

    // update a muscle
    static async updateMuscle(id, data) {
        try {
            const updatedMuscle = await Muscle.findByPk(id);
            if (!updatedMuscle)
                throw new CustomError('Muscle not found ', 404);
            return await updatedMuscle.update(data);
        }
        catch (error) {
            throw error;
        }
    }

    // delete a muscle
    static async deleteMuscle(id) {
        try {
            const deletedMuslce = await Muscle.findByPk(id);
            if (!deletedMuslce)
                throw new CustomError('Muscle not found', 404);

            await deletedMuslce.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MuscleService;