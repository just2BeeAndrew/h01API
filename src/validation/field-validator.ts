import {Resolution} from "../types/db.types";

export const titleFieldValidator = (
    title: string | undefined,
    errorsArray: Array<{ message: string, field: string }>
) => {
    if (!title) {
        errorsArray.push({
            message: 'no title',
            field: 'title'
        })
    }
    if (title && title.trim().length > 40) {
        errorsArray.push({
            message: 'invalid title, more then 40 simbols',
            field: 'title'
        })
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({
            message: 'no title',
            field: 'title'
        })
    }

}

export const authorFieldValidator = (
    author: string | undefined,
    errorsArray: Array<{ message: string, field: string }>
) => {
    if (!author) {
        errorsArray.push({
            message: 'no author',
            field: 'author'
        })
    }

    if (author && author.trim().length > 20) {
        errorsArray.push({
            message: 'invalid author, more then 20 simbols',
            field: 'author',
        })
    }
    if (author && author.trim().length < 1) {
        errorsArray.push({
            message: 'no author',
            field: 'author'
        })
    }
}

export const minAgeRestrictionFieldValidator = (
    minAgeRestriction: number,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArray.push({
            field: 'minAgeRestriction',
            message: 'invalid age'
        })
    }
}

export const publisherFieldValidator = (
    publicationDate: string,
    errorsArray: Array<{ field: string, message: string }>
)=>{
    if (publicationDate &&  typeof publicationDate !== 'string') {
        errorsArray.push({
            field: 'publicationDate',
            message: 'invalid date'
        })

    }
}

export const canBeDownloadedFieldValidator = (
    canBeDownloaded: boolean,
    errorsArray: Array<{ field: string, message: string }>
) => {
    if (!canBeDownloaded) {
        errorsArray.push({
            field: 'canBeDownloaded',
            message: 'invalid canBeDownloaded',
        })
        }
    if (typeof canBeDownloaded !== "boolean") {
        errorsArray.push({
            field: 'canBeDownloaded',
            message: 'invalid canBeDownloaded',
        })

    }
}



export const avaliableResolutionFieldValidator = (
    availableResolutions: Array<string>,
    errorsArray: Array<{ message: string, field: string }>
) => {
    if (availableResolutions && availableResolutions.length > 0 && Array.isArray(availableResolutions)) {
        availableResolutions.forEach((resolution: string) => {
            if (!Object.keys(Resolution).includes(resolution)) {
                errorsArray.push({
                    message: 'invalid resolution',
                    field: 'availableResolutions'
                })
                return
            }
        })
    }
}