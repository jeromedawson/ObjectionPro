const Script = require('../models/scriptModel');

const scriptsController = {
  // Get all scripts
  getAllScripts: async (req, res) => {
    try {
      const scripts = await Script.find();
      res.json(scripts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch scripts. Please try again later.' });
    }
  },

  // Create a new script
  createScript: async (req, res) => {
    try {
      const script = new Script(req.body);
      const savedScript = await script.save();
      res.status(201).json(savedScript);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create script. Please try again later.' });
      }
    }
  },

  // Update a script by ID
  updateScript: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedScript = await Script.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedScript) {
        return res.status(404).json({ error: 'Script not found.' });
      }

      res.json(updatedScript);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update script. Please try again later.' });
    }
  },

  // Delete a script by ID
  deleteScript: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedScript = await Script.findByIdAndDelete(id);

      if (!deletedScript) {
        return res.status(404).json({ error: 'Script not found.' });
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete script. Please try again later.' });
    }
  },
};

module.exports = scriptsController;
