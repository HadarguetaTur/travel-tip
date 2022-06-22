const STORAGE_KEY='locDB'


export const locService = {
    getLocs,
    addLoc,
    loadSavedLocations,
    getLocationById,
    deleteLoc,

}


const glocs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(glocs);
        }, 2000)
    });
}


function addLoc(){
    //add loc to glocs
    let pos = {
        id,
        lat,
        lng,
        weather,
    };
    glocs.push(pos);
    storageService.save(STORAGE_KEY, glocs);

}

function loadSavedLocations(){
    //load loc from storage
    glocs = storageService.load(STORAGE_KEY) || [];

}

function getLocationById(id){
    //get object and push it to gLoc
    return glocs.find(loc => (id === loc.id));

}


function deleteLoc(id){
    //delete loc from gLocs
    const Idx = glocs.findIndex(loc => (id === loc.id));
    glocs.splice(locIdx, 1)

}

