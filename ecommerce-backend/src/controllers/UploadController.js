const uploadFile = async (req, res) => {
    try {
        if (!req.file)
            return res
                .status(400)
                .json({ error: true, msg: 'You must select a file.' });
        const url =
            req.protocol +
            '://' +
            req.get('host') +
            '/uploads/' +
            req.file.filename;
        res.status(200).json({
            error: false,
            msg: 'File uploaded successfully!',
            imgUrl: url,
        });
    } catch (error) {
        res.status(400).json({ error: true, msg: 'Img upload failed' });
    }
};

module.exports = { uploadFile };
