import '../http';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
import { validationResult } from 'express-validator/check';
import { AccidentOrDisease } from '../models/accidentOrDisease.model';
const admin = require('firebase-admin');
const hospitalRepository = getRepository(Hospital);
const accidentOrDiseaseRepository = getRepository(AccidentOrDisease);
import { getDistance, isPointWithinRadius } from 'geolib';

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
    * `GETS` the closest hospitals by lat long.
    *
    * @returns The list of hospitals retrieved
    */
    getClosestHospitals: async (req, res) => {
        const distance = 20000;
        let matchedHospitals: Hospital[] = [];
        const hospitals = await hospitalRepository.whereEqualTo("atentionLevel", req.body.atentionLevel).find();
        //first we test origins and destinations
        for (const hospital of hospitals) {
            if (isPointWithinRadius({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
                { latitude: hospital.location.latitude, longitude: hospital.location.longitude, }, distance)) {
                // In meters
                const distance: number = getDistance({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
                    { latitude: hospital.location.latitude, longitude: hospital.location.longitude, });
                console.log(distance);
                matchedHospitals.push(hospital)
            };
        }

        matchedHospitals.sort((a, b) => (getDistance({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
            { latitude: a.location.latitude, longitude: a.location.longitude, }) > getDistance({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
                { latitude: b.location.latitude, longitude: b.location.longitude, }) ? -1 : 1));

        res.status(200).json({ success: true, hospitals: matchedHospitals, msg: "Hospitales obtenidos con éxito" });
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
    * `ADDS` an AccidentOrDisease.
    *
    * @param idHospital - Id of the hospital that will add a HealthInsurance
    * @param idAccidentOrDisease - Id of the AccidentOrDisease that will be added
    * 
    * @returns The added AccidentOrDisease
    */
    addToAccidentOrDiseaseByIds: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const idHospital = req.params.idHospital;
            const idAccidentOrDisease = req.params.idAccidentOrDisease;
            const hospital = await hospitalRepository.findById(idHospital);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const accidentOrDisease = await accidentOrDiseaseRepository.findById(idAccidentOrDisease);

            if (accidentOrDisease === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un accidente o enfermedad con ese ID" });
            }

            const accidentOrDiseaseToAdd: AccidentOrDisease = {
                id: accidentOrDisease.id,
                description: accidentOrDisease.description,
            }

            const accidentOrDiseaseAdded = await hospital.accidentOrDiseases.create(accidentOrDiseaseToAdd);

            res.status(200).json({ success: true, obraSocial: accidentOrDiseaseAdded, msg: "Accidente o enfermedad agregado con éxito" });
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