import '../http';
import { Emergency } from '../models/emergency.model';
import { Hospital } from '../models/hospital.model';
import { getRepository } from 'fireorm';
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
  getAllEmergencies: async (req, res) => {
    try {
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
  /**
  * `CREATES` a Emergency and adds it to the hospital.
  *
  * @body Json with required fields to create an Emergency and optional: idPatient and idNurse
  * 
  * @returns The created Emergency
  */
  createEmergency: async (req, res) => {
    try {
      const idHospital = req.params.idHospital;
      const idBed = req.params.idBed;
      const idAccidentOrDisease = req.params.idAccidentOrDisease;
      const idPatient = req.body.idPatient;
      const idNurse = req.body.idNurse;

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

      const accidentOrDisease = await accidentOrDiseaseRepository.findById(idAccidentOrDisease);
      if (accidentOrDisease === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró un accidente o enfermedad con ese ID',
        });
      }
      const accidentOrDiseaseToAdd: AccidentOrDisease = {
        id: accidentOrDisease.id,
        description: accidentOrDisease.description,
      }

      if (idPatient) {
        const patient = await personRepository.findById(idPatient);
        if (patient === null) {
          return res.status(404).json({
            success: false,
            msg: 'No se encontró un paciente con ese ID',
          });
        }
      }

      if (idNurse) {
        const nurse = await personRepository.findById(idNurse);
        if (nurse === null) {
          return res.status(404).json({
            success: false,
            msg: 'No se encontró un enfermero con ese ID',
          });
        }
      }

      const emergency: Emergency = {
        id: '',
        dateOfEntrance: admin.firestore.FieldValue.serverTimestamp(),
        dateOfExit: req.body.dateOfExit ? admin.firestore.Timestamp.fromDate(new Date(req.body.dateOfExit)) : null,
        locality: req.body.locality,
        location: new admin.firestore.GeoPoint(
          req.body.location.latitude,
          req.body.location.longitude
        ),
        accidentOrDisease: accidentOrDiseaseToAdd,
        ambulanceLicensePlate: req.body.ambulanceLicensePlate,
        idHospital: idHospital,
        idPatient: req.body.idPatient ?? null,
        idNurse: req.body.idNurse ?? null,
        idBed: idBed,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Creates emergency
      const emergencyCreated = await emergencyRepository.create(emergency);

      // Adds emergency to the hospital
      await hospital.emergencies.create(emergencyCreated);

      // Decrements the freeBeds
      hospital.freeBeds = admin.firestore.FieldValue.increment(-1);
      await hospitalRepository.update(hospital);

      // Sets the bed as busy
      await hospital.beds.update({ id: bed.id, status: "Ocupada" });

      res.status(200).json({ success: true, emergency: emergencyCreated, msg: 'Emergencia creada con éxito' });
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

  addToAccidentOrDiseaseByIds: async (req, res) => {
    try {
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
      emergency.accidentOrDisease = accidentOrDiseaseToAdd;

      const accidentOrDiseaseAdded = await emergencyRepository.update(emergency);

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
   * `UPDATES` an Emergency by ID.
   *
   * @body Json with fields to update an Emergency
   * @param id - Id of the Emergency that will be updated
   *
   * @returns The updated Emergency
   */
  updateEmergencyById: async (req, res) => {
    try {
      const emergencyId = req.params.id;
      const idHospital = req.body.idHospital;
      const idBed = req.body.idBed;
      const idPatient = req.body.idPatient;
      const idNurse = req.body.idNurse;
      const idAccidentOrDisease = req.body.idAccidentOrDisease;
      let accidentOrDiseaseToAdd: AccidentOrDisease;

      const emergency = await emergencyRepository.findById(emergencyId);
      if (emergency === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró una emergencia con ese ID',
        });
      }

      // To update hospital or bed, idHospital and idBed is required
      if (idHospital && idBed && idHospital !== emergency.idHospital && idBed !== emergency.idBed) {

        const newHospital = await hospitalRepository.findById(idHospital);
        if (newHospital === null) {
          return res.status(404).json({ success: false, msg: 'No se encontró un hospital con ese ID' });
        }

        const bed = await newHospital.beds.findById(idBed);
        if (bed === null) {
          return res.status(404).json({ success: false, msg: 'No se encontró una cama con ese ID' });
        }

        const oldHospital = await hospitalRepository.findById(emergency.idHospital);
        // Increments the freeBeds in oldHospital
        oldHospital.freeBeds = admin.firestore.FieldValue.increment(1);
        await hospitalRepository.update(oldHospital);

        // Sets the old bed as free
        await oldHospital.beds.update({ id: emergency.idBed, status: "Libre" });
        
        // Deletes the emergency from the old hospital
        await oldHospital.emergencies.delete(emergency.id);

        // Decrements the freeBeds in newHospital
        newHospital.freeBeds = admin.firestore.FieldValue.increment(-1);
        await hospitalRepository.update(newHospital);

        // Sets the new bed as busy
        await newHospital.beds.update({ id: bed.id, status: "Ocupada" });
      }

      if (idPatient) {
        const patient = await personRepository.findById(idPatient);
        if (patient === null) {
          return res.status(404).json({
            success: false,
            msg: 'No se encontró un paciente con ese ID',
          });
        }
      }

      if (idNurse) {
        const nurse = await personRepository.findById(idNurse);
        if (nurse === null) {
          return res.status(404).json({
            success: false,
            msg: 'No se encontró un enfermero con ese ID',
          });
        }
      }

      if (idAccidentOrDisease) {
        const accidentOrDisease = await accidentOrDiseaseRepository.findById(
          idAccidentOrDisease
        );
        if (accidentOrDisease === null) {
          return res.status(404).json({
            success: false,
            msg: 'No se encontró un accidente o enfermedad con ese ID',
          });
        }
        accidentOrDiseaseToAdd = {
          id: accidentOrDisease.id,
          description: accidentOrDisease.description,
        };
      }

      const emergencyToUpdate: Emergency = {
        id: emergency.id,
        dateOfEntrance: req.body.dateOfEntrance ? admin.firestore.Timestamp.fromDate(new Date(req.body.dateOfEntrance)) : emergency.dateOfEntrance,
        dateOfExit: req.body.dateOfExit ? admin.firestore.Timestamp.fromDate(new Date(req.body.dateOfExit)) : emergency.dateOfExit,
        locality: req.body.locality ?? emergency.locality,
        location: req.body.location
          ? new admin.firestore.GeoPoint(
            req.body.location.latitude,
            req.body.location.longitude
          )
          : emergency.location,
        accidentOrDisease: accidentOrDiseaseToAdd ?? emergency.accidentOrDisease,
        ambulanceLicensePlate: req.body.ambulanceLicensePlate ?? emergency.ambulanceLicensePlate,
        idHospital: idHospital ?? emergency.idHospital,
        idPatient: idPatient ?? emergency.idPatient,
        idNurse: idNurse ?? emergency.idNurse,
        idBed: idBed ?? emergency.idBed,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Updates emergency collection and subcollection
      const emergencyUpdated = await emergencyRepository.update(emergencyToUpdate);
      await (await hospitalRepository.findById(emergency.idHospital)).emergencies.update(emergencyToUpdate);


      res.status(200).json({ success: true, emergencyUpdated: emergencyUpdated, msg: 'Emergencia actualizada con éxito' });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
    }
  },
  /**
   * `DELETES` a Emergency by ID.
   *
   * @param id - Id of the Emergency that will be deleted
   *
   * @returns The success message
   */
  deleteEmergencyById: async (req, res) => {
    try {
      const id = req.params.id;
      const emergency = await emergencyRepository.findById(id);

      if (emergency === null) {
        return res.status(404).json({
          success: false,
          msg: 'No se encontró una emergencia con ese ID',
        });
      }

      const hospitalWithEmergency = await hospitalRepository.findById(emergency.idHospital);

      // Deletes emergency
      await hospitalWithEmergency.emergencies.delete(id);
      await emergencyRepository.delete(id);

      // Increments the freeBeds
      hospitalWithEmergency.freeBeds = admin.firestore.FieldValue.increment(1);
      await hospitalRepository.update(hospitalWithEmergency);

      // Sets the bed as free
      await hospitalWithEmergency.beds.update({ id: emergency.idBed, status: "Libre" });
      return res.status(200).json({ success: true, msg: 'Emergencia eliminada con éxito' });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: e.message,
        msg: 'Se ha producido un error interno en el servidor.',
      });
    }
  },
};
