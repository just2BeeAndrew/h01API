export const errorResponse = (
    errorsArray: Array<{field: string, message: string}>
) => {
    let error = {
        errorsMessage: [] as Array<{field: string, message: string}>,
    }
    errorsArray.forEach(err => {
        error.errorsMessage.push(err)
    })
    return error

}

