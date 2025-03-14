import Donation from '../models/donation.js'

// @desc Register a new donation
// @route POST /api/donations/register
// @access Private
export const registerDonation = async (req, res) =>{
    try{
        const {request_id, donation_date, status,city} = req.body;

        if(!donation_date){
            return res.status(400).json({message: "donation date is required"});
        }
        if (!location) {
            return res.status(400).json({ message: "donation location is required" });
          }

        const newDonation = new Donation({
            donor_id : req.user.id,
            request_id: request_id || null,
            donation_date,
            status: status || "pending",
            city
        });

        await newDonation.save();
        res.status(201).json({message: "donation registered successfully", donation:newDonation});

    }
    catch(error){
        res.status(500).json({message:"server error", error: error.message});
    }
};

// @desc Register a new donation
// @route POST /api/donations/register
// @access Private

export const getUserDonations  = async (req, res) => {
    try{
        const donations = await Donation.find({donor_id: req.user.id})
        .populate("request_id", "blood_group units_needed status")
        .sort({donation_date: -1});

        res.status(200).json({donations})
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update donation status
// @route PUT /api/donations/update/:donationId
// @access Private
export const updateDonationStatus = async (req, res) => {
    try {
        const { donationId } = req.params;
        const { status } = req.body;

        if (!["completed", "pending", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        donation.status = status;
        await donation.save();

        res.status(200).json({ message: "Donation status updated", donation });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};