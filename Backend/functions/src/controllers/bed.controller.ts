
import { db } from '../http';
import { Bed } from '../models/bed.model';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
const admin = require('firebase-admin');
const hospitalRepository = getRepository(Hospital);

module.exports = {
    /**
    * `GETS` all beds of the collection.
    *
    * @returns The list of beds retrieved
    */
    getAllBeds: async (req, res) => {
        try {
            const beds = [];

            const bedsSnapshot = await db.collectionGroup('beds').get();
            bedsSnapshot.docs.forEach(element => {
                const bed: Bed = {
                    id: element.data().id,
                    description: element.data()["description"],
                    status: element.data()["status"],
                    subtype: element.data()["subtype"],
                    type: element.data()["type"],
                    hospitalName: element.data()["hospitalName"],
                    idHospital: element.data()["idHospital"],
                    createdAt: element.data()["createdAt"].toDate(),
                    updatedAt: element.data()["updatedAt"].toDate(),
                }
                beds.push(bed);
            });

            res.status(200).json({ success: true, beds: beds, msg: "Camas obtenidas con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `CREATES` a bed by hospital ID and adds it as a subcollection.
    *
    * @param id - Id of the hospital that will create a bed
    * @body Json with required fields to create a bed
    * 
    * @returns The created bed
    */
    createBedByIdHospital: async (req, res) => {
        try {
            const id = req.params.id;

            const hospital = await hospitalRepository.findById(id);

            if (hospital === null) {
                return res.status(404).json({ success: false, msg: "No se encontró un hospital con ese ID" });
            }

            const bed: Bed = {
                id: "",
                description: req.body.description,
                status: req.body.status,
                type: req.body.type,
                subtype: req.body.subtype,
                idHospital: hospital.id,
                hospitalName: hospital.name,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const bedCreated = await hospital.beds.create(bed);
            hospital.freeBeds = admin.firestore.FieldValue.increment(1);
            await hospitalRepository.update(hospital);

            //res.status(200).json({ success: true, cama: bedCreated, msg: "Cama creada con éxito" });
            res.status(200).json({ success: true, bed: bedCreated, msg: "Cama creada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `UPDATES` a bed by idHospital and idBed.
    *
    * @body Json with fields to update a bed
    * @param idHospital - Id of the hospital that will update a bed
    * @param idBed - Id of the bed that will be updated
    * 
    * @returns The updated bed
    */
    updatebyIds: async (req, res) => {
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

            const bedToUpdate: Bed = {
                id: bed.id,
                idHospital: req.body.idHospital ?? bed.idHospital,
                description: req.body.description ?? bed.description,
                status: req.body.status ?? bed.status,
                type: req.body.type ?? bed.type,
                subtype: req.body.subtype ?? bed.subtype,
                hospitalName: req.body.hospitalName ?? bed.hospitalName,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const bedUpdated = await hospital.beds.update(bedToUpdate);

            // res.status(200).json({ success: true, cama: bedUpdated, msg: "Cama actualizada con éxito" });
            res.status(200).json({ success: true, bed: bedUpdated, msg: "Cama actualizada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` a bed by idHospital and idBed.
    *
    * @param idHospital - Id of the hospital that will delete a bed
    * @param idBed - Id of the bed that will be deleted
    * 
    * @returns The success message
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

            await hospital.beds.delete(idBed);
            return res.status(200).json({ success: true, msg: "Cama eliminada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
}