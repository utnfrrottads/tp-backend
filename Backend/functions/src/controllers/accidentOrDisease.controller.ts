import { db } from '../http';
import { AccidentOrDisease } from '../models/accidentOrDisease.model';
import { getRepository } from 'fireorm';
import { Hospital } from '../models/hospital.model';
const admin = require('firebase-admin');
const accidentOrDiseaseRepository = getRepository(AccidentOrDisease);
const hospitalRepository = getRepository(Hospital);

module.exports = {
  /**
   * `GETS` all AccidentOrDiseases of the collection.
   *
   * @returns The list of AccidentOrDiseases retrieved
   */
  getAllAccidentsOrDiseases: async (req, res) => {
    try {
      const accidentOrDiseasesSnapshot = await accidentOrDiseaseRepository.find();

      res
        .status(200)
        .json({
          success: true,
          accidentOrDiseases: accidentOrDiseasesSnapshot,
          msg: 'Accidentes o enfermedades obtenidas con éxito',
        });
    } catch (e) {
      res
        .status(500)
        .json({
          success: false,
          errors: e.message,
          msg: 'Se ha producido un error interno en el servidor.',
        });
    }
  },
  /**
  * `GETS` all hospitals by accidentOrDisease of the collection.
  *
  * @returns The list of hospitals retrieved
  */
  getAllHospitalsByAccidentOrDiseasesId: async (req, res) => {
    try {

      const idaccidentOrDisease = req.params.idaccidentOrDisease;
      const hospitals = [];

      async function addToArray(accidentsOrDiseases) {
        for (let index = 0; index < accidentsOrDiseases.length; index++) {
          const hospitalSnapshot = await hospitalRepository.findById(accidentsOrDiseases[index].data()["idHospital"]);
          const hospital: Hospital = {
            id: hospitalSnapshot.id,
            address: hospitalSnapshot.address,
            location: hospitalSnapshot.location,
            atentionLevel: hospitalSnapshot.atentionLevel,
            freeBeds: hospitalSnapshot.freeBeds,
            locality: hospitalSnapshot.locality,
            name: hospitalSnapshot.name,
            phone: hospitalSnapshot.phone,
            createdAt: hospitalSnapshot.createdAt,
            updatedAt: hospitalSnapshot.updatedAt,
          }
          hospitals.push(hospital);
        }
      }

      const accidentsOrDiseases = await db.collectionGroup('accidentOrDiseases').where("id", "==", idaccidentOrDisease).get();
      
      await addToArray(accidentsOrDiseases.docs);

      res.status(200).json({ success: true, hospitals: hospitals, msg: "Hospitales obtenidos con éxito" });
    } catch (e) {
      res.status(500).json({ success: false, errors: e.message, msg: "Se ha producido un error interno en el servidor." });
    }
  },
  /**
   * `CREATES` a accidentOrDisease.
   *
   * @body Json with required fields to create a accidentOrDisease
   *
   * @returns The created accidentOrDisease
   */
  createAccidentOrDisease: async (req, res) => {
    try {
      const accidentOrDisease: AccidentOrDisease = {
        id: '',
        description: req.body.description,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const accidentOrDiseaseCreated = await accidentOrDiseaseRepository.create(
        accidentOrDisease
      );

      res
        .status(200)
        .json({
          success: true,
          accidentOrDisease: accidentOrDiseaseCreated,
          msg: 'Obra social creada con éxito',
        });
    } catch (e) {
      res
        .status(500)
        .json({
          success: false,
          errors: e.message,
          msg: 'Se ha producido un error interno en el servidor.',
        });
    }
  },
  /**
   * `ADDS` an AffiliatedaccidentOrDisease.
   *
   * @param idHospital - Id of the hospital that will add a accidentOrDisease
   * @param idaccidentOrDisease - Id of the accidentOrDisease that will be added
   *
   * @returns The created AffiliatedaccidentOrDisease
   */
  addToHospitalByIds: async (req, res) => {
    try {
      const idHospital = req.params.idHospital;
      const idaccidentOrDisease = req.params.idaccidentOrDisease;
      const hospital = await hospitalRepository.findById(idHospital);

      if (hospital === null) {
        return res
          .status(404)
          .json({
            success: false,
            msg: 'No se encontró un hospital con ese ID',
          });
      }

      const accidentOrDisease = await accidentOrDiseaseRepository.findById(
        idaccidentOrDisease
      );

      if (accidentOrDisease === null) {
        return res
          .status(404)
          .json({
            success: false,
            msg: 'No se encontró una obra social con ese ID',
          });
      }

      const accidentOrDiseaseToAdd: AccidentOrDisease = {
        id: accidentOrDisease.id,
        description: accidentOrDisease.description,
      };

      const accidentOrDiseaseAdded = await hospital.accidentOrDiseases.create(
        accidentOrDiseaseToAdd
      );

      res
        .status(200)
        .json({
          success: true,
          accidentOrDisease: accidentOrDiseaseAdded,
          msg: 'Accidente o enfermedad agregada con éxito',
        });
    } catch (e) {
      res
        .status(500)
        .json({
          success: false,
          errors: e.message,
          msg: 'Se ha producido un error interno en el servidor.',
        });
    }
  },
  /**
   * `UPDATES` a accidentOrDisease by ID.
   *
   * @body Json with fields to update a accidentOrDisease
   * @param id - Id of the accidentOrDisease that will be updated
   *
   * @returns The updated accidentOrDisease
   */
  updateAccidentOrDiseaseById: async (req, res) => {
    try {
      const id = req.params.id;

      const accidentOrDisease = await accidentOrDiseaseRepository.findById(id);

      if (accidentOrDisease === null) {
        return res
          .status(404)
          .json({
            success: false,
            msg: 'No se encontró un accidente o enfermedad con ese ID',
          });
      }

      const accidentOrDiseaseToUpdate: AccidentOrDisease = {
        id: accidentOrDisease.id,
        description: req.body.description ?? accidentOrDisease.description,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const accidentOrDiseaseUpdated = await accidentOrDiseaseRepository.update(
        accidentOrDiseaseToUpdate
      );

      res
        .status(200)
        .json({
          success: true,
          accidentOrDisease: accidentOrDiseaseUpdated,
          msg: 'Accidente o enfermedad actualizada con éxito',
        });
    } catch (e) {
      res
        .status(500)
        .json({
          success: false,
          errors: e.message,
          msg: 'Se ha producido un error interno en el servidor.',
        });
    }
  },
  /**
   * `DELETES` a accidentOrDisease by ID.
   *
   * @param id - Id of the accidentOrDisease that will be deleted
   *
   * @returns The success message
   */
  deleteAccidentOrDiseaseById: async (req, res) => {
    try {
      const id = req.params.id;
      const accidentOrDisease = await accidentOrDiseaseRepository.findById(id);

      if (accidentOrDisease === null) {
        return res
          .status(404)
          .json({
            success: false,
            msg: 'No se encontró un accidente o enfermedad con ese ID',
          });
      }

      await accidentOrDiseaseRepository.delete(id);
      return res
        .status(200)
        .json({ success: true, msg: ' Accidente o enfermedad eliminada con éxito' });
    } catch (e) {
      res
        .status(500)
        .json({
          success: false,
          errors: e.message,
          msg: 'Se ha producido un error interno en el servidor.',
        });
    }
  },
};
