const Participant = require("../models/participant");

// Obtém todos os participantes
async function getAllParticipants(req, res) {
    try {
        const participants = await Participant.find();
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter os participantes" });
    }
}

// Obtém um participante pelo ID
async function getParticipantById(req, res) {
    const { id } = req.params;
    try {
        const participant = await Participant.findById(id);
        if (!participant) {
            return res.status(404).json({ error: "Participante não encontrado" });
        }
        res.json(participant);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter o participante" });
    }
}

// Cria um novo participante
async function createParticipant(req, res) {
    const { firstName, lastName, percentage } = req.body;
    try {
        const participant = await Participant.create({ firstName, lastName, percentage });
        res.status(201).json(participant);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar o participante", message: error.message });
    }
}

// Atualiza um participante existente
async function updateParticipant(req, res) {
    const { id } = req.params;
    const { firstName, lastName, percentage } = req.body;
    try {
        const participant = await Participant.findByIdAndUpdate(
            id,
            { firstName, lastName, percentage },
            { new: true }
        );
        if (!participant) {
            return res.status(404).json({ error: "Participante não encontrado" });
        }
        res.json(participant);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar o participante" });
    }
}

// Exclui um participante
async function deleteParticipant(req, res) {
    const { id } = req.params;
    try {
        const participant = await Participant.findByIdAndDelete(id);
        if (!participant) {
            return res.status(404).json({ error: "Participante não encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: "Erro ao excluir o participante" });
    }
}

module.exports = {
    getAllParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
    deleteParticipant,
};
