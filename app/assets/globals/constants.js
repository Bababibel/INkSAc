const baseUrl = 'https://bgauthier.fr/inksac/';

export default {
    uploadUrl: baseUrl+'api/upload.php',
    postFile: baseUrl+'api/file/createFile.php',
    updateFile: baseUrl+'api/file/updateFile.php',
    postRequest: baseUrl+'api/request/createRequest.php',
    addFileToRequest: baseUrl+'api/link/addFileToRequest.php',
    addListToRequest : baseUrl+'api/link/addListToRequest.php',
    updateRequest : baseUrl+'api/request/updateRequest.php',
    getAllRequests : baseUrl+'api/request/getAllRequests.php',
    getAllLists : baseUrl+'api/userList/getAllLists.php',
    getList : baseUrl+'api/userList/getList.php',
    getFilesFromRequest : baseUrl+'api/shared/getFilesFromRequest.php'
}