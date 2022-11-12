import fleet from '/api/fleet?x0=0&n=20' assert {type: 'json'};

// Info fleet
for (var i = 0; i < fleet.length; i++) {
    var airplane = fleet[i];
    //  ---  Card  ---
    var nameComment = document.createComment(airplane.name);
    var card = document.createElement("article");
    card.classList.add("airplane-card");
    if(i % 2 == 0){
        card.classList.add("inverted");
    }

    //  ---  Airplane Img  ---
    var img = document.createElement("img");
    img.src = "../.."+airplane.img;
    img.alt = "Imagen del "+airplane.name;

    //  ---  Airplane Info  --- 
    var airplaneInfo = document.createElement("div");
    airplaneInfo.classList.add("airplane-info");

    // Name
    var name = document.createElement("h2");
    name.textContent = airplane.name;

    // Line
    var hr = document.createElement("hr");

    // Plate
    var plateTitle = document.createElement("h3");
    plateTitle.textContent = "Matricula:";
    var plate = document.createElement("p");
    plate.textContent = airplane.plate;

    // Engine
    var engineTitle = document.createElement("h3");
    engineTitle.textContent = "Motor:";
    var engine = document.createElement("p");
    engine.textContent = airplane.engine;

    // Brand
    var brandTitle = document.createElement("h3");
    brandTitle.textContent = "Marca:";
    var brand = document.createElement("p");
    brand.textContent = airplane.brand;

    // Model
    var modelTitle = document.createElement("h3");
    modelTitle.textContent = "Modelo:";
    var model = document.createElement("p");
    model.textContent = airplane.model;

    // Speed
    var speedTitle = document.createElement("h3");
    speedTitle.textContent = "Velocidad Curcero:";
    var speed = document.createElement("p");
    speed.textContent = airplane.speed + "kt";

    // Consumption
    var consumptionTitle = document.createElement("h3");
    consumptionTitle.textContent = "Consumo:";
    var consumption = document.createElement("p");
    consumption.textContent = airplane.consumption + "lt/h";

    // ---  Appends  ---
    document.querySelector(".airplanes").appendChild(nameComment);
    document.querySelector(".airplanes").appendChild(card);
    card.appendChild(img);
    card.appendChild(airplaneInfo);
    airplaneInfo.appendChild(name);
    airplaneInfo.appendChild(hr);
    airplaneInfo.appendChild(plateTitle);
    airplaneInfo.appendChild(plate);
    airplaneInfo.appendChild(engineTitle);
    airplaneInfo.appendChild(engine);
    airplaneInfo.appendChild(brandTitle);
    airplaneInfo.appendChild(brand);
    airplaneInfo.appendChild(modelTitle);
    airplaneInfo.appendChild(model);
    airplaneInfo.appendChild(speedTitle);
    airplaneInfo.appendChild(speed);
    airplaneInfo.appendChild(consumptionTitle);
    airplaneInfo.appendChild(consumption);
}
