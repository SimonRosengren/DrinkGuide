const sstk = require("shutterstock-api");
const config = require("../lib/config");
const applicationConsumerId = config.shutterstock.key;
const applicationConsumerSecret = config.shutterstock.secret;
sstk.setBasicAuth(applicationConsumerId, applicationConsumerSecret);
const imagesApi = new sstk.ImagesApi();


const getImage = async (query) => {
    try {
        const image = await imagesApi.searchImages({query});
        return image.data[0];   
    } catch (error) {
        console.log(error)
        // TODO: do something
    }
}

module.exports = {
    getImage
}