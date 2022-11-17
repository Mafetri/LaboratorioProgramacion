import fleet from '/api/fleet?x0=0&n=20' assert {type: 'json'};

// Info fleet
for (let i = 0; i < fleet.length; i++) {
    let airplane = fleet[i];
    //  ---  Card  ---
    let nameComment = document.createComment(airplane.name);
    let card = document.createElement("article");
    card.classList.add("airplane-card");
    if(i % 2 == 0){
        card.classList.add("inverted");
    }

    //  ---  Airplane Img  ---
    let img = document.createElement("img");
    img.src = "../.."+airplane.img;
    img.alt = "Imagen del "+airplane.name;

    //  ---  Airplane Info  --- 
    let airplaneInfo = document.createElement("div");
    airplaneInfo.classList.add("airplane-info");

    // Name
    let name = document.createElement("h2");
    name.textContent = airplane.name;

    // Line
    let hr = document.createElement("hr");

    // Plate
    let plateTitle = document.createElement("h3");
    plateTitle.textContent = "Matricula:";
    let plate = document.createElement("p");
    plate.textContent = airplane.plate;

    // Engine
    let engineTitle = document.createElement("h3");
    engineTitle.textContent = "Motor:";
    let engine = document.createElement("p");
    engine.textContent = airplane.engine;

    // Brand
    let brandTitle = document.createElement("h3");
    brandTitle.textContent = "Marca:";
    let brand = document.createElement("p");
    brand.textContent = airplane.brand;

    // Model
    let modelTitle = document.createElement("h3");
    modelTitle.textContent = "Modelo:";
    let model = document.createElement("p");
    model.textContent = airplane.model;

    // Speed
    let speedTitle = document.createElement("h3");
    speedTitle.textContent = "Velocidad Curcero:";
    let speed = document.createElement("p");
    speed.textContent = airplane.speed + "kt";

    // Consumption
    let consumptionTitle = document.createElement("h3");
    consumptionTitle.textContent = "Consumo:";
    let consumption = document.createElement("p");
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
