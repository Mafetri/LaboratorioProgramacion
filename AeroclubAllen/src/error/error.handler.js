export const somethingWentWrong500 = (e, res) => {
    return res.status(500).json({
        message: "Something went wrong",
        error: e,
    });
}