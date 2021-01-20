import '../http';
import { Person } from '../models/person.model';
import { getRepository } from 'fireorm';
import { validationResult } from 'express-validator/check';
import { HealthInsurance } from '../models/healthInsurance.model';

const healthInsuranceRepository = getRepository(HealthInsurance);
const admin = require('firebase-admin');
const personRepository = getRepository(Person);

module.exports = {
    /**
    * `GETS` all persons of the collection.
    *
    * @returns The list of persons retrieved
    */
    getAllPersons: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const personsSnapshot = await personRepository.find();

            res.status(200).json({ success: true, persons: personsSnapshot, msg: "Hospitales obtenidos con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `CREATES` a person.
    *
    * @body Json with required fields to create a person
    * 
    * @returns The created person
    */
    createPerson: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const person: Person = {
                id: "",
                dni: req.body.dni,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bornDate: req.body.bornDate,
                gender: req.body.gender,
                phone: req.body.phone, 
                bloodType: req.body.bloodType ?? null,
                emergencyContact: req.body.emergencyContact ?? null,
                nurseWorkId: req.body.nurseWorkId ?? null,
                user: req.body.user ?? null,
                password: req.body.password ?? null,

                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const personCreated = await personRepository.create(person);

            res.status(200).json({ success: true, persona: personCreated, msg: "Persona creada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `ADDS` an HealthInsurance.
    *
    * @param idPerson - Id of the person that will add a HealthInsurance
    * @param idHealthInsurance - Id of the HealthInsurance that will be added
    * 
    * @returns The added HealthInsurance
    */
    addToHealthInsuranceByIds: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const idPerson = req.params.idPerson;
            const idHealthInsurance = req.params.idHealthInsurance;
            const person = await personRepository.findById(idPerson);

            if (person === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una persona con ese ID" });
            }

            const healthInsurance = await healthInsuranceRepository.findById(idHealthInsurance);

            if (healthInsurance === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una obra social con ese ID" });
            }

            const healthInsuranceToAdd: HealthInsurance = {
                id: healthInsurance.id,
                legalName: healthInsurance.legalName,
                fantasyName: healthInsurance.fantasyName,
                phone: healthInsurance.phone,
                createdAt: healthInsurance.createdAt,
                updatedAt: healthInsurance.updatedAt,
            }

            const healthInsuranceAdded = await person.healthInsurances.create(healthInsuranceToAdd);

            res.status(200).json({ success: true, obraSocial: healthInsuranceAdded, msg: "Obra social  agregada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `UPDATES` a person by ID.
    *
    * @body Json with fields to update a person
    * @param id - Id of the person that will be updated
    * 
    * @returns The updated person
    */
    updatePersonById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;

            const person = await personRepository.findById(id);

            if (person === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una persona con ese ID" });
            }

            const personToUpdate: Person = {
                id: person.id,
                dni: req.body.dni ?? person.dni,
                firstName: req.body.firstName ?? person.firstName,
                lastName: req.body.lastName ?? person.lastName,
                bornDate: req.body.bornDate ?? person.bornDate,
                gender: req.body.gender ?? person.gender,
                phone: req.body.phone ?? person.phone,
                bloodType: req.body.bloodType ?? person.bloodType ?? null,
                emergencyContact: req.body.emergencyContact ?? person.emergencyContact ?? null,
                nurseWorkId: req.body.nurseWorkId ?? person.nurseWorkId ?? null,
                user: req.body.user ?? person.user ?? null,
                password: req.body.password ?? person.password ?? null,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            }

            const personUpdated = await personRepository.update(personToUpdate);

            res.status(200).json({ success: true, person: personUpdated, msg: "Persona actualizada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
    /**
    * `DELETES` a person by ID.
    *
    * @param id - Id of the person that will be deleted
    * 
    * @returns The success message
    */
    deletePersonById: async (req, res, next) => {
        try {
            // Checks if there's errors on the body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
            }

            const id = req.params.id;
            const person = await personRepository.findById(id);

            if (person === null) {
                return res.status(404).json({ success: false, msg: "No se encontró una persona con ese ID" });
            }

            await personRepository.delete(id);
            return res.status(200).json({ success: true, msg: "Persona eliminada con éxito" });
        } catch (e) {
            res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
        }
    },
}
