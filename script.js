
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Arbol',
            location: {
                // decomment the following and add coordinates:
                //(17.3463808, -98.0310146) arbol, 
                lat: 17.3463808,
                lng: -98.0310146,
            },
        },
        {
            name: 'Caracol',
            location: {
                // decomment the following and add coordinates:
                //(17.3463808, -98.0310146) arbol, 
                lat: 17.3463808,
                lng: -98.0310146,
            },
        },
        {
            name: 'Concha',
            location: {
                // decomment the following and add coordinates:
                //(17.3463808, -98.0310146) arbol, 
                lat: 17.3463808,
                lng: -98.0310146,
            },
        },
    ];
}

var models = [
    {
        url: 'tree.glb',
        scale: '0.5 0.5 0.5',
        info: 'Arbol',
        rotation: '0 180 0',
    },
    {
        url: 'caracol.glb',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Caracol',
    },
    {
        url: 'fosil.glb',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Concha',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
