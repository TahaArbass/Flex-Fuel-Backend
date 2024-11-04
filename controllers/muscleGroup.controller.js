const MuscleGroupService = require('../services/muscleGroup.service');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');

// This file contains the muscle group controller.
class MuscleGroupController {

    // Create a new muscle group
    static async createMuscleGroup(req, res, next) {
        try {
            logInfo(req, 'info');
            const data = req.body;
            const muscleGroup = await MuscleGroupService.createMuscleGroup(data);

            const role = req.user.role;
            // Filter the response data
            const filteredData = filterGetRequestsData(TABLES.MUSCLE_GROUP, role, muscleGroup);
            res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async updateMuscleGroup(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            const data = req.body;
            const muscleGroup = await MuscleGroupService.updateMuscleGroup(id, data);

            const role = req.user.role;
            // Filter the response data
            const filteredData = filterGetRequestsData(TABLES.MUSCLE_GROUP, role, muscleGroup);

            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async getAllMuscleGroups(req, res, next) {
        try {
            logInfo(req, 'info');
            const muscleGroups = await MuscleGroupService.getAllMuscleGroups();
            const role = req.user.role;
            // Filter the response data
            const filteredData = filterGetRequestsData(TABLES.MUSCLE_GROUP, role, muscleGroups);

            res.status(200).json(filteredData)
        } catch (error) {
            next(error);
        }
    }

    static async getMuscleGroupById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            const muscleGroup = await MuscleGroupService.getMuscleGroupById(id);
            const role = req.user.role;
            // Filter the response data
            const filteredData = filterGetRequestsData(TABLES.MUSCLE_GROUP, role, muscleGroup);

            res.status(200).json(filteredData)
        } catch (error) {
            next(error);
        }
    }

    static async getMuscleGroupByMuscleName(req, res, next) {
        try {
            logInfo(req, 'info');
            const name = req.params.muscle_group_name;
            const muscleGroup = await MuscleGroupService.getMuscleGroupByName(name);

            const role = req.user.role;
            // Filter the response data
            const filteredData = filterGetRequestsData(TABLES.MUSCLE_GROUP, role, muscleGroup);

            res.status(200).json(filteredData)
        } catch (error) {
            next(error);
        }
    }

    static async deleteMuscleGroup(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            await MuscleGroupService.deleteMuscleGroup(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MuscleGroupController;