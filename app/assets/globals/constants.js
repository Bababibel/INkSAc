const baseUrl = 'https://bgauthier.fr/inksac/';

export default {
    uploadUrl: baseUrl+'api/upload.php',
    postFile: baseUrl+'api/file/createFile.php',
    postRequest: baseUrl+'api/request/createRequest.php',
    addFileToRequest: baseUrl+'api/link/addFileToRequest.php',
    updateRequest : baseUrl+'api/request/updateRequest.php',
    getAllRequests : baseUrl+'api/request/getAllRequests.php',
    getFilesFromRequest : baseUrl+'api/shared/getFilesFromRequest.php'
}