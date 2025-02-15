export const getErrorMessages = (error) => {
    switch (error.name) 
    {
        case 'MongoError':
            return 'There was a problem with the database';
        case 'ValidationError':
            return Object.values(error.errors).at(0);
        default:
            return error.message;
    }
};