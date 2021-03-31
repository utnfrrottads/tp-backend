import '../http';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
import { AccidentOrDisease } from '../models/accidentOrDisease.model';
const admin = require('firebase-admin');
import { HealthInsurance } from '../models/healthInsurance.model';
const hospitalRepository = getRepository(Hospital);
const accidentOrDiseaseRepository = getRepository(AccidentOrDisease);
const healthInsuranceRepository = getRepository(HealthInsurance);
import { getDistance, isPointWithinRadius } from 'geolib';

module.exports = {
    /**
    * `GETS` all hospitals of the collection.
    *
    * @returns The list of hospitals retrieved
    */
    getAllHospitals: async (req, res) => {
        try {
            const hospitalsSnapshot = await hospitalRepository.find();

            res.status(200).json({ success: true, hospitals: hospitalsSnapshot, msg: "Hospitales obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `GETS` all hospitals by Insurance.
    *
    * @returns The list of hospitals retrieved
    */
    getHospitalsByHealthInsurance: async (req, res) => {
        try {
            const idHealthInsurance = req.params.idHealthInsurance;
            const hospitalsIndexesToRemove = [];
            let matchedHospitals: Hospital[] = [];
            const hospitalsToFilter = await hospitalRepository.find();

            console.log("idHealthInsurance: " + idHealthInsurance);
            console.log("Lenght: " + hospitalsToFilter.length);

            async function filterHospitalsByInsuranceAndDisease(hospitalsToFilter) {
                // Filters by healthInsurance and accidentOrDisease
                for (let index = 0; index < hospitalsToFilter.length; index++) {
                    const healthInsuranceMatch = await hospitalsToFilter[index].healthInsurances.findById(idHealthInsurance);
                    if (!healthInsuranceMatch) {
                        hospitalsIndexesToRemove.push(index);
                    }
                }
                // Removes hospitals that don't match healthInsurance or accidentOrDisease
                for (const hospitalToRemove of hospitalsIndexesToRemove) {
                    delete hospitalsToFilter[hospitalToRemove];
                }
                matchedHospitals = hospitalsToFilter.filter(() => true);
            }

            await filterHospitalsByInsuranceAndDisease(hospitalsToFilter);

            res.status(200).json({ success: true, hospitals: matchedHospitals, msg: "Hospitales obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `GETS` all hospitals by Insurance and AccidentOrDisease.
    *
    * @returns The list of hospitals retrieved
    */
    getHospitalsByHealthInsuranceAndAccidentOrDisease: async (req, res) => {
        try {
            const idAccidentOrDisease = req.params.idAccidentOrDisease;
            const idHealthInsurance = req.params.idHealthInsurance;
            const hospitalsIndexesToRemove = [];
            let matchedHospitals: Hospital[] = [];
            const hospitalsToFilter = await hospitalRepository.find();

            console.log("idHealthInsurance: " + idHealthInsurance);
            console.log("idAccidentOrDisease: " + idAccidentOrDisease);
            console.log("Lenght: " + hospitalsToFilter.length);

            async function filterHospitalsByInsuranceAndDisease(hospitalsToFilter) {
                // Filters by healthInsurance and accidentOrDisease
                for (let index = 0; index < hospitalsToFilter.length; index++) {
                    const healthInsuranceMatch = await hospitalsToFilter[index].healthInsurances.findById(idHealthInsurance);
                    const accidentOrDiseaseMatch = await hospitalsToFilter[index].accidentOrDiseases.findById(idAccidentOrDisease);
                    if (!healthInsuranceMatch || !accidentOrDiseaseMatch) {
                        hospitalsIndexesToRemove.push(index);
                    }
                }
                // Removes hospitals that don't match healthInsurance or accidentOrDisease
                for (const hospitalToRemove of hospitalsIndexesToRemove) {
                    delete hospitalsToFilter[hospitalToRemove];
                }
                matchedHospitals = hospitalsToFilter.filter(() => true);
            }

            await filterHospitalsByInsuranceAndDisease(hospitalsToFilter);

            res.status(200).json({ success: true, hospitals: matchedHospitals, msg: "Hospitales obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `GETS` the closest hospitals by lat long.
    * Filters by freeBeds, idHealthInsurance, idAccidentOrDisease
    *
    * @returns The list of hospitals retrieved ordered by closest one
    */
    getClosestHospitals: async (req, res) => {
        const idHealthCareInsurance = req.body.idHealthInsurance;
        const idAccidentOrDisease = req.body.idAccidentOrDisease;
        const distance = 20000;
        let matchedHospitals: Hospital[] = [];
        const hospitalsIndexesToRemove = [];
        const hospitalsToFilter = await hospitalRepository.whereEqualTo("atentionLevel", req.body.atentionLevel).whereGreaterThan("freeBeds", 0).find();

        console.log("idHealthCareInsurance: " + idHealthCareInsurance);
        console.log("idAccidentOrDisease: " + idAccidentOrDisease);
        console.log("Lenght: " + hospitalsToFilter.length);

        async function filterHospitalsByInsuranceAndDisease(hospitalsToFilter) {
            // Filters by healthInsurance and accidentOrDisease
            for (let index = 0; index < hospitalsToFilter.length; index++) {
                const healthInsuranceMatch = await hospitalsToFilter[index].healthInsurances.findById(idHealthCareInsurance);
                const accidentOrDiseaseMatch = await hospitalsToFilter[index].accidentOrDiseases.findById(idAccidentOrDisease);
                if (!healthInsuranceMatch || !accidentOrDiseaseMatch) {
                    hospitalsIndexesToRemove.push(index);
                }
            }
            // Removes hospitals that don't match healthInsurance or accidentOrDisease
            for (const hospitalToRemove of hospitalsIndexesToRemove) {
                delete matchedHospitals[hospitalToRemove];
            }
            matchedHospitals = hospitalsToFilter.filter(() => true);
        }

        // Filters by radius
        for (const hospital of hospitalsToFilter) {
            if (isPointWithinRadius({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
                { latitude: hospital.location.latitude, longitude: hospital.location.longitude, }, distance)) {
                matchedHospitals.push(hospital)
            }
        }

        // Filters by healthInsurance and accidentOrDisease
        await filterHospitalsByInsuranceAndDisease(matchedHospitals);

        // Sorts by distance
        matchedHospitals.sort((a, b) => (getDistance({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
            { latitude: a.location.latitude, longitude: a.location.longitude, }) > getDistance({ latitude: req.body.emergency.latitude, longitude: req.body.emergency.longitude },
                { latitude: b.location.latitude, longitude: b.location.longitude, }) ? -1 : 1));

        res.status(200).json({ success: true, hospitals: matchedHospitals, msg: "Hospitales obtenidos con éxito" });
    },
    /**
    * `GETS` all AccidentOrDiseases of the Hospital.
    *
    * @returns The list of AccidentOrDiseases retrieved
    */
    getAllAccidentsOrDiseasesById: async (req, res) => {
        const idHospital = req.params.idHospital;
        try {
            const hospitalsSnapshot = await hospitalRepository.findById(idHospital);
            const accidentOrDiseases = await hospitalsSnapshot.accidentOrDiseases.find();

            res.status(200).json({ success: true, accidentOrDiseases: accidentOrDiseases, msg: "Accidentes o enermedades obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `GETS` all HealthInsurances of the Hospital.
    *
    * @returns The list of HealthInsurances retrieved
    */
    getAllHealthInsurancesById: async (req, res) => {
        const idHospital = req.params.idHospital;
        try {
            const hospitalsSnapshot = await hospitalRepository.findById(idHospital);
            const healthInsurances = await hospitalsSnapshot.healthInsurances.find();

            res.status(200).json({ success: true, healthInsurances: healthInsurances, msg: "Obras sociales obtenidas con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `GETS` all Beds of the Hospital.
    *
    * @returns The list of Beds retrieved
    */
    getAllBedsById: async (req, res) => {
        const idHospital = req.params.idHospital;
        try {
            const hospitalsSnapshot = await hospitalRepository.findById(idHospital);
            const beds = await hospitalsSnapshot.beds.find();

            res.status(200).json({ success: true, beds: beds, msg: "Camas obtenidas con éxito" });
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
    createHospital: async (req, res) => {
        try {
            const hospital: Hospital = {
                id: "",
                address: req.body.address,
                freeBeds: 0,
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
    addToAccidentOrDiseaseByIds: async (req, res) => {
        try {
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
                idHospital: hospital.id,
                description: accidentOrDisease.description,
            }

            const accidentOrDiseaseAdded = await hospital.accidentOrDiseases.create(accidentOrDiseaseToAdd);

            res.status(200).json({ success: true, obraSocial: accidentOrDiseaseAdded, msg: "Accidente o enfermedad agregado con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` an AccidentOrDisease.
    *
    * @param idHospital - Id of the hospital that will delete a HealthInsurance
    * @param idAccidentOrDisease - Id of the AccidentOrDisease that will be deleted
    * 
    * @returns The deleted AccidentOrDisease
    */
    deleteAccidentOrDiseaseByIds: async (req, res) => {
        try {
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
            await hospital.accidentOrDiseases.delete(accidentOrDisease.id);

            res.status(200).json({ success: true, accidentOrDisease: accidentOrDisease, msg: "Accidente o enfermedad eliminado con éxito" });
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
    updateHospitalById: async (req, res) => {
        try {
            const id = req.params.id;

            const hospital = await hospitalRepository.findById(id);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const hospitalToUpdate: Hospital = {
                id: hospital.id,
                freeBeds: req.body.freeBeds ?? hospital.freeBeds,
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
    * `DELETES` a HealthInsurance.
    *
    * @param idHospital - Id of the hospital that will delete a HealthInsurance
    * @param idHealthInsurance - Id of the HealthInsurance that will be deleted
    * 
    * @returns The deleted HealthInsurance
    */
    deleteHealthInsuranceByIds: async (req, res) => {
        try {
            const idHospital = req.params.idHospital;
            const idHealthInsurance = req.params.idHealthInsurance;
            const hospital = await hospitalRepository.findById(idHospital);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const healthInsurance = await healthInsuranceRepository.findById(idHealthInsurance);

            if (healthInsurance === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un accidente o enfermedad con ese ID" });
            }
            await hospital.healthInsurances.delete(healthInsurance.id);

            res.status(200).json({ success: true, healthInsurance: healthInsurance, msg: "Obra social eliminada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` a Bed.
    *
    * @param idHospital - Id of the hospital that will delete a Bed
    * @param idBed - Id of the Bed that will be deleted
    * 
    * @returns The deleted Bed
    */
    deleteBedByIds: async (req, res) => {
        try {
            const idHospital = req.params.idHospital;
            const idBed = req.params.idBed;
            const hospital = await hospitalRepository.findById(idHospital);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const bed = await hospital.beds.findById(idBed);

            if (bed === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una cama con ese ID" });
            }
            await hospital.beds.delete(bed.id);

            res.status(200).json({ success: true, bed: bed, msg: "Cama eliminada con éxito" });
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
    deleteHospitalById: async (req, res) => {
        try {
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