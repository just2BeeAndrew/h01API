import {Router, Request, Response} from "express";
import {db} from "./db/db";

export const videoRouter = Router();

export const videoController = {
    deleteAllVideos: (req: Request, res: Response) => {

    },
    getVideo: (req: Request, res: Response) => {
        res.status(200).send(db.videos);
    },
    getVideoById: (req: Request, res: Response) => {
        let videoId = db.videos.find(video => video.id === +req.params.id);
        if (videoId) {
            res.status(200).send(videoId);
        } else {
            res.status(404).send('Not Found');
        }

    },
    createVideo: (req: Request, res: Response) => {
        const newVideo = {
            id: Date.now() + Math.random(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: true,
            createdAt: Date.now().toString(),
            publicationDate: Date.now().toString(),
            availableResolution: req.body.availableResolution,
        }

    },
    updateVideo: (req: Request, res: Response) => {
        let video = db.videos.find(video => video.id === +req.params.id);
        if (video) {

        } else {
            res.status(404)
        }


    },
    deleteVideoById: (req: Request, res: Response) => {
      for (let i = 0; i < db.videos.length; i++) {
          if (db.videos[i].id === +req.params.id) {
              db.videos.splice(i, 1)
              res.send(204)
              return
          }
      }
    },
}
videoRouter.delete('/',videoController.deleteAllVideos)
videoRouter.get('/',videoController.getVideo)
videoRouter.get('/:id',videoController.getVideoById)
videoRouter.post('/',videoController.createVideo)
videoRouter.put('/:id',videoController.updateVideo)
videoRouter.delete('/:id', videoController.deleteVideoById)
