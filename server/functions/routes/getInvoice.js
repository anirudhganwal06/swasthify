module.exports = async (req, res) => {
  try {
		console.log(req);
    return { invoice: "<p>This is the invoice!</p>" };
  } catch (error) {
    return res.status(404).json({
			message: "Something is wrong!"
		});
  }
};
