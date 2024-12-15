export const errorResponse = (
    errorsArray: Array<{message: string, field: string }>
) => {
    let error = {
        errorsMessages: [] as Array<{message: string, field: string}>,
    }
    errorsArray.forEach(err => {
        error.errorsMessages.push(err)
    })
    return error

}

