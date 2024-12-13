import {Resolution} from "../types/db.types";

export const titleFieldValidator = (
    title: string | undefined,
    errorsArray: Array<{field: string, message: string}>
)=>{
    if(!title){
        errorsArray.push({
            field: 'title',
            message: 'no title'})
    }
    if (title && title.trim().length > 40){
        errorsArray.push({
            field: 'title',
            message: 'invalid title, more then 40 simbols'})
    }
    if (title && title.trim().length < 1){
        errorsArray.push({
            field: 'title',
            message: 'no title'
        })
    }
}

export const authorFieldValidator = (
    author: string | undefined,
    errorsArray: Array<{field: string, message: string}>
)=>{
    if(!author){
        errorsArray.push({
            field: 'author',
            message: 'no author'})
    }

    if (author && author.trim().length > 20){
        errorsArray.push({
            field: 'author',
            message: 'invalid author, more then 20 simbols'})
    }
    if (author && author.trim().length < 1){
        errorsArray.push({
            field: 'author',
            message: 'no author'
        })
    }
}

export const minAgeRestrictionFieldValidator = (
    minAgeRestriction: number,
    errorsArray: Array<{field: string, message: string}>
)=> {
    if(minAgeRestriction < 1 && minAgeRestriction > 18){
        errorsArray.push({
            field : 'minAgeRestriction',
            message: 'invalid age'
        })
    }
}

export const avaliableResolutionFieldValidator = (
    availableResolution: Array<string>,
    errorsArray: Array<{field: string, message:string}>
)  => {
    if(availableResolution && availableResolution.length){
        availableResolution.forEach((resolution: string) => {
            if(Object.keys(Resolution).includes(resolution)){
                errorsArray.push({
                    field: 'availableResolution',
                    message: 'invalid resolution',
                })
                return
            }
        })
    }
}