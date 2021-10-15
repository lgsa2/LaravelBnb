export const is404 = function(err) {
    return isErrorWithResponseAndStatus(err, 404);
}

export const is422 = function(err) {
    return isErrorWithResponseAndStatus(err, 422);
}

const isErrorWithResponseAndStatus = function(err, cod) {
    return err.response && err.response.status && err.response.status == cod;
}