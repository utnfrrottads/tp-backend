import '../http';
import { HealthInsurance } from '../models/healthInsurance.model';
import { getRepository } from 'fireorm';
import { validationResult } from 'express-validator/check';
import { Hospital } from '../models/hospital.model';
const admin = require('firebase-admin');
const healthInsuranceRepository = getRepository(HealthInsurance);
const hospitalRepository = getRepository(Hospital);

module.exports = {
    /**
    * `GETS` all HealthInsurances of the collection.
    *
    * @returns The list of HealthInsurances retrieved
    */
    getAllHealthInsurances: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const healthInsurancesSnapshot = await healthInsuranceRepository.find();

            res.status(200).json({ success: true, healthInsurances: healthInsurancesSnapshot, msg: "Obras sociales obtenidas con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `CREATES` a HealthInsurance.
    *
    * @body Json with required fields to create a HealthInsurance
    * 
    * @returns The created HealthInsurance
    */
    createHealthInsurance: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const healthInsurance: HealthInsurance = {
                id: "",
                fantasyName: req.body.fantasyName,
                legalName: req.body.legalName,
                phone: req.body.phone,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const healthInsuranceCreated = await healthInsuranceRepository.create(healthInsurance);

            res.status(200).json({ success: true, HealthInsurance: healthInsuranceCreated, msg: "Obra social creada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `ADDS` an AffiliatedHealthInsurance.
    *
    * @param idHospital - Id of the hospital that will add a HealthInsurance
    * @param idHealthInsurance - Id of the HealthInsurance that will be added
    * 
    * @returns The created AffiliatedHealthInsurance
    */
    addToHospitalByIds: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const idHospital = req.params.idHospital;
            const idHealthInsurance = req.params.idHealthInsurance;
            const hospital = await hospitalRepository.findById(idHospital);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const healthInsurance = await healthInsuranceRepository.findById(idHealthInsurance);

            if (healthInsurance === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una obra social con ese ID" });
            }

            const healthInsuranceToAdd: HealthInsurance = {
                id: healthInsurance.id,
                fantasyName: healthInsurance.fantasyName,
                legalName: healthInsurance.legalName,
                phone: healthInsurance.phone
            }

            const healthInsuranceAdded = await hospital.healthInsurances.create(healthInsuranceToAdd);

            res.status(200).json({ success: true, obraSocial: healthInsuranceAdded, msg: "Obra social agregada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `UPDATES` a HealthInsurance by ID.
    *
    * @body Json with fields to update a HealthInsurance
    * @param id - Id of the HealthInsurance that will be updated
    * 
    * @returns The updated HealthInsurance
    */
    updateHealthInsuranceById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;

            const healthInsurance = await healthInsuranceRepository.findById(id);

            if (healthInsurance === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una obra social con ese ID" });
            }

            const healthInsuranceToUpdate: HealthInsurance = {
                id: healthInsurance.id,
                fantasyName: req.body.fantasyName ?? healthInsurance.fantasyName,
                legalName: req.body.legalName ?? healthInsurance.legalName,
                phone: req.body.phone ?? healthInsurance.phone,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const healthInsuranceUpdated = await healthInsuranceRepository.update(healthInsuranceToUpdate);

            res.status(200).json({ success: true, HealthInsurance: healthInsuranceUpdated, msg: "Obra social actualizada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` a HealthInsurance by ID.
    *
    * @param id - Id of the HealthInsurance that will be deleted
    * 
    * @returns The success message
    */
    deleteHealthInsuranceById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;
            const healthInsurance = await healthInsuranceRepository.findById(id);

            if (healthInsurance === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una obra social con ese ID" });
            }

            await healthInsuranceRepository.delete(id);
            return res.status(200).json({ success: true, msg: "HealthInsurance eliminado con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
}