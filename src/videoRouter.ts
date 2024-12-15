import {Router, Request, Response} from "express";
import {db, addDays} from "./db/db";
import {Resolution, VideoDbType} from "./types/db.types";
import {
    titleFieldValidator,
    authorFieldValidator,
    avaliableResolutionFieldValidator,
    minAgeRestrictionFieldValidator, canBeDownloadedFieldValidator, publisherFieldValidator
} from "./validation/field-validator";
import {errorResponse} from "./validation/errorResponse";


export const videoRouter = Router();
export const testRouter = Router();
export const videoController = {
    deleteAllVideos: (req: Request, res: Response) => {
        db.videos.length = 0
        res.sendStatus(204)
    },

    getVideo: (req: Request, res: Response) => {
        res.status(200).json(db.videos);
    },

    getVideoById: (req: Request, res: Response) => {
        let videoId = db.videos.find(video => video.id === +req.params.id);
        if (videoId) {
            res.status(200).json(videoId);
        } else {
            res.status(404).json(videoId);
        }

    },

    createVideo: (req: Request, res: Response) => {
        const title = req.body.title;
        const author = req.body.author;
        const canBeDownloaded = req.body.canBeDownloaded || false;
        const minAgeRestriction = req.body.minAgeRestriction || null;
        const createdAt = new Date().toISOString();
        const publicationDate = addDays(new Date(), 1).toISOString();
        const availableResolutions = req.body.availableResolutions;



        const errorsArray: Array<{ message: string, field: string }> = []
        titleFieldValidator(title, errorsArray)
        authorFieldValidator(author, errorsArray)
        avaliableResolutionFieldValidator(availableResolutions, errorsArray)


        if (errorsArray.length > 0) {
            const error = errorResponse(errorsArray)
            res
                .status(400)
                .json(error)
        }

        const video: VideoDbType = {
            id: Date.now() + Math.random(),
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded,
            minAgeRestriction: minAgeRestriction,
            createdAt: createdAt,
            publicationDate: publicationDate,
            availableResolutions:availableResolutions
        }
        db.videos = [...db.videos, video];
        res
            .status(201)
            .json(video);
    },

    updateVideo: (req: Request, res: Response) => {
        let video = db.videos.find(video => video.id === +req.params.id);
        if (video) {
            video.title = req.body.title;
            video.author = req.body.author;
            video.availableResolutions = req.body.availableResolutions ? req.body.availableResolutions : video.availableResolutions;
            video.canBeDownloaded = req.body.canBeDownloaded ? req.body.canBeDownloaded : video.canBeDownloaded;
            video.minAgeRestriction = req.body.minAgeRestriction ? req.body.minAgeRestriction : video.minAgeRestriction;
            video.publicationDate = req.body.publicationDate ? req.body.publicationDate : video.publicationDate;

            const errorsArray: Array<{ message: string, field: string }> = []
            titleFieldValidator(video.title, errorsArray)
            avaliableResolutionFieldValidator(video.availableResolutions, errorsArray)
            minAgeRestrictionFieldValidator(video.minAgeRestriction, errorsArray)
            authorFieldValidator(video.author, errorsArray)
            canBeDownloadedFieldValidator(video.canBeDownloaded, errorsArray)
            publisherFieldValidator(video.publicationDate, errorsArray)

            if (errorsArray.length > 0) {
                const error = errorResponse(errorsArray)
                res
                    .status(400)
                    .json(error)
            }
            res.status(204).json(video);
        } else {
            res.sendStatus(404);
        }


    },

    deleteVideoById: (req: Request, res: Response) => {
        for (let i = 0; i < db.videos.length; i++) {
            if (db.videos[i].id === +req.params.id) {
                db.videos.splice(i, 1)
                res.sendStatus(204)
                return
            }
        }res.sendStatus(404)
    },
}
testRouter.delete('/', videoController.deleteAllVideos)
videoRouter.get('/', videoController.getVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.post('/', videoController.createVideo)
videoRouter.put('/:id', videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideoById)




