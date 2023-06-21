// ...

const objectionsController = {
  getAllObjections: async (req, res) => {
    try {
      const objections = await Objection.find();
      res.json(objections);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createObjection: async (req, res) => {
    try {
      const objectionData = req.body;
      const objection = new Objection(objectionData);
      const savedObjection = await objection.save();
      res.status(201).json(savedObjection);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateObjection: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedObjection = await Objection.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedObjection) {
        return res.status(404).json({ error: 'Objection not found' });
      }
      res.json(updatedObjection);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteObjection: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedObjection = await Objection.findByIdAndDelete(id);
      if (!deletedObjection) {
        return res.status(404).json({ error: 'Objection not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = objectionsController;
