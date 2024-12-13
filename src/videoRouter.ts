import {Router, Request, Response} from "express";
import {db, addDays} from "./db/db";
import {
    titleFieldValidator,
    authorFieldValidator,
    avaliableResolutionFieldValidator,
    minAgeRestrictionFieldValidator
} from "./validation/field-validator";
import {errorResponse} from "./validation/errorResponse";


export const videoRouter = Router();

export const videoController = {
    deleteAllVideos: (req: Request, res: Response) => {
        db.videos.length = 0
    },

    getVideo: (req: Request, res: Response) => {
        res.status(200).json(db.videos);
    },

    getVideoById: (req: Request, res: Response) => {
        let videoId = db.videos.find(video => video.id === +req.params.id);
        if (videoId) {
            res.status(200).json(videoId);
        } else {
            res.status(404).json('Not Found');
        }

    },

    createVideo: (req: Request, res: Response) => {
        const title = req.body.title;
        const author = req.body.author;
        const canBeDownloaded = req.body.canBeDownloaded || false;
        const minAgeRestriction = req.body.minAgeRestriction || null;
        const createdAt = new Date().toISOString();
        const publicationDate = addDays(new Date(), 1).toISOString();
        const availableResolution = req.body.availableResolution;

        const errorsArray: Array<{ field: string, message: string }> = []
        titleFieldValidator(title, errorsArray)
        avaliableResolutionFieldValidator(availableResolution, errorsArray)
        minAgeRestrictionFieldValidator(minAgeRestriction, errorsArray)
        authorFieldValidator(author, errorsArray)

        if (errorsArray.length > 0) {
            const error = errorResponse(errorsArray)
            res
                .status(400)
                .send(error)
        }

        const video = {
            ...req.body,
            id: Date.now() + Math.random()
        }
        db.videos = [...db.videos, video];
        res.status(201).json(video);


    },
    updateVideo: (req: Request, res: Response) => {
        let video = db.videos.find(video => video.id === +req.params.id);
        if (video) {
            video.title = req.body.title;
            video.author = req.body.author;
            video.availableResolution = req.body.availableResolution;
            video.canBeDownloaded = req.body.canBeDownloaded;
            video.minAgeRestriction = req.body.minAgeRestriction;
            video.publicationDate = req.body.publicationDate;

            const errorsArray: Array<{ field: string, message: string }> = []
            titleFieldValidator(video.title, errorsArray)
            avaliableResolutionFieldValidator(video.availableResolution, errorsArray)
            minAgeRestrictionFieldValidator(video.minAgeRestriction, errorsArray)
            authorFieldValidator(video.author, errorsArray)

            if (errorsArray.length > 0) {
                const error = errorResponse(errorsArray)
                res
                    .status(400)
                    .send(error)
            }
            res.status(204).json(video);
        } else {
            res.status(404).json('Not Found');
        }


    },
    deleteVideoById: (req: Request, res: Response) => {
        for (let i = 0; i < db.videos.length; i++) {
            if (db.videos[i].id === +req.params.id) {
                db.videos.splice(i, 1)
                res.send(204)
                return
            } else {
                res.status(404)
            }
        }
    },
}
videoRouter.delete('/', videoController.deleteAllVideos)
videoRouter.get('/', videoController.getVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.post('/', videoController.createVideo)
videoRouter.put('/:id', videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideoById)
