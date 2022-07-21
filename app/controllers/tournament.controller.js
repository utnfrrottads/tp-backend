const Summoner = require("../models/Summoner");
const Tournament = require("../models/Tournament");
const SummonerHelper = require("../helpers/summoner.helper");

exports.findAll = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate("autor");
        res.json(tournaments);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.create = async (req, res) => {
    try {
        const { nombre, privado, premio, cupo, fechaInicio, fechaFin } = req.body;

        const user = req.user;

        let tournament = new Tournament({
            nombre,
            privado,
            premio,
            cupo,
            fechaInicio,
            fechaFin,
            autor: user
        });

        console.log(tournament); //borrar

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
        let tournament = await Tournament.findById(req.params.id).populate({ path: "participantes", populate: { path: "rankedSolo"} }).populate({ path: "participantes", populate: { path: "rankedFlex"} }).populate("autor", "-password");

        if (!tournament) return res.status(404).json({ msg: "El torneo no existe" });

        res.json(tournament);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

function compare(x, y) {
    x.leagues.forEach(xelement => {
        if (xelement.queueType === "RANKED_SOLO_5x5") {
            y.leagues.forEach(yelement => {
                if (yelement.queueType === "RANKED_SOLO_5x5") {
                    console.log((xelement.league.tier > yelement.league.tier) ? 1 : ((yelement.league.tier > xelement.league.tier) ? -1 : 0));
                    return (xelement.league.tier > yelement.league.tier) ? 1 : ((yelement.league.tier > xelement.league.tier) ? -1 : 0);
                }
            });
        }
    });
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

// hacer esto
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
            tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "rankedSolo" }, populate: { path: "rankedFlex" } });
            return res.status(200).json({ msg: "Participante agregado", tournament });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}