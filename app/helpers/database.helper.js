const mongoose = require("mongoose");
const League = require("../models/League");
const User = require("../models/User");
const Tournament = require("../models/Tournament");
const Summoner = require("../models/Summoner");
const summonerHelper = require("../helpers/summoner.helper");

const leagues = [
    {
        "tier": 1,
        "name": "CHALLENGER"
    },
    {
        "tier": 2,
        "name": "GRANDMASTER"
    },
    {
        "tier": 3,
        "name": "MASTER"
    },
    {
        "tier": 4,
        "name": "DIAMOND"
    },
    {
        "tier": 5,
        "name": "PLATINUM"
    },
    {
        "tier": 6,
        "name": "GOLD"
    },
    {
        "tier": 7,
        "name": "SILVER"
    },
    {
        "tier": 8,
        "name": "BRONZE"
    },
    {
        "tier": 9,
        "name": "IRON"
    },
]

const users = [
    {
        "username": "usuario",
        "password": "password"
    },
    {
        "username": "gmbz",
        "password": "password"
    },
    {
        "username": "admin",
        "password": "password"
    }
]

const tournaments = [
    {
        "nombre": "Torneo 1",
        "privado": true,
        "cupo": 10,
        "premio": "$10000",
        "fechaInicio": "2023-04-30T03:00:00.000+00:00",
        "fechaFin": "2023-05-05T03:00:00.000+00:00",
        "autor": "admin",
        "clasificacionMinima": "PLATINUM"
    },
    {
        "nombre": "Torneo 2",
        "privado": false,
        "cupo": 20,
        "premio": "Notebook MSI Katana GF66 i5 RTX3050 144hz",
        "fechaInicio": "2023-07-01T03:00:00.000+00:00",
        "fechaFin": "2023-07-29T03:00:00.000+00:00",
        "autor": "admin",
        "clasificacionMinima": "GOLD"
    },
    {
        "nombre": "Torneo 3",
        "privado": true,
        "cupo": 15,
        "premio": "$4000",
        "fechaInicio": "2023-05-03T03:00:00.000+00:00",
        "fechaFin": "2023-05-20T03:00:00.000+00:00",
        "autor": "admin",
        "clasificacionMinima": "MASTER"
    },
    {
        "nombre": "Torneo 4",
        "privado": true,
        "cupo": 25,
        "premio": "$25000",
        "fechaInicio": "2023-10-01T00:00:00.000+00:00",
        "fechaFin": "2023-10-31T23:59:59.000+00:00",
        "autor": "admin",
        "clasificacionMinima": "SILVER"
    },
    {
        "nombre": "Torneo 5",
        "privado": false,
        "cupo": 100,
        "premio": "$12000",
        "fechaInicio": "2023-01-01T03:00:00.000+00:00",
        "fechaFin": "2023-02-20T03:00:00.000+00:00",
        "autor": "admin",
        "clasificacionMinima": "PLATINUM"
    },
    {
        "nombre": "Torneo 6",
        "privado": true,
        "cupo": 15,
        "premio": "Notebook Asus Zephyrus GA401 R7 RTX3050",
        "fechaInicio": "2023-04-01T03:00:00.000+00:00",
        "fechaFin": "2023-04-15T03:00:00.000+00:00",
        "autor": "usuario",
        "clasificacionMinima": "PLATINUM"
    },
    {
        "nombre": "Torneo 7",
        "privado": true,
        "cupo": 15,
        "premio": "$15000",
        "fechaInicio": "2023-04-17T03:00:00.000+00:00",
        "fechaFin": "2023-04-27T03:00:00.000+00:00",
        "autor": "usuario",
        "clasificacionMinima": "GRANDMASTER"
    },
    {
        "nombre": "Torneo 8",
        "privado": false,
        "cupo": 30,
        "premio": "$8000",
        "fechaInicio": "2023-07-10T03:00:00.000+00:00",
        "fechaFin": "2023-07-25T03:00:00.000+00:00",
        "autor": "usuario",
        "clasificacionMinima": "DIAMOND"
    },

]

const participantes = ["RiceShampoo", "Darvius", "Lykosito", "NeroJo", 
    "Sheidaari", "jaimit01", "Moouusee", "Alexchan19", "PopvlarMonster", 
    "clazt", "nachishalke", "Spooky Buggie", "SLASHZERLOWZ", 
    "simetrius", "Arkhannes", "Umogus"];

exports.resetDatabase = async (req, res) => {
    console.log("Reset database");
    mongoose.connection.dropCollection("leagues");
    mongoose.connection.dropCollection("users");
    mongoose.connection.dropCollection("tournaments");
    mongoose.connection.dropCollection("summoners");
    mongoose.connection.dropCollection("rankeds");
    await cargaLeagues();
    await cargaUsers();
    await cargaTournaments();
    await cargaParticipantes();

    console.log("Database loaded");
}

async function cargaLeagues() {
    for (const element of leagues) {
        let league = new League({
            tier: element.tier,
            name: element.name
        });
        await league.save();
    }
    console.log("Leagues loaded in the db");
}

async function cargaUsers() {
    for (const element of users) {
        let user = new User({
            username: element.username,
            password: await User.encryptPassword(element.password)
        })
        await user.save();
    }
    console.log("Users loaded in the db");
}

async function cargaTournaments() {
    for (const element of tournaments) {
        let clasificacion = await League.findOne({ 'name': element.clasificacionMinima });
        let autor = await User.findOne({ 'username': element.autor });
        let tournament = new Tournament({
            nombre: element.nombre,
            privado: element.privado,
            premio: element.premio,
            cupo: element.cupo,
            fechaInicio: element.fechaInicio,
            fechaFin: element.fechaFin,
            cupo: element.cupo,
            clasificacionMinima: clasificacion,
            autor: autor,
        })
        await tournament.save();
    }
    console.log("Tournaments loaded in the db");
}

async function cargaParticipantes() {
    console.log("Agregando participantes");
    let tournaments = await Tournament.find().populate("autor").populate("clasificacionMinima");

    for (let tournament of tournaments) {
        for (const participante of participantes) {
            let summoner = await Summoner.findOne({ summonerName: participante }).populate("rankedSolo");
            
            if (!summoner) {
                summoner = await summonerHelper.findSummonerByNameLOLAPI(participante);
            }

            let valido = true;

            if (tournament.cupo === 0) {
                valido = false;
            }

            for (const element of tournament.participantes) {
                if (element && element.summonerName === summoner.summonerName) {
                    valido = false;
                }
            }

            if (summoner.rankedSolo.tier > tournament.clasificacionMinima.tier) {
                valido = false;
            }

            if (valido) {
                tournament.participantes.push(summoner);
                tournament.cupo -= 1;
                tournament = await Tournament.findByIdAndUpdate({ _id: tournament._id }, tournament, { new: true }).populate({ path: "participantes", populate: { path: "rankedSolo" } });
                console.log(`Participante ${summoner.summonerName} agregado al torneo ${tournament.nombre}`);
            }
        }
    }

    console.log("Fin de agregar participantes");
}
