const MuscleService = require('../services/muscle.service');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { logInfo } = require('../utils/logger');
const { TABLES } = require('../utils/staticData');

// Muscle Controller 
class MuscleController {
    // get all muscles
    static async getAllMuscles(req, res, next) {
        try {
            logInfo(req, 'info');
            const muscles = await MuscleService.getAllMuscles();

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscles);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get a muscle by id
    static async getMuscleById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Muscle id is required', 400);
            }
            const muscle = await MuscleService.getMuscleById(id);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscle);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get muscles by muscle group id
    static async getMusclesByMuscleGroupId(req, res, next) {
        try {
            logInfo(req, 'info');
            const muscleGroupId = req.params.muscleGroupId;
            if (!muscleGroupId) {
                throw new CustomError('Muscle group id is required', 400);
            }
            const muscles = await MuscleService.getMusclesByMuscleGroupId(muscleGroupId);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscles);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get a muscle by name
    static async getMuscleByName(req, res, next) {
        try {
            logInfo(req, 'info');
            const name = req.params.muscle_name;
            if (!name) {
                throw new CustomError('Muscle name is required', 400);
            }
            const muscle = await MuscleService.getMuscleByName(name);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscle);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // get muscles by muscle group name
    static async getMusclesByMuscleGroupName(req, res, next) {
        try {
            logInfo(req, 'info');
            const muscleGroupName = req.params.muscle_group_name;
            if (!muscleGroupName) {
                throw new CustomError('Muscle group name is required', 400);
            }
            const muscles = await MuscleService.getMusclesByMuscleGroupName(muscleGroupName);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscles);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // create a muscle
    static async createMuscle(req, res, next) {
        try {
            logInfo(req, 'info');
            const data = req.body;
            const muscle = await MuscleService.createMuscle(data);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscle);

            res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // update a muscle
    static async updateMuscle(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Muscle id is required', 400);
            }
            const muscle_data = req.body;
            const muscle = await MuscleService.updateMuscle(id, muscle_data);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.MUSCLE, role, muscle);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // delete a muscle
    static async deleteMuscle(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            if (!id) {
                throw new CustomError('Muscle id is required', 400);
            }
            await MuscleService.deleteMuscle(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MuscleController;