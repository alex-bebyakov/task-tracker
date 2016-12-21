import errorHelper from '../helpers/errorHelper';
import AppError from '../appError';

export default {
    sendFailureMessage,
    sendSuccessMessage,
    sendData
};

function sendFailureMessage(error, res) {
    errorHelper.logError(error);
    let errorMessage = errorHelper.getErrorMessage(error);

    res.send({'status': 'failure', message: errorMessage});
}

function sendSuccessMessage(message, res) {
    res.send({status: 'success', 'message': message});
}

function sendData(data, res) {
    data.status = 'success';
    res.send(data);
}

