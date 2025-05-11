// Fleet controllers
export const getFleets = async (req, res) => {
    try {
      const fleets = await Fleet.find({});
      res.json(fleets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createFleet = async (req, res) => {
    try {
      const { name } = req.body;
      const logo = req.file.path; // Assuming you're using multer for file uploads
  
      const fleet = await Fleet.create({
        name,
        logo
      });
  
      res.status(201).json(fleet);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteFleet = async (req, res) => {
    try {
      await Fleet.findByIdAndDelete(req.params.id);
      res.json({ message: 'Fleet deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };