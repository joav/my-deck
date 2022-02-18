import { FileRepository } from "@interfaces/file.repository";
import { createFile } from "@services/files";
import { getService } from "@services/services";
import { Router } from "express";
import multer from "multer";
import path from "path";

export const filesRouter = Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../../files/")
});

const getFileRepository = () => getService<FileRepository>('file');

filesRouter.post('/:field', upload.single('file'), async (req, res) => {
    const fileRepository = getFileRepository();
    if (req.file) {
        const file = await createFile(fileRepository, req.file.filename, req.params.field, req.file.originalname);
        res.json(file);
    } else {
        res.status(400).json({code: 400, errorMessage: "The file is required"});
    }
});

filesRouter.get('/:field', async (req, res) => {
    const fileRepository = getFileRepository();
    const files = await fileRepository.getByField(req.params.field);
    res.json(files);
});
