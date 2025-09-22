function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || "Ocorreu um erro interno no servidor.";
    res.status(status).json({
        status: "error",
        message: message,
    });
}

module.exports = errorHandler;

