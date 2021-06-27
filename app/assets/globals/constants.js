const baseUrl = 'https://bgauthier.fr/inksac/';

export default {
    // Tools
    uploadUrl: baseUrl+'api/upload.php',
    // File
    postFile: baseUrl+'api/file/createFile.php',
    updateFile: baseUrl+'api/file/updateFile.php',
    deleteFile: baseUrl+'api/file/deleteFile.php',
    getAllFiles : baseUrl+'api/file/getAllFiles.php',
    deleteFile: baseUrl+'api/userList/deleteList.php',
    getFilesFromRequest : baseUrl+'api/shared/getFilesFromRequest.php',
    // Link
    addFileToRequest: baseUrl+'api/link/addFileToRequest.php',
    addListToRequest : baseUrl+'api/link/addListToRequest.php',
    // Request
    postRequest: baseUrl+'api/request/createRequest.php',
    updateRequest : baseUrl+'api/request/updateRequest.php',
    deleteRequest : baseUrl+'api/request/deleteRequest.php',
    getAllRequests : baseUrl+'api/request/getAllRequests.php',
    getRequestsByAuthor : baseUrl+'api/request/getRequestsByAuthor.php',
    getRequestsForUser : baseUrl+'api/request/getRequestsForUser.php',
    // List
    getRequestsForList : baseUrl+'api/shared/getRequestsForList.php',
    getAllLists : baseUrl+'api/userList/getAllLists.php',
    getList : baseUrl+'api/userList/getList.php',
    deleteList : baseUrl+'api/userList/deleteList.php',
    updateList : baseUrl+'api/userList/updateList.php',
    createList : baseUrl+'api/userList/createList.php',
    // User
    loggedUser : baseUrl+'api/user/loggedUser.php',
    getUserByEmail : baseUrl+'api/user/getUserByEmail.php',
    getUser : baseUrl+'api/user/getUser.php',
    getAllUsers : baseUrl+'api/user/getAllUsers.php',
    updateUser : baseUrl+'api/user/updateUser.php',
    deleteUser: baseUrl+'api/user/deleteUser.php',

    // Global variables
    globalUser: null,
}