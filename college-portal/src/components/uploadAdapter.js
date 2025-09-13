/**
 * Custom upload adapter for CKEditor 5
 * This adapter handles file uploads by converting them to base64 strings
 * For production: Replace this with actual server upload implementation
 */
class UploadAdapter {
    /**
     * Initialize the adapter with the loader provided by CKEditor
     * @param {FileLoader} loader - CKEditor file loader instance
     */
    constructor(loader) {
        this.loader = loader;
    }

    /**
     * Starts the upload process
     * @returns {Promise} Promise that resolves with an object containing the upload URL
     */
    upload() {
        return this.loader.file.then(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Here you would typically upload to your server
                    // For now, we'll return the base64 string
                    resolve({
                        default: reader.result
                    });
                };
                reader.onerror = () => reject('Upload failed');
                reader.onabort = () => reject('Upload aborted');
                reader.readAsDataURL(file);
            });
        });
    }

    abort() {
        // Abort upload process
    }
}

export default UploadAdapter;
