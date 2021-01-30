import  '../http';
import { Emergency } from '../models/emergency.model';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
import { validationResult } from 'express-validator/check';
import { Person } from '../models/person.model';
import { AccidentOrDisease } from '../models/accidentOrDisease.model';
const admin = require('firebase-admin');
const hospitalRepository = getRepository(Hospital);
const personRepository = getRepository(Person);
const accidentOrDiseaseRepository = getRepository(AccidentOrDisease);
const emergencyRepository = getRepository(Emergency);

module.exports = {
  /**
   * `GETS` all emergencys of the collection.
   *
   * @returns The list of emergencys retrieved
   */
  getAllEmergency: async (req, res, next) => {
    try {
      // Checks if there's errors on the body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({
          success: false,
          errors: errors.mapped(),
          msg: 'Error en alguno de los datos recibidos',
        });
      }

      const emergencysSnapshot = await emergencyRepository.find();

      res.status(200).json({
        success: true,
        emergency: emergencysSnapshot,
        msg: 'Emergencias obtenidas con éxito',
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
    }
  },
  //TODO agregarle comentario
  createEmergency: async (req, res, next) => {
    try {
      // Checks if there's errors on the body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({
          success: false,
          errors: errors.mapped(),
          msg: 'Error en alguno de los datos recibidos',
        });
      }
      const idHospital = req.params.idHospital;
      const idBed = req.params.idBed;
      const idPatient = req.params.idPerson;
      const idAccidentOrDisease = req.params.idAccidentOrDisease;
      const idNurse = req.params.idNurse;

      const hospital = await hospitalRepository.findById(idHospital);

      if (hospital === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un hospital con ese ID',
        });
      }
      const bed = await hospital.beds.findById(idBed);

      if (bed === null) {
        return res
          .status(404)
          .json({ success: false, msg: 'No se encontró una cama con ese ID' });
      }
      const patient = await personRepository.findById(idPatient);

      if (patient === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un paciente con ese ID',
        });
      }
      const nurse = await personRepository.findById(idNurse);

      if (nurse === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un enfermero con ese ID',
        });
      }
      const accidentOrDisease = await accidentOrDiseaseRepository.findById(
        idAccidentOrDisease
      );

      if (accidentOrDisease === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un accidente o enfermedad con ese ID',
        });
      }
      const emergency: Emergency = {
        id: '',
        dateOfEntrance: req.body.dateOfEntrance,
        dateOfExit: req.body.dateOfExit,
        locality: req.body.locality,
        location: new admin.firestore.GeoPoint(
          req.body.location.latitude,
          req.body.location.longitude
        ),
        ambulanceLicensePlate: req.body.ambulanceLicensePlate,
        idHospital: req.body.idHospital ?? null,
        idPatient: req.body.idPatient ?? null,
        idNurse: req.body.idNurse ?? null,
        idBed: req.body.idBed ?? null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const emergencyCreated = await emergencyRepository.create(emergency);

      res.status(200).json({
        success: true,
        emergency: emergencyCreated,
        msg: 'Emergencia creada con éxito',
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
    }
  },
  /**
   * `ADDS` an AccidentOrDisease.
   *
   * @param idEmergency- Id of the emergency that will add a HealthInsurance
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
        return res.status(400).json({
          success: false,
          errors: errors.mapped(),
          msg: 'Error en alguno de los datos recibidos',
        });
      }

      const idEmergency = req.params.idEmergency;
      const idAccidentOrDisease = req.params.idAccidentOrDisease;
      const emergency = await emergencyRepository.findById(idEmergency);

      if (emergency === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró una emergencia con ese ID',
        });
      }

      const accidentOrDisease = await accidentOrDiseaseRepository.findById(
        idAccidentOrDisease
      );

      if (accidentOrDisease === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un accidente o enfermedad con ese ID',
        });
      }

      const accidentOrDiseaseToAdd: AccidentOrDisease = {
        id: accidentOrDisease.id,
        description: accidentOrDisease.description,
      };

      const accidentOrDiseaseAdded = await emergency.accidentOrDisease.create(
        accidentOrDiseaseToAdd
      );

      res.status(200).json({
        success: true,
        AccidentOrDisease: accidentOrDiseaseAdded,
        msg: 'Accidente o enfermedad agregada con éxito',
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
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
  updateEmergencyById: async (req, res, next) => {
    try {
      // Checks if there's errors on the body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({
          success: false,
          errors: errors.mapped(),
          msg: 'Error en alguno de los datos recibidos',
        });
      }

      const id = req.params.id;
      const idHospital = req.params.idHospital;
      const idBed = req.params.idBed;
      const idPatient = req.params.idPerson;
      const idAccidentOrDisease = req.params.idAccidentOrDisease;
      const idNurse = req.params.idNurse;

      const emergency = await emergencyRepository.findById(id);

      if (emergency === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró una emergencia con ese ID',
        });
      }

      const hospital = await hospitalRepository.findById(idHospital);

      if (hospital === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un hospital con ese ID',
        });
      }
      const bed = await hospital.beds.findById(idBed);

      if (bed === null) {
        return res
          .status(404)
          .json({ success: false, msg: 'No se encontró una cama con ese ID' });
      }
      const patient = await personRepository.findById(idPatient);

      if (patient === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un paciente con ese ID',
        });
      }
      const nurse = await personRepository.findById(idNurse);

      if (nurse === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un enfermero con ese ID',
        });
      }
      const accidentOrDisease = await accidentOrDiseaseRepository.findById(
        idAccidentOrDisease
      );

      if (accidentOrDisease === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un accidente o enfermedad con ese ID',
        });
      }
      if (hospital === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un hospital con ese ID',
        });
      }

      const emergencyToUpdate: Emergency = {
        id: emergency.id,
        dateOfEntrance: req.body.dateOfEntrance ?? emergency.dateOfEntrance,
        dateOfExit: req.body.dateOfExit ?? emergency.dateOfExit,
        locality: req.body.locality ?? emergency.locality,
        location: req.body.location
          ? new admin.firestore.GeoPoint(
              req.body.location.latitude,
              req.body.location.longitude
            )
          : emergency.location,
          ambulanceLicensePlate: req.body.ambulanceLicensePlate ?? emergency.ambulanceLicensePlate,
          idHospital: req.body.idHospital ?? emergency.idHospital,
          idPatient: req.body.idPatient ?? emergency.idPatient,
          idNurse: req.body.idNurse ?? emergency.idNurse,
          idBed: req.body.idBed ?? emergency.idBed,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const emergencyUpdated = await emergencyRepository.update(emergencyToUpdate);

      res.status(200).json({
        success: true,
        hospital: emergencyUpdated,
        msg: 'Emergencia actualizada con éxito',
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
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
        return res.status(400).json({
          success: false,
          errors: errors.mapped(),
          msg: 'Error en alguno de los datos recibidos',
        });
      }

      const id = req.params.id;
      const emergency = await emergencyRepository.findById(id);

      if (emergency === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró una emergencia con ese ID',
        });
      }

      await emergencyRepository.delete(id);
      return res
        .status(200)
        .json({ success: true, msg: 'Emergencia eliminado con éxito' });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
    }
  },
};
