exports.getVideos = (req, res) => {
  res.json({ success: true, message: "response from video route" });
};

exports.postVideo = async (req, res) => {
    try{    
        const videoInfo = req.body;
        const 
    }catch(err){
        res.json({success: false});
    }
}
