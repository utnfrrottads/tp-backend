
import '../http';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
import { validationResult } from 'express-validator/check';
const admin = require('firebase-admin');
const hospitalRepository = getRepository(Hospital);

module.exports = {
    /**
    * `GETS` all hospitals of the collection.
    *
    * @returns The list of hospitals retrieved
    */
    getAllHospitals: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }
            
            const hospitalsSnapshot = await hospitalRepository.find();            

            res.status(200).json({ success: true, hospitals: hospitalsSnapshot, msg: "Hospitales obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `CREATES` a hospital.
    *
    * @body Json with required fields to create a hospital
    * 
    * @returns The created hospital
    */
    createHospital: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const hospital: Hospital = {
                id: "",
                address: req.body.address,
                atentionLevel: req.body.atentionLevel,
                locality: req.body.locality,
                location: new admin.firestore.GeoPoint(req.body.location.latitude, req.body.location.longitude),
                name: req.body.name,
                phone: req.body.phone,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const hospitalCreated = await hospitalRepository.create(hospital);

            res.status(200).json({ success: true, hospital: hospitalCreated, msg: "Hospital creado con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `UPDATES` a hospital by ID.
    *
    * @body Json with fields to update a hospital
    * @param id - Id of the hospital that will be updated
    * 
    * @returns The updated hospital
    */
    updateHospitalById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;

            const hospital = await hospitalRepository.findById(id);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const hospitalToUpdate: Hospital = {
                id: hospital.id,
                address: req.body.address ?? hospital.address,
                atentionLevel: req.body.atentionLevel ?? hospital.atentionLevel,
                locality: req.body.locality ?? hospital.locality,
                location: req.body.location ? new admin.firestore.GeoPoint(req.body.location.latitude, req.body.location.longitude) : hospital.location,
                name: req.body.name ?? hospital.name,
                phone: req.body.phone ?? hospital.phone,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const hospitalUpdated = await hospitalRepository.update(hospitalToUpdate);

            res.status(200).json({ success: true, hospital: hospitalUpdated, msg: "Hospital actualizado con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` a hospital by ID.
    *
    * @param id - Id of the hospital that will be deleted
    * 
    * @returns The success message
    */
    deleteHospitalById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;
            const hospital = await hospitalRepository.findById(id);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            await hospitalRepository.delete(id);
            return res.status(200).json({ success: true, msg: "Hospital eliminado con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
}