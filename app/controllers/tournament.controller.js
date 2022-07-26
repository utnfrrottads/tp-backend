const Summoner = require("../models/Summoner");
const Tournament = require("../models/Tournament");
const League = require("../models/League");
const SummonerHelper = require("../helpers/summoner.helper");


exports.findAll = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate("autor").populate("clasificacionMinima");
        res.json(tournaments);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.create = async (req, res) => {
    try {
        const { nombre, privado, premio, cupo, fechaInicio, fechaFin, tierMinimo } = req.body;

        const user = req.user;

        const clasificacion = await League.findOne({ 'tier': tierMinimo });

        if (!clasificacion) return res.status(404).json({ msg: "Clasificacion invalida" });

        let tournament = new Tournament({
            nombre,
            privado,
            premio,
            cupo,
            fechaInicio,
            fechaFin,
            clasificacionMinima: clasificacion,
            autor: user
        });

        let savedTournament = await tournament.save();

        res.status(200).json(savedTournament);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al crear");
    }
}

exports.update = async (req, res) => {
    try {
        let tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            res.status(404).json({ msg: "El torneo no existe" });
        }

        const { nombre, privado, premio, cupo, fechaInicio, fechaFin, autor } = req.body;

        tournament.nombre = nombre;
        tournament.privado = privado;
        tournament.premio = premio;
        tournament.cupo = cupo;
        tournament.fechaInicio = fechaInicio;
        tournament.fechaFin = fechaFin;
        tournament.autor = autor;

        tournament = await Tournament.findByIdAndUpdate({ _id: req.params.id }, tournament, { new: true });

        res.json(tournament);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.findOne = async (req, res) => {
    try {
        let tournament = await Tournament.findById(req.params.id).populate({ path: "participantes", populate: { path: "rankedSolo" } }).populate({ path: "participantes", populate: { path: "rankedFlex" } }).populate("autor", "-password");

        if (!tournament) return res.status(404).json({ msg: "El torneo no existe" });

        // ordenar participantes de mejor a peor
        tournament.participantes.sort((a, b) => {
            return a.rankedSolo.tier - b.rankedSolo.tier;
        })

        res.json(tournament);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.delete = async (req, res) => {
    try {
        let tournament = await Tournament.findById(req.params.id);

        if (!tournament) return res.status(404).json({ msg: "El torneo no existe" });


        await Tournament.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Torneo eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.addParticipant = async (req, res) => {
    try {
        let tournament = await Tournament.findById(req.params.id);

        if (!tournament) return res.status(404).json({ msg: "El torneo no existe" });

        let summoner = await Summoner.findOne({ summonerName: req.params.name });

        if (summoner) {
            tournament.participantes.push(summoner);
            // tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "leagues", populate: { path: "league" } } });
            tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "rankedSolo" } });
            return res.status(200).json({ msg: "Participante agregado", tournament });
        } else {
            let summoner = await SummonerHelper.findSummonerByNameLOLAPI(req.params.name)
            tournament.participantes.push(summoner);
            // tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "leagues", populate: { path: "league" } } });
            tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "rankedSolo" } });
            return res.status(200).json({ msg: "Participante agregado", tournament });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.findAllByRank = async (req, res) => {
    try {
        const clasificacion = await League.findOne({ 'name': req.params.tier_name.toUpperCase() });

        if (!clasificacion) return res.status(404).json({ msg: "Clasificacion invalida" });

        // const tournaments = await Tournament.find({ 'clasificacionMinima': clasificacion }).populate("autor");

        const tournaments = await Tournament.find().populate("autor").populate("clasificacionMinima");

        let filteredTournaments = tournaments.filter(tournament => {
            if (tournament.clasificacionMinima) {
                if (tournament.clasificacionMinima.tier <= clasificacion.tier) {
                    return tournament;
                }
            }
        });

        console.log(filteredTournaments);

        res.status(200).json(filteredTournaments);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

